import Link from "next/link";
import { categories, legendaryPackage, testimonials, trustBadges } from "@/lib/data";
import { CategoryCard, PackageCard } from "@/components/Cards";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
import { HeroEffects } from "@/components/HeroEffects";
import { ArrowRight, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[660px] md:min-h-[760px] overflow-hidden px-4 pb-16 pt-0 md:px-6">
        <HeroEffects />
        <div className="horror-whisper left-[6%] top-[18%]">arkanda bir işaret kaldı</div>
        <div className="horror-whisper right-[4%] top-[24%] [animation-delay:1.6s]">perde seni izliyor</div>
        <div className="horror-whisper left-[12%] bottom-[20%] [animation-delay:3.2s]">fısıltı geri döner</div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl px-5 pt-[38px] text-center md:pt-[78px]">
            <div className="omen-shock mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/52 px-5 py-2.5 text-[11px] font-semibold uppercase text-bone shadow-[0_0_18px_rgba(124,28,255,.20)] md:mb-8 md:text-[12px]">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_12px_rgba(255,0,184,.8)]" />
              Gece açıldığında, perde aralanır
            </div>

            <h1 className="mx-auto max-w-4xl font-display text-[2.85rem] font-black leading-[0.98] tracking-tight text-bone drop-shadow-[0_0_18px_rgba(255,255,255,.12)] md:text-[5.25rem]">
              <span className="block">Kaderin</span>
              <span className="block title-ember hero-lightning">Karanlık Yüzü</span>
              <span className="block">Seni Bekliyor</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[720px] text-[15px] leading-8 text-mourning md:text-[16px]">
              Her okuma, gecenin sessizliğinde sana özel hazırlanır; her cümle, perde arkasındaki işareti açığa çıkarır.
            </p>

            <div className="ghost-line hero-readable-line mt-7 text-[13px] uppercase md:text-[14px]">fısıltılar yaklaşır · semboller belirir · kapılar aralanır</div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#kategoriler" className="occult-button px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
                <span className="relative z-10">Fal Baktır →</span>
              </Link>
              <Link href="/odeme" className="occult-button-ghost px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.20em] text-mourning">
                <span className="relative z-10">Kredi Yükle</span>
              </Link>
            </div>

            <div className="ritual-tag mt-12 text-[11px] uppercase md:text-[12px]">gizli · sezgisel · ritüel · kişiye özel</div>
          </div>
        </div>
      </section>

      <div className="horror-crawl">
        <div className="horror-crawl-track py-3">
          <span>gece sessizleştiğinde semboller konuşur</span>
          <span>her kart bir kapı, her gölge bir cevap saklar</span>
          <span>perdenin ardında bekleyen şey adını bilir</span>
          <span>gece sessizleştiğinde semboller konuşur</span>
          <span>her kart bir kapı, her gölge bir cevap saklar</span>
          <span>perdenin ardında bekleyen şey adını bilir</span>
        </div>
      </div>

      <section id="kategoriler" className="relative px-4 py-16 md:px-6">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-abyss via-abyss/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="eyebrow-rune mb-4">Öne Çıkan Hizmetler</p>
            <h2 className="font-display text-[2.2rem] font-bold text-bone md:text-[3.3rem]">Karanlık kapılar</h2>
            <p className="mt-4 text-mourning">Büyünün, sezginin ve karanlık sembollerin içinden sana en yakın kapıyı seç.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

          <div className="mt-10 text-center"><Link href="/#kategoriler" className="occult-link">Tüm kategorileri gör →</Link></div>
        </div>
      </section>


      <Section eyebrow="En Efsane Ürün" title="Kehanet" text="Rüya eşiğinin ardındaki en gizli, en ürkütücü ve en premium kapı.">
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch">
          <div className="occult-panel p-7 md:p-9">
            <div className="relative z-10">
              <p className="eyebrow-rune mb-4">Karanlık eşik</p>
              <h3 className="font-display text-[2rem] font-black leading-tight text-bone md:text-[3rem]">Rüyada sorulan sorular uyanınca yankılanır.</h3>
              <p className="mt-5 text-sm leading-7 text-mourning md:text-base">
                Kehanet, sıradan bir fal ürünü gibi gösterilmedi; sitenin en gizemli ürünü olarak öne çıkarıldı. Geleneksel Hint kıyafetli yaşlı rehber anlatısı, rüya boyunca soru sorma teması ve karanlık premium atmosfer tek üründe toplandı.
              </p>
              <div className="mt-7 rounded-[1.1rem] border border-ember/20 bg-ember/10 px-5 py-4 text-xs uppercase tracking-[0.22em] text-gold shadow-[0_0_24px_rgba(255,0,184,.10)]">
                sadece cesaret edenlerin açtığı kapı
              </div>
            </div>
          </div>
          <PackageCard item={legendaryPackage} />
        </div>
      </Section>

      <Section eyebrow="Süreç" title="Nasıl çalışır?" text="Karanlık ama net. Süreç basit; yorum ise sana özel.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Fal kapısını seç", "Sana yakın olan alanı seç. Tarot, kahve, aşk veya gizli sezgiler."],
            ["02", "İz bırak", "Formu doldur, enerjini aktar ve Gece Kredisi yükleme adımına geç."],
            ["03", "Mesajı al", "Kredi kontrolü sonrası sana özel hazırlanan kehanet yorumunu teslim al."]
          ].map(([no, title, text]) => (
            <div key={no} className="occult-card p-7 text-center">
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-ember/22 bg-ember/10 text-ember shadow-[0_0_14px_rgba(255,0,184,.22)]">{no}</div>
              <h3 className="mb-3 font-display text-[1.6rem] font-semibold text-bone">{title}</h3>
              <p className="text-sm leading-7 text-mourning">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Süreç Güveni" title="Karanlık atmosfer, net sınırlar" text="Gece Kredisi ve yorum süreci sade, kapalı devre ve anlaşılır tutulur.">
        <Stats />
      </Section>

      <Section eyebrow="Güven" title="Karanlık görünür, süreç nettir" text="Ürkütücü atmosferin altında düzenli, güvenli ve profesyonel bir akış vardır.">
        <div className="grid gap-4 md:grid-cols-5">
          {trustBadges.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="occult-card p-5 text-center">
                <Icon className="mx-auto mb-3 h-7 w-7 text-ember drop-shadow-[0_0_12px_rgba(255,0,184,.4)]" />
                <h3 className="font-display text-[1.05rem] font-semibold text-bone">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-mourning">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Danışan Deneyimleri" title="Karanlığın içinden gelen notlar" text="Dili abartısız, hissi yoğun, deneyimi kişisel yorumlar.">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="occult-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-xl font-semibold text-bone">{item.name}</span>
                <span className="text-sm text-gold">{"★".repeat(item.rating)}</span>
              </div>
              <p className="min-h-20 text-sm leading-7 text-mourning">{item.text}</p>
              <div className="mt-5 inline-flex rounded-full border border-ember/20 bg-ember/10 px-3 py-1 text-xs text-[#c9a6df]">{item.category}</div>
            </div>
          ))}
        </div>
      </Section>

      <section className="px-4 py-20 md:px-6">
        <div className="occult-panel mx-auto max-w-5xl p-10 text-center">
          <Eye className="mx-auto mb-5 h-12 w-12 text-ember drop-shadow-[0_0_18px_rgba(255,0,184,.35)]" />
          <h2 className="font-display text-[2.35rem] font-black text-bone md:text-[2.85rem]">Perdenin Ardındakini Görmeye Hazır mısın?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-mourning">Sorunu seç, enerjini gönder ve karanlıkta parlayan yorumu bekle.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#kategoriler" className="occult-button gap-2 px-7 py-4 font-semibold text-white">
              <span className="relative z-10 inline-flex items-center gap-2">Fal Baktır <ArrowRight className="h-4 w-4" /></span>
            </Link>
            <Link href="/odeme" className="occult-button-ghost px-7 py-4 font-semibold text-mourning">
              <span className="relative z-10">Kredi Yükle</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
