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
    <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:h-[76px] md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-frost/20 bg-[#0a0118] shadow-[0_0_18px_rgba(0,215,255,.24),0_0_34px_rgba(162,35,255,.18)] transition duration-300 group-hover:shadow-[0_0_24px_rgba(0,215,255,.34),0_0_42px_rgba(162,35,255,.24)] md:h-12 md:w-12">
            <span className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(0,215,255,.35),transparent_32%),radial-gradient(circle_at_60%_58%,rgba(177,58,255,.28),transparent_42%),linear-gradient(180deg,rgba(15,3,35,.95),rgba(7,0,18,.98))]" />
            <span className="absolute inset-0 rounded-full bg-frost/12 blur-[10px]" />
            <span className="absolute left-[7px] top-[8px] h-4 w-4 rounded-full bg-frost/30 blur-[8px] md:left-[9px] md:top-[10px] md:h-5 md:w-5" />
            <Moon className="relative z-10 h-6 w-6 text-frost drop-shadow-[0_0_12px_rgba(0,215,255,.92)] md:h-7 md:w-7" strokeWidth={2.2} />
          </span>

          <span className="block font-display text-[14px] font-black tracking-[0.22em] text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.68)] md:text-[17px] md:tracking-[0.30em]">
            GECE KEHANETİ
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[14px] text-mourning transition duration-200 hover:text-bone hover:drop-shadow-[0_0_14px_rgba(255,0,184,.45)] after:absolute after:-bottom-[10px] after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-frost/60 after:to-ember after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#kategoriler" className="occult-button px-7 py-3 text-[14px] font-semibold text-white/92">
            <span className="relative z-10 animate-occult-flicker">FAL BAKTIR</span>
          </Link>
        </nav>

        <button
          aria-label="Mobil menüyü aç"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-ember/18 bg-white/[0.035] text-ember shadow-[0_0_18px_rgba(255,0,184,.12)] md:hidden"
        >
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
