import Link from "next/link";
import { categories, packages, testimonials, trustBadges } from "@/lib/data";
import { CategoryCard, PackageCard } from "@/components/Cards";
import { Section } from "@/components/Section";
import { Stats } from "@/components/Stats";
import { HeroEffects } from "@/components/HeroEffects";
import { ArrowRight, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[700px] overflow-hidden px-4 pb-24 pt-10 md:px-6 md:pb-24 md:pt-4">
        <HeroEffects />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl px-5 pt-20 text-center md:pt-28">
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-ember/30 bg-black/36 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.42em] text-white/58 shadow-[0_0_16px_rgba(255,0,184,.22)]">
              <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_12px_rgba(255,0,184,.8)]" />
              Gece açıldığında, perde aralanır
            </div>

            <h1 className="mx-auto max-w-4xl font-display text-[3.35rem] font-black leading-[1.02] tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,.16)] md:text-[5.15rem]">
              <span className="block">Kaderin</span>
              <span className="block text-ember drop-shadow-[0_0_24px_rgba(255,0,184,.88)]">
                Karanlık Yüzü
              </span>
              <span className="block">Seni Bekliyor</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[700px] text-base leading-8 text-white/54">
              Tarot, kahve falı, aşk yorumu, astroloji ve kadim sezgilerle geleceğin gölgelerini keşfet.
              Her okuma, gecenin sessizliğinde sana özel hazırlanır.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#kategoriler"
                className="rounded-full bg-gradient-to-r from-violet via-ember to-poison px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_0_28px_rgba(255,0,184,.42)] transition duration-200 hover:scale-[1.02] hover:shadow-[0_0_36px_rgba(255,0,184,.72)]"
              >
                Fal Baktır →
              </Link>
              <Link
                href="/#kategoriler"
                className="rounded-full border border-white/18 bg-black/28 px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.20em] text-white/75 shadow-[0_0_16px_rgba(255,0,184,.08)] transition duration-200 hover:border-ember/50 hover:bg-ember/8 hover:text-white hover:shadow-[0_0_26px_rgba(255,0,184,.36)]"
              >
                Karanlık Kategorileri Keşfet
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-6xl">
            <Stats />
          </div>
        </div>
      </section>

      <Section
        id="kategoriler"
        eyebrow="Karanlık Kategoriler"
        title="Hangi kapıdan geçeceksin?"
        text="Her kategori farklı bir sembol, farklı bir enerji ve farklı bir soru için hazırlandı."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Öne Çıkan Paketler"
        title="En çok seçilen kehanetler"
        text="Hızlı bir bakıştan derin bir ritüel yorumuna kadar farklı seviyelerde paketler."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {packages
            .filter((item) =>
              ["tarot-derin-yorum", "kahve-fali-kisa-yorum", "ask-fali-premium-rituel-yorum"].includes(item.slug)
            )
            .map((item) => (
              <PackageCard key={item.slug} item={item} />
            ))}
        </div>
      </Section>

      <Section eyebrow="Nasıl Çalışır?" title="Üç adımda yorumun hazırlanır">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Fal türünü seç", "Tarot, kahve, aşk, astroloji veya diğer kategorilerden birini seç."],
            ["02", "Bilgilerini gönder", "Sorunu, notunu ve gerekiyorsa görselini güvenle paylaş."],
            ["03", "Yorumun hazırlansın", "Seçtiğin pakete göre kişiye özel yorumun panelinde görüntülensin."]
          ].map(([no, title, text]) => (
            <div key={no} className="glass rounded-3xl p-7">
              <div className="mb-5 text-4xl font-black text-ember/70">{no}</div>
              <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
              <p className="text-sm leading-6 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Güven" title="Karanlık görünür, süreç nettir">
        <div className="grid gap-4 md:grid-cols-5">
          {trustBadges.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center">
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
            <div key={item.name} className="glass rounded-3xl p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-white">{item.name}</span>
                <span className="text-sm text-gold">{"★".repeat(item.rating)}</span>
              </div>
              <p className="min-h-20 text-sm leading-6 text-white/65">{item.text}</p>
              <div className="mt-5 inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="px-4 py-20 md:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-ember/20 bg-gradient-to-r from-violet-950/80 to-abyss p-10 text-center shadow-[0_0_28px_rgba(255,0,184,.24)]">
          <Eye className="mx-auto mb-5 h-12 w-12 text-ember" />
          <h2 className="text-3xl font-black text-white md:text-5xl">
            Perdenin Ardındakini Görmeye Hazır mısın?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Sorunu seç, enerjini gönder ve karanlıkta parlayan yorumu bekle.
          </p>
          <Link
            href="#kategoriler"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-abyss"
          >
            Kategorileri Keşfet <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}