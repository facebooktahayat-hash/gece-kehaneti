import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { legalInfo } from "@/lib/legal-info";

export const metadata: Metadata = buildPageMetadata({
  title: "Teslimat ve İade Şartları",
  description: "VivaMotion AI panel teslimli kişiye özel dijital paketler için teslimat ve iade şartları.",
  path: "/teslimat-iade-sartlari"
});

const sections = [
  { title: "1. Teslimat yöntemi", body: [
    "VivaMotion AI ürünleri fiziki kargo içermez. Satın alınan paketler müşteriye özel dijital içerik olarak hazırlanır.",
    "Üretim dosyası, satın alma sırasında kullanılan e-posta ve 6 haneli dosya anahtarı ile erişilen Panelim alanında görüntülenir. E-posta gövdesine üretim dosyası gönderilmez."
  ]},
  { title: "2. Teslim süresi", body: [
    `Hedef teslim süresi ödeme eşleşmesinden sonra ${legalInfo.deliveryWindow}tir.`,
    "Ödeme sağlayıcı doğrulaması, e-posta/talep numarası uyuşmazlığı, servis yoğunluğu, OpenAI/API erişimi veya teknik bakım gibi durumlarda teslim süresi uzayabilir.",
    "Eşleşmeyen ödemelerde kullanıcı destek kanalı üzerinden talep numarası, ödeme e-postası ve ödeme dekontu/işlem bilgisi paylaşarak destek alabilir."
  ]},
  { title: "3. İptal ve düzeltme", body: [
    "Talep henüz ödeme ile eşleşmemişse veya üretim kuyruğuna alınmamışsa kullanıcı destek üzerinden e-posta, not veya ürün seçimi için düzeltme talebi iletebilir.",
    "Üretim kuyruğuna alınan veya panelde erişime açılan paketler müşteriye özel dijital içerik niteliği taşıdığı için iptal/iade talepleri sınırlı biçimde değerlendirilir."
  ]},
  { title: "4. İade değerlendirmesi", body: [
    "Mükerrer ödeme, açık teknik hata, hiç oluşturulmamış sipariş veya uzun süreli teslimat problemi gibi durumlarda destek kayıtları incelenerek uygun çözüm sunulur.",
    "Üretim dosyan kişisel beklentiye uymaması, farklı yorumlanması veya kullanıcının fikir değiştirmesi tek başına iade sebebi olarak kabul edilmeyebilir."
  ]},
  { title: "5. Destek", body: [
    `Destek e-postası: ${legalInfo.supportEmail}`,
    "Kullanıcı destek talebinde sipariş e-postasını, talep numarasını ve varsa ödeme işlem bilgisini belirtmelidir."
  ]}
];

export default function TeslimatIadeSartlariPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="studio-panel p-6 md:p-10 lg:p-12">
          <p className="eyebrow-chip mb-4">Panel teslimi</p>
          <h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Teslimat ve İade Şartları</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">Bu sayfa, VivaMotion AI AI medya paketlerinin teslimat, iptal ve iade süreçlerini açıklar.</p>
          <div className="mt-8 space-y-7 text-[15px] leading-8 text-soft md:text-[16px]">
            {sections.map((section) => (
              <section key={section.title} className="rounded-[1.3rem] border border-cyan-100 bg-white/70 p-5 md:p-6">
                <h2 className="font-display text-[1.45rem] font-bold text-ink md:text-[1.75rem]">{section.title}</h2>
                <div className="mt-4 space-y-4">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
