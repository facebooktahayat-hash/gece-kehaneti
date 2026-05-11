import { escapeHtml, sendMail } from "@/lib/mail";

export type PaymentNotificationInput = {
  source: "depay-callback" | "depay-widget";
  status: "success" | "failed" | "pending" | "unknown";
  orderId?: string;
  productSlug?: string;
  productName?: string;
  customerEmail?: string;
  customerName?: string;
  creditAmount?: number;
  priceTl?: number;
  transactionHash?: string;
  blockchain?: string;
  token?: string;
  raw?: unknown;
};

const DEFAULT_TO = "gecekehaneti@gmail.com";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function num(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : undefined;
}

function pickObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function pickNested(body: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = body[key];
    if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  }
  return {};
}

export function normalizePaymentPayload(raw: unknown, source: PaymentNotificationInput["source"]): PaymentNotificationInput {
  const body = pickObject(raw);
  const payload = pickNested(body, ["payload", "metadata", "data"]);
  const payment = pickNested(body, ["payment"]);
  const transaction = pickNested(body, ["transaction", "transaction_details"]);

  const rawStatus = clean(body.status || body.state || payment.status || payment.state).toLowerCase();
  const successfulValue = body.successful ?? body.success ?? payment.successful ?? payment.success;
  let status: PaymentNotificationInput["status"] = "unknown";

  if (successfulValue === true || ["success", "succeeded", "successful", "confirmed", "validated", "completed"].includes(rawStatus)) {
    status = "success";
  } else if (successfulValue === false || ["failed", "failure", "error", "cancelled", "canceled", "rejected"].includes(rawStatus)) {
    status = "failed";
  } else if (["pending", "processing", "sent", "submitted"].includes(rawStatus)) {
    status = "pending";
  }

  return {
    source,
    status,
    orderId: clean(payload.orderId || payload.order_id || body.orderId || body.order_id || payment.orderId || payment.order_id),
    productSlug: clean(payload.productSlug || payload.product_slug || body.productSlug || body.product_slug),
    productName: clean(payload.productName || payload.product_name || body.productName || body.product_name),
    customerEmail: clean(payload.customerEmail || payload.customer_email || body.customerEmail || body.customer_email).toLowerCase(),
    customerName: clean(payload.customerName || payload.customer_name || body.customerName || body.customer_name),
    creditAmount: num(payload.creditAmount || payload.credit_amount || body.creditAmount || body.credit_amount || body.kredi),
    priceTl: num(payload.priceTl || payload.price_tl || body.priceTl || body.price_tl),
    transactionHash: clean(transaction.hash || transaction.id || body.transaction_hash || body.transactionHash || body.tx || payment.transaction_hash),
    blockchain: clean(payment.blockchain || payload.blockchain || body.blockchain),
    token: clean(payment.token || payload.token || body.token),
    raw
  };
}

async function sendCustomerPaymentConfirmation(input: PaymentNotificationInput) {
  if (input.status !== "success" || !input.customerEmail || process.env.PAYMENT_NOTIFY_CUSTOMER === "false") {
    return;
  }

  const orderId = input.orderId || "Talep no yok";
  const creditText = input.creditAmount ? `${input.creditAmount.toLocaleString("tr-TR")} Gece Kredisi` : "Gece Kredisi";
  const product = input.productName || input.productSlug || "Gece Kredisi";
  const subject = `Gece Kehaneti kredi ödemen alındı: ${orderId}`;
  const text = [
    "Gece Kehaneti ödeme onayı",
    `Talep No: ${orderId}`,
    `Ürün: ${product}`,
    `Kredi: ${creditText}`,
    "",
    "Yorumun, kredi satın aldığın bu e-posta adresine gönderilecektir.",
    "Lütfen bu e-posta adresini sakla; talep takibi bu adres ve talep numarasıyla yapılır.",
    "",
    "Yorumlar eğlence, sembolik anlatım ve kişisel farkındalık amaçlıdır."
  ].join("\n");

  const html = `
    <h2>Gece Kehaneti ödeme onayı</h2>
    <p><strong>Talep No:</strong> ${escapeHtml(orderId)}</p>
    <p><strong>Ürün:</strong> ${escapeHtml(product)}</p>
    <p><strong>Kredi:</strong> ${escapeHtml(creditText)}</p>
    <hr />
    <p>Yorumun, kredi satın aldığın <strong>bu e-posta adresine</strong> gönderilecektir.</p>
    <p>Lütfen bu e-posta adresini sakla; talep takibi bu adres ve talep numarasıyla yapılır.</p>
    <p style="font-size:12px;color:#666">Yorumlar eğlence, sembolik anlatım ve kişisel farkındalık amaçlıdır.</p>
  `;

  await sendMail({
    to: input.customerEmail,
    subject,
    text,
    html
  });
}

export async function sendPaymentNotification(input: PaymentNotificationInput) {
  const to = process.env.PAYMENT_NOTIFY_EMAIL || process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const isSuccess = input.status === "success";
  const statusLabel = isSuccess ? "BAŞARILI ÖDEME" : input.status === "failed" ? "BAŞARISIZ ÖDEME" : "ÖDEME BİLDİRİMİ";
  const orderId = input.orderId || "Talep no yok";
  const subject = `${statusLabel}: ${orderId}${input.creditAmount ? ` — ${input.creditAmount.toLocaleString("tr-TR")} Gece Kredisi` : ""}`;

  const lines = [
    statusLabel,
    `Kaynak: ${input.source}`,
    `Talep No: ${orderId}`,
    `Ürün: ${input.productName || input.productSlug || "Gece Kredisi"}`,
    `Kredi: ${input.creditAmount ? input.creditAmount.toLocaleString("tr-TR") : "-"}`,
    `TL karşılığı: ${input.priceTl ? input.priceTl.toLocaleString("tr-TR") : input.creditAmount ? input.creditAmount.toLocaleString("tr-TR") : "-"}`,
    `Müşteri: ${input.customerName || "-"}`,
    `E-posta: ${input.customerEmail || "-"}`,
    `Ağ: ${input.blockchain || "polygon"}`,
    `Token: ${input.token || "USDC"}`,
    `Tx: ${input.transactionHash || "-"}`,
    "",
    "Ham ödeme verisi:",
    JSON.stringify(input.raw || {}, null, 2)
  ];

  const html = `
    <h2>${escapeHtml(statusLabel)}</h2>
    <p><strong>Kaynak:</strong> ${escapeHtml(input.source)}</p>
    <p><strong>Talep No:</strong> ${escapeHtml(orderId)}</p>
    <p><strong>Ürün:</strong> ${escapeHtml(input.productName || input.productSlug || "Gece Kredisi")}</p>
    <p><strong>Kredi:</strong> ${escapeHtml(input.creditAmount ? input.creditAmount.toLocaleString("tr-TR") : "-")}</p>
    <p><strong>TL karşılığı:</strong> ${escapeHtml(input.priceTl ? input.priceTl.toLocaleString("tr-TR") : input.creditAmount ? input.creditAmount.toLocaleString("tr-TR") : "-")}</p>
    <p><strong>Müşteri:</strong> ${escapeHtml(input.customerName || "-")}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(input.customerEmail || "-")}</p>
    <p><strong>Ağ:</strong> ${escapeHtml(input.blockchain || "polygon")}</p>
    <p><strong>Token:</strong> ${escapeHtml(input.token || "USDC")}</p>
    <p><strong>Tx:</strong> ${escapeHtml(input.transactionHash || "-")}</p>
    <hr />
    <p style="font-size:12px;color:#666">Bu bildirim ödeme durumu callback/widget event üzerinden oluşturuldu. Başarılı ödeme için yorum talebini hazırlama sırasına al.</p>
    <pre style="white-space:pre-wrap;font-size:11px;background:#111;color:#eee;padding:12px;border-radius:8px">${escapeHtml(JSON.stringify(input.raw || {}, null, 2))}</pre>
  `;

  await sendMail({
    to,
    subject,
    text: lines.join("\n"),
    html,
    replyTo: input.customerEmail || undefined
  });

  await sendCustomerPaymentConfirmation(input);
}
