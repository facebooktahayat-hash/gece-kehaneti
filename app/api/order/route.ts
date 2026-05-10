import { NextResponse } from "next/server";
import { getCategory, getPackage } from "@/lib/data";
import { escapeHtml, MailAttachment, sendMail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "gecekehaneti@gmail.com";
const MAX_TOTAL_ATTACHMENT_BYTES = 10 * 1024 * 1024;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function fileToAttachment(file: File): Promise<MailAttachment | null> {
  if (!file.name || file.size <= 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    filename: file.name,
    content: buffer.toString("base64")
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const productSlug = clean(formData.get("productSlug"));
    const item = productSlug ? getPackage(productSlug) : null;
    if (!item) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 400 });
    }

    const category = getCategory(item.categorySlug);
    const isCoffee = item.categorySlug === "kahve-fali";

    const orderId = clean(formData.get("orderId")) || `GK-${Date.now()}`;
    const fullName = clean(formData.get("fullName"));
    const email = clean(formData.get("email")).toLowerCase();
    const birthDate = clean(formData.get("birthDate"));
    const topic = clean(formData.get("topic"));
    const notes = clean(formData.get("notes"));
    const consent = clean(formData.get("consent"));

    if (!fullName || !email || !birthDate || !topic || consent !== "accepted") {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun ve onay kutusunu işaretleyin." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
    }

    const files = formData
      .getAll("coffeeImages")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (isCoffee && files.length === 0) {
      return NextResponse.json({ error: "Kahve falı için fincan fotoğrafı yükleyin." }, { status: 400 });
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Yüklenen görseller toplam 10 MB sınırını aşmamalı." }, { status: 400 });
    }

    const attachments = (await Promise.all(files.map(fileToAttachment))).filter(Boolean) as MailAttachment[];
    const mailSubject = `Yeni Sipariş Formu: ${item.name} — ${orderId}`;
    const text = [
      "Yeni sipariş formu",
      `Sipariş No: ${orderId}`,
      `Ürün: ${item.name}`,
      `Kategori: ${category?.title || item.categorySlug}`,
      `Fiyat: ${item.price.toLocaleString("tr-TR")} TL`,
      `Ad Soyad: ${fullName}`,
      `E-posta: ${email}`,
      `Doğum tarihi: ${birthDate}`,
      `Ana konu / soru: ${topic}`,
      `Ek not: ${notes || "-"}`,
      `Kahve falı görsel sayısı: ${attachments.length}`
    ].join("\n");

    const html = `
      <h2>Yeni sipariş formu</h2>
      <p><strong>Sipariş No:</strong> ${escapeHtml(orderId)}</p>
      <p><strong>Ürün:</strong> ${escapeHtml(item.name)}</p>
      <p><strong>Kategori:</strong> ${escapeHtml(category?.title || item.categorySlug)}</p>
      <p><strong>Fiyat:</strong> ${item.price.toLocaleString("tr-TR")} TL</p>
      <hr />
      <p><strong>Ad Soyad:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
      <p><strong>Doğum tarihi:</strong> ${escapeHtml(birthDate)}</p>
      <p><strong>Ana konu / soru:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(topic)}</p>
      <p><strong>Ek not:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(notes || "-")}</p>
      <p><strong>Kahve falı görsel sayısı:</strong> ${attachments.length}</p>
    `;

    await sendMail({
      to: TO_EMAIL,
      subject: mailSubject,
      text,
      html,
      replyTo: email,
      attachments
    });

    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    console.error("Order email error", error);
    return NextResponse.json(
      { error: "Sipariş formu gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
