"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";

const nav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/#kategoriler", label: "Kategoriler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/panel", label: "Panelim" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-frost/20 bg-[#040009] shadow-frost">
            <span className="absolute inset-0 rounded-full bg-frost/8 blur-lg" />
            <Moon className="relative h-5 w-5 text-frost drop-shadow-[0_0_10px_rgba(255,0,184,.95)]" />
          </span>
          <span>
            <span className="block text-[13px] font-semibold tracking-[0.30em] text-white">GECE KEHANETİ</span>
            <span className="block text-[10px] text-frost/70">Karanlık Fal ve Tarot</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[11px] text-white/62 transition hover:text-frost">
              {item.label}
            </Link>
          ))}
          <Link
            href="/#kategoriler"
            className="rounded-full border border-frost/24 bg-frost/10 px-5 py-2 text-[11px] font-semibold text-frost shadow-frost transition hover:bg-frost/18"
          >
            FAL BAKTIR
          </Link>
        </nav>

        <button
          aria-label="Mobil menüyü aç"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-frost/18 bg-white/[0.035] text-frost shadow-frost md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/96 px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white/80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}