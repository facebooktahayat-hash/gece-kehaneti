import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock3, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { formatPrice, getCategory, getPackage } from "@/lib/data";
import { breadcrumbJsonLd, buildPageMetadata, faqJsonLd, jsonLd, productJsonLd } from "@/lib/seo";

const copyByCategory: Record<string, { suitableFor: string[]; sample: string }> = {
  "ai-urun-videosu": { suitableFor: ["Tek ürününü kısa reklam videosu fikrine çevirmek isteyenler", "E-ticaret vitrinini daha hareketli göstermek isteyenler", "Video üretim aracına net storyboard ve prompt vermek isteyenler"], sample: "İlk üç saniyede ürün görünür, fayda netleşir ve izleyici aksiyona çağrılır." },
  "fotograf-canlandirma": { suitableFor: ["Statik görseli hareket hissi olan sahneye çevirmek isteyenler", "Ürün, portre veya kampanya görseline kamera yönü eklemek isteyenler", "Canlı sosyal medya postu fikri arayanlar"], sample: "Kamera ürüne yumuşakça yaklaşır; ışık yüzeyde dolaşır ve görsel kısa video hissi kazanır." },
  "ai-reklam-gorseli": { suitableFor: ["Ürün fotoğrafını daha premium reklam karesine taşımak isteyenler", "Landing page, katalog veya Instagram görseli için prompt isteyenler", "Slogan ve kompozisyon fikrine ihtiyaç duyanlar"], sample: "Ürün sade zeminden çıkar, satış vaadini güçlendiren parlak bir sahnede konumlanır." },
  "avatar-sunucu-video": { suitableFor: ["Marka anlatıcısı veya sanal sunucu akışı isteyenler", "İzinli avatar görseliyle tanıtım metni hazırlamak isteyenler", "Güvenli kullanım notlarıyla video brief’i arayanlar"], sample: "Sunucu ilk cümlede problemi kurar, ikinci bölümde faydayı anlatır, finalde net çağrı yapar." },
  "reels-tiktok-paketi": { suitableFor: ["Reels, TikTok ve Shorts için hızlı fikir arayanlar", "Hook, altyazı ve CTA seti isteyenler", "Bir üründen çoklu kısa video açısı çıkarmak isteyenler"], sample: "İlk cümle merak açar, orta bölüm ürün faydasını gösterir, final kaydetme veya satın alma çağrısıyla biter." },
  "marka-kampanya-seti": { suitableFor: ["Lansman veya indirim kampanyasını tek dosyada toplamak isteyenler", "Video, görsel ve metni birlikte planlamak isteyenler", "Premium kreatif dosya arayan markalar"], sample: "Kampanya yalnızca görsel değil; mesaj, sahne, ritim ve satış çağrısıyla bütünleşir." }
};

