import { NextResponse } from "next/server";
import { getCategory, getPackage, formatPrice } from "@/lib/data";
import { escapeHtml, MailAttachment, sendMail } from "@/lib/mail";
import { createOrderDraft, saveOrderDraft, StoredOrderImage } from "@/lib/order-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "destek@example.com";
const MAX_TOTAL_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_STORE_BYTES = Number(process.env.ORDER_STORE_IMAGES_MAX_BYTES || 3_500_000);

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function fileToBuffer(file: File) {
  return Buffer.from(await file.arrayBuffer());
}

async function fileToAttachment(file: File, buffer: Buffer): Promise<MailAttachment | null> {
  if (!file.name || file.size <= 0) return null;
  return { filename: file.name, content: buffer.toString("base64") };
}

function fileToStoredImage(file: File, buffer: Buffer): StoredOrderImage {
  return { filename: file.name || "viva-gorseli.jpg", mimeType: file.type || "image/jpeg", size: file.size, base64: buffer.toString("base64") };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productSlug = clean(formData.get("productSlug"));
    const item = productSlug ? getPackage(productSlug) : null;
    if (!item) return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 400 });

    const category = getCategory(item.categorySlug);
    const orderId = clean(formData.get("orderId")) || `GK-${Date.now()}`;
    const fullName = clean(formData.get("fullName"));
    const email = clean(formData.get("email")).toLowerCase();
    const topic = clean(formData.get("topic"));
    const notes = clean(formData.get("notes"));
    const consent = clean(formData.get("consent"));

    if (!fullName || !email || !topic || consent !== "accepted") {
      return NextResponse.json({ error: "Lütfen ad/rumuz, e-posta, konu alanı ve onay kutusunu doldurun." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
    }

    const files = formData.getAll("orderImages").filter((entry): entry is File => entry instanceof File && entry.size > 0);
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Yüklenen görseller toplam 10 MB sınırını aşmamalı." }, { status: 400 });
    }

    const fileBuffers = await Promise.all(files.map(async (file) => ({ file, buffer: await fileToBuffer(file) })));
    const attachments = (await Promise.all(fileBuffers.map(({ file, buffer }) => fileToAttachment(file, buffer)))).filter(Boolean) as MailAttachment[];

    let storedImages: StoredOrderImage[] = [];
    let imageStoreWarning = "";
    if (totalBytes <= MAX_IMAGE_STORE_BYTES) {
      storedImages = fileBuffers.map(({ file, buffer }) => fileToStoredImage(file, buffer));
    } else if (files.length) {
      imageStoreWarning = `Görseller admin e-postasına eklendi fakat AI üretim dosyası kuyruğuna alınmadı: toplam ${totalBytes} byte, STORE sınırı ${MAX_IMAGE_STORE_BYTES} byte.`;
    }

    const draft = createOrderDraft({ orderId, productSlug: item.slug, fullName, email, topic, notes, images: storedImages, imageStoreWarning: imageStoreWarning || undefined });
    if (!draft) return NextResponse.json({ error: "Üretim dosyası talebi kaydı oluşturulamadı." }, { status: 400 });
    const savedDraft = await saveOrderDraft(draft);

    const mailSubject = `Yeni AI Üretim dosyası Talebi: ${item.name} — ${orderId}`;
    const text = [
      "Yeni AI üretim dosyası talebi",
      `Talep No: ${orderId}`,
      `Dosya Anahtarı: ${savedDraft.fileKey}`,
      `Ürün: ${item.name}`,
      `Kategori: ${category?.title || item.categorySlug}`,
      `Tutar: ${formatPrice(item.price)}`,
      `Ad / Rumuz: ${fullName}`,
      `E-posta: ${email}`,
      `Ana konu: ${topic}`,
      `Ek not: ${notes || "-"}`,
      `Görsel sayısı: ${attachments.length}`,
      imageStoreWarning ? `Uyarı: ${imageStoreWarning}` : ""
    ].filter(Boolean).join("\n");

    const html = `
      <h2>Yeni AI üretim dosyası talebi</h2>
      <p><strong>Talep No:</strong> ${escapeHtml(orderId)}</p>
      <p><strong>Dosya Anahtarı:</strong> ${escapeHtml(savedDraft.fileKey || "-")}</p>
      <p><strong>Ürün:</strong> ${escapeHtml(item.name)}</p>
      <p><strong>Kategori:</strong> ${escapeHtml(category?.title || item.categorySlug)}</p>
      <p><strong>Tutar:</strong> ${escapeHtml(formatPrice(item.price))}</p>
      <hr />
      <p><strong>Ad / Rumuz:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
      <p><strong>Ana konu:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(topic)}</p>
      <p><strong>Ek not:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(notes || "-")}</p>
      <p><strong>Görsel sayısı:</strong> ${attachments.length}</p>
      ${imageStoreWarning ? `<p style="color:#b42318"><strong>Uyarı:</strong> ${escapeHtml(imageStoreWarning)}</p>` : ""}
    `;

    let mailSent = true;
    let warning = "";
    try {
      await sendMail({ to: TO_EMAIL, subject: mailSubject, text, html, replyTo: email, attachments });
    } catch (mailError) {
      mailSent = false;
      warning = "Talep numarası oluşturuldu; admin bildirimi gönderilemedi. Ödeme adımı yine de açık.";
      console.error("Order email delivery failed, payment flow allowed", mailError);
    }

    return NextResponse.json({ ok: true, orderId, fileKey: savedDraft.fileKey, mailSent, warning: warning || imageStoreWarning || undefined });
  } catch (error) {
    console.error("Order error", error);
    return NextResponse.json({ error: "Üretim dosyası talebi gönderilemedi. Lütfen daha sonra tekrar deneyin." }, { status: 500 });
  }
}
