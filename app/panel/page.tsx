import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export default function PanelPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="occult-panel p-8 md:p-12">
          <LockKeyhole className="mb-5 h-12 w-12 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.35)]" />
          <p className="eyebrow-rune mb-4">Karanlık panel</p>
          <h1 className="font-display text-[2.25rem] font-black text-bone md:text-[3.7rem]">Panelim</h1>
          <p className="mt-5 max-w-2xl text-mourning">Gerçek kullanıcı girişi Supabase bağlandığında aktif edilecek. Şimdilik panel giriş ekranı gösteriliyor.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2"><input placeholder="E-posta" className="occult-input" /><input placeholder="Şifre" type="password" className="occult-input" /></div>
          <button className="occult-button mt-6 px-8 py-4 font-semibold text-white"><span className="relative z-10">Giriş Yap</span></button>
          <Link href="/" className="ml-5 text-sm text-ember transition hover:text-[#ff6bd2]">Ana sayfaya dön</Link>
        </div>
      </div>
    </section>
  );
}
