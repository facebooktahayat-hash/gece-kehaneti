import { NextResponse } from "next/server";
import { normalizePaymentPayload, sendPaymentNotification } from "@/lib/payment-notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function callbackAllowed(request: Request) {
  const configuredSecret = process.env.DEPAY_CALLBACK_SECRET;
  if (!configuredSecret) return true;
  const url = new URL(request.url);
  return url.searchParams.get("secret") === configuredSecret;
}

export async function POST(request: Request) {
  if (!callbackAllowed(request)) {
    return NextResponse.json({ error: "Unauthorized callback." }, { status: 401 });
  }

  const raw = await request.json().catch(() => ({}));
  const payment = normalizePaymentPayload(raw, "depay-callback");

  try {
    if (payment.status === "success") {
      await sendPaymentNotification(payment);
    } else if (payment.status === "failed" && process.env.DEPAY_NOTIFY_FAILED === "true") {
      await sendPaymentNotification(payment);
    }

    return NextResponse.json({ ok: true, status: payment.status });
  } catch (error) {
    console.error("DePay callback notification error", error);
    return NextResponse.json({ error: "Notification could not be sent." }, { status: 500 });
  }
}
