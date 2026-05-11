import Link from "next/link";
import { notFound } from "next/navigation";
import { creditRateLabel, formatCredits, getCategory, getPackage, packages } from "@/lib/data";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

const defaultSalesCopy = {
  suitableFor: [
    "Aklındaki tek bir konuya dışarıdan sezgisel bir bakış arayanlar",
    "Kararsız kaldığı süreçte sembollerden ve enerjiden işaret almak isteyenler",
    "Kendine özel, net ve düzenli hazırlanmış bir yorum deneyimi isteyenler"
  ],
  sample:
    "Son dönemde iç dünyanda cevabını bildiğin ama adını koymakta zorlandığın bir konu öne çıkıyor. Bu yorumda seni yoran döngünün sembolleri tek tek açılır; kararını daha sakin görebilmen için sezgisel bir yol haritası çıkarılır."
};

const salesCopyByCategory: Record<string, typeof defaultSalesCopy> = {
  tarot: {
    suitableFor: [
      "Aşk, kariyer veya karar sürecinde kartların işaretini merak edenler",
      "Geçmiş, şimdi ve yakın gelecek enerjisini tek akışta görmek isteyenler",
      "Kararsız kaldığı konuda daha net bir sembolik rehberlik arayanlar"
    ],
    sample:
      "Açılımda ilk enerji, beklediğin cevabın henüz tam görünmediğini fakat perde arkasında hareket başladığını gösteriyor. Kartların dili sana acele karar değil, işaretleri sırayla okuma çağrısı yapıyor."
  },
  "kahve-fali": {
    suitableFor: [
      "Fincanındaki sembollerin kişisel anlamını merak edenler",
      "Aşk, haber, yol ve kısmet işaretlerini daha detaylı öğrenmek isteyenler",
      "Fotoğraflarını gönderip kendine özel yorum almak isteyenler"
    ],
    sample:
      "Fincanın kenarında yükselen yol sembolü, beklediğin bir haberle birlikte hareket enerjisini gösteriyor. Dibindeki yoğunluk ise içini yoran konunun bitmediğini, fakat yakında şekil değiştireceğini anlatıyor."
  },
  "ask-fali": {
    suitableFor: [
      "İlişkisinde belirsizlik, sessizlik veya kararsızlık yaşayanlar",
      "Karşı tarafın enerjisini ve ilişkinin yönünü sezgisel olarak anlamak isteyenler",
      "Kalbinde kalan soruya daha net bir içgörü arayanlar"
    ],
    sample:
      "Aşk enerjisinde karşılıklı çekim tamamen kopmuş görünmüyor; fakat araya giren gurur, bekleyiş ve söylenmeyen cümleler ilişki akışını yavaşlatıyor. Bu yorum, bağın nereye evrildiğini daha görünür kılar."
  },
  "gece-kehaneti": {
    suitableFor: [
      "Daha yoğun, gizemli ve karanlık atmosferli bir yorum isteyenler",
      "İç sesindeki işaretleri sembolik bir anlatıyla okumak isteyenler",
      "Sıradan yorumdan daha derin ve özel bir deneyim arayanlar"
    ],
    sample:
      "Gece enerjisi, bastırdığın bir sorunun tekrar yüzeye çıktığını gösteriyor. Gölgenin içinde kalan cevap korkutucu değil; sadece uzun süredir görmezden geldiğin bir işareti fark etmeni bekliyor."
  },
  astroloji: {
    suitableFor: [
      "Doğum tarihi üzerinden kişisel enerji akışını merak edenler",
      "Aşk, kariyer ve içsel dönemlerini sembolik olarak anlamak isteyenler",
      "Hayatındaki tekrar eden döngülere daha geniş bir bakış arayanlar"
    ],
    sample:
      "Haritanda son dönem içe çekilme ve karar erteleme enerjisi belirginleşiyor. Özellikle ilişkiler ve yön değişimi konusunda acele etmek yerine, işaretlerin olgunlaşmasını beklemen gereken bir eşiktesin."
  },
  "ruya-yorumu": {
    suitableFor: [
      "Tekrarlayan veya etkisinden çıkamadığı bir rüyayı anlamlandırmak isteyenler",
      "Rüyasındaki kişi, nesne ve mekân sembollerini çözmek isteyenler",
      "Bilinçaltından gelen mesajlara sezgisel bir açıklama arayanlar"
    ],
    sample:
      "Rüyandaki karanlık alan, kaybolma değil; karar vermeden önce beklediğin içsel eşiği temsil ediyor. Görünen semboller, bastırdığın bir duygunun artık daha açık konuşmak istediğini gösteriyor."
  },
  numeroloji: {
    suitableFor: [
      "İsim ve doğum tarihiyle taşıdığı kişisel kodları merak edenler",
      "Hayat döngülerini sayıların sembolik diliyle okumak isteyenler",
      "Kendi karakter enerjisine farklı bir pencereden bakmak isteyenler"
    ],
    sample:
      "Sayı enerjin, güçlü sezgiyle birlikte dönemsel kararsızlığı da taşıyor. Bu yorumda adının ve doğum tarihinin verdiği titreşimler, hayatındaki tekrar eden seçim temalarıyla birlikte okunur."
  },
  "enerji-bagi": {
    suitableFor: [
      "Bir kişiyle arasındaki görünmeyen bağı anlamak isteyenler",
      "Sessizlik, özlem veya çekim enerjisinin karşılıklı olup olmadığını merak edenler",
      "İlişki dinamiğine sezgisel ama düzenli bir yorum arayanlar"
    ],
    sample:
      "Aranızdaki enerji tamamen düz bir çizgide ilerlemiyor; bir taraf yaklaşırken diğer taraf kendini geri çekme eğiliminde. Bu bağda asıl belirleyici olan duygu değil, söylenmeden bırakılan cümleler."
  },
  "kader-acilimi": {
    suitableFor: [
      "Yakın dönem kararlarının olası yönlerini görmek isteyenler",
      "Önündeki yollar arasında sezgisel bir işaret arayanlar",
      "Hayatındaki geçiş dönemini daha net okumak isteyenler"
    ],
    sample:
      "Önünde iki ayrı yol beliriyor: biri tanıdık ama yorucu, diğeri belirsiz ama daha dönüştürücü. Kader açılımı bu iki ihtimalin enerjisini ayrı ayrı okuyarak kararını daha sakin görmene yardım eder."
  }
};

const afterOrderSteps = [
  "Yorum talep formunu doldurur, sorunuzu ve gerekli bilgileri gönderirsiniz.",
  "Gece Kredisi kontrolü sonrası bilgileriniz yorum için sıraya alınır.",
  "Yorumunuz belirtilen teslim süresinde size özel şekilde hazırlanır ve iletilir."
];

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const item = getPackage(params.slug);
  if (!item) notFound();
  const c = getCategory(item.categorySlug);
  const Icon = c?.icon;
  const isLegendary = item.slug === "kehanet";
  const isPopular = item.level === "En çok seçilen" || item.slug.includes("derin-yorum");
  const salesCopy = salesCopyByCategory[item.categorySlug] ?? defaultSalesCopy;

  return (
    <section className={`px-4 py-10 md:px-6 md:py-16 ${isLegendary ? "relative overflow-hidden" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <Link href={c ? `/kategori/${c.slug}` : "/"} className="mb-8 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]"><ArrowLeft className="h-4 w-4" /> Geri dön</Link>
        {isLegendary && <div className="pointer-events-none absolute left-1/2 top-28 h-80 w-80 -translate-x-1/2 rounded-full bg-ember/12 blur-3xl" />}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-8">
          <div className={`occult-panel p-5 sm:p-7 md:p-10 ${isLegendary ? "legendary-product-card" : ""}`}>
            <div className="flex flex-wrap items-center gap-3">
              {Icon && <Icon className="h-11 w-11 text-[#b98ad8] drop-shadow-[0_0_12px_rgba(124,28,255,.32)] md:h-12 md:w-12" />}
              {isPopular && (
                <span className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-gold shadow-[0_0_16px_rgba(247,200,107,.14)]">
                  En Çok Tercih Edilen
                </span>
              )}
            </div>
            <p className="eyebrow-rune mb-4 mt-5">{isLegendary ? "Efsanevi kehanet ürünü" : "Ritüel paket"}</p>
            <h1 className={`font-display text-[2.05rem] font-black leading-tight text-bone sm:text-[2.55rem] md:text-[3.8rem] ${isLegendary ? "title-ember" : ""}`}>{item.name}</h1>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-mourning sm:text-sm sm:tracking-[0.35em]">{c?.title}</p>
            <p className="mt-6 text-[15px] leading-8 text-mourning md:text-lg">{item.description}</p>
            {isLegendary && (
              <div className="mt-6 rounded-[1.1rem] border border-ember/25 bg-black/30 p-5 text-sm leading-7 text-mourning shadow-[0_0_24px_rgba(255,0,184,.08)]">
                Bu ürün sitenin en kapalı eşiği olarak tasarlandı: rüya karanlığında beliren geleneksel Hint kıyafetli yaşlı figür, soruların yankılandığı ürkütücü ve sembolik bir rehber anlatısına dönüşür.
              </div>
            )}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="occult-card p-5"><Clock3 className="mb-3 h-6 w-6 text-[#c9a6df]" /><div className="text-sm text-mourning-dim">Teslim süresi</div><div className="font-display text-xl font-semibold text-bone">{item.delivery}</div></div>
              <div className="occult-card p-5"><div className="mb-3 text-2xl text-[#c9a6df]">✦</div><div className="text-sm text-mourning-dim">Seviye</div><div className="font-display text-xl font-semibold text-bone">{item.level}</div></div>
            </div>
            <h2 className="mt-10 font-display text-[1.65rem] font-bold text-bone md:text-[1.9rem]">Neler dahil?</h2>
            <ul className="mt-5 grid gap-3">{item.includes.map((inc) => <li key={inc} className="flex items-start gap-3 text-sm leading-7 text-mourning md:text-base"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#c9a6df]" /> {inc}</li>)}</ul>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="occult-card p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-ember drop-shadow-[0_0_12px_rgba(255,0,184,.35)]" />
                  <h2 className="font-display text-[1.35rem] font-semibold text-bone md:text-[1.55rem]">Bu yorum kimler için uygun?</h2>
                </div>
                <ul className="grid gap-3">
                  {salesCopy.suitableFor.map((text) => (
                    <li key={text} className="flex items-start gap-3 text-sm leading-7 text-mourning">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember shadow-[0_0_10px_rgba(255,0,184,.65)]" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="occult-card p-5 md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-[#c9a6df] drop-shadow-[0_0_12px_rgba(124,28,255,.35)]" />
                  <h2 className="font-display text-[1.35rem] font-semibold text-bone md:text-[1.55rem]">Örnek yorumdan kısa kesit</h2>
                </div>
                <p className="text-sm italic leading-8 text-mourning">“{salesCopy.sample}”</p>
                <p className="mt-4 text-xs leading-6 text-mourning-dim">Bu metin temsili bir önizlemedir; gerçek yorum talep formundaki bilgilerle kişiye özel hazırlanır.</p>
              </div>
            </div>
          </div>

          <aside className="occult-panel h-fit p-5 sm:p-7 lg:sticky lg:top-28">
            <div className="text-sm text-mourning-dim">Gerekli Gece Kredisi</div>
            <div className="mt-2 font-display text-4xl font-black text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.35)] sm:text-5xl">{formatCredits(item.price)}</div>
            <p className="mt-2 text-xs leading-5 text-mourning-dim">{creditRateLabel}</p>
            <Link href={`/siparis/${item.slug}`} className="occult-button mt-7 flex w-full justify-center px-5 py-4 text-center font-semibold text-white">
              <span className="relative z-10">Gece Kredisi ile Başlat</span>
            </Link>
            <p className="mt-3 text-xs leading-5 text-mourning-dim">Tüm ürünlerde yorum talep formu doldurulur; gerekli kredi yalnızca site içinde kullanılır.</p>

            <div className="mt-7 rounded-[1.15rem] border border-white/10 bg-black/24 p-4">
              <h2 className="font-display text-[1.35rem] font-semibold text-bone">Talep sonrası ne olur?</h2>
              <ol className="mt-4 grid gap-3">
                {afterOrderSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-mourning">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ember/25 bg-ember/10 text-[11px] font-bold text-ember">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-4 rounded-[1.15rem] border border-[#c9a6df]/18 bg-[#7c1cff]/10 p-4">
              <div className="mb-2 flex items-center gap-2 font-display text-[1.15rem] font-semibold text-bone">
                <ShieldCheck className="h-5 w-5 text-[#c9a6df]" /> Gece Kredisi bilgisi
              </div>
              <p className="text-xs leading-6 text-mourning-dim">Gece Kredisi yalnızca bu platformda kullanılan site içi kullanım kredisidir; nakde çevrilmez, devredilmez ve yatırım aracı değildir.</p>
            </div>

            <p className="mt-5 text-xs leading-6 text-mourning-dim">Yorumlar eğlence, sembolik anlatım ve kişisel farkındalık amaçlıdır. Kesin gelecek bilgisi, sağlık, hukuk veya yatırım danışmanlığı sunmaz.</p>
          </aside>
        </div>

        <div className="occult-panel mt-8 overflow-hidden p-6 text-center md:p-9">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent" />
          <h2 className="font-display text-[1.8rem] font-black leading-tight text-bone md:text-[2.55rem]">Bazen cevaplar zaten içimizdedir.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-mourning md:text-base">Doğru yorum, sadece o cevabın üzerindeki sis perdesini aralar. Hazırsan, sana özel yorum için ilk adımı at.</p>
          <Link href={`/siparis/${item.slug}`} className="occult-button mt-7 inline-flex w-full justify-center gap-2 px-7 py-4 font-semibold text-white sm:w-auto">
            <span className="relative z-10 inline-flex items-center gap-2">Yorum Talep Formuna Geç <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
