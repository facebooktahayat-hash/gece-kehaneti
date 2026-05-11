import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getPackage } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_BLOCKCHAIN = "polygon";
const DEFAULT_USDC_POLYGON = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

type DePayRequestBody = {
  productSlug?: string;
  slug?: string;
  product?: string;
  productName?: string;
  priceTl?: number;
  creditAmount?: number;
  kredi?: number;
  orderId?: string;
  customerEmail?: string;
  customerName?: string;
  payload?: {
    productSlug?: string;
    slug?: string;
    product?: string;
    productName?: string;
    priceTl?: number;
    creditAmount?: number;
    kredi?: number;
    orderId?: string;
    customerEmail?: string;
    customerName?: string;
  };
  items?: Array<{
    id?: string | number;
    slug?: string;
    productSlug?: string;
    quantity?: number;
    amount?: number;
  }>;
};

function urlSafeBase64(signature: Buffer) {
  return signature
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function signResponse(body: string) {
  const privateKeyString = process.env.DEPAY_DYNAMIC_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!privateKeyString) {
    throw new Error("DEPAY_DYNAMIC_PRIVATE_KEY is missing.");
  }

  const privateKey = crypto.createPrivateKey(privateKeyString);
  const signature = crypto.sign("sha256", Buffer.from(body), {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    saltLength: 64
  });

  return urlSafeBase64(signature);
}

function readProductSlug(body: DePayRequestBody) {
  return (
    body.productSlug ||
    body.slug ||
    body.product ||
    body.payload?.productSlug ||
    body.payload?.slug ||
    body.payload?.product ||
    body.items?.[0]?.productSlug ||
    body.items?.[0]?.slug ||
    String(body.items?.[0]?.id || "")
  );
}

function readCreditAmount(body: DePayRequestBody) {
  const raw = body.creditAmount || body.kredi || body.priceTl || body.payload?.creditAmount || body.payload?.kredi || body.payload?.priceTl || body.items?.[0]?.amount;
  const amount = Number(raw);
  if (!Number.isFinite(amount) || amount <= 0) return 500;
  return Math.round(amount);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as DePayRequestBody;
    const productSlug = readProductSlug(body);
    const item = productSlug ? getPackage(productSlug) : undefined;
    const creditAmount = item?.price || readCreditAmount(body);
    const productName = item?.name || body.productName || body.payload?.productName || "Gece Kredisi";
    const orderId = body.orderId || body.payload?.orderId || `GK-${Date.now()}`;
    const customerEmail = body.customerEmail || body.payload?.customerEmail || "";
    const customerName = body.customerName || body.payload?.customerName || "";

    const receiver = process.env.DEPAY_RECEIVER_ADDRESS;
    if (!receiver) {
      return NextResponse.json({ error: "DEPAY_RECEIVER_ADDRESS is missing." }, { status: 500 });
    }

    const tlPerUsd = Number(process.env.DEPAY_TL_PER_USD || "40");
    const usdAmount = Number(Math.max(1, creditAmount / tlPerUsd).toFixed(2));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gece-kehaneti.vercel.app";

    const configuration = {
      amount: {
        currency: "USD",
        fix: usdAmount
      },
      accept: [
        {
          blockchain: process.env.DEPAY_BLOCKCHAIN || DEFAULT_BLOCKCHAIN,
          token: process.env.DEPAY_TOKEN_ADDRESS || DEFAULT_USDC_POLYGON,
          receiver
        }
      ],
      payload: {
        source: "gece-kehaneti",
        mode: "gece-kredisi",
        productSlug: item?.slug || productSlug || "kredi-yukleme",
        productName,
        orderId,
        customerEmail,
        customerName,
        creditAmount,
        priceTl: creditAmount
      },
      forward_to: `${siteUrl}/panel?odeme=basarili&talep=${encodeURIComponent(orderId)}&kredi=${encodeURIComponent(String(creditAmount))}`
    };

    const responseBody = JSON.stringify(configuration);
    const signature = signResponse(responseBody);

    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "x-signature": signature,
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "DePay configuration error." },
      { status: 500 }
    );
  }
}
