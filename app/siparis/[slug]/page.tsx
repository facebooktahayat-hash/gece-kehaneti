import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCredits, getCategory, getPackage, packages } from "@/lib/data";
import { OrderForm } from "@/components/OrderForm";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export default function OrderPage({ params }: { params: { slug: string } }) {
  const item = getPackage(params.slug);
  if (!item) notFound();
  const c = getCategory(item.categorySlug);

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href={`/urun/${item.slug}`} className="mb-8 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]">
          <ArrowLeft className="h-4 w-4" /> Pakete dön
        </Link>
        <div className="occult-panel p-7 md:p-10">
          <p className="eyebrow-rune mb-4">Gece Kredisi ile yorum talebi</p>
          <h1 className="mt-3 font-display text-[2.25rem] font-black text-bone md:text-[3.7rem]">Yorum Talep Formu</h1>
          <p className="mt-4 text-mourning">{item.name} · {formatCredits(item.price)} · {c?.title}</p>
          <p className="mt-3 text-sm leading-6 text-mourning-dim">
            Soruların, gerekli kişisel bilgilerin ve varsa kahve falı görsellerin bu formdan alınır. Gece Kredisi yalnızca site içinde kullanılan dijital kullanım kredisidir; nakde çevrilmez ve devredilemez.
          </p>
          <OrderForm item={item} categoryTitle={c?.title} />
        </div>
      </div>
    </section>
  );
}
