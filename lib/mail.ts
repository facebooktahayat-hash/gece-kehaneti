export type MailAttachment = {
  filename: string;
  content: string;
};

type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function sendMail({ to, subject, text, html, replyTo, attachments = [] }: SendMailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Gece Kehaneti <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is missing.");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: replyTo,
      attachments: attachments.length ? attachments : undefined
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "Email could not be sent.");
  }

  return response.json().catch(() => ({}));
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
