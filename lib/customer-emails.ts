import { escapeHtml, sendMail } from "@/lib/mail";
import { deliveryLabel, imageSet, siteUrl } from "@/lib/studio-content";
import { OrderDraft } from "@/lib/order-store";

function customerFrom() {
  return process.env.CUSTOMER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || "VivaMotion AI <onboarding@resend.dev>";
}

function replyTo() {
  return process.env.CUSTOMER_REPLY_TO_EMAIL || process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
}

function artStrip(order: Pick<OrderDraft, "categorySlug" | "productSlug">) {
  const images = imageSet(order);
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0;border-collapse:collapse">
      <tr>
        ${images.map((src) => `
          <td style="padding:4px;width:${Math.floor(100 / images.length)}%;vertical-align:top">
            <img src="${escapeHtml(src)}" alt="VivaMotion AI kreatif görsel" style="display:block;width:100%;max-width:220px;border-radius:18px;border:1px solid rgba(14,165,233,.18);background:#f8fbff" />
          </td>
        `).join("")}
      </tr>
    </table>`;
}

function shell(order: OrderDraft, title: string, body: string) {
  const logo = `${siteUrl()}/og-vivamotion-ai.png`;
  return `
  <div style="margin:0;padding:0;background:#f8fbff;color:#0f172a;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:760px;margin:0 auto;padding:28px 16px">
      <div style="border:1px solid rgba(14,165,233,.18);border-radius:26px;background:linear-gradient(145deg,#ffffff,#ecfeff 62%,#fdf2f8);box-shadow:0 18px 44px rgba(14,165,233,.12);overflow:hidden">
        <div style="padding:28px 28px 10px;text-align:center">
          <img src="${escapeHtml(logo)}" alt="VivaMotion AI" style="max-width:140px;border-radius:22px;border:1px solid rgba(14,165,233,.14);margin-bottom:14px" />
          <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#0891b2">VivaMotion AI</div>
          <h1 style="margin:12px 0 0;font-size:30px;line-height:1.12;color:#0f172a">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:0 28px 30px">
          ${artStrip(order)}
          <div style="font-size:16px;line-height:1.82;color:#334155">${body}</div>
          <div style="margin-top:26px;padding:16px 18px;border-radius:18px;border:1px solid rgba(14,165,233,.18);background:#ecfeff;font-size:13px;line-height:1.7;color:#475569">
            Bu içerik OpenAI destekli kreatif dijital üretim dosyasıdır. İzinsiz kişi, ünlü, marka veya telifli materyal taklidi talep edilmemelidir.
          </div>
          <p style="margin-top:22px;font-size:12px;line-height:1.7;color:#64748b">Talep No: ${escapeHtml(order.orderId)} · Proje Anahtarı: ${escapeHtml(order.fileKey || "------")} · Ürün: ${escapeHtml(order.productName)}</p>
        </div>
      </div>
    </div>
  </div>`;
}

function paragraph(value: string) {
  return `<p style="margin:0 0 16px">${escapeHtml(value)}</p>`;
}

function fileKeyBlock(order: OrderDraft) {
  const key = order.fileKey || "------";
  return `<div style="margin:18px 0;padding:16px 18px;border-radius:18px;border:1px solid rgba(14,165,233,.22);background:#f0f9ff;text-align:center">
    <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#0891b2">Panel proje anahtarı</div>
    <div style="margin-top:8px;font-size:30px;letter-spacing:.28em;font-weight:700;color:#0f172a">${escapeHtml(key)}</div>
    <div style="margin-top:8px;font-size:12px;line-height:1.6;color:#475569">Panelde dosyanı açmak için satın alma e-postanla birlikte bu 6 haneli anahtarı kullan.</div>
  </div>`;
}

export function markdownToEmailHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let paragraphLines: string[] = [];
  function flushParagraph() {
    if (!paragraphLines.length) return;
    html.push(`<p style="margin:0 0 18px;white-space:pre-wrap">${escapeHtml(paragraphLines.join("\n"))}</p>`);
    paragraphLines = [];
  }
  for (const line of lines) {
    if (!line.trim()) { flushParagraph(); continue; }
    if (line.startsWith("# ")) { flushParagraph(); html.push(`<h2 style="margin:28px 0 12px;font-size:26px;line-height:1.2;color:#0f172a">${escapeHtml(line.slice(2).trim())}</h2>`); continue; }
    if (line.startsWith("## ")) { flushParagraph(); html.push(`<h3 style="margin:24px 0 10px;font-size:21px;line-height:1.25;color:#0891b2">${escapeHtml(line.slice(3).trim())}</h3>`); continue; }
    if (/^\d+\.\s/.test(line) || line.startsWith("- ")) { flushParagraph(); html.push(`<p style="margin:0 0 12px;padding-left:12px;color:#334155">${escapeHtml(line)}</p>`); continue; }
    paragraphLines.push(line);
  }
  flushParagraph();
  return html.join("\n");
}

export async function sendStartMail(order: OrderDraft) {
  const subject = "VivaMotion AI: dosyan üretim kuyruğuna alındı";
  const body = [
    paragraph(`${order.fullName}, ödemen başarıyla alındı ve ${order.productName} dosyan üretim kuyruğuna girdi.`),
    paragraph(`Dosyan ${deliveryLabel()} Panelim alanında açılacak. Teslim e-posta gövdesine gönderilmez.`),
    fileKeyBlock(order),
    paragraph("Bu süre, brief’in uygulanabilir prompt, sahne akışı, sosyal medya metni ve güvenli kullanım notlarıyla düzenlenmesi için kullanılır.")
  ].join("");
  await sendMail({
    to: order.email,
    from: customerFrom(),
    subject,
    text: `${order.fullName}, dosyan üretim kuyruğuna alındı. Dosyan ${deliveryLabel()} Panelim alanında açılacak. Proje anahtarın: ${order.fileKey || "------"}.`,
    html: shell(order, "Dosyan Üretim Kuyruğunda", body),
    replyTo: replyTo()
  });
}

export async function sendPanelReadyMail(order: OrderDraft) {
  const subject = "VivaMotion AI: panel dosyan hazır";
  const body = [
    paragraph(`${order.fullName}, ${order.productName} dosyan hazır.`),
    paragraph("Dosyanı görüntülemek için VivaMotion AI sitesindeki Panelim alanına satın alma e-postan ve 6 haneli proje anahtarınla giriş yapabilirsin."),
    fileKeyBlock(order),
    paragraph("Teslim e-posta ile gönderilmez; dosyan panelde güvenli erişim için saklanır.")
  ].join("");
  await sendMail({
    to: order.email,
    from: customerFrom(),
    subject,
    text: `${order.fullName}, dosyan hazır. Panelim alanında satın alma e-postan ve proje anahtarınla görüntüleyebilirsin. Proje anahtarın: ${order.fileKey || "------"}.`,
    html: shell(order, "Panel Dosyan Hazır", body),
    replyTo: replyTo()
  });
}

export async function sendAdminNotice(subject: string, text: string, html?: string) {
  const to = process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  if (!to) return;
  await sendMail({
    to,
    subject,
    text,
    html: html || `<pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,Consolas,monospace">${escapeHtml(text)}</pre>`,
    replyTo: replyTo()
  });
}
