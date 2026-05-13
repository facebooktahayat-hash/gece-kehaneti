"use client";

import { PaymentCheckoutButton } from "@/components/PaymentCheckoutButton";
import { buildPaymentCheckoutUrl } from "@/lib/data";

type DePayPaymentButtonProps = {
  amount: number;
  orderId?: string;
  customerEmail?: string;
  customerName?: string;
  className?: string;
  children?: React.ReactNode;
  validateBeforePayment?: () => Promise<boolean> | boolean;
};

function buildPaymentUrl(amount: number, orderId?: string, customerEmail?: string, customerName?: string) {
  return buildPaymentCheckoutUrl(amount, { orderId, email: customerEmail, customerName, amount });
}

export function DePayPaymentButton({ amount, orderId, customerEmail, customerName, className = "", children, validateBeforePayment }: DePayPaymentButtonProps) {
  const href = buildPaymentUrl(amount, orderId, customerEmail, customerName);
  return <PaymentCheckoutButton href={href} className={className} validateBeforePayment={validateBeforePayment}>{children || `${amount.toLocaleString("tr-TR")} TL Öde`}</PaymentCheckoutButton>;
}
