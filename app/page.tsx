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
      <section className="relative min-h-[735px] overflow-hidden px-4 pb-16 pt-0 md:px-6">
        <HeroEffects />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl px-5 pt-[132px] text-center md:pt-[152px]">
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-violet/42 bg-black/42 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.42em] text-white/60 shadow-[0_0_18px_rgba(255,0,184,.18)]">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_12px_rgba(255,0,184,.8)]" />
              Gece açıldığında, perde aralanır
            </div>

            <h1 className="mx-auto max-w-4xl font-display text-[3.25rem] font-black leading-[1.02] tracking-tight text-white drop-shadow-[0_0_18px_rgba(255,255,255,.12)] md:text-[5.05rem]">
              <span className="block">Kaderin</span>
              <span className="block text-ember drop-shadow-[0_0_24px_rgba(255,0,184,.88)]">
                Karanlık Yüzü
              </span>
              <span className="block">Seni Bekliyor</span>
            </h1>

            <p className="mx-auto mt-8 max-w-[720px] text-[15px] leading-8 text-white/56">
              Tarot, kahve falı, aşk yorumu, astroloji ve kadim sezgilerle geleceğin gölgelerini keşfet.
              Her okuma, gecenin sessizliğinde sana özel hazırlanır.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="#kategoriler" className="rounded-full bg-gradient-to-r from-violet via-ember to-poison px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_28px_rgba(255,0,184,.42)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_0_38px_rgba(255,0,184,.72)]">
                Fal Baktır →
              </Link>
              <Link href="/#kategoriler" className="rounded-full border border-violet/45 bg-black/30 px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.20em] text-white/76 shadow-[0_0_16px_rgba(255,0,184,.08)] transition duration-200 hover:border-ember/58 hover:bg-ember/8 hover:text-white hover:shadow-[0_0_28px_rgba(255,0,184,.34)]">
                Karanlık Kategorileri Keşfet
              </Link>
            </div>

            <div className="mt-12 text-[10px] uppercase tracking-[0.36em] text-white/20">
              gizli · sezgisel · ritüel · kişiye özel
            </div>
          </div>
        </div>
      </section>

      <section id="kategoriler" className="relative px-4 py-16 md:px-6">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-abyss via-abyss/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-ember/80">Öne Çıkan Hizmetler</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">Karanlık kapılar</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/#kategoriler" className="text-[11px] uppercase tracking-[0.32em] text-white/45 hover:text-ember">
              Tüm kategorileri gör →
            </Link>
          </div>
        </div>
      </section>

      <Section eyebrow="Süreç" title="Nasıl çalışır?">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Fal türünü seç", "Sana yakın olan kapıyı seç. Tarot, kahve, aşk veya daha fazlası."],
            ["02", "Bilgilerini gönder", "Kısa ve özel formu doldur. Gerekirse fotoğrafını ekle."],
            ["03", "Yorumun hazır olsun", "Belirtilen sürede sana özel sezgisel yorumun hazırlansın."]
          ].map(([no, title, text]) => (
            <div key={no} className="glass rounded-3xl p-7 text-center">
              <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full border border-ember/22 bg-ember/10 text-ember shadow-pink">
                {no}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
              <p className="text-sm leading-6 text-white/60">{text}</p>
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
              <div key={item.title} className="rounded-3xl border border-violet/18 bg-[#080010]/72 p-5 text-center transition hover:border-ember/32 hover:shadow-pink">
                <Icon className="mx-auto mb-3 h-7 w-7 text-ember" />
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-white/55">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Danışan Deneyimleri" title="Karanlığın içinden gelen notlar">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="glass rounded-3xl p-6 transition hover:border-ember/30 hover:shadow-pink">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-white">{item.name}</span>
                <span className="text-sm text-gold">{"★".repeat(item.rating)}</span>
              </div>
              <p className="min-h-20 text-sm leading-6 text-white/65">{item.text}</p>
              <div className="mt-5 inline-flex rounded-full border border-ember/20 bg-ember/10 px-3 py-1 text-xs text-ember">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-ember/20 bg-gradient-to-r from-violet-950/80 to-abyss p-10 text-center shadow-pink">
          <Eye className="mx-auto mb-5 h-12 w-12 text-ember" />
          <h2 className="font-display text-3xl font-black text-white md:text-5xl">
            Perdenin Ardındakini Görmeye Hazır mısın?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Sorunu seç, enerjini gönder ve karanlıkta parlayan yorumu bekle.
          </p>
          <Link href="#kategoriler" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-abyss">
            Kategorileri Keşfet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}