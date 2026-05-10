import { NextResponse } from "next/server";
import { escapeHtml, sendMail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "gecekehaneti@gmail.com";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const fullName = clean(body.fullName);
    const email = clean(body.email).toLowerCase();
    const subject = clean(body.subject);
    const message = clean(body.message);

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
    }

    const mailSubject = `Gece Kehaneti İletişim: ${subject}`;
    const text = [
      "Yeni iletişim mesajı",
      `Ad Soyad: ${fullName}`,
      `E-posta: ${email}`,
      `Konu: ${subject}`,
      "",
      message
    ].join("\n");

    const html = `
      <h2>Yeni iletişim mesajı</h2>
      <p><strong>Ad Soyad:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
      <p><strong>Konu:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    await sendMail({
      to: TO_EMAIL,
      subject: mailSubject,
      text,
      html,
      replyTo: email
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email error", error);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}