const afterOrderSteps = [
  "Kreatif talep formunu doldurursun.",
  "Ödeme adımında aynı e-posta ve talep numarasıyla satın alırsın.",
  "Ödeme eşleşince dosya OpenAI destekli üretim kuyruğuna alınır.",
  "Yaklaşık 3 saat içinde proje dosyası Panelim alanında açılır."
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackage(slug);
  if (!item) return buildPageMetadata({ title: "Paket bulunamadı", description: "VivaMotion AI paketi bulunamadı.", path: `/urun/${slug}`, noIndex: true });
  return buildPageMetadata({ title: `${item.name} | AI Medya Paketi`, description: `${item.name}: ${item.description} ${formatPrice(item.price)}. Panelde teslim edilen OpenAI destekli kreatif üretim dosyası.`, path: `/urun/${item.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPackage(slug);
  if (!item) notFound();
  const category = getCategory(item.categorySlug);
  const Icon = category?.icon;
  const isPremium = item.slug.includes("ultimate") || item.slug.includes("viral");
  const isPopular = item.level === "En çok seçilen" || item.slug.includes("pro");
  const salesCopy = copyByCategory[item.categorySlug] ?? copyByCategory["ai-urun-videosu"];
  const productSchema = productJsonLd(item.slug);
  const productFaq = [
    { question: `${item.name} nedir?`, answer: `${item.name}, ürün veya marka bilginize göre hazırlanan OpenAI destekli kreatif üretim dosyası paketidir.` },
    { question: "Bu dosya nasıl teslim edilir?", answer: "Teslim e-posta gövdesi olarak gönderilmez; satın alma e-postası ve 6 haneli proje anahtarı ile Panelim alanında açılır." },
    { question: "Görsel yüklemek zorunlu mu?", answer: "Zorunlu değildir; ancak ürün fotoğrafı veya referans görsel yüklemek brief kalitesini artırır." }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Ana Sayfa", path: "/" }, ...(category ? [{ name: category.title, path: `/kategori/${category.slug}` }] : []), { name: item.name, path: `/urun/${item.slug}` }]))} />
      {productSchema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(productFaq))} />
      <section className="px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Link href={category ? `/kategori/${category.slug}` : "/paketler"} className="mb-8 inline-flex items-center gap-2 text-sm text-cyan-700 transition hover:text-cyan-900"><ArrowLeft className="h-4 w-4" /> Geri dön</Link>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-8">
            <div className={`studio-panel p-5 sm:p-7 md:p-10 ${isPremium ? "spotlight-product-card" : ""}`}>
              <div className="flex flex-wrap items-center gap-3">
                {Icon && <Icon className="h-11 w-11 text-cyan-600 md:h-12 md:w-12" />}
                {isPopular && <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-700">En çok tercih edilen</span>}
              </div>
              <p className="eyebrow-chip mb-4 mt-5">OpenAI destekli kreatif üretim</p>
              <h1 className="font-display text-[2.05rem] font-black leading-tight text-slate-950 sm:text-[2.55rem] md:text-[3.8rem]">{item.name}</h1>
              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500 sm:text-sm">{category?.title}</p>
              <p className="mt-6 text-[15px] leading-8 text-slate-600 md:text-lg">{item.description}</p>
              {isPremium && <div className="mt-6 rounded-[1.1rem] border border-pink-200 bg-pink-50 p-5 text-sm leading-7 text-slate-600">Bu paket, VivaMotion AI’nin en kapsamlı kampanya dosyasıdır. Video fikri, görsel dil, prompt seti ve sosyal medya metinleri tek panel tesliminde birleşir.</div>}
              <div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="studio-card p-5"><Clock3 className="mb-3 h-6 w-6 text-cyan-600" /><div className="text-sm text-slate-500">Teslim</div><div className="font-display text-xl font-semibold text-slate-950">{item.delivery}</div></div><div className="studio-card p-5"><div className="mb-3 text-2xl text-pink-500">✦</div><div className="text-sm text-slate-500">Seviye</div><div className="font-display text-xl font-semibold text-slate-950">{item.level}</div></div></div>
              <h2 className="mt-10 font-display text-[1.65rem] font-bold text-slate-950 md:text-[1.9rem]">Neler dahil?</h2>
              <ul className="mt-5 grid gap-3">{item.includes.map((inc) => <li key={inc} className="flex items-start gap-3 text-sm leading-7 text-slate-600 md:text-base"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" /> {inc}</li>)}</ul>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="studio-card p-5 md:p-6"><div className="mb-4 flex items-center gap-3"><Sparkles className="h-5 w-5 text-pink-500" /><h2 className="font-display text-[1.35rem] font-semibold text-slate-950 md:text-[1.55rem]">Kimler için uygun?</h2></div><ul className="grid gap-3">{salesCopy.suitableFor.map((text) => <li key={text} className="flex items-start gap-3 text-sm leading-7 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400" />{text}</li>)}</ul></div>
                <div className="studio-card p-5 md:p-6"><div className="mb-4 flex items-center gap-3"><MessageCircle className="h-5 w-5 text-cyan-600" /><h2 className="font-display text-[1.35rem] font-semibold text-slate-950 md:text-[1.55rem]">Çıktı hissi</h2></div><p className="text-sm italic leading-8 text-slate-600">“{salesCopy.sample}”</p><p className="mt-4 text-xs leading-6 text-slate-500">Bu metin temsili önizlemedir; gerçek dosya formda yazdığın bilgilere göre oluşturulur.</p></div>
              </div>
            </div>
            <aside className="studio-panel h-fit p-5 sm:p-7 lg:sticky lg:top-28">
              <div className="text-sm text-slate-500">Tutar</div><div className="mt-2 font-display text-4xl font-black text-pink-600 sm:text-5xl">{formatPrice(item.price)}</div><p className="mt-2 text-xs leading-5 text-slate-500">Kreatif dijital içerik · panelde teslim</p>
              <Link href={`/siparis/${item.slug}`} className="studio-button mt-7 flex w-full justify-center px-5 py-4 text-center font-semibold text-white"><span className="relative z-10">Dosyamı Oluştur</span></Link>
              <p className="mt-3 text-xs leading-5 text-slate-500">Teslim e-posta gövdesine gönderilmez. Satın aldığın e-posta ve 6 haneli proje anahtarı ile Panelim alanında açılır.</p>
              <div className="mt-7 rounded-[1.15rem] border border-sky-100 bg-white p-4"><h2 className="font-display text-[1.35rem] font-semibold text-slate-950">Talep sonrası ne olur?</h2><ol className="mt-4 grid gap-3">{afterOrderSteps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan-200 bg-cyan-50 text-xs text-cyan-700">{index + 1}</span>{step}</li>)}</ol></div>
              <div className="mt-4 rounded-[1.15rem] border border-emerald-200 bg-emerald-50 p-4 text-xs leading-6 text-slate-600"><ShieldCheck className="mb-2 h-5 w-5 text-emerald-600" />Yalnızca hak sahibi olduğun veya kullanım izni bulunan materyallerle talep oluşturmalısın.</div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
