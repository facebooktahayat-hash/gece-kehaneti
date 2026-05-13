import {
  BadgeCheck,
  Boxes,
  BrainCircuit,
  Camera,
  Clock3,
  Images,
  LucideIcon,
  Megaphone,
  PlaySquare,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserRoundCheck,
  WandSparkles,
  Zap
} from "lucide-react";

export type Category = {
  slug: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  description: string;
  accent: string;
};

export type Package = {
  slug: string;
  name: string;
  price: number;
  delivery: string;
  level: string;
  description: string;
  includes: string[];
  categorySlug: string;
};

export const categories: Category[] = [
  {
    slug: "ai-urun-videosu",
    title: "AI Ürün Videosu",
    icon: PlaySquare,
    intro: "E-ticaret için dikkat çeken kısa reklam akışı",
    description: "Ürün fotoğrafı, marka tonu ve hedef kitle bilgisiyle sosyal medya reklamına uygun AI video senaryosu, sahne akışı ve üretim yönergeleri hazırlanır.",
    accent: "from-coral to-violet"
  },
  {
    slug: "fotograf-canlandirma",
    title: "Fotoğraf Canlandırma",
    icon: Camera,
    intro: "Statik görselden hareketli sahne fikri",
    description: "Tek bir ürün, portre veya kampanya görseli için hareket hissi, kamera yönü, ışık dili ve paylaşılabilir kısa video promptları çıkarılır.",
    accent: "from-aqua to-coral"
  },
  {
    slug: "ai-reklam-gorseli",
    title: "AI Reklam Görseli",
    icon: Images,
    intro: "Satış sayfası ve sosyal medya için kreatif set",
    description: "Ürününü daha premium gösterecek arka plan, kompozisyon, ışık, slogan ve görsel üretim promptları tek dosyada teslim edilir.",
    accent: "from-violet to-aqua"
  },
  {
    slug: "avatar-sunucu-video",
    title: "Avatar Sunucu Video",
    icon: UserRoundCheck,
    intro: "Marka yüzü, anlatıcı veya sanal sunucu formatı",
    description: "İzinli kişi/marka avatarı için konuşma metni, sahne planı, sunum tonu ve güvenli kullanım notlarıyla video brief’i hazırlanır.",
    accent: "from-coral to-sun"
  },
  {
    slug: "reels-tiktok-paketi",
    title: "Reels & TikTok Paketi",
    icon: Zap,
    intro: "Hızlı tüketilen, satış odaklı kısa içerikler",
    description: "Instagram Reels, TikTok ve Shorts için hook, akış, altyazı, CTA ve üretim promptlarından oluşan seri içerik paketi hazırlanır.",
    accent: "from-aqua to-mint"
  },
  {
    slug: "marka-kampanya-seti",
    title: "Marka Kampanya Seti",
    icon: Megaphone,
    intro: "Lansman, indirim ve marka vitrini için tam set",
    description: "Ürün videosu, reklam görseli, sosyal medya metni, kreatif açı ve kampanya fikrini bir araya getiren kapsamlı üretim dosyasıdır.",
    accent: "from-sun to-coral"
  }
];

const packageTemplates: Array<Omit<Package, "categorySlug">> = [
  {
    slug: "starter",
    name: "Starter Kreatif Paket",
    price: 249,
    delivery: "Panelde yaklaşık 3 saat içinde",
    level: "Hızlı başlangıç",
    description: "Tek ürün veya tek görsel için hızlı satış fikri, üretim promptu ve kısa içerik akışı.",
    includes: ["1 ana konsept", "3 AI üretim promptu", "1 kısa video akışı", "1 reklam başlığı", "Panel teslimi"]
  },
  {
    slug: "pro",
    name: "Pro Satış Paketi",
    price: 499,
    delivery: "Panelde yaklaşık 3 saat içinde",
    level: "En çok seçilen",
    description: "Ürününü sosyal medya reklamına dönüştürmek için daha güçlü konsept, sahne ve metin seti.",
    includes: ["3 kreatif açı", "7 AI görsel/video promptu", "Reels akışı", "CTA ve başlık seti", "Marka tonu uyumu"]
  },
  {
    slug: "viral",
    name: "Viral Kampanya Paketi",
    price: 899,
    delivery: "Panelde yaklaşık 3 saat içinde",
    level: "Yüksek etki",
    description: "Daha kapsamlı lansman, reklam ve sosyal medya üretimi için katmanlı kreatif dosya.",
    includes: ["5 kampanya fikri", "15 üretim promptu", "Storyboard", "Reklam metinleri", "Platform önerileri"]
  }
];

