import { NextResponse } from "next/server";
import { processDueDeliveries } from "@/lib/fulfillment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const url = new URL(request.url);
  const auth = request.headers.get("authorization") || "";
  return url.searchParams.get("secret") === secret || auth === `Bearer ${secret}`;
}

async function run(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized cron." }, { status: 401 });
  }

  const url = new URL(request.url);
  const limitParam = Number(url.searchParams.get("limit") || 5);
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(Math.round(limitParam), 20) : 5;
  const result = await processDueDeliveries(limit);
  return NextResponse.json(result);
}

export async function GET(request: Request) {
  return run(request);
}

export async function POST(request: Request) {
  return run(request);
}
