import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { legalInfo } from "@/lib/legal-info";

export const metadata: Metadata = buildPageMetadata({ title: "KVKK Aydınlatma Metni", description: "VivaMotion AI kişisel veri işleme aydınlatma metni.", path: "/kvkk-aydinlatma-metni" });

const sections = [
  { title: "1. Veri sorumlusu", body: [`Veri sorumlusu/hizmet sağlayıcı: ${legalInfo.tradeName}`, `İletişim: ${legalInfo.supportEmail}`] },
  { title: "2. İşlenen veriler", body: ["Ad/rumuz, e-posta, sipariş bilgisi, ödeme eşleşme bilgisi, kullanıcının üretim dosyası için yazdığı konu/notlar ve isteğe bağlı yüklediği görseller işlenebilir.", "Sağlık, dini inanç, biyometrik veri, kimlik belgesi, finansal sır veya üçüncü kişilere ait özel veri paylaşılmamalıdır."] },
  { title: "3. İşleme amaçları", body: ["Sipariş oluşturmak, ödeme eşleşmesini yapmak, OpenAI destekli üretim dosyası üretmek, panelde teslim sağlamak, destek taleplerini yanıtlamak, mevzuattan doğan yükümlülükleri yerine getirmek ve kötüye kullanımı önlemek."] },
  { title: "4. Aktarım", body: ["Veriler; ödeme sağlayıcısı, barındırma altyapısı, e-posta altyapısı ve OpenAI/API hizmetleri gibi hizmetin yürütülmesi için gerekli teknik taraflarla sınırlı olarak paylaşılabilir."] },
  { title: "5. Saklama ve silme", body: ["Veriler hizmetin sunulması, destek ve yasal yükümlülükler için gerekli süre boyunca saklanır. Kullanıcı destek kanalı üzerinden silme/düzeltme taleplerini iletebilir."] },
  { title: "6. Haklar", body: ["Kullanıcı, KVKK kapsamındaki başvuru haklarını destek e-postası üzerinden kullanabilir. Başvurularda kimlik doğrulama için sipariş e-postası ve talep numarası istenebilir."] }
];

export default function KvkkPage() {
  return <section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-5xl"><div className="studio-panel p-6 md:p-10 lg:p-12"><p className="eyebrow-chip mb-4">Kişisel veriler</p><h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">KVKK Aydınlatma Metni</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">Bu metin, VivaMotion AI hizmetlerinde kişisel verilerin hangi amaçlarla işlendiğini açıklar.</p><div className="mt-8 space-y-7 text-[15px] leading-8 text-soft md:text-[16px]">{sections.map((section) => <section key={section.title} className="rounded-[1.3rem] border border-cyan-100 bg-white/70 p-5 md:p-6"><h2 className="font-display text-[1.45rem] font-bold text-ink md:text-[1.75rem]">{section.title}</h2><div className="mt-4 space-y-4">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div></div></div></section>;
}