export const legendaryPackage: Package = {
  slug: "ultimate-ai-kampanya",
  categorySlug: "marka-kampanya-seti",
  name: "Ultimate AI Kampanya",
  price: 1499,
  delivery: "Panelde yaklaşık 3 saat içinde",
  level: "Premium",
  description:
    "Ürün, marka veya lansman için video fikri, görsel üretim dili, sosyal medya metinleri, prompt setleri ve kampanya akışını birleştiren en kapsamlı paket.",
  includes: [
    "Tam kampanya konsepti",
    "Ürün video storyboard’u",
    "20+ AI üretim promptu",
    "Reels/TikTok/Shorts metinleri",
    "Reklam başlığı ve açıklama seti",
    "Panelde premium teslim"
  ]
};

export const packages: Package[] = [
  legendaryPackage,
  ...categories.flatMap((category) =>
    packageTemplates.map((item) => ({
      ...item,
      slug: `${category.slug}-${item.slug}`,
      categorySlug: category.slug
    }))
  )
];

export const testimonials = [
  { name: "Ece K.", category: "AI Ürün Videosu", rating: 5, text: "Ürünümüz için çıkan sahne akışı ve prompt seti reklam ekibinin elini hızlandırdı. Direkt uygulanabilir geldi." },
  { name: "Mert A.", category: "Reels & TikTok Paketi", rating: 5, text: "Hook ve CTA seçenekleri çok güçlüydü. Üç farklı kısa video fikrini aynı gün üretime aldık." },
  { name: "Derya S.", category: "AI Reklam Görseli", rating: 5, text: "Sıradan ürün fotoğrafını premium kampanya görseline çevirecek yönlendirmeler netti. Tasarımcıya hazır brief oldu." },
  { name: "Bora E.", category: "Fotoğraf Canlandırma", rating: 5, text: "Kamera hareketi, ışık ve sahne tarifleri beklediğimden profesyoneldi. Görseli canlı kampanya fikrine dönüştürdü." },
  { name: "Selin R.", category: "Marka Kampanya Seti", rating: 5, text: "Tek dosyada video, görsel, metin ve sosyal medya açısı toplandı. Lansman planı için çok pratik." },
  { name: "Can T.", category: "Avatar Sunucu Video", rating: 4, text: "Sunucu metni ve sahne tonu markaya uydu. Özellikle güvenli kullanım notları işimizi kolaylaştırdı." }
];

export const trustBadges = [
  { title: "OpenAI Destekli", description: "Kreatif brief, prompt ve reklam metni üretimi OpenAI destekli akışla hazırlanır.", icon: BrainCircuit },
  { title: "Panelde Teslim", description: "Talep e-postası ve 6 haneli proje anahtarı ile panelden görüntülenir.", icon: ShieldCheck },
  { title: "Yaklaşık 3 Saat", description: "Ödeme eşleşince üretim kuyruğuna alınır ve proje dosyası panelde açılır.", icon: Clock3 },
  { title: "Satış Odaklı", description: "Paketler ürün tanıtımı, reklam, kısa video ve sosyal medya dönüşümü için kurgulanır.", icon: BadgeCheck },
  { title: "Dosya Yükleme", description: "Ürün fotoğrafı veya referans görsel ekleyerek daha isabetli brief alabilirsin.", icon: UploadCloud }
];

