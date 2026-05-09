import Link from "next/link";
import { ShieldCheck, WalletCards } from "lucide-react";

export default function PaymentPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="occult-panel p-8 text-center md:p-12">
          <WalletCards className="mx-auto mb-5 h-14 w-14 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.35)]" />
          <p className="eyebrow-rune mb-4">Son eşik</p>
          <h1 className="font-display text-[2.7rem] font-black text-[#f4ebfb] md:text-[4rem]">Ödeme</h1>
          <p className="mx-auto mt-5 max-w-2xl text-whisper">Bu ilk sürümde ödeme ekranı hazırlandı. DePay kripto ödeme linkin geldiğinde aşağıdaki buton gerçek ödeme linkine bağlanacak.</p>
          <div className="occult-card mx-auto mt-8 max-w-xl p-6 text-left"><div className="flex items-center gap-3 text-[#f3ebfa]"><ShieldCheck className="h-6 w-6 text-ember" /><span className="font-display font-semibold">Güvenli ödeme altyapısına uygun</span></div><p className="mt-3 text-sm leading-6 text-whisper">DePay ile USDT/USDC gibi kripto varlıklarla ödeme almak için Payment Link veya Button entegrasyonu eklenebilir.</p></div>
          <a href="#" className="occult-button mt-8 px-8 py-4 font-semibold text-white"><span className="relative z-10">Kripto ile Öde</span></a>
          <div className="mt-6"><Link href="/" className="text-sm text-ember transition hover:text-[#ff6bd2]">Ana sayfaya dön</Link></div>
        </div>
      </div>
    </section>
  );
}
