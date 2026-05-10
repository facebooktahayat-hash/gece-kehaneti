import { Bitcoin, ShieldCheck, WalletCards } from "lucide-react";
import { PaymentLogos } from "@/components/PaymentLogos";
import { DePayPaymentButton } from "@/components/DePayPaymentButton";
import { getPackage } from "@/lib/data";

export default function PaymentPage({ searchParams }: { searchParams?: { paket?: string } }) {
  const item = getPackage(searchParams?.paket || "kehanet") || getPackage("kehanet");

  if (!item) {
    return null;
  }

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="occult-panel p-8 text-center md:p-12">
          <WalletCards className="mx-auto mb-5 h-14 w-14 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.35)]" />
          <p className="eyebrow-rune mb-4">Kripto ödeme eşiği</p>
          <h1 className="font-display text-[2.25rem] font-black text-bone md:text-[3.7rem]">DePay Kripto Ödeme</h1>
          <p className="mx-auto mt-5 max-w-2xl text-mourning">
            Seçilen ürün için ödeme DePay widget üzerinden açılır. Fiyat dinamik olarak site tarafından DePay'e gönderilir.
          </p>

          <div className="occult-card mx-auto mt-8 max-w-xl p-6 text-left">
            <div className="flex items-center gap-3 text-bone">
              <ShieldCheck className="h-6 w-6 text-[#c9a6df]" />
              <span className="font-display font-semibold">{item.name}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-mourning">
              Ürün tutarı: <strong>{item.price.toLocaleString("tr-TR")} TL</strong>. DePay ekranında USDC karşılığı hesaplanır.
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-xl text-left"><PaymentLogos compact /></div>

          <DePayPaymentButton
            productSlug={item.slug}
            productName={item.name}
            priceTl={item.price}
            className="occult-button mx-auto mt-8 px-8 py-4 font-semibold text-white"
          >
            <span className="inline-flex items-center gap-2"><Bitcoin className="h-4 w-4" /> DePay ile Kripto Öde</span>
          </DePayPaymentButton>

          <p className="mx-auto mt-6 max-w-xl text-xs leading-6 text-mourning-dim">
            Ödeme penceresi açılmıyorsa DePay entegrasyonunda endpoint, public key ve Vercel environment ayarlarının tamamlandığını kontrol edin.
          </p>
        </div>
      </div>
    </section>
  );
}
