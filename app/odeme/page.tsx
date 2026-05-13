import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/seo";
import { OdemeClient } from "./OdemeClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Ödeme Adımı | VivaMotion AI",
  description: "VivaMotion AI kreatif üretim dosyası ödeme adımı ve panel teslim bilgilendirmesi.",
  path: "/odeme",
  noIndex: true
});

export default function PaymentPage() {
  return (
    <Suspense fallback={<section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-5xl"><div className="studio-panel p-8 text-slate-600">Ödeme ekranı hazırlanıyor...</div></div></section>}>
      <OdemeClient />
    </Suspense>
  );
}
