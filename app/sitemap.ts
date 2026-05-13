import type { MetadataRoute } from "next";
import { categories, packages } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/paketler"), lastModified: now, changeFrequency: "weekly", priority: 0.94 },
    { url: absoluteUrl("/ai-medya-uretimi"), lastModified: now, changeFrequency: "weekly", priority: 0.92 },
    { url: absoluteUrl("/hakkimizda"), lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: absoluteUrl("/iletisim"), lastModified: now, changeFrequency: "monthly", priority: 0.45 },
    { url: absoluteUrl("/gizlilik"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: absoluteUrl("/mesafeli-satis-sozlesmesi"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: absoluteUrl("/on-bilgilendirme-formu"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: absoluteUrl("/teslimat-iade-sartlari"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: absoluteUrl("/kullanim-sartlari"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: absoluteUrl("/iade"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },
    { url: absoluteUrl("/kvkk-aydinlatma-metni"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/cerez-politikasi"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...categories.map((category) => ({
      url: absoluteUrl(`/kategori/${category.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.86
    })),
    ...packages.map((item) => ({
      url: absoluteUrl(`/urun/${item.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: item.slug.includes("ultimate") ? 0.9 : 0.72
    }))
  ];
}
