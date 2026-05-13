"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/paketler", label: "Paketler" },
  { href: "/ai-medya-uretimi", label: "AI Medya" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/urun/ultimate-ai-kampanya", label: "Premium" },
  { href: "/panel", label: "Panelim" },
  { href: "/iletisim", label: "İletişim" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/86 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:h-[76px] md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-cyan-200 bg-white shadow-[0_12px_34px_rgba(14,165,233,.20)] transition duration-300 group-hover:scale-105 md:h-12 md:w-12">
            <span className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,96,165,.38),transparent_30%),radial-gradient(circle_at_72%_68%,rgba(45,212,191,.42),transparent_42%),linear-gradient(135deg,#ffffff,#eafaff)]" />
            <Sparkles className="relative z-10 h-6 w-6 text-cyan-600 drop-shadow-[0_0_10px_rgba(14,165,233,.45)] md:h-7 md:w-7" strokeWidth={2.2} />
          </span>
          <span className="block font-display text-[14px] font-black tracking-[0.16em] text-slate-950 md:text-[17px] md:tracking-[0.22em]">VIVAMOTION AI</span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {nav.map((item) => <Link key={item.href} href={item.href} className="relative text-[14px] font-medium text-slate-600 transition duration-200 hover:text-cyan-700 after:absolute after:-bottom-[10px] after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-pink-400 after:transition-all hover:after:w-full">{item.label}</Link>)}
          <Link href="/paketler" className="studio-button px-7 py-3 text-[14px] font-semibold text-white"><span className="relative z-10">ÜRETİME BAŞLA</span></Link>
        </nav>
        <button aria-label="Mobil menüyü aç" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-200 bg-white text-cyan-700 shadow-sm md:hidden">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <div className="border-t border-sky-100 bg-white/96 px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="studio-panel px-4 py-3 text-slate-700">{item.label}</Link>)}
            <Link href="/paketler" onClick={() => setOpen(false)} className="studio-button px-4 py-3 text-center text-white"><span className="relative z-10">Üretime Başla</span></Link>
          </div>
        </div>
      )}
    </header>
  );
}
