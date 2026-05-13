import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit, CheckCircle2, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { buildPageMetadata, faqJsonLd, jsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Medya Üretimi Nedir? | Ürün Videosu ve Reklam Görseli",
  description: "AI medya üretimi; ürün fotoğrafı, marka bilgisi ve kampanya hedefini video brief’i, reklam görseli promptu ve sosyal medya metnine dönüştüren kreatif içerik sürecidir.",
  path: "/ai-medya-uretimi"
});

const faq = [
  {
    question: "AI medya üretimi nedir?",
    answer: "Ürün, marka ve hedef kitle bilgisine göre video fikri, görsel üretim promptu, sosyal medya metni, storyboard ve kampanya brief’i hazırlayan OpenAI destekli kreatif üretim formatıdır."
  },
  {
    question: "VivaMotion AI çıktısı nerede görüntülenir?",
    answer: "Satın alma sırasında kullanılan e-posta ve 6 haneli proje anahtarı ile Panelim alanında görüntülenir. Teslim e-posta gövdesine değil panele yapılır."
  },
  {
    question: "Hangi işler için kullanılır?",
    answer: "E-ticaret ürün tanıtımı, sosyal medya reklamı, Reels/TikTok/Shorts fikri, ürün fotoğrafı canlandırma, avatar sunucu video ve marka kampanyası için kullanılabilir."
  },
  {
    question: "Gerçek kişi veya marka hakları nasıl korunur?",
    answer: "Kullanıcı yalnızca hak sahibi olduğu veya kullanım izni bulunan görsel ve marka materyallerini yüklemelidir. İzinsiz gerçek kişi, ünlü veya marka taklidi yapılmaz."
  }
];

const useCases = [
  "Ürün fotoğrafını kısa video sahne akışına dönüştürmek",
  "Instagram Reels, TikTok ve Shorts için hook ve CTA üretmek",
  "E-ticaret görselleri için arka plan, ışık ve kompozisyon promptu almak",
  "Lansman veya indirim kampanyası için kreatif açıları tek dosyada görmek"
];

export default function AiMediaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(faq))} />
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="studio-panel p-7 md:p-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
              <BrainCircuit className="h-4 w-4" /> OpenAI destekli kreatif içerik
            </div>
            <h1 className="font-display text-[2.35rem] font-black leading-tight text-slate-950 md:text-[4rem]">AI medya üretimi nedir?</h1>
            <p className="mt-6 max-w-3xl text-[15px] leading-8 text-slate-600 md:text-lg">
              AI medya üretimi; ürün fotoğrafını, marka tonunu ve kampanya hedefini uygulanabilir video brief’i, reklam görseli promptu, sosyal medya metni ve storyboard formatına dönüştüren dijital kreatif süreçtir.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/paketler" className="studio-button px-7 py-4 text-center font-semibold text-white"><span className="relative z-10">Paketleri İncele</span></Link>
              <Link href="/urun/ultimate-ai-kampanya" className="studio-button-shine px-7 py-4 text-center font-semibold text-cyan-700"><span className="relative z-10">Premium Kampanya</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <div className="studio-card p-6"><Sparkles className="mb-4 h-7 w-7 text-pink-500" /><h2 className="font-display text-[1.45rem] font-semibold text-slate-950">Satış odaklı</h2><p className="mt-3 text-sm leading-7 text-slate-600">Her dosya ürün avantajı, hedef kitle, dikkat çekici ilk saniye ve net çağrı metni üzerine kurulur.</p></div>
          <div className="studio-card p-6"><LockKeyhole className="mb-4 h-7 w-7 text-cyan-600" /><h2 className="font-display text-[1.45rem] font-semibold text-slate-950">Panelde teslim</h2><p className="mt-3 text-sm leading-7 text-slate-600">Teslim dosyası satın aldığın e-posta ve 6 haneli proje anahtarı ile Panelim alanında açılır.</p></div>
          <div className="studio-card p-6"><ShieldCheck className="mb-4 h-7 w-7 text-emerald-600" /><h2 className="font-display text-[1.45rem] font-semibold text-slate-950">Güvenli kullanım</h2><p className="mt-3 text-sm leading-7 text-slate-600">İzinsiz kişi, ünlü, marka taklidi veya yanıltıcı sahte içerik üretimi desteklenmez.</p></div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="studio-panel p-7 md:p-9">
            <h2 className="font-display text-[2rem] font-bold text-slate-950">Hangi aramalara cevap verir?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Bu sayfa; “AI ürün videosu”, “AI reklam görseli”, “fotoğraf canlandırma”, “Reels içerik paketi”, “ürün video promptu” ve “OpenAI destekli kreatif stüdyo” aramalarına net cevap vermek için hazırlanmıştır.</p>
          </div>
          <div className="grid gap-4">
            {useCases.map((item) => <div key={item} className="studio-card flex items-start gap-3 p-5 text-sm leading-7 text-slate-600"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-3xl"><p className="eyebrow-chip mb-3">Sık sorulan sorular</p><h2 className="font-display text-[2rem] font-bold text-slate-950 md:text-[2.7rem]">AI medya üretimi hakkında net yanıtlar</h2></div>
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((item) => <div key={item.question} className="studio-card p-6"><h3 className="font-display text-[1.35rem] font-semibold text-slate-950">{item.question}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
