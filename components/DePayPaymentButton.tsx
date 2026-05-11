"use client";

import { useState } from "react";
import { Loader2, WalletCards } from "lucide-react";
import { depayEndpointPath, depayIntegrationId } from "@/lib/data";

declare global {
  interface Window {
    DePayWidgets?: {
      Payment: (configuration: Record<string, unknown>) => void;
    };
  }
}

const DEPAY_WIDGET_SCRIPT_ID = "depay-widget-script";
const DEPAY_WIDGET_SCRIPT_SRC = "https://integrate.depay.com/widgets/v13.js";
const POLYGON_USDC_TOKEN = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

type DePayPaymentButtonProps = {
  productSlug?: string;
  productName?: string;
  priceTl?: number;
  creditAmount?: number;
  orderId?: string;
  customerEmail?: string;
  customerName?: string;
  className?: string;
  children?: React.ReactNode;
  validateBeforePayment?: () => boolean | Promise<boolean>;
  getPayload?: () => Record<string, unknown>;
};

function loadDePayWidget() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Tarayıcı ortamı bulunamadı."));
  }

  if (window.DePayWidgets?.Payment) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(DEPAY_WIDGET_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript) {
    return new Promise<void>((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Ödeme penceresi yüklenemedi.")), { once: true });
      if (window.DePayWidgets?.Payment) resolve();
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = DEPAY_WIDGET_SCRIPT_ID;
    script.src = DEPAY_WIDGET_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Ödeme penceresi yüklenemedi."));
    document.body.appendChild(script);
  });
}

async function loadPaymentConfiguration(payload: Record<string, unknown>) {
  const response = await fetch(depayEndpointPath, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const configuration = (await response.json().catch(() => ({}))) as Record<string, unknown>;

  if (!response.ok) {
    const message = typeof configuration.error === "string" ? configuration.error : "Ödeme konfigürasyonu alınamadı.";
    throw new Error(message);
  }

  return configuration;
}

async function reportWidgetEvent(status: "success" | "failed" | "pending", payload: Record<string, unknown>, eventData?: unknown) {
  try {
    await fetch("/api/depay/widget-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        successful: status === "success",
        payload,
        payment: {
          blockchain: "polygon",
          token: "USDC"
        },
        transaction: eventData || {}
      })
    });
  } catch {
    // Müşteri akışını bozmamak için bildirim hatası kullanıcıya gösterilmez.
  }
}

export function DePayPaymentButton({
  productSlug,
  productName = "Gece Kredisi",
  priceTl,
  creditAmount,
  orderId,
  customerEmail,
  customerName,
  className = "",
  children,
  validateBeforePayment,
  getPayload
}: DePayPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function openPayment() {
    setLoading(true);
    setError("");

    try {
      if (validateBeforePayment) {
        const canContinue = await validateBeforePayment();
        if (!canContinue) return;
      }

      const extraPayload = getPayload ? getPayload() : {};
      const amount = creditAmount || priceTl || 500;
      const basePayload = {
        source: "gece-kehaneti",
        mode: "gece-kredisi",
        productSlug,
        productName,
        priceTl: priceTl || amount,
        creditAmount: amount,
        orderId,
        customerEmail,
        customerName,
        blockchain: "polygon",
        token: "USDC",
        ...extraPayload
      };

      const dynamicConfiguration = await loadPaymentConfiguration(basePayload);
      await loadDePayWidget();

      if (!window.DePayWidgets?.Payment) {
        throw new Error("Ödeme penceresi açılamadı.");
      }

      const configurationPayload = dynamicConfiguration.payload && typeof dynamicConfiguration.payload === "object"
        ? (dynamicConfiguration.payload as Record<string, unknown>)
        : {};
      const finalPayload = {
        ...basePayload,
        ...configurationPayload
      };
      let successReported = false;
      let failureReported = false;

      const reportSuccessOnce = async (eventData?: unknown) => {
        if (successReported) return;
        successReported = true;
        await reportWidgetEvent("success", finalPayload, eventData);
      };

      const reportFailureOnce = async (eventData?: unknown) => {
        if (failureReported || successReported) return;
        failureReported = true;
        await reportWidgetEvent("failed", finalPayload, eventData);
      };

      window.DePayWidgets.Payment({
        integration: depayIntegrationId,
        ...dynamicConfiguration,
        payload: finalPayload,
        whitelist: {
          polygon: [POLYGON_USDC_TOKEN.toLowerCase(), POLYGON_USDC_TOKEN]
        },
        currency: "USD",
        title: `Gece Kehaneti — ${amount.toLocaleString("tr-TR")} Gece Kredisi`,
        succeeded: async (transaction: unknown) => {
          await reportSuccessOnce(transaction);
        },
        validated: async (successful: unknown) => {
          if (successful === true) {
            await reportSuccessOnce({ validated: true });
          } else if (successful === false) {
            await reportFailureOnce({ validated: false });
          }
        },
        failed: async (transaction: unknown) => {
          await reportFailureOnce(transaction);
        },
        style: {
          colors: {
            primary: "#c71967",
            text: "#f8eaff",
            buttonText: "#ffffff",
            icons: "#d9c4ff"
          }
        }
      });
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : "Ödeme başlatılamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button type="button" onClick={openPayment} disabled={loading} className={`${className} disabled:cursor-not-allowed disabled:opacity-70`}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <WalletCards className="h-4 w-4" />}
          {children || "Gece Kredisi Al"}
        </span>
      </button>
      {error && <p className="text-xs leading-5 text-ember">{error}</p>}
    </div>
  );
}
