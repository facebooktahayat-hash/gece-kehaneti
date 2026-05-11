import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "DePay devre dışı. Ödeme akışı Gumroad kredi paketleriyle çalışır." }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: "DePay devre dışı. Ödeme akışı Gumroad kredi paketleriyle çalışır." }, { status: 410 });
}
