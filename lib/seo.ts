import type { Metadata } from "next";
import { categories, packages } from "@/lib/data";

export const siteName = "VivaMotion AI";
export const defaultSiteUrl = "http://localhost:3000";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/$/, "");
export const ogImagePath = "/og-vivamotion-ai.png";

export const defaultDescription =
  "VivaMotion AI; ürün videosu, AI reklam görseli, fotoğraf canlandırma, avatar video brief’i ve sosyal medya içerik paketleri için OpenAI destekli kreatif üretim stüdyosudur.";

export const seoKeywords = [
  "AI ürün videosu",
  "AI reklam görseli",
  "fotoğraf canlandırma",
  "ürün video promptu",
  "reels içerik paketi",
  "TikTok reklam fikri",
  "AI video brief",
  "sosyal medya reklam metni",
  "ürün tanıtım videosu",
  "OpenAI destekli kreatif stüdyo",
  "AI medya üretimi",
  "e-ticaret ürün görseli",
  "avatar sunucu video",
  "kampanya kreatif dosyası"
];

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = ogImagePath,
  noIndex = false,
  type = "website"
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: seoKeywords,
    alternates: { canonical: url, languages: { "tr-TR": url } },
    robots: noIndex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "tr_TR",
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${siteName} — AI medya üretim stüdyosu` }]
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
    applicationName: siteName,
    category: "digital-content",
    creator: siteName,
    publisher: siteName
  };
}

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    legalName: siteName,
    url: siteUrl,
    logo: absoluteUrl(ogImagePath),
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "destek@example.com",
    sameAs: []
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "tr-TR",
    description: defaultDescription,
    publisher: { "@type": "Organization", name: siteName, url: siteUrl }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function categoryJsonLd(slug: string) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return null;
  const categoryPackages = packages.filter((item) => item.categorySlug === slug);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} | ${siteName}`,
    description: category.description,
    url: absoluteUrl(`/kategori/${category.slug}`),
    inLanguage: "tr-TR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryPackages.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/urun/${item.slug}`),
        name: item.name
      }))
    }
  };
}

export function productJsonLd(slug: string) {
  const item = packages.find((pack) => pack.slug === slug);
  if (!item) return null;
  const category = categories.find((categoryItem) => categoryItem.slug === item.categorySlug);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description: item.description,
    image: absoluteUrl(ogImagePath),
    brand: { "@type": "Brand", name: siteName },
    category: category?.title || "AI medya üretimi",
    sku: item.slug,
    url: absoluteUrl(`/urun/${item.slug}`),
    offers: {
      "@type": "Offer",
      price: item.price.toFixed(2),
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/urun/${item.slug}`),
      itemCondition: "https://schema.org/NewCondition"
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Teslimat", value: item.delivery },
      { "@type": "PropertyValue", name: "Format", value: "Panelde teslim edilen kreatif üretim dosyası" },
      { "@type": "PropertyValue", name: "Altyapı", value: "OpenAI destekli kreatif üretim akışı" }
    ]
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}
