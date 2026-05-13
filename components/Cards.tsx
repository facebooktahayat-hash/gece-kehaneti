import Link from "next/link";
import { Category, Package, formatPrice } from "@/lib/data";
import { ArrowRight, CheckCircle2, Clock3, Star } from "lucide-react";

const categoryIconStyles: Record<string, { icon: string; shell: string; glow: string }> = {
  "ai-urun-videosu": { icon: "text-pink-500", shell: "border-pink-200 bg-pink-50", glow: "bg-pink-300/30" },
  "fotograf-canlandirma": { icon: "text-cyan-600", shell: "border-cyan-200 bg-cyan-50", glow: "bg-cyan-300/30" },
  "ai-reklam-gorseli": { icon: "text-violet-600", shell: "border-violet-200 bg-violet-50", glow: "bg-violet-300/30" },
  "avatar-sunucu-video": { icon: "text-orange-500", shell: "border-orange-200 bg-orange-50", glow: "bg-orange-300/30" },
  "reels-tiktok-paketi": { icon: "text-emerald-600", shell: "border-emerald-200 bg-emerald-50", glow: "bg-emerald-300/30" },
  "marka-kampanya-seti": { icon: "text-amber-600", shell: "border-amber-200 bg-amber-50", glow: "bg-amber-300/30" }
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;
  const style = categoryIconStyles[category.slug] || categoryIconStyles["ai-urun-videosu"];
  return (
    <Link href={`/kategori/${category.slug}`} className="studio-card group min-h-[260px] p-7 md:min-h-[288px]">
      <div className={`absolute right-8 top-6 h-28 w-28 rounded-full ${style.glow} blur-3xl opacity-70 transition duration-300 group-hover:opacity-100`} />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300 via-pink-300 to-violet-300 opacity-70 transition group-hover:opacity-100" />
      <div className={`category-icon-shell mb-7 ${style.shell}`}><Icon className={`h-7 w-7 ${style.icon}`} /></div>
      <h3 className="font-display text-[1.55rem] font-bold leading-tight text-slate-950 md:text-[1.9rem]">{category.title}</h3>
      <p className="mt-2 text-sm italic tracking-[0.04em] text-slate-500">{category.intro}</p>
      <p className="mt-6 max-w-[330px] text-[15px] leading-7 text-slate-600">{category.description}</p>
      <div className="mt-7 studio-link">Paketleri Gör <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
    </Link>
  );
}

export function PackageCard({ item }: { item: Package }) {
  const isPremium = item.slug.includes("ultimate") || item.slug.includes("viral");
  const isPopular = item.level === "En çok seçilen" || item.slug.includes("pro");
  return (
    <Link href={`/urun/${item.slug}`} className={`studio-card group flex h-full flex-col p-6 ${isPremium ? "spotlight-product-card" : ""}`}>
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-70 transition group-hover:opacity-100 ${isPremium ? "bg-pink-300/35" : "bg-cyan-200/30"}`} />
      {isPremium && <div className="pointer-events-none absolute left-6 top-6 text-[9px] font-black uppercase tracking-[0.26em] text-pink-600">Premium Set</div>}
      {!isPremium && isPopular && <div className="mb-4 inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700">Çok tercih edilen</div>}
      <div className={isPremium ? "mt-8" : ""}>
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyan-700"><Clock3 className="h-4 w-4" /> {item.delivery}</div>
        <h3 className="font-display text-[1.65rem] font-bold leading-tight text-slate-950 md:text-[2rem]">{item.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-sky-100 pt-5">
        <div><div className="text-xs uppercase tracking-[0.18em] text-slate-400">Paket fiyatı</div><div className="mt-1 font-display text-3xl font-black text-slate-950">{formatPrice(item.price)}</div></div>
        <div className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">{item.level}</div>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-slate-600">
        {item.includes.map((include) => <li key={include} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{include}</li>)}
      </ul>
      <div className="mt-auto pt-7"><span className="studio-button inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white">Paketi İncele <ArrowRight className="h-4 w-4" /></span></div>
    </Link>
  );
}

export function StarRating({ count = 5 }: { count?: number }) {
  return <span className="inline-flex text-amber-400">{Array.from({ length: count }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</span>;
}
