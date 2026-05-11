"use client";

import { ExternalLink, WalletCards } from "lucide-react";

type GumroadCheckoutButtonProps = {
  href: string;
  className?: string;
  children?: React.ReactNode;
  validateBeforePayment?: () => boolean | Promise<boolean>;
};

export function GumroadCheckoutButton({ href, className = "", children, validateBeforePayment }: GumroadCheckoutButtonProps) {
  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!validateBeforePayment) return;

    const canContinue = await validateBeforePayment();
    if (!canContinue) {
      event.preventDefault();
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        <WalletCards className="h-4 w-4" />
        {children || "Gumroad'da Gece Kredisi Al"}
        <ExternalLink className="h-4 w-4" />
      </span>
    </a>
  );
}
