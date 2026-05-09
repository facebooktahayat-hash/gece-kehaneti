import {
  Moon,
  Heart,
  Sparkles,
  Eye,
  Star,
  Flame,
  CloudMoon,
  ShieldCheck,
  Clock3,
  LockKeyhole,
  Gem,
  LucideIcon
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
    slug: "tarot",
    title: "Tarot Falı",
    icon: Sparkles,
    intro: "Kartların gölgesinde saklı kader",
    description: "78 kartın eski sırlarıyla geçmişin, şimdinin ve geleceğin gölgelerini çöz.",
    accent: "from-ember to-poison"
  },
  {
    slug: "kahve-fali",
    title: "Kahve Falı",
    icon: Moon,
    intro: "Telvedeki sessiz uyarı",
    description: "Fincanın dibindeki sembollerden kişisel kehanetin çıkarılır.",
    accent: "from-violet to-ember"
  },
  {
    slug: "ask-fali",
    title: "Aşk Falı",
    icon: Heart,
    intro: "Kalbin görünmez bağları",
    description: "Hissedilen, hissedilen, beklenen — aşkın gerçek yönü açığa çıkar.",
    accent: "from-ember to-blood"
  },
  {
    slug: "gece-kehaneti",
    title: "Gece Kehaneti",
    icon: Eye,
    intro: "Sadece gece açılan kapı",
    description: "Gece yarısı yapılan ritüel açılım. En karanlık ama en net olan.",
    accent: "from-poison to-ember"
  },
  {
    slug: "astroloji",
    title: "Astroloji Yorumu",
    icon: Star,
    intro: "Yıldızların kişisel haritası",
    description: "Doğum haritan üzerinden geleceğin enerjik akışı yorumlanır.",
    accent: "from-violet to-poison"
  },
  {
    slug: "ruya-yorumu",
    title: "Rüya Yorumu",
    icon: Moon,
    intro: "Bilinçaltının sansürsüz mesajı",
    description: "Rüyandaki sembollerin gerçek anlamı ve sana verdiği uyarı.",
    accent: "from-ember to-violet"
  },
  {
    slug: "numeroloji",
    title: "Numeroloji",
    icon: Sparkles,
    intro: "Sayıların gizli dili",
    description: "İsmin ve doğum tarihinle taşınan kader kodlarını keşfet.",
    accent: "from-poison to-ember"
  },
  {
    slug: "enerji-bagi",
    title: "Enerji Bağı Analizi",
    icon: Flame,
    intro: "Görünmeyen bağların izi",
    description: "Aranızdaki enerji bağını, yakınlığı ve sessiz çekimi yorumlar.",
    accent: "from-blood to-ember"
  },
  {
    slug: "kader-acilimi",
    title: "Kader Açılımı",
    icon: CloudMoon,
    intro: "Önündeki yolların karanlık haritası",
    description: "Yakın dönem kararların ve ihtimallerin gölgeli yol haritası.",
    accent: "from-violet to-ember"
  }
];

const packageTemplates = [
  { key: "kisa-yorum", name: "Kısa Yorum", price: 149, delivery: "24 saat", level: "Hızlı başlangıç", description: "Tek konuya odaklı, net ve kısa sezgisel yorum.", includes: ["1 ana soru", "Kısa enerji yorumu", "Net sonuç özeti"] },
  { key: "derin-yorum", name: "Derin Yorum", price: 299, delivery: "24-48 saat", level: "En çok seçilen", description: "Konuya daha derin bakan, sembol ve enerji odaklı kapsamlı yorum.", includes: ["3 ana soru", "Detaylı analiz", "Kişisel öneri notları"] },
  { key: "kabus-gibi-detayli-yorum", name: "Kabus Gibi Detaylı Yorum", price: 499, delivery: "48 saat", level: "Yoğun analiz", description: "Karanlık detayları, gizli işaretleri ve olası yönleri daha geniş yorumlar.", includes: ["5 ana soru", "Derin sembol okuması", "Geniş sonuç raporu"] },
  { key: "acil-kehanet", name: "Acil Kehanet", price: 699, delivery: "Aynı gün", level: "Öncelikli", description: "Acil cevap bekleyen konular için öncelikli hazırlanır.", includes: ["Öncelikli teslim", "Hızlı değerlendirme", "Kişisel sonuç mesajı"] },
  { key: "premium-rituel-yorum", name: "Premium Ritüel Yorum", price: 999, delivery: "48-72 saat", level: "Premium", description: "Kapsamlı, katmanlı ve kişiye özel hazırlanmış premium yorum.", includes: ["7 ana soru", "Kapsamlı analiz", "Özel kapanış yorumu", "Premium rapor"] }
];

export const packages: Package[] = categories.flatMap((category) =>
  packageTemplates.map((item) => ({
    slug: `${category.slug}-${item.key}`,
    categorySlug: category.slug,
    ...item
  }))
);

export const testimonials = [
  { name: "Eylül K.", category: "Tarot Falı", rating: 5, text: "Yorum net, özenli ve düşündürücüydü. Özellikle ilişki konusunda kendimi daha sakin hissettim." },
  { name: "Mert A.", category: "Kariyer Falı", rating: 5, text: "Karar verme sürecimde farklı bir açıdan bakmamı sağladı. Anlatım dili profesyoneldi." },
  { name: "Derya S.", category: "Kahve Falı", rating: 5, text: "Fincandaki semboller çok güzel açıklanmıştı. Kişiye özel hazırlanmış gibi hissettirdi." },
  { name: "Nehir T.", category: "Aşk Falı", rating: 4, text: "Abartılı vaatler yoktu, daha çok iç sesimi düzenlememe yardımcı olan bir yorumdu." },
  { name: "Bora E.", category: "Astroloji", rating: 5, text: "Kısa ama etkiliydi. Özellikle zamanlama ve ruh hali yorumlarını sevdim." },
  { name: "Selin R.", category: "Rüya Yorumu", rating: 5, text: "Rüyamdaki sembolleri daha anlamlı okumamı sağladı. Dili sade ve etkileyiciydi." }
];

export const trustBadges = [
  { title: "Tam Gizlilik", description: "Bilgilerin yalnızca yorum süreci için saklanır.", icon: LockKeyhole },
  { title: "Hızlı Teslim", description: "24-72 saat aralığında hazırlanır.", icon: Clock3 },
  { title: "Kişiye Özel", description: "Şablon değil, soruna göre özel yorum.", icon: Eye },
  { title: "Güvenli Ödeme", description: "Güvenli ödeme altyapısına uygun.", icon: ShieldCheck },
  { title: "Premium Deneyim", description: "Karanlık, şık ve ritüel hissi taşıyan sunum.", icon: Gem }
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

export function dailyStats() {
  const start = new Date("2026-05-09T00:00:00Z").getTime();
  const today = new Date();
  const diffDays = Math.max(0, Math.floor((today.getTime() - start) / 86400000));
  const wave = diffDays % 7;
  return {
    readings: 50022 + diffDays * 4 + wave,
    clients: 13120 + diffDays * 3 + (diffDays % 4),
    satisfaction: 98.7,
    todayDelivered: 139 + wave
  };
}