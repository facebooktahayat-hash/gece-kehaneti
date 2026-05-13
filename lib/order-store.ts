import { getCategory, getPackage } from "@/lib/data";

export type StoredOrderImage = {
  filename: string;
  mimeType: string;
  size: number;
  base64: string;
};

export type PaymentSaleSnapshot = {
  saleId: string;
  email?: string;
  productName?: string;
  productId?: string;
  permalink?: string;
  price?: string;
  raw: Record<string, string>;
};

export type OrderDraft = {
  orderId: string;
  productSlug: string;
  productName: string;
  categorySlug: string;
  categoryTitle: string;
  creditCost: number;
  fullName: string;
  email: string;
  birthDate?: string;
  birthTimePlace?: string;
  relationshipStatus?: string;
  topic: string;
  notes?: string;
  images: StoredOrderImage[];
  imageStoreWarning?: string;
  status: "draft" | "paid" | "queued" | "generating" | "delivered" | "failed";
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  firstMailSentAt?: string;
  deliveryDueAt?: string;
  deliveredAt?: string;
  interpretation?: string;
  lastError?: string;
  sale?: PaymentSaleSnapshot;
  deliveryAttempts?: number;
  fileKey?: string;
};

type RedisResponse<T = unknown> = { result?: T; error?: string };

type MemoryStore = {
  orders: Map<string, OrderDraft>;
  emailIndex: Map<string, string[]>;
  processedSales: Map<string, string>;
  due: Map<string, number>;
};

declare global {
  // eslint-disable-next-line no-var
  var __vivaStüdyoiOrderStore: MemoryStore | undefined;
}

const ORDER_TTL_SECONDS = 60 * 60 * 24 * 21;
const SALE_TTL_SECONDS = 60 * 60 * 24 * 60;
const DUE_SET_KEY = "gk:orders:due";
const EMAIL_INDEX_PREFIX = "gk:email:";
const ORDER_PREFIX = "gk:order:";
const SALE_PREFIX = "gk:sale:";

function memory(): MemoryStore {
  if (!globalThis.__vivaStüdyoiOrderStore) {
    globalThis.__vivaStüdyoiOrderStore = {
      orders: new Map(),
      emailIndex: new Map(),
      processedSales: new Map(),
      due: new Map()
    };
  }
  return globalThis.__vivaStüdyoiOrderStore;
}

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function redisCommand<T = unknown>(command: Array<string | number>): Promise<T | null> {
  const config = redisConfig();
  if (!config) return null;
  const response = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store"
  });
  const payload = (await response.json().catch(() => ({}))) as RedisResponse<T>;
  if (!response.ok || payload.error) throw new Error(payload.error || `Redis command failed: ${command[0]}`);
  return payload.result ?? null;
}

function normalizeEmail(value?: string) {
  return (value || "").trim().toLowerCase();
}

function generateFileKey() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizeFileKey(value?: string) {
  const digits = (value || "").replace(/\D/g, "").slice(0, 6);
  return /^\d{6}$/.test(digits) ? digits : generateFileKey();
}

function orderKey(orderId: string) { return `${ORDER_PREFIX}${orderId}`; }
function emailIndexKey(email: string) { return `${EMAIL_INDEX_PREFIX}${normalizeEmail(email)}:orders`; }
function saleKey(saleId: string) { return `${SALE_PREFIX}${saleId}`; }
function sortNewestFirst(orders: OrderDraft[]) { return orders.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)); }

function hydrateOrder(raw: string | OrderDraft | null): OrderDraft | null {
  if (!raw) return null;
  if (typeof raw !== "string") return raw;
  try { return JSON.parse(raw) as OrderDraft; } catch { return null; }
}

export async function saveOrderDraft(order: OrderDraft) {
  const now = new Date().toISOString();
  const normalized: OrderDraft = { ...order, email: normalizeEmail(order.email), fileKey: normalizeFileKey(order.fileKey), updatedAt: now };
  if (redisConfig()) {
    await redisCommand(["SET", orderKey(normalized.orderId), JSON.stringify(normalized), "EX", ORDER_TTL_SECONDS]);
    await redisCommand(["LREM", emailIndexKey(normalized.email), 0, normalized.orderId]);
    await redisCommand(["LPUSH", emailIndexKey(normalized.email), normalized.orderId]);
    await redisCommand(["LTRIM", emailIndexKey(normalized.email), 0, 30]);
    await redisCommand(["EXPIRE", emailIndexKey(normalized.email), ORDER_TTL_SECONDS]);
    return normalized;
  }
  const store = memory();
  store.orders.set(normalized.orderId, normalized);
  const list = store.emailIndex.get(normalized.email) || [];
  store.emailIndex.set(normalized.email, [normalized.orderId, ...list.filter((id) => id !== normalized.orderId)].slice(0, 30));
  return normalized;
}

