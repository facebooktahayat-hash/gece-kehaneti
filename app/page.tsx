import Link from "next/link";
import { categories, testimonials, trustBadges } from "@/lib/data";
import { CategoryCard } from "@/components/Cards";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
import { HeroEffects } from "@/components/HeroEffects";
import { ArrowRight, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[680px] md:min-h-[760px] overflow-hidden px-4 pb-16 pt-0 md:px-6">
        <HeroEffects />
        <div className="horror-whisper left-[6%] top-[18%]">arkanda bir işaret kaldı</div>
        <div className="horror-whisper right-[4%] top-[24%] [animation-delay:1.6s]">perde seni izliyor</div>
        <div className="horror-whisper left-[12%] bottom-[20%] [animation-delay:3.2s]">fısıltı geri döner</div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl px-5 pt-[58px] text-center md:pt-[88px]">
            <div className="mx-auto mb-7 inline-flex md:mb-8 items-center gap-2 rounded-full border border-violet/42 bg-black/42 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.42em] text-mourning shadow-[0_0_18px_rgba(255,0,184,.18)]">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_12px_rgba(255,0,184,.8)]" />
              Gece açıldığında, perde aralanır
            </div>

            <h1 className="mx-auto max-w-4xl font-display text-[2.85rem] font-black leading-[0.98] tracking-tight text-bone drop-shadow-[0_0_18px_rgba(255,255,255,.12)] md:text-[5.25rem]">
              <span className="block">Kaderin</span>
              <span className="block title-ember hero-lightning">Karanlık Yüzü</span>
              <span className="block">Seni Bekliyor</span>
            </h1>

            <div className="ghost-line mt-7 text-[11px] uppercase tracking-[0.30em] text-mourning-dim md:text-[12px] md:tracking-[0.32em]">fısıltılar yaklaşır · semboller belirir · kapılar aralanır</div>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#kategoriler" className="occult-button px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
                <span className="relative z-10">Fal Baktır →</span>
              </Link>
              <Link href="/#kategoriler" className="occult-button-ghost px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.20em] text-mourning">
                <span className="relative z-10">Karanlık Kategorileri Keşfet</span>
              </Link>
            </div>

            <div className="mt-12 text-[10px] uppercase tracking-[0.36em] text-mourning-dim">gizli · sezgisel · ritüel · kişiye özel</div>
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

      <Section eyebrow="Süreç" title="Nasıl çalışır?" text="Karanlık ama net. Süreç basit; yorum ise sana özel.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Kapıyı seç", "Sana yakın olan alanı seç. Tarot, kahve, aşk veya gizli sezgiler."],
            ["02", "İz bırak", "Formu doldur, enerjini aktar ve istersen görselini ya da sorunu ekle."],
            ["03", "Mesajı al", "Belirtilen sürede sana özel hazırlanan kehanet yorumunu teslim al."]
          ].map(([no, title, text]) => (
            <div key={no} className="occult-card p-7 text-center">
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-ember/22 bg-ember/10 text-ember shadow-[0_0_14px_rgba(255,0,184,.22)]">{no}</div>
              <h3 className="mb-3 font-display text-[1.6rem] font-semibold text-bone">{title}</h3>
              <p className="text-sm leading-7 text-mourning">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sayılar" title="Gece boyunca açılan kapılar" text="Bu sayılar yaşayan demo veridir; sonradan gerçek sistem verisine bağlanabilir.">
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
          <Link href="#kategoriler" className="occult-button mt-8 gap-2 px-7 py-4 font-semibold text-white">
            <span className="relative z-10 inline-flex items-center gap-2">Kategorileri Keşfet <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
