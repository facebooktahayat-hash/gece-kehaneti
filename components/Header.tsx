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
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-black/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-full border border-ember/28 bg-[#050009] shadow-neon transition group-hover:shadow-[0_0_28px_rgba(255,0,184,.62)]">
            <span className="absolute inset-0 rounded-full bg-ember/10 blur-xl transition group-hover:bg-ember/20" />
            <Moon className="relative h-7 w-7 text-ember drop-shadow-[0_0_12px_rgba(255,0,184,.95)]" />
          </span>
          <span>
            <span className="block text-[14px] font-semibold tracking-[0.32em] text-white">GECE KEHANETİ</span>
            <span className="block text-[10px] text-ember/80">Karanlık Fal ve Tarot</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] text-white/62 transition duration-200 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,0,184,.6)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#kategoriler"
            className="rounded-full border border-white/55 bg-transparent px-7 py-3 text-[12px] font-semibold text-ember shadow-[0_0_20px_rgba(255,0,184,.22)] transition duration-200 hover:border-ember hover:bg-ember/10 hover:shadow-[0_0_28px_rgba(255,0,184,.56)]"
          >
            FAL BAKTIR
          </Link>
        </nav>

        <button
          aria-label="Mobil menüyü aç"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-ember/18 bg-white/[0.035] text-ember shadow-neon md:hidden"
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