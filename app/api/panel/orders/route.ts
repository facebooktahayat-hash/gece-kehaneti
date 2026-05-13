import { NextResponse } from "next/server";
import { deliverOrder } from "@/lib/fulfillment";
import { listOrdersByEmail, OrderDraft } from "@/lib/order-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function publicOrder(order: OrderDraft) {
  return {
    orderId: order.orderId,
    productName: order.productName,
    categoryTitle: order.categoryTitle,
    price: order.creditCost,
    status: order.status,
    createdAt: order.createdAt,
    paidAt: order.paidAt,
    deliveryDueAt: order.deliveryDueAt,
    deliveredAt: order.deliveredAt,
    lastError: order.lastError,
    topic: order.topic,
    interpretation: order.status === "delivered" ? order.interpretation || "" : ""
  };
}

function normalizeFileKey(value: string | null) {
  return (value || "").replace(/\D/g, "").slice(0, 6);
}

function filterByFileKey(orders: OrderDraft[], fileKey: string) {
  return orders.filter((order) => order.fileKey === fileKey);
}

async function maybeDeliverDueOrders(orders: OrderDraft[]) {
  const now = Date.now();
  const dueOrders = orders.filter((order) => order.deliveryDueAt && Date.parse(order.deliveryDueAt) <= now && ["queued", "failed"].includes(order.status));
  for (const order of dueOrders.slice(0, 3)) {
    await deliverOrder(order.orderId).catch((error) => console.error("Panel-triggered delivery failed", error));
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const fileKey = normalizeFileKey(url.searchParams.get("key"));

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Geçerli satın alma e-postasını yazın." }, { status: 400 });
  }
  if (!/^\d{6}$/.test(fileKey)) {
    return NextResponse.json({ error: "6 haneli dosya anahtarını yazın." }, { status: 400 });
  }

  const initialOrders = filterByFileKey(await listOrdersByEmail(email), fileKey);
  await maybeDeliverDueOrders(initialOrders);
  const orders = filterByFileKey(await listOrdersByEmail(email), fileKey);

  return NextResponse.json({ ok: true, orders: orders.map(publicOrder) });
}
