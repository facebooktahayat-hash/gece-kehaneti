"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/#kategoriler", label: "Kategoriler" },
  { href: "/panel", label: "Panelim" },
  { href: "/iletisim", label: "İletişim" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] md:h-[76px] max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full border border-frost/25 bg-[#080014] shadow-[0_0_22px_rgba(0,215,255,.28)] transition group-hover:shadow-[0_0_38px_rgba(0,215,255,.56)]">
            <span className="absolute inset-0 rounded-full bg-frost/14 blur-xl" />
            <Moon className="relative h-6 w-6 md:h-7 md:w-7 text-frost drop-shadow-[0_0_14px_rgba(0,215,255,.9)]" />
          </span>
          <div>
            <span className="block font-display text-[14px] md:text-[17px] font-black tracking-[0.22em] md:tracking-[0.30em] text-ember drop-shadow-[0_0_18px_rgba(255,0,184,.78)]">
              GECE KEHANETİ
            </span>
            <span className="text-[10px] uppercase tracking-[0.26em] text-mourning-dim">Perde Aralanınca Görenler İçin</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="relative text-[14px] text-mourning transition duration-200 hover:text-bone hover:drop-shadow-[0_0_14px_rgba(255,0,184,.65)] after:absolute after:-bottom-[10px] after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-frost/60 after:to-ember after:transition-all hover:after:w-full">
              {item.label}
            </Link>
          ))}
          <Link href="/#kategoriler" className="occult-button px-7 py-3 text-[14px] font-semibold text-white/92">
            <span className="relative z-10 animate-occult-flicker">FAL BAKTIR</span>
          </Link>
        </nav>

        <button aria-label="Mobil menüyü aç" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-ember/18 bg-white/[0.035] text-ember shadow-[0_0_18px_rgba(255,0,184,.12)] md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/96 px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="occult-panel px-4 py-3 text-white/82">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
