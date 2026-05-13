import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCategory, packagesByCategory } from "@/lib/data";
import { PackageCard } from "@/components/Cards";
import { breadcrumbJsonLd, buildPageMetadata, categoryJsonLd, jsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return buildPageMetadata({ title: "Kategori bulunamadı", description: "VivaMotion AI kategorisi bulunamadı.", path: `/kategori/${slug}`, noIndex: true });
  return buildPageMetadata({ title: `${category.title} | AI Medya Paketleri`, description: category.description, path: `/kategori/${category.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const Icon = category.icon;
  const items = packagesByCategory(category.slug);
  const schema = categoryJsonLd(category.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Ana Sayfa", path: "/" }, { name: category.title, path: `/kategori/${category.slug}` }]))} />
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />}
      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <Link href="/#paketler" className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-700 transition hover:text-cyan-900"><ArrowLeft className="h-4 w-4" /> Tüm paketler</Link>
          <div className="studio-panel mb-10 p-7 md:p-12">
            <Icon className="mb-5 h-12 w-12 text-cyan-600" />
            <p className="eyebrow-chip mb-4">{category.intro}</p>
            <h1 className="font-display text-[2.4rem] font-black leading-tight text-slate-950 md:text-[4rem]">{category.title}</h1>
            <p className="mt-5 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-lg">{category.description}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item) => <PackageCard key={item.slug} item={item} />)}
          </div>
        </div>
      </section>
    </>
  );
}
