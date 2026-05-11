import { Suspense } from "react";
import { OdemeClient } from "./OdemeClient";

export const dynamic = "force-static";

export default function PaymentPage() {
  return (
    <Suspense fallback={<section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-6xl occult-panel p-7 text-mourning">Gece Kredisi ekranı hazırlanıyor...</div></section>}>
      <OdemeClient />
    </Suspense>
  );
}
