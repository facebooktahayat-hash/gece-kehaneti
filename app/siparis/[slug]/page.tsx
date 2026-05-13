import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatPrice, getCategory, getPackage } from "@/lib/data";
import { OrderForm } from "@/components/OrderForm";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackage(slug);
  return buildPageMetadata({ title: item ? `${item.name} Talep Formu` : "Kreatif Talep Formu", description: "VivaMotion AI kreatif üretim talep formu. Bu işlem sayfası arama sonuçlarında listelenmez.", path: `/siparis/${slug}`, noIndex: true });
}

export default async function OrderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPackage(slug);
  if (!item) notFound();
  const category = getCategory(item.categorySlug);
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href={`/urun/${item.slug}`} className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-700 transition hover:text-cyan-900"><ArrowLeft className="h-4 w-4" /> Pakete dön</Link>
        <div className="studio-panel p-7 md:p-10">
          <p className="eyebrow-chip mb-4">Panelde teslim edilecek AI kreatif dosya</p>
          <h1 className="mt-3 font-display text-[2.25rem] font-black text-slate-950 md:text-[3.7rem]">Kreatif Talep Formu</h1>
          <p className="mt-4 text-slate-600">{item.name} · {formatPrice(item.price)} · {category?.title}</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">Ürününü veya kampanya fikrini yaz, ödeme adımına geç. Ödeme eşleşince dosyan OpenAI destekli akışla hazırlanır ve yaklaşık 3 saat içinde satın aldığın e-posta + 6 haneli proje anahtarıyla Panelim alanında görünür.</p>
          <OrderForm item={item} categoryTitle={category?.title} />
        </div>
      </div>
    </section>
  );
}
