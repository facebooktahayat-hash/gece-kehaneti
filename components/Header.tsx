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
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-full border border-frost/25 bg-[#080014] shadow-cyan transition group-hover:shadow-[0_0_34px_rgba(0,215,255,.55)]">
            <span className="absolute inset-0 rounded-full bg-frost/14 blur-xl" />
            <Moon className="relative h-7 w-7 text-frost drop-shadow-[0_0_14px_rgba(0,215,255,.9)]" />
          </span>
          <span className="block font-display text-[17px] font-black tracking-[0.28em] text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.75)]">
            GECE KEHANETİ
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] text-white/68 transition duration-200 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,0,184,.65)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#kategoriler"
            className="rounded-full border border-violet/65 bg-violet/10 px-7 py-3 text-[14px] font-semibold text-white/86 shadow-[0_0_18px_rgba(255,0,184,.18)] transition duration-200 hover:border-ember hover:bg-ember/12 hover:text-white hover:shadow-[0_0_30px_rgba(255,0,184,.55)]"
          >
            FAL BAKTIR
          </Link>
        </nav>

        <button
          aria-label="Mobil menüyü aç"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-ember/18 bg-white/[0.035] text-ember shadow-pink md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/96 px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white/80">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}