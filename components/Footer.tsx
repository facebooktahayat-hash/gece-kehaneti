import Link from "next/link";
import { Moon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_.8fr_.8fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Moon className="h-7 w-7 text-frost drop-shadow-[0_0_12px_rgba(0,215,255,.7)]" />
            <span className="font-display text-sm font-bold tracking-[0.30em] text-[#c9a6df] drop-shadow-[0_0_12px_rgba(124,28,255,.3)]">GECE KEHANETİ</span>
          </div>
          <p className="max-w-xl text-sm leading-7 text-mourning">Bu hizmet eğlence, sezgisel yorum ve kişisel farkındalık amaçlıdır. Kesin gelecek garantisi, sağlık, hukuk veya yatırım danışmanlığı sunmaz.</p>
        </div>
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.18em] text-bone">Sayfalar</h3>
          <div className="grid gap-2 text-sm text-mourning">
            <Link href="/hakkimizda" className="transition hover:text-bone">Hakkımızda</Link>
            <Link href="/iletisim" className="transition hover:text-bone">İletişim</Link>
            <Link href="/panel" className="transition hover:text-bone">Panelim</Link>
            <Link href="/admin" className="transition hover:text-bone">Yönetici Paneli</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display text-sm font-semibold tracking-[0.18em] text-bone">Hukuki</h3>
          <div className="grid gap-2 text-sm text-mourning">
            <Link href="/gizlilik" className="transition hover:text-bone">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="transition hover:text-bone">Kullanım Şartları</Link>
            <Link href="/iade" className="transition hover:text-bone">İade ve İptal</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-mourning-dim">© 2026 Gece Kehaneti. Tüm hakları saklıdır. In umbra veritas.</div>
    </footer>
  );
}
