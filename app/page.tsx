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
      <section className="relative min-h-[760px] overflow-hidden px-4 pb-16 pt-0 md:px-6">
        <HeroEffects />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl px-5 pt-[128px] text-center md:pt-[148px]">
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-violet/42 bg-black/42 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.42em] text-white/60 shadow-[0_0_18px_rgba(255,0,184,.18)]">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_12px_rgba(255,0,184,.8)]" />
              Gece açıldığında, perde aralanır
            </div>

            <h1 className="mx-auto max-w-4xl font-display text-[3.45rem] font-black leading-[1.02] tracking-tight text-[#f4ebfb] drop-shadow-[0_0_18px_rgba(255,255,255,.12)] md:text-[5.25rem]">
              <span className="block">Kaderin</span>
              <span className="block text-ember drop-shadow-[0_0_28px_rgba(255,0,184,.96)]">Karanlık Yüzü</span>
              <span className="block">Seni Bekliyor</span>
            </h1>

            <p className="mx-auto mt-8 max-w-[760px] text-[16px] leading-8 text-whisper">
              Tarot, kahve falı, aşk yorumu, astroloji ve kadim sezgilerle geleceğin gölgelerini keşfet.
              Her okuma, gecenin sessizliğinde sana özel hazırlanır.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#kategoriler" className="occult-button px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white">
                <span className="relative z-10">Fal Baktır →</span>
              </Link>
              <Link href="/#kategoriler" className="occult-button-ghost px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.20em] text-white/82">
                <span className="relative z-10">Karanlık Kategorileri Keşfet</span>
              </Link>
            </div>

            <div className="mt-12 text-[10px] uppercase tracking-[0.36em] text-white/20">gizli · sezgisel · ritüel · kişiye özel</div>
          </div>
        </div>
      </section>

      <section id="kategoriler" className="relative px-4 py-16 md:px-6">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-abyss via-abyss/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-ember/80">Öne Çıkan Hizmetler</p>
            <h2 className="font-display text-3xl font-bold text-[#f3ebfa] md:text-5xl">Karanlık kapılar</h2>
            <p className="mt-4 text-whisper">Büyünün, sezginin ve karanlık sembollerin içinden sana en yakın kapıyı seç.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/#kategoriler" className="occult-link">
              Tüm kategorileri gör →
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow="Süreç" title="Nasıl çalışır?" text="Karanlık ama net. Süreç basit; yorum ise sana özel.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Fal türünü seç", "Sana yakın olan kapıyı seç. Tarot, kahve, aşk veya daha fazlası."],
            ["02", "Bilgilerini gönder", "Kısa ve özel formu doldur. Gerekirse fotoğrafını ekle."],
            ["03", "Yorumun hazır olsun", "Belirtilen sürede sana özel sezgisel yorumun hazırlansın."]
          ].map(([no, title, text]) => (
            <div key={no} className="occult-card p-7 text-center">
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-ember/22 bg-ember/10 text-ember shadow-[0_0_14px_rgba(255,0,184,.22)]">{no}</div>
              <h3 className="mb-3 font-display text-2xl font-semibold text-[#f3ebfa]">{title}</h3>
              <p className="text-sm leading-7 text-whisper">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sayılar" title="Gece boyunca açılan kapılar">
        <Stats />
      </Section>

      <Section eyebrow="Güven" title="Karanlık görünür, süreç nettir">
        <div className="grid gap-4 md:grid-cols-5">
          {trustBadges.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="occult-card p-5 text-center">
                <Icon className="mx-auto mb-3 h-7 w-7 text-ember drop-shadow-[0_0_12px_rgba(255,0,184,.4)]" />
                <h3 className="font-display text-base font-semibold text-[#f3ebfa]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-whisper">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Danışan Deneyimleri" title="Karanlığın içinden gelen notlar">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="occult-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-[#f4ebfb]">{item.name}</span>
                <span className="text-sm text-gold">{"★".repeat(item.rating)}</span>
              </div>
              <p className="min-h-20 text-sm leading-7 text-whisper">{item.text}</p>
              <div className="mt-5 inline-flex rounded-full border border-ember/20 bg-ember/10 px-3 py-1 text-xs text-ember">{item.category}</div>
            </div>
          ))}
        </div>
      </Section>

      <section className="px-4 py-20 md:px-6">
        <div className="occult-panel mx-auto max-w-5xl p-10 text-center">
          <Eye className="mx-auto mb-5 h-12 w-12 text-ember drop-shadow-[0_0_18px_rgba(255,0,184,.35)]" />
          <h2 className="font-display text-3xl font-black text-[#f4ebfb] md:text-5xl">Perdenin Ardındakini Görmeye Hazır mısın?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-whisper">Sorunu seç, enerjini gönder ve karanlıkta parlayan yorumu bekle.</p>
          <Link href="#kategoriler" className="occult-button mt-8 gap-2 px-7 py-4 font-semibold text-white">
            <span className="relative z-10 inline-flex items-center gap-2">Kategorileri Keşfet <ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
