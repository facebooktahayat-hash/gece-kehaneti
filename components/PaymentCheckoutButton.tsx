"use client";

import { useState } from "react";

type PaymentCheckoutButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  validateBeforePayment?: () => Promise<boolean> | boolean;
};

export function PaymentCheckoutButton({ href, className = "", children, validateBeforePayment }: PaymentCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!validateBeforePayment) return;
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const ok = await validateBeforePayment();
      if (ok) window.location.href = href;
    } finally {
      setLoading(false);
    }
  }
  return <a href={href} onClick={handleClick} aria-disabled={loading} className={`${className} ${loading ? "pointer-events-none opacity-70" : ""}`}>{loading ? "Talep hazırlanıyor..." : children}</a>;
}
