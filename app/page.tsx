import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PlaySquare, Sparkles } from "lucide-react";
import { categories, homepageHighlights, legendaryPackage, testimonials, trustBadges } from "@/lib/data";
import { buildPageMetadata, faqJsonLd, jsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { CategoryCard, PackageCard, StarRating } from "@/components/Cards";
import { HeroEffects } from "@/components/HeroEffects";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Ürün Videosu, Reklam Görseli ve Reels Paketleri | VivaMotion AI",
  description: "VivaMotion AI; ürün videosu, fotoğraf canlandırma, AI reklam görseli, avatar sunucu video ve Reels/TikTok içerikleri için OpenAI destekli kreatif üretim dosyaları hazırlar.",
  path: "/"
});

const homeFaq = [
  {
    question: "VivaMotion AI ne üretir?",
    answer: "Ürün videosu, reklam görseli, fotoğraf canlandırma, avatar sunucu video ve sosyal medya içerikleri için kreatif brief, storyboard, reklam metni ve AI üretim promptları hazırlar."
  },
  {
    question: "Teslimat nasıl yapılır?",
    answer: "Ödeme eşleşmesinden sonra proje dosyası üretim kuyruğuna alınır ve satın alma e-postası ile 6 haneli proje anahtarı kullanılarak Panelim alanında görüntülenir."
  },
  {
    question: "Ürün fotoğrafı yükleyebilir miyim?",
    answer: "Evet. Ürün fotoğrafı, referans görsel veya kampanya ekran görüntüsü ekleyebilirsin. Görseller yalnızca kreatif üretim brief’ini daha isabetli hazırlamak için kullanılır."
  },
  {
    question: "Gerçek kişi veya ünlü kullanımı var mı?",
    answer: "İzinsiz gerçek kişi, ünlü veya marka taklidi yapılmaz. Kullanıcı yalnızca hak sahibi olduğu görsel, ürün ve marka materyalleriyle talep oluşturmalıdır."
  }
];

