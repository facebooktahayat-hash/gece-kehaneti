"use client";

import { useState } from "react";
import { Bitcoin, Loader2 } from "lucide-react";
import { depayIntegrationId } from "@/lib/data";

declare global {
  interface Window {
    DePayWidgets?: {
      Payment: (configuration: Record<string, unknown>) => void;
    };
  }
}

const DEPAY_WIDGET_SCRIPT_ID = "depay-widget-script";
const DEPAY_WIDGET_SCRIPT_SRC = "https://integrate.depay.com/widgets/v13.js";

type DePayPaymentButtonProps = {
  productSlug: string;
  productName: string;
  priceTl: number;
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
      existingScript.addEventListener("error", () => reject(new Error("DePay widget yüklenemedi.")), { once: true });
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
    script.onerror = () => reject(new Error("DePay widget yüklenemedi."));
    document.body.appendChild(script);
  });
}

export function DePayPaymentButton({
  productSlug,
  productName,
  priceTl,
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
        if (!canContinue) {
          return;
        }
      }

      await loadDePayWidget();

      if (!window.DePayWidgets?.Payment) {
        throw new Error("DePay ödeme penceresi açılamadı.");
      }

      const extraPayload = getPayload ? getPayload() : {};

      window.DePayWidgets.Payment({
        integration: depayIntegrationId,
        title: "Gece Kehaneti — Polygon USDC Ödemesi",
        style: {
          colors: {
            primary: "#c71967",
            text: "#f8eaff",
            buttonText: "#ffffff",
            icons: "#d9c4ff"
          }
        },
        payload: {
          productSlug,
          productName,
          priceTl,
          source: "gece-kehaneti",
          ...extraPayload
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
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bitcoin className="h-4 w-4" />}
          {children || "DePay ile Kripto Öde"}
        </span>
      </button>
      {error && <p className="text-xs leading-5 text-ember">{error}</p>}
    </div>
  );
}
