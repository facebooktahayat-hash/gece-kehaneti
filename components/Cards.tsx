import Link from "next/link";
import { Category, Package } from "@/lib/data";
import { ArrowRight, Clock3, Gem, Star } from "lucide-react";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group relative min-h-[245px] overflow-hidden rounded-2xl border border-violet/22 bg-[#080010]/78 p-7 shadow-[0_0_20px_rgba(124,28,255,.12)] transition duration-200 hover:-translate-y-0.5 hover:border-ember/38 hover:shadow-[0_0_34px_rgba(255,0,184,.28)]"
    >
      <div className="absolute right-8 top-6 h-28 w-28 rounded-full bg-ember/11 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet/0 via-ember/75 to-violet/0 opacity-0 transition group-hover:opacity-100" />

      <div className="mb-8 text-3xl text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.65)]">
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="font-display text-[1.55rem] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,.10)]">
        {category.title}
      </h3>
      <p className="mt-2 text-sm italic text-ember/80">{category.intro}</p>
      <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-white/58">{category.description}</p>

      <div className="mt-7 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 transition group-hover:text-ember">
        Kapıyı Arala <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function PackageCard({ item }: { item: Package }) {
  return (
    <Link
      href={`/urun/${item.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-violet/20 bg-[#080010]/78 p-6 transition duration-200 hover:-translate-y-1 hover:border-ember/40 hover:shadow-[0_0_30px_rgba(255,0,184,.30)]"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ember/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-ember/20 bg-ember/10 px-3 py-1 text-xs text-ember">{item.level}</span>
        <Gem className="h-5 w-5 text-gold" />
      </div>
      <h3 className="font-display text-2xl font-semibold text-white">{item.name}</h3>
      <p className="mt-3 min-h-14 text-sm leading-6 text-white/60">{item.description}</p>
      <div className="my-5 text-3xl font-bold text-white">{item.price} TL</div>
      <div className="mb-5 flex items-center gap-2 text-sm text-white/60">
        <Clock3 className="h-4 w-4 text-ember" /> {item.delivery}
      </div>
      <ul className="mb-6 grid gap-2 text-sm text-white/60">
        {item.includes.map((inc) => (
          <li key={inc} className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 text-gold" /> {inc}
          </li>
        ))}
      </ul>
      <span className="mt-auto rounded-full bg-gradient-to-r from-violet to-ember px-5 py-3 text-center text-sm font-semibold text-white shadow-pink transition group-hover:shadow-[0_0_28px_rgba(255,0,184,.45)]">
        Şimdi Fal Baktır
      </span>
    </Link>
  );
}