import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: "İade ve İptal", description: "VivaMotion AI kişiye özel dijital AI paketleri için iade, iptal ve panel teslim koşulları.", path: "/iade" });

const sections = [
  { title: "1. Kişiye özel dijital içerik", body: ["VivaMotion AI paketleri, kullanıcının yazdığı brief ve notlara göre otomatik üretilen müşteriye özel dijital içeriklerdir.", "Üretim dosyası üretimi başladıktan veya panelde teslim edildikten sonra içerik kişiye özel üretildiği için iade/iptal koşulları sınırlıdır."] },
  { title: "2. Satın alma öncesi kontrol", body: ["Kullanıcı satın alma öncesinde doğru ürünü, e-postayı, talep numarasını ve ödeme tutarını kontrol etmelidir.", "Ödeme sağlayıcıda farklı e-posta kullanılması eşleşmeyi geciktirebilir. Bu durumda destek üzerinden doğrulama yapılabilir."] },
  { title: "3. İptal edilebilecek durumlar", body: ["Talep henüz ödeme ile eşleşmemişse veya üretim kuyruğuna alınmamışsa kullanıcı destek üzerinden düzeltme veya iptal talebi iletebilir.", "Mükerrer ödeme, açık teknik hata veya hiç kullanılmamış siparişlerde destek kayıtları incelenerek uygun çözüm sunulabilir."] },
  { title: "4. İade uygulanmayabilecek durumlar", body: ["Üretim dosyası OpenAI ile üretildiyse, panelde teslim edildiyse veya kullanıcıya özel içerik hazırlandıysa iade talebi kabul edilmeyebilir.", "Üretim dosyan kullanıcının beklentisine uymaması, metnin farklı yorumlanması veya kullanıcının fikir değiştirmesi tek başına iade sebebi değildir."] },
  { title: "5. Teslim süresi", body: ["Hedef teslim yaklaşık 3 saattir. Ödeme eşleştirme, servis yoğunluğu, OpenAI/API kesintisi veya teknik sorunlarda süre değişebilir.", "Uzun süreli teknik hata hâlinde destek üzerinden kayıt incelenir ve uygun çözüm sunulur."] },
  { title: "6. Sınır", body: ["Bu ürün profesyonel danışmanlık veya sonuç garantisi değildir."] }
];

export default function RefundPage() {
  return <section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-5xl"><div className="studio-panel p-6 md:p-10 lg:p-12"><p className="eyebrow-chip mb-4">İptal ve iade</p><h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">İade ve İptal</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">VivaMotion AI paketleri panelde teslim edilen müşteriye özel dijital içerik niteliğindedir. Bu sayfa iptal, düzeltme ve iade sınırlarını açıklar.</p><div className="mt-8 space-y-7 text-[15px] leading-8 text-soft md:text-[16px]">{sections.map((section) => <section key={section.title} className="rounded-[1.3rem] border border-cyan-100 bg-white/70 p-5 md:p-6"><h2 className="font-display text-[1.45rem] font-bold text-ink md:text-[1.75rem]">{section.title}</h2><div className="mt-4 space-y-4">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div></div></div></section>;
}
