"use client";

import { GumroadCheckoutButton } from "@/components/GumroadCheckoutButton";
import { getGumroadCreditLink } from "@/lib/data";

type LegacyDePayPaymentButtonProps = {
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

function buildGumroadFallbackUrl(creditAmount: number, orderId?: string, customerEmail?: string, customerName?: string) {
  const base = getGumroadCreditLink(creditAmount);
  const params = new URLSearchParams();
  if (orderId) params.set("talep", orderId);
  if (customerEmail) params.set("eposta", customerEmail);
  if (customerName) params.set("isim", customerName);
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

export function DePayPaymentButton({
  priceTl,
  creditAmount,
  orderId,
  customerEmail,
  customerName,
  className = "",
  children,
  validateBeforePayment
}: LegacyDePayPaymentButtonProps) {
  const amount = creditAmount || priceTl || 500;
  const href = buildGumroadFallbackUrl(amount, orderId, customerEmail, customerName);

  return (
    <GumroadCheckoutButton
      href={href}
      className={className}
      validateBeforePayment={validateBeforePayment}
    >
      {children || `${amount.toLocaleString("tr-TR")} Gece Kredisi Al`}
    </GumroadCheckoutButton>
  );
}
