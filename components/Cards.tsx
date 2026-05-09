import Link from "next/link";
import { Category, Package } from "@/lib/data";
import { ArrowRight, Clock3, Gem, Star } from "lucide-react";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <Link href={`/kategori/${category.slug}`} className="occult-card group min-h-[260px] md:min-h-[288px] p-7">
      <div className="absolute right-8 top-6 h-28 w-28 rounded-full bg-ember/12 blur-3xl opacity-70 transition duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet/0 via-ember/75 to-violet/0 opacity-60 transition group-hover:opacity-100" />

      <div className="mb-7 text-3xl text-[#b98ad8] drop-shadow-[0_0_14px_rgba(124,28,255,.36)]"><Icon className="h-8 w-8" /></div>
      <h3 className="font-display text-[1.55rem] md:text-[1.9rem] font-bold leading-tight text-bone drop-shadow-[0_0_12px_rgba(255,255,255,.08)]">{category.title}</h3>
      <p className="mt-2 text-sm italic tracking-[0.05em] text-mourning">{category.intro}</p>
      <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-mourning">{category.description}</p>
      <div className="mt-7 occult-link">Kapıyı Arala <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
    </Link>
  );
}

export function PackageCard({ item }: { item: Package }) {
  return (
    <Link href={`/urun/${item.slug}`} className="occult-card group flex h-full flex-col p-6">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ember/12 blur-3xl opacity-70 transition group-hover:opacity-100" />
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-ember/20 bg-ember/10 px-3 py-1 text-xs text-[#c9a6df]">{item.level}</span>
        <Gem className="h-5 w-5 text-gold drop-shadow-[0_0_10px_rgba(247,200,107,.35)]" />
      </div>
      <h3 className="font-display text-[1.55rem] md:text-[1.9rem] font-semibold leading-tight text-bone">{item.name}</h3>
      <p className="mt-3 min-h-14 text-sm leading-6 text-mourning">{item.description}</p>
      <div className="my-5 font-display text-[1.85rem] md:text-3xl font-bold text-[#c9a6df] drop-shadow-[0_0_10px_rgba(124,28,255,.25)]">{item.price} TL</div>
      <div className="mb-5 flex items-center gap-2 text-sm text-mourning"><Clock3 className="h-4 w-4 text-[#c9a6df]" /> {item.delivery}</div>
      <ul className="mb-6 grid gap-2 text-sm text-mourning">{item.includes.map((inc) => (<li key={inc} className="flex items-center gap-2"><Star className="h-3.5 w-3.5 text-gold" /> {inc}</li>))}</ul>
      <span className="occult-button mt-auto px-5 py-3 text-center text-sm font-semibold text-bone"><span className="relative z-10">Şimdi Fal Baktır</span></span>
    </Link>
  );
}
