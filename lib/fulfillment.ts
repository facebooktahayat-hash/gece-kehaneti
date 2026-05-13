import { getPackage, packages } from "@/lib/data";
import { sendAdminNotice, sendPanelReadyMail, sendStartMail } from "@/lib/customer-emails";
import { generateInterpretation } from "@/lib/openai-interpretation";
import {
  findLatestOrderByEmail,
  getDueOrderIds,
  getOrderDraft,
  markSaleProcessedOnce,
  OrderDraft,
  removeScheduledDelivery,
  saveOrderDraft,
  scheduleDelivery,
  updateOrderDraft,
  PaymentSaleSnapshot
} from "@/lib/order-store";
import { deliveryDelayMs, deliveryLabel } from "@/lib/studio-content";

function clean(value?: string | null) { return (value || "").trim(); }
function normalizeEmail(value?: string | null) { return clean(value).toLowerCase(); }

function flattenPayload(data: Record<string, string>) {
  const flattened: Record<string, string> = { ...data };
  for (const [key, value] of Object.entries(data)) {
    if (!value) continue;
    const trimmed = value.trim();
    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) continue;
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        for (const [nestedKey, nestedValue] of Object.entries(parsed as Record<string, unknown>)) {
          const stringValue = typeof nestedValue === "string" ? nestedValue : nestedValue === undefined || nestedValue === null ? "" : String(nestedValue);
          flattened[`${key}.${nestedKey}`] = stringValue;
          flattened[nestedKey] = flattened[nestedKey] || stringValue;
        }
      }
    } catch {}
  }
  return flattened;
}

function findByLooseKeys(data: Record<string, string>, keys: string[]) {
  const flattened = flattenPayload(data);
  const lowered = Object.fromEntries(Object.entries(flattened).map(([key, value]) => [key.toLowerCase().replace(/[\s_\-[\].]+/g, ""), value]));
  for (const key of keys) {
    const normalized = key.toLowerCase().replace(/[\s_\-[\].]+/g, "");
    if (lowered[normalized]) return lowered[normalized];
  }
  return "";
}

function inferCreditCost(data: Record<string, string>) {
  const explicit = findByLooseKeys(data, ["Tutar", "amount", "price", "formatted_display_price", "shown_price", "total"]);
  const numeric = Number(String(explicit).replace(/[^0-9.]/g, ""));
  if (Number.isFinite(numeric) && numeric > 0) return Math.round(numeric);
  return undefined;
}

function inferProductSlug(data: Record<string, string>) {
  const direct = clean(findByLooseKeys(data, ["Paket", "productSlug", "packageSlug", "product_slug", "custom_fields.Paket", "custom_fields[paket]"]));
  if (direct && getPackage(direct)) return direct;
  const productName = clean(findByLooseKeys(data, ["product_name", "productName", "Product", "Ürün", "name", "custom_fields.Ürün"])).toLowerCase();
  if (!productName) return undefined;
  const match = packages.find((item) => productName.includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(productName));
  return match?.slug;
}

function extractOrderId(data: Record<string, string>) {
  return clean(findByLooseKeys(data, ["Talep No", "talep", "orderId", "order_id", "custom_fields.Talep No", "custom_fields.talep_no", "custom_fields[talep_no]", "custom_fields[orderId]"]));
}

function extractSaleId(data: Record<string, string>) {
  const explicit = clean(findByLooseKeys(data, ["sale_id", "saleId", "id", "order_number", "purchase_id", "purchaseId", "payment_id"]));
  if (explicit) return explicit;
  const orderId = extractOrderId(data);
  const email = normalizeEmail(findByLooseKeys(data, ["email", "purchaser_email", "buyer_email", "Email"]));
  const product = clean(findByLooseKeys(data, ["product_name", "productName", "Product", "Ürün", "permalink"]));
  const price = clean(findByLooseKeys(data, ["price", "formatted_display_price", "shown_price", "amount"]));
  const seed = [orderId, email, product, price].filter(Boolean).join("|");
  return seed ? `payment-${Buffer.from(seed).toString("base64url").slice(0, 44)}` : `payment-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function saleSnapshotFromPayload(data: Record<string, string>): PaymentSaleSnapshot {
  const flattened = flattenPayload(data);
  return {
    saleId: extractSaleId(flattened),
    email: normalizeEmail(findByLooseKeys(flattened, ["email", "purchaser_email", "buyer_email", "Email"])),
    productName: clean(findByLooseKeys(flattened, ["product_name", "productName", "Product", "Ürün"])),
    productId: clean(findByLooseKeys(flattened, ["product_id", "productId", "permalink"])),
    permalink: clean(findByLooseKeys(flattened, ["permalink", "short_product_id"])),
    price: clean(findByLooseKeys(flattened, ["price", "formatted_display_price", "shown_price", "amount"])),
    raw: data
  };
}

async function findOrderForSale(data: Record<string, string>) {
  const flattened = flattenPayload(data);
  const orderId = extractOrderId(flattened);
  if (orderId) {
    const byId = await getOrderDraft(orderId);
    if (byId) return byId;
  }
  const email = normalizeEmail(findByLooseKeys(flattened, ["email", "purchaser_email", "buyer_email", "Email"]));
  if (!email) return null;
  return findLatestOrderByEmail(email, { productSlug: inferProductSlug(flattened), creditCost: inferCreditCost(flattened) });
}

function dueDateFromNow() {
  return new Date(Date.now() + deliveryDelayMs() * 1).toISOString();
}

export async function handlePaymentSale(data: Record<string, string>) {
  const sale = saleSnapshotFromPayload(data);
  const firstTime = await markSaleProcessedOnce(sale.saleId);
  if (!firstTime) return { ok: true, duplicate: true, message: "Payment already processed." };

  const order = await findOrderForSale(data);
  if (!order) {
    await sendAdminNotice(
      `Ödeme geldi ama üretim dosyası talebi eşleşmedi — ${sale.saleId}`,
      ["Ödeme webhook'u geldi fakat kayıtlı üretim dosyası talebi bulunamadı.", `Sale ID: ${sale.saleId}`, `E-posta: ${sale.email || "-"}`, `Ürün: ${sale.productName || "-"}`, "", "Ham veri:", JSON.stringify(data, null, 2)].join("\n")
    ).catch((error) => console.error("Admin unmatched payment mail failed", error));
    return { ok: false, unmatched: true, message: "No matching order draft found." };
  }

  if (order.status === "delivered") return { ok: true, orderId: order.orderId, skipped: true, message: "Order already delivered." };

  const dueAt = dueDateFromNow();
  const now = new Date().toISOString();
  const paidOrder: OrderDraft = { ...order, status: "queued", paidAt: now, firstMailSentAt: order.firstMailSentAt || now, deliveryDueAt: dueAt, sale, updatedAt: now, lastError: undefined };
  await saveOrderDraft(paidOrder);
  await scheduleDelivery(paidOrder.orderId, dueAt);

  await sendStartMail(paidOrder).catch((error) => console.error("Customer start mail failed", error));
  await sendAdminNotice(
    `Ödeme alındı, AI üretim dosyası panel kuyruğuna girdi — ${paidOrder.orderId}`,
    [`Talep No: ${paidOrder.orderId}`, `Dosya Anahtarı: ${paidOrder.fileKey || "------"}`, `Müşteri: ${paidOrder.fullName} <${paidOrder.email}>`, `Ürün: ${paidOrder.productName}`, `Kategori: ${paidOrder.categoryTitle}`, `Panel teslim: ${deliveryLabel()} (${dueAt})`, `Görsel sayısı: ${paidOrder.images.length}`].join("\n")
  ).catch((error) => console.error("Admin paid notice failed", error));

  return { ok: true, orderId: paidOrder.orderId, dueAt };
}


export async function deliverOrder(orderId: string) {
  const current = await getOrderDraft(orderId);
  if (!current) return { ok: false, orderId, error: "Order not found." };
  if (current.status === "delivered") { await removeScheduledDelivery(orderId); return { ok: true, orderId, skipped: true, reason: "Already delivered." }; }

  const order = await updateOrderDraft(orderId, (existing) => ({ ...existing, status: "generating", deliveryAttempts: (existing.deliveryAttempts || 0) + 1, updatedAt: new Date().toISOString() }));
  if (!order) return { ok: false, orderId, error: "Order not found after update." };

  try {
    const interpretation = await generateInterpretation(order);
    const deliveredAt = new Date().toISOString();
    const deliveredOrder = await saveOrderDraft({ ...order, status: "delivered", deliveredAt, interpretation, updatedAt: deliveredAt, lastError: undefined });
    await removeScheduledDelivery(orderId);
    await sendPanelReadyMail(deliveredOrder).catch((error) => console.error("Panel ready mail failed", error));
    return { ok: true, orderId, deliveredAt };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const failedAt = new Date().toISOString();
    await saveOrderDraft({ ...order, status: "failed", lastError: message, updatedAt: failedAt });
    await sendAdminNotice(`Panel üretim dosyanı üretilemedi — ${order.orderId}`, `Talep: ${order.orderId}\nMüşteri: ${order.email}\nÜrün: ${order.productName}\nHata: ${message}`).catch(() => undefined);
    return { ok: false, orderId, error: message };
  }
}

export async function processDueDeliveries(limit = 5) {
  const ids = await getDueOrderIds(limit);
  const results = [];
  for (const id of ids) results.push(await deliverOrder(id));
  return { ok: true, count: results.length, results };
}