function StudioSignal({ children }: { children: string }) {
  return (
    <div className="studio-signal mx-auto my-10 max-w-5xl px-4 text-center" aria-hidden="true">
      <span>{children}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteJsonLd())} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(homeFaq))} />

      <section className="studio-section relative min-h-[660px] overflow-hidden px-4 pb-16 pt-0 md:min-h-[760px] md:px-6">
        <HeroEffects />
        <div className="relative z-10 mx-auto flex min-h-[660px] max-w-7xl items-center justify-center pt-16 text-center md:min-h-[760px]">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/75 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,.7)]" /> OpenAI destekli kreatif medya stüdyosu
            </div>
            <h1 className="hero-title-shell mx-auto max-w-4xl font-display text-[2.85rem] font-black leading-[0.98] tracking-tight text-slate-950 md:text-[5.25rem]" aria-label="Yükle. Ürün Sahneye Çıksın. Seç. Reklam Fikri Parlasın. Yayına Al. İçerik Akışa Dönsün.">
              <span className="hero-title-rotator">
                <span className="hero-title-phrase hero-title-phrase-1">
                  <span className="block">Yükle.</span>
                  <span className="block title-coral hero-lightning">Ürün Sahneye</span>
                  <span className="block">Çıksın.</span>
                </span>
                <span className="hero-title-phrase hero-title-phrase-2">
                  <span className="block">Seç.</span>
                  <span className="block title-coral hero-lightning">Reklam Fikri</span>
                  <span className="block">Parlasın.</span>
                </span>
                <span className="hero-title-phrase hero-title-phrase-3">
                  <span className="block">Yayına Al.</span>
                  <span className="block title-coral hero-lightning">İçerik Akışa</span>
                  <span className="block">Dönsün.</span>
                </span>
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-[820px] text-[15px] leading-8 text-slate-600 md:text-[17px]">
              Ürün fotoğrafını, hedef kitleni ve kampanya fikrini yaz. VivaMotion AI; kısa video, reklam görseli, fotoğraf canlandırma ve sosyal medya içerikleri için satış odaklı kreatif üretim dosyanı hazırlar.
            </p>
            <div className="shine-line hero-readable-line mt-7 text-[13px] uppercase text-slate-500 md:text-[14px]">ürün videosu · reklam görseli · reels/tiktok · panel teslimi</div>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#paketler" className="studio-button primary-cta px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white"><span className="relative z-10">Paketleri Gör →</span></Link>
              <Link href="/ai-medya-uretimi" className="studio-button-shine px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan-700"><span className="relative z-10">AI Medya Nedir?</span></Link>
            </div>
            <div className="studio-tag mt-12 text-[11px] uppercase text-slate-500 md:text-[12px]">ferah tasarım · hızlı brief · güçlü prompt · satış odaklı</div>
          </div>
        </div>
      </section>

      <div className="motion-crawl"><div className="motion-crawl-track py-3"><span>ürün fotoğrafı kreatif kampanyaya dönüşür</span><span>AI prompt setleri panelde açılır</span><span>reels ve reklam fikirleri hızlı hazırlanır</span><span>ürün fotoğrafı kreatif kampanyaya dönüşür</span><span>AI prompt setleri panelde açılır</span><span>reels ve reklam fikirleri hızlı hazırlanır</span></div></div>

      <StudioSignal>Canlı stüdyo akışı · satış odaklı paketler yükleniyor</StudioSignal>

      <section id="paketler" className="studio-section relative px-4 py-16 md:px-6">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="eyebrow-chip mb-4">AI Medya Paketleri</p>
            <h2 className="font-display text-[2.2rem] font-bold text-slate-950 md:text-[3.3rem]">Satış potansiyeli yüksek kreatif ürünler</h2>
            <p className="mt-4 text-slate-600">E-ticaret, sosyal medya, lansman ve marka vitrini için en hızlı satın alınabilecek AI üretim paketleri.</p>
          </div>
          <div className="studio-card-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div>
        </div>
      </section>

      <StudioSignal>Premium kreatif set · kampanya akışı hazırlanıyor</StudioSignal>

      <Section eyebrow="Premium" title="Ultimate AI Kampanya" text="Sitenin en kapsamlı ürünü: ürün videosu, reklam görseli, sosyal medya metni ve prompt setini tek panel dosyasında birleştirir.">
        <div className="studio-card-grid grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch">
          <div className="studio-panel p-7 md:p-9">
            <p className="eyebrow-chip mb-4">Tam kreatif üretim</p>
            <h3 className="font-display text-[2rem] font-black leading-tight text-slate-950 md:text-[3rem]">Ürününü tek görselden tam kampanya fikrine taşı.</h3>
            <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">Ultimate AI Kampanya; ürün avantajını, görsel dilini, kısa video sahnesini, sosyal medya metnini ve reklam yönünü tek premium üretim dosyasında toplar.</p>
            <div className="mt-7 rounded-[1.1rem] border border-cyan-200 bg-cyan-50 px-5 py-4 text-xs uppercase tracking-[0.18em] text-cyan-700 shadow-sm">panelde premium teslim</div>
          </div>
          <PackageCard item={legendaryPackage} />
        </div>
      </Section>

      <Section eyebrow="SEO Odaklı Deneyim" title="AI medya üretimi nasıl çalışır?" text="Kullanıcı talebi, kreatif brief ve panel teslimi net biçimde ayrılır.">
        <div className="studio-card-grid grid gap-5 lg:grid-cols-3">
          {homepageHighlights.map((item) => { const Icon = item.icon; return <div key={item.title} className="studio-card p-6"><Icon className="mb-4 h-8 w-8 text-cyan-600" /><h3 className="font-display text-[1.5rem] font-semibold text-slate-950">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p></div>; })}
        </div>
      </Section>

      <Section eyebrow="Süreç" title="Nasıl çalışır?" text="Tam otomatik, panel odaklı ve satın alma e-postası + proje anahtarı ile takip edilir.">
        <div className="studio-card-grid grid gap-5 md:grid-cols-3">
          {[["01", "Paketi seç", "Ürün videosu, reklam görseli, fotoğraf canlandırma, avatar video veya kampanya paketi seç."], ["02", "Brief’i yaz", "Ürününü, hedef kitleni, kampanya amacını ve varsa referans görselini ekle."], ["03", "Panelde aç", "Ödeme eşleşince dosyan AI üretim kuyruğuna girer ve yaklaşık 3 saat içinde panelde görünür."]].map(([no, title, text]) => (
            <div key={no} className="studio-card p-7 text-center"><div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 shadow-sm">{no}</div><h3 className="mb-3 font-display text-[1.6rem] font-semibold text-slate-950">{title}</h3><p className="text-sm leading-7 text-slate-600">{text}</p></div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Süreç Güveni" title="Ferah tasarım, net üretim sistemi" text="Beğenilen hareketli site yapısı korunur; ürün dili ise modern AI medya stüdyosu olarak açıkça konumlanır."><Stats /></Section>

      <Section eyebrow="Güven" title="Net vaat, güçlü kreatif çıktı" text="Paketler; ürün tanıtımı, sosyal medya reklamı ve kreatif üretim brief’i için açık kapsamla sunulur.">
        <div className="studio-card-grid grid gap-4 md:grid-cols-5">{trustBadges.map((item) => { const Icon = item.icon; return <div key={item.title} className="studio-card p-5 text-center"><Icon className="mx-auto mb-3 h-7 w-7 text-cyan-600" /><h3 className="font-display text-[1.05rem] font-semibold text-slate-950">{item.title}</h3><p className="mt-2 text-xs leading-6 text-slate-600">{item.description}</p></div>; })}</div>
      </Section>

      <Section eyebrow="Müşteri Yorumları" title="Panelden teslim edilen kreatif işler" text="Ürününü daha hızlı, daha net ve daha paylaşılabilir hale getirmek isteyen markalardan yorumlar.">
        <div className="studio-card-grid grid gap-5 md:grid-cols-3">{testimonials.map((item) => <div key={item.name} className="studio-card p-6"><div className="mb-3 flex items-center justify-between"><span className="font-display text-xl font-semibold text-slate-950">{item.name}</span><StarRating count={item.rating} /></div><p className="min-h-20 text-sm leading-7 text-slate-600">{item.text}</p><div className="mt-5 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs text-cyan-700">{item.category}</div></div>)}</div>
      </Section>

      <Section eyebrow="Sık Sorulan Sorular" title="AI medya üretimi hakkında" text="Arama motorları ve kullanıcılar için en net yanıtlar.">
        <div className="studio-card-grid grid gap-4 md:grid-cols-2">
          {homeFaq.map((item) => <div key={item.question} className="studio-card p-6"><h3 className="font-display text-[1.35rem] font-semibold text-slate-950">{item.question}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p></div>)}
        </div>
      </Section>

      <StudioSignal>Son adım · ürününü kreatif dosyaya dönüştür</StudioSignal>

      <section className="studio-section px-4 py-20 md:px-6">
        <div className="studio-panel mx-auto max-w-5xl p-10 text-center">
          <PlaySquare className="mx-auto mb-5 h-12 w-12 text-pink-500" />
          <h2 className="font-display text-[2.35rem] font-black text-slate-950 md:text-[2.85rem]">Ürünün için AI kreatif dosya oluşturmaya hazır mısın?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-600">Paketini seç, ürününü anlat, varsa görselini yükle. VivaMotion AI sana panelde uygulanabilir video, görsel ve sosyal medya üretim dosyası hazırlasın.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="#paketler" className="studio-button primary-cta gap-2 px-7 py-4 font-semibold text-white"><span className="relative z-10 inline-flex items-center gap-2">Paketleri Gör <ArrowRight className="h-4 w-4" /></span></Link><Link href="/panel" className="studio-button-shine px-7 py-4 font-semibold text-cyan-700"><span className="relative z-10">Panelim</span></Link></div>
        </div>
      </section>
    </>
  );
}