export async function getOrderDraft(orderId?: string | null) {
  if (!orderId) return null;
  if (redisConfig()) {
    const raw = await redisCommand<string>(["GET", orderKey(orderId)]);
    return hydrateOrder(raw);
  }
  return memory().orders.get(orderId) || null;
}

export async function updateOrderDraft(orderId: string, updater: (order: OrderDraft) => OrderDraft) {
  const current = await getOrderDraft(orderId);
  if (!current) return null;
  return saveOrderDraft(updater(current));
}

export async function listOrdersByEmail(email: string, limit = 30) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return [];
  let candidates: OrderDraft[] = [];
  if (redisConfig()) {
    const ids = (await redisCommand<string[]>(["LRANGE", emailIndexKey(normalizedEmail), 0, limit])) || [];
    const orders = await Promise.all(ids.map((id) => getOrderDraft(id)));
    candidates = orders.filter((order): order is OrderDraft => Boolean(order));
  } else {
    const store = memory();
    const ids = store.emailIndex.get(normalizedEmail) || [];
    candidates = ids.map((id) => store.orders.get(id)).filter((order): order is OrderDraft => Boolean(order));
  }
  return sortNewestFirst(candidates).slice(0, limit);
}

export async function findLatestOrderByEmail(email: string, options: { productSlug?: string; creditCost?: number } = {}) {
  const candidates = await listOrdersByEmail(email);
  const filtered = candidates.filter((order) => {
    if (order.status === "delivered") return false;
    if (options.productSlug && order.productSlug !== options.productSlug) return false;
    if (options.creditCost && Math.abs(order.creditCost - options.creditCost) > 5) return false;
    return true;
  });
  return sortNewestFirst(filtered)[0] || null;
}

export async function markSaleProcessedOnce(saleId: string) {
  const normalizedSaleId = saleId.trim();
  if (!normalizedSaleId) return false;
  if (redisConfig()) {
    const result = await redisCommand<string | null>(["SET", saleKey(normalizedSaleId), new Date().toISOString(), "NX", "EX", SALE_TTL_SECONDS]);
    return result === "OK";
  }
  const store = memory();
  if (store.processedSales.has(normalizedSaleId)) return false;
  store.processedSales.set(normalizedSaleId, new Date().toISOString());
  return true;
}

export async function scheduleDelivery(orderId: string, dueAtIso: string) {
  const score = Date.parse(dueAtIso);
  if (!Number.isFinite(score)) throw new Error("Invalid delivery due date.");
  if (redisConfig()) { await redisCommand(["ZADD", DUE_SET_KEY, score, orderId]); return; }
  memory().due.set(orderId, score);
}

export async function removeScheduledDelivery(orderId: string) {
  if (redisConfig()) { await redisCommand(["ZREM", DUE_SET_KEY, orderId]); return; }
  memory().due.delete(orderId);
}

export async function getDueOrderIds(limit = 10) {
  const now = Date.now();
  if (redisConfig()) return (await redisCommand<string[]>(["ZRANGEBYSCORE", DUE_SET_KEY, "-inf", now, "LIMIT", 0, limit])) || [];
  return [...memory().due.entries()].filter(([, score]) => score <= now).sort((a, b) => a[1] - b[1]).slice(0, limit).map(([orderId]) => orderId);
}

export function createOrderDraft(input: {
  orderId: string;
  productSlug: string;
  fullName: string;
  email: string;
  birthDate?: string;
  birthTimePlace?: string;
  relationshipStatus?: string;
  topic: string;
  notes?: string;
  images: StoredOrderImage[];
  imageStoreWarning?: string;
}): OrderDraft | null {
  const item = getPackage(input.productSlug);
  if (!item) return null;
  const category = getCategory(item.categorySlug);
  const now = new Date().toISOString();
  return {
    orderId: input.orderId,
    productSlug: input.productSlug,
    productName: item.name,
    categorySlug: item.categorySlug,
    categoryTitle: category?.title || item.categorySlug,
    creditCost: item.price,
    fullName: input.fullName.trim(),
    email: normalizeEmail(input.email),
    birthDate: input.birthDate?.trim() || undefined,
    birthTimePlace: input.birthTimePlace?.trim() || undefined,
    relationshipStatus: input.relationshipStatus?.trim() || undefined,
    topic: input.topic.trim(),
    notes: input.notes?.trim() || undefined,
    images: input.images,
    imageStoreWarning: input.imageStoreWarning,
    fileKey: generateFileKey(),
    status: "draft",
    createdAt: now,
    updatedAt: now,
    deliveryAttempts: 0
  };
}
