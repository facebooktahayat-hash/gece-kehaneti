import Link from "next/link";
import { ShieldCheck, WalletCards } from "lucide-react";
import { PaymentLogos } from "@/components/PaymentLogos";
import { gumroadLinks } from "@/lib/data";

export default function PaymentPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="occult-panel p-8 text-center md:p-12">
          <WalletCards className="mx-auto mb-5 h-14 w-14 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.35)]" />
          <p className="eyebrow-rune mb-4">Son eşik</p>
          <h1 className="font-display text-[2.25rem] font-black text-bone md:text-[3.7rem]">Ödeme</h1>
          <p className="mx-auto mt-5 max-w-2xl text-mourning">Bu ödeme ekranı, kart ve güvenli ödeme sağlayıcısı entegrasyonuna hazır olacak şekilde düzenlendi. Ödeme kuruluşu aktif edildiğinde buton gerçek ödeme adımına bağlanacak.</p>
          <div className="occult-card mx-auto mt-8 max-w-xl p-6 text-left"><div className="flex items-center gap-3 text-bone"><ShieldCheck className="h-6 w-6 text-[#c9a6df]" /><span className="font-display font-semibold">Güvenli ödeme altyapısına uygun</span></div><p className="mt-3 text-sm leading-6 text-mourning">Ödeme sağlayıcısı aktif edildiğinde kart, banka kartı ve güvenli ödeme adımı bu ekrana bağlanacak.</p></div>
          <div className="mx-auto mt-6 max-w-xl text-left"><PaymentLogos compact /></div>
          <a href={gumroadLinks.kehanet} target="_blank" rel="noopener noreferrer" className="occult-button mt-8 px-8 py-4 font-semibold text-white"><span className="relative z-10">Gumroad ile Ödeme Yap</span></a>
          <div className="mt-6"><Link href="/" className="text-sm text-ember transition hover:text-[#ff6bd2]">Ana sayfaya dön</Link></div>
        </div>
      </div>
    </section>
  );
}
