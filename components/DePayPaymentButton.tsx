"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";

type LegacyCreditButtonProps = {
  productSlug?: string;
  productName?: string;
  priceTl?: number;
  className?: string;
  children?: React.ReactNode;
  validateBeforePayment?: () => boolean | Promise<boolean>;
  getPayload?: () => Record<string, unknown>;
};

export function DePayPaymentButton({
  productSlug,
  priceTl,
  className = "",
  children,
  validateBeforePayment
}: LegacyCreditButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function startCreditFlow() {
    setLoading(true);
    setMessage("");

    try {
      if (validateBeforePayment) {
        const canContinue = await validateBeforePayment();
        if (!canContinue) return;
      }
      const params = new URLSearchParams();
      if (productSlug) params.set("paket", productSlug);
      if (priceTl) params.set("kredi", String(priceTl));
      router.push(`/odeme${params.toString() ? `?${params.toString()}` : ""}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Yorum talebi başlatılamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <button type="button" onClick={startCreditFlow} disabled={loading} className={`${className} disabled:cursor-not-allowed disabled:opacity-70`}>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
          {children || "Gece Kredisi ile Başlat"}
        </span>
      </button>
      {message && <p className="text-xs leading-5 text-mourning">{message}</p>}
    </div>
  );
}
