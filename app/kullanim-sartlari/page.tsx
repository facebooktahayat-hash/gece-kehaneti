import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: "Kullanım Şartları", description: "VivaMotion AI OpenAI destekli panel paketleri için kullanım şartları.", path: "/kullanim-sartlari" });

const sections = [
  { title: "1. Hizmetin niteliği", body: ["VivaMotion AI, kullanıcının yazdığı brief ve notlardan yola çıkarak OpenAI destekli AI medya paketleri üretir.", "Paketler atmosferik, kreatif ve reklam odaklı bir dille hazırlanır; e-posta gövdesine değil Panelim alanına teslim edilir."] },
  { title: "2. Sunulmayan hizmetler", body: ["Platform; izinsiz taklit, yanıltıcı beyan veya kesin satış sonucu garantisi sunmaz.", "Paketler terapi, psikolojik teşhis/tedavi, sağlık, hukuk, finans, yatırım veya resmi karar danışmanlığı yerine geçmez."] },
  { title: "3. Panel teslimi", body: ["Kullanıcı üretim dosyası talep formunu doldurur, ödeme adımına geçer ve ödeme eşleşince dosya üretim kuyruğuna alınır.", "Hedef teslim süresi yaklaşık 3 saattir. Teknik yoğunluk, ödeme eşleştirme sorunu veya servis kesintisi hâlinde süre değişebilir.", "Üretim dosyası, satın alma sırasında kullanılan e-posta ve 6 haneli dosya anahtarı ile Panelim alanında görüntülenir."] },
  { title: "4. Kullanıcı sorumluluğu", body: ["Kullanıcı doğru e-posta, talep numarası, ödeme bilgisi ve kendisine gönderilen 6 haneli dosya anahtarını korumakla yükümlüdür.", "Kullanıcı hukuka aykırı, takip/taciz, şiddet, kendine zarar verme, üçüncü kişilerin mahrem bilgilerini ifşa etme veya profesyonel danışmanlık gerektiren talepler göndermemelidir."] },
  { title: "5. AI çıktıları", body: ["OpenAI destekli paketler otomatik üretilir. İçerik kreatif medya üretimi ve reklam fikri geliştirme amaçlıdır; kesin doğruluk, sonuç veya karar garantisi vermez.", "Platform riskli veya uygunsuz talepleri reddedebilir, güvenli sınıra çekebilir ya da destek yönlendirmesi yapabilir."] },
  { title: "6. Ödeme", body: ["Ödeme işlemleri seçilen üçüncü taraf ödeme altyapısı üzerinden yürütülür. Kart bilgileri VivaMotion AI tarafından saklanmaz.", "Ödeme sağlayıcıda kullanılan e-posta ile üretim dosyası talep formundaki e-postanın aynı olması eşleşmeyi hızlandırır."] }
];

export default function TermsPage() {
  return <section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-5xl"><div className="studio-panel p-6 md:p-10 lg:p-12"><p className="eyebrow-chip mb-4">Sınırlar</p><h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Kullanım Şartları</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">Bu şartlar; üretim dosyası talebi, ödeme eşleştirme, OpenAI üretimi, panel teslimi ve kullanıcı sorumluluklarını açıklar.</p><div className="mt-8 space-y-7 text-[15px] leading-8 text-soft md:text-[16px]">{sections.map((section) => <section key={section.title} className="rounded-[1.3rem] border border-cyan-100 bg-white/70 p-5 md:p-6"><h2 className="font-display text-[1.45rem] font-bold text-ink md:text-[1.75rem]">{section.title}</h2><div className="mt-4 space-y-4">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div></div></div></section>;
}
