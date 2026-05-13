import { NextResponse } from "next/server";
import { handlePaymentSale } from "@/lib/fulfillment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function payloadFromRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const data: Record<string, string> = {};

  if (contentType.includes("application/json")) {
    const json = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    for (const [key, value] of Object.entries(json)) {
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") data[key] = String(value);
      else if (value !== null && value !== undefined) data[key] = JSON.stringify(value);
    }
    return data;
  }

  if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    formData.forEach((value, key) => { data[key] = clean(value); });
    return data;
  }

  const text = await request.text();
  const params = new URLSearchParams(text);
  params.forEach((value, key) => { data[key] = value; });
  return data;
}

function isAuthorized(request: Request) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret) return true;
  const url = new URL(request.url);
  const querySecret = url.searchParams.get("secret");
  const headerSecret = request.headers.get("x-viva-secret") || request.headers.get("x-webhook-secret") || request.headers.get("x-payment-secret");
  return querySecret === secret || headerSecret === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized payment webhook." }, { status: 401 });

  try {
    const data = await payloadFromRequest(request);
    const result = await handlePaymentSale(data);
    return NextResponse.json(result, { status: result.ok ? 200 : 202 });
  } catch (error) {
    console.error("Payment webhook error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Ödeme webhook'u işlenemedi." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "VivaMotion AI generic payment webhook is active." });
}
