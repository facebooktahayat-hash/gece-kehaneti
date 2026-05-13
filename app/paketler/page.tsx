import type { Metadata } from "next";
import { categories, packagesByCategory } from "@/lib/data";
import { CategoryCard, PackageCard } from "@/components/Cards";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Medya Paketleri | Ürün Videosu, Reklam Görseli, Reels",
  description: "AI ürün videosu, reklam görseli, fotoğraf canlandırma, avatar sunucu video, Reels/TikTok ve marka kampanya paketlerini inceleyin.",
  path: "/paketler"
});

export default function PackagesPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="eyebrow-chip mb-4">AI Medya Paketleri</p>
          <h1 className="font-display text-[2.4rem] font-black leading-tight text-slate-950 md:text-[4rem]">Ürününü satış odaklı kreatif dosyaya dönüştür</h1>
          <p className="mx-auto mt-5 max-w-3xl text-slate-600">Video fikri, reklam görseli, fotoğraf canlandırma, sosyal medya akışı ve marka kampanyası için hazır paketler.</p>
        </div>
        <div className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
        </div>
        <div className="grid gap-10">
          {categories.map((category) => (
            <div key={category.slug} className="studio-panel p-6 md:p-8">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="eyebrow-chip mb-2">{category.intro}</p>
                  <h2 className="font-display text-[2rem] font-bold text-slate-950">{category.title}</h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-slate-600">{category.description}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-3">
                {packagesByCategory(category.slug).map((item) => <PackageCard key={item.slug} item={item} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