export const homepageHighlights = [
  { title: "Ürününü sahneye çıkar", text: "Fotoğraf, hedef kitle ve ürün avantajını reklam akışına dönüştür.", icon: Boxes },
  { title: "Canlı prompt setleri", text: "Görsel, video, avatar ve sosyal medya üretimi için uygulanabilir promptlar al.", icon: WandSparkles },
  { title: "Sosyal medya hızı", text: "Reels, TikTok ve Shorts için hazır hook, altyazı ve CTA seti kullan.", icon: Sparkles }
];

export function getPackage(slug: string) {
  return packages.find((item) => item.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((item) => item.slug === slug);
}

export function packagesByCategory(slug: string) {
  return packages.filter((item) => item.categorySlug === slug);
}

export function formatPrice(amount: number) {
  return `${amount.toLocaleString("tr-TR")} TL`;
}

export function formatCredits(amount: number) {
  return formatPrice(amount);
}

export const creditUnitLabel = "AI Medya Üretim Ücreti";
export const creditRateLabel = "Panelde teslim edilen kreatif üretim dosyası";
export const creditUsdRate = 1;

export const paymentLinks: Record<number, string> = {
  249: process.env.NEXT_PUBLIC_PAYMENT_249_URL || process.env.NEXT_PUBLIC_PAYMENT_DEFAULT_URL || "#",
  499: process.env.NEXT_PUBLIC_PAYMENT_499_URL || process.env.NEXT_PUBLIC_PAYMENT_DEFAULT_URL || "#",
  899: process.env.NEXT_PUBLIC_PAYMENT_899_URL || process.env.NEXT_PUBLIC_PAYMENT_DEFAULT_URL || "#",
  1499: process.env.NEXT_PUBLIC_PAYMENT_1499_URL || process.env.NEXT_PUBLIC_PAYMENT_DEFAULT_URL || "#"
};

export type PaymentCheckoutParams = {
  email?: string;
  customerName?: string;
  orderId?: string;
  packageSlug?: string;
  amount?: number;
  creditAmount?: number;
};

function appendPaymentParam(params: URLSearchParams, key: string, value?: string | number) {
  if (value === undefined || value === null) return;
  const normalized = String(value).trim();
  if (!normalized) return;
  params.set(key, normalized);
}

export function getPaymentLink(amount: number) {
  return paymentLinks[amount] || process.env.NEXT_PUBLIC_PAYMENT_DEFAULT_URL || "#";
}

export function buildPaymentCheckoutUrl(amount: number, checkoutParams: PaymentCheckoutParams = {}) {
  const rawLink = getPaymentLink(amount);
  if (!rawLink || rawLink === "#") return "#";
  try {
    const url = new URL(rawLink);
    appendPaymentParam(url.searchParams, "email", checkoutParams.email?.trim().toLowerCase());
    appendPaymentParam(url.searchParams, "Talep No", checkoutParams.orderId);
    appendPaymentParam(url.searchParams, "order_id", checkoutParams.orderId);
    appendPaymentParam(url.searchParams, "Paket", checkoutParams.packageSlug);
    appendPaymentParam(url.searchParams, "productSlug", checkoutParams.packageSlug);
    appendPaymentParam(url.searchParams, "Tutar", checkoutParams.amount || amount);
    appendPaymentParam(url.searchParams, "amount", checkoutParams.amount || amount);
    appendPaymentParam(url.searchParams, "Ad Soyad", checkoutParams.customerName);
    appendPaymentParam(url.searchParams, "source", "vivamotion-ai");
    return url.toString();
  } catch {
    return rawLink;
  }
}

export const legacyPaymentLinks = paymentLinks;
export function getLegacyPaymentLink(amount: number) { return getPaymentLink(amount); }
export function buildLegacyCheckoutUrl(amount: number, checkoutParams: PaymentCheckoutParams = {}) { return buildPaymentCheckoutUrl(amount, checkoutParams); }
export function formatLegacyAmount(amount: number) { return formatPrice(amount); }
