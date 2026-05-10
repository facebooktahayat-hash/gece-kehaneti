import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getPackage } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_BLOCKCHAIN = "polygon";
// Polygon USDC.e contract. You can override this in Vercel env with DEPAY_TOKEN_ADDRESS.
const DEFAULT_USDC_POLYGON = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

type DePayRequestBody = {
  productSlug?: string;
  slug?: string;
  product?: string;
  productName?: string;
  priceTl?: number;
  payload?: {
    productSlug?: string;
    slug?: string;
    product?: string;
    productName?: string;
    priceTl?: number;
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

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as DePayRequestBody;
    const productSlug = readProductSlug(body);

    const item = productSlug ? getPackage(productSlug) : null;
    if (!item) {
      return NextResponse.json({ error: "Unknown product." }, { status: 400 });
    }

    const receiver = process.env.DEPAY_RECEIVER_ADDRESS;
    if (!receiver) {
      return NextResponse.json({ error: "DEPAY_RECEIVER_ADDRESS is missing." }, { status: 500 });
    }

    const tlPerUsd = Number(process.env.DEPAY_TL_PER_USD || "40");
    const usdAmount = Number(Math.max(1, item.price / tlPerUsd).toFixed(2));

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
        productSlug: item.slug,
        productName: item.name,
        priceTl: item.price
      },
      forward_to: `${process.env.NEXT_PUBLIC_SITE_URL || "https://gece-kehaneti.vercel.app"}/panel?odeme=basarili&urun=${encodeURIComponent(item.slug)}`
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
