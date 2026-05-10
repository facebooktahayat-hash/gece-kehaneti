import Link from "next/link";
import { Category, Package } from "@/lib/data";
import { ArrowRight, Clock3, Gem, Star } from "lucide-react";

const categoryIconStyles: Record<string, { icon: string; shell: string; glow: string }> = {
  "tarot": {
    icon: "text-fuchsia-300 drop-shadow-[0_0_12px_rgba(232,121,249,.75)]",
    shell: "border-fuchsia-500/30 bg-fuchsia-500/10",
    glow: "bg-fuchsia-500/25"
  },
  "kahve-fali": {
    icon: "text-cyan-300 drop-shadow-[0_0_12px_rgba(103,232,249,.78)]",
    shell: "border-cyan-500/30 bg-cyan-500/10",
    glow: "bg-cyan-500/25"
  },
  "ask-fali": {
    icon: "text-rose-300 drop-shadow-[0_0_12px_rgba(253,164,175,.78)]",
    shell: "border-rose-500/30 bg-rose-500/10",
    glow: "bg-rose-500/25"
  },
  "gece-kehaneti": {
    icon: "text-violet-300 drop-shadow-[0_0_14px_rgba(196,181,253,.82)]",
    shell: "border-violet-500/30 bg-violet-500/10",
    glow: "bg-violet-500/25"
  },
  "astroloji": {
    icon: "text-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,.72)]",
    shell: "border-amber-500/30 bg-amber-500/10",
    glow: "bg-amber-500/25"
  },
  "ruya-yorumu": {
    icon: "text-indigo-300 drop-shadow-[0_0_12px_rgba(165,180,252,.76)]",
    shell: "border-indigo-500/30 bg-indigo-500/10",
    glow: "bg-indigo-500/25"
  },
  "numeroloji": {
    icon: "text-emerald-300 drop-shadow-[0_0_12px_rgba(110,231,183,.72)]",
    shell: "border-emerald-500/30 bg-emerald-500/10",
    glow: "bg-emerald-500/25"
  },
  "enerji-bagi": {
    icon: "text-orange-300 drop-shadow-[0_0_12px_rgba(253,186,116,.76)]",
    shell: "border-orange-500/30 bg-orange-500/10",
    glow: "bg-orange-500/25"
  },
  "kader-acilimi": {
    icon: "text-sky-300 drop-shadow-[0_0_12px_rgba(125,211,252,.76)]",
    shell: "border-sky-500/30 bg-sky-500/10",
    glow: "bg-sky-500/25"
  }
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;
  const style = categoryIconStyles[category.slug] || categoryIconStyles["tarot"];

  return (
    <Link href={`/kategori/${category.slug}`} className="occult-card group min-h-[260px] p-7 md:min-h-[288px]">
      <div className={`absolute right-8 top-6 h-28 w-28 rounded-full ${style.glow} blur-3xl opacity-60 transition duration-300 group-hover:opacity-100`} />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet/0 via-ember/75 to-violet/0 opacity-60 transition group-hover:opacity-100" />

      <div className={`category-icon-shell mb-7 ${style.shell}`}>
        <Icon className={`h-7 w-7 ${style.icon}`} />
      </div>

      <h3 className="font-display text-[1.55rem] font-bold leading-tight text-bone drop-shadow-[0_0_12px_rgba(255,255,255,.08)] md:text-[1.9rem]">
        {category.title}
      </h3>
      <p className="mt-2 text-sm italic tracking-[0.05em] text-mourning">{category.intro}</p>
      <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-mourning">{category.description}</p>
      <div className="mt-7 occult-link">
        Kapıyı Arala <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

export function PackageCard({ item }: { item: Package }) {
  const isLegendary = item.slug === "kehanet";
  const isPopular = item.level === "En çok seçilen" || item.slug.includes("derin-yorum");
  const cardClassName = `occult-card group flex h-full flex-col p-6 ${isLegendary ? "legendary-product-card" : ""}`;
  const cardContent = (
    <>
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-70 transition group-hover:opacity-100 ${isLegendary ? "bg-ember/28" : "bg-ember/12"}`} />
      {isLegendary && (
        <>
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-ember to-transparent shadow-[0_0_18px_rgba(255,0,184,.55)]" />
          <div className="pointer-events-none absolute left-6 top-6 text-[9px] font-black uppercase tracking-[0.35em] text-gold/80 drop-shadow-[0_0_12px_rgba(247,200,107,.28)]">En Efsane Ürün</div>
        </>
      )}
      {!isLegendary && isPopular && (
        <div className="mb-4 inline-flex w-fit rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-gold shadow-[0_0_14px_rgba(247,200,107,.12)]">
          En Çok Tercih Edilen
        </div>
      )}
      <div className={`mb-4 flex items-center justify-between ${isLegendary ? "mt-7" : ""} ${!isLegendary && isPopular ? "" : ""}`}>
        <span className={`rounded-full border px-3 py-1 text-xs ${isLegendary ? "border-gold/35 bg-gold/10 text-gold" : "border-ember/20 bg-ember/10 text-[#c9a6df]"}`}>{item.level}</span>
        <Gem className={`h-5 w-5 drop-shadow-[0_0_10px_rgba(247,200,107,.35)] ${isLegendary ? "text-ember" : "text-gold"}`} />
      </div>
      <h3 className={`font-display text-[1.55rem] font-semibold leading-tight text-bone md:text-[1.9rem] ${isLegendary ? "drop-shadow-[0_0_14px_rgba(255,0,184,.32)]" : ""}`}>{item.name}</h3>
      <p className="mt-3 min-h-14 text-sm leading-6 text-mourning">{item.description}</p>
      <div className={`my-5 font-display text-[1.85rem] font-bold drop-shadow-[0_0_10px_rgba(124,28,255,.25)] md:text-3xl ${isLegendary ? "text-ember" : "text-[#c9a6df]"}`}>{item.price.toLocaleString("tr-TR")} TL</div>
      <div className="mb-5 flex items-center gap-2 text-sm text-mourning">
        <Clock3 className="h-4 w-4 text-[#c9a6df]" /> {item.delivery}
      </div>
      <ul className="mb-6 grid gap-2 text-sm text-mourning">
        {item.includes.map((inc) => (
          <li key={inc} className="flex items-center gap-2">
            <Star className="h-3.5 w-3.5 text-gold" /> {inc}
          </li>
        ))}
      </ul>
      <span className="occult-button mt-auto px-5 py-3 text-center text-sm font-semibold text-bone">
        <span className="relative z-10">{isLegendary ? "Kehanet Formuna Geç" : "Önce Formu Doldur"}</span>
      </span>
    </>
  );

  if (isLegendary) {
    return (
      <Link href={`/urun/${item.slug}`} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return (
    <Link href={`/urun/${item.slug}`} className={cardClassName}>
      {cardContent}
    </Link>
  );
}
