import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PaymentLogos } from "@/components/PaymentLogos";

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.25fr_.7fr_.75fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className="h-7 w-7 text-cyan-600" />
            <span className="font-display text-sm font-bold tracking-[0.22em] text-slate-950">VIVAMOTION AI</span>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600">VivaMotion AI; ürün videosu, reklam görseli, fotoğraf canlandırma, avatar video brief’i ve sosyal medya içerik paketleri için OpenAI destekli kreatif üretim stüdyosudur.</p>
          <p className="mt-3 max-w-xl text-xs leading-6 text-slate-500">OpenAI adı yalnızca kullanılan AI altyapısını açıklamak için geçer; VivaMotion AI, OpenAI&apos;nin resmi ürünü, ortağı veya temsilcisi değildir.</p>
        </div>
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.14em] text-slate-950">Sayfalar</h3>
          <div className="grid gap-2 text-sm text-slate-600">
            <Link href="/ai-medya-uretimi" className="transition hover:text-cyan-700">AI Medya Üretimi</Link>
            <Link href="/paketler" className="transition hover:text-cyan-700">Paketler</Link>
            <Link href="/hakkimizda" className="transition hover:text-cyan-700">Hakkımızda</Link>
            <Link href="/iletisim" className="transition hover:text-cyan-700">İletişim</Link>
            <Link href="/panel" className="transition hover:text-cyan-700">Panelim</Link>
            <Link href="/urun/ultimate-ai-kampanya" className="transition hover:text-cyan-700">Ultimate AI Kampanya</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.14em] text-slate-950">Hukuki</h3>
          <div className="grid gap-2 text-sm text-slate-600">
            <Link href="/gizlilik" className="transition hover:text-cyan-700">Gizlilik Politikası</Link>
            <Link href="/mesafeli-satis-sozlesmesi" className="transition hover:text-cyan-700">Mesafeli Satış Sözleşmesi</Link>
            <Link href="/on-bilgilendirme-formu" className="transition hover:text-cyan-700">Ön Bilgilendirme Formu</Link>
            <Link href="/teslimat-iade-sartlari" className="transition hover:text-cyan-700">Teslimat ve İade Şartları</Link>
            <Link href="/kullanim-sartlari" className="transition hover:text-cyan-700">Kullanım Şartları</Link>
            <Link href="/iade" className="transition hover:text-cyan-700">İade ve İptal</Link>
            <Link href="/kvkk-aydinlatma-metni" className="transition hover:text-cyan-700">KVKK Aydınlatma Metni</Link>
            <Link href="/cerez-politikasi" className="transition hover:text-cyan-700">Çerez Politikası</Link>
          </div>
        </div>
        <div className="lg:-mt-1 lg:self-start"><PaymentLogos compact /></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-sky-100 pt-6 text-sm text-slate-500">© 2026 VivaMotion AI. Tüm hakları saklıdır. Kreatif üretim dosyaları dijital teslim edilir.</div>
    </footer>
  );
}
