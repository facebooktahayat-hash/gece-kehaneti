import { NextResponse } from "next/server";
import { normalizePaymentPayload, sendPaymentNotification } from "@/lib/payment-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const raw = await request.json().catch(() => ({}));
  const payment = normalizePaymentPayload(raw, "depay-widget");

  try {
    // DePay callback ana kaynak olarak kalır. Bu endpoint, kullanıcı tarayıcısından gelen ek destek kaydıdır.
    // Varsayılan olarak başarılı widget olayında da mail gönderilir; böylece callback ayarı eksikse ödeme kaçmaz.
    if (payment.status === "success" && process.env.DEPAY_NOTIFY_WIDGET_SUCCESS !== "false") {
      await sendPaymentNotification(payment);
    } else if (payment.status === "failed" && process.env.DEPAY_NOTIFY_FAILED === "true") {
      await sendPaymentNotification(payment);
    }
    return NextResponse.json({ ok: true, status: payment.status });
  } catch (error) {
    console.error("DePay widget event notification error", error);
    return NextResponse.json({ error: "Widget event could not be recorded." }, { status: 500 });
  }
}
