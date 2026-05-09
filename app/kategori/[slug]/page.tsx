import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, packagesByCategory } from "@/lib/data";
import { PackageCard } from "@/components/Cards";
import { Section } from "@/components/Section";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const c = getCategory(params.slug);
  if (!c) notFound();
  const Icon = c.icon;
  const items = packagesByCategory(params.slug);

  return (
    <div>
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]"><ArrowLeft className="h-4 w-4" /> Ana sayfaya dön</Link>
          <div className="occult-panel p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
            <Icon className="mb-5 h-12 w-12 text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.45)]" />
            <h1 className="font-display text-4xl font-black text-[#f4ebfb] md:text-6xl">{c.title}</h1>
            <p className="mt-3 text-sm italic tracking-[0.08em] text-ember/82">{c.intro}</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-whisper">{c.description}</p>
          </div>
        </div>
      </section>
      <Section title="Paketler" text="İhtiyacına uygun yorum derinliğini seç.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((i) => <PackageCard key={i.slug} item={i} />)}</div>
      </Section>
    </div>
  );
}
