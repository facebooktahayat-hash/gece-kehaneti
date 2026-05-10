import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getPackage } from "@/lib/data";
import { ArrowLeft, CheckCircle2, Clock3 } from "lucide-react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const item = getPackage(params.slug);
  if (!item) notFound();
  const c = getCategory(item.categorySlug);
  const Icon = c?.icon;
  const isLegendary = item.slug === "kehanet";

  return (
    <section className={`px-4 py-16 md:px-6 ${isLegendary ? "relative overflow-hidden" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <Link href={c ? `/kategori/${c.slug}` : "/"} className="mb-8 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]"><ArrowLeft className="h-4 w-4" /> Geri dön</Link>
        {isLegendary && <div className="pointer-events-none absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-ember/12 blur-3xl" />}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className={`occult-panel p-8 md:p-10 ${isLegendary ? "legendary-product-card" : ""}`}>
            {Icon && <Icon className="mb-5 h-12 w-12 text-[#b98ad8] drop-shadow-[0_0_12px_rgba(124,28,255,.32)]" />}
            <p className="eyebrow-rune mb-4">{isLegendary ? "Efsanevi kehanet ürünü" : "Ritüel paket"}</p>
            <h1 className={`font-display text-[2.25rem] font-black leading-tight text-bone md:text-[3.8rem] ${isLegendary ? "title-ember" : ""}`}>{item.name}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.35em] text-mourning">{c?.title}</p>
            <p className="mt-6 text-[16px] leading-8 text-mourning md:text-lg">{item.description}</p>
            {isLegendary && (
              <div className="mt-6 rounded-[1.1rem] border border-ember/25 bg-black/30 p-5 text-sm leading-7 text-mourning shadow-[0_0_24px_rgba(255,0,184,.08)]">
                Bu ürün sitenin en kapalı eşiği olarak tasarlandı: rüya karanlığında beliren geleneksel Hint kıyafetli yaşlı figür, uyanana kadar soruların yankılandığı ürkütücü bir rehber anlatısına dönüşür.
              </div>
            )}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="occult-card p-5"><Clock3 className="mb-3 h-6 w-6 text-[#c9a6df]" /><div className="text-sm text-mourning-dim">Teslim süresi</div><div className="font-display text-xl font-semibold text-bone">{item.delivery}</div></div>
              <div className="occult-card p-5"><div className="mb-3 text-2xl text-[#c9a6df]">✦</div><div className="text-sm text-mourning-dim">Seviye</div><div className="font-display text-xl font-semibold text-bone">{item.level}</div></div>
            </div>
            <h2 className="mt-10 font-display text-[1.9rem] font-bold text-bone">Neler dahil?</h2>
            <ul className="mt-5 grid gap-3">{item.includes.map((inc) => <li key={inc} className="flex items-center gap-3 text-mourning"><CheckCircle2 className="h-5 w-5 text-[#c9a6df]" /> {inc}</li>)}</ul>
          </div>
          <aside className="occult-panel h-fit p-7">
            <div className="text-sm text-mourning-dim">Paket fiyatı</div>
            <div className="mt-2 font-display text-5xl font-black text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.35)]">{item.price.toLocaleString("tr-TR")} TL</div>
            <Link href={`/siparis/${item.slug}`} className="occult-button mt-7 flex w-full px-6 py-4 text-center font-semibold text-white">
              <span className="relative z-10">Önce Sipariş Formu Doldur</span>
            </Link>
            <p className="mt-3 text-xs leading-5 text-mourning-dim">Tüm ürünlerde ödeme öncesi sipariş formu zorunludur.</p>
            <p className="mt-5 text-xs leading-6 text-mourning-dim">Fal hizmeti eğlence ve kişisel farkındalık amaçlıdır. Kesin sonuç, sağlık, hukuk veya yatırım danışmanlığı sunmaz.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
