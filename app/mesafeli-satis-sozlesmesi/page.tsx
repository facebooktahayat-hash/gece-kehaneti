import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { legalInfo, legalProductSummary } from "@/lib/legal-info";

export const metadata: Metadata = buildPageMetadata({
  title: "Mesafeli Satış Sözleşmesi",
  description: "VivaMotion AI kişiye özel dijital AI paketleri için mesafeli satış sözleşmesi.",
  path: "/mesafeli-satis-sozlesmesi"
});

const sections = [
  { title: "1. Taraflar", body: [
    `Satıcı/Hizmet Sağlayıcı: ${legalInfo.tradeName}`,
    `Satıcı Türü: ${legalInfo.sellerType}`,
    `Marka/Web Sitesi: ${legalInfo.brandName} — ${legalInfo.website}`,
    `Adres: ${legalInfo.address}`,
    `Vergi Bilgisi: ${legalInfo.taxOffice} — ${legalInfo.taxNumber}`,
    `MERSİS: ${legalInfo.mersis}`,
    `Destek E-postası: ${legalInfo.supportEmail}`,
    `Telefon/Destek Kanalı: ${legalInfo.supportPhone}`,
    "Alıcı/Tüketici: Sipariş formunda ad/rumuz, e-posta ve ödeme bilgilerinin sahibi olarak işlem yapan kullanıcıdır."
  ]},
  { title: "2. Sözleşmenin konusu", body: [
    "Bu sözleşme, alıcının VivaMotion AI web sitesi üzerinden satın aldığı AI medya üretim paketi hizmetinin satış, ödeme, teslim, iptal ve iade koşullarını düzenler.",
    ...legalProductSummary
  ]},
  { title: "3. Ürün, fiyat ve ödeme", body: [
    "Ürün adı, içerik kapsamı, teslim süresi ve satış bedeli ilgili ürün/sipariş sayfasında gösterilir.",
    "Satış bedeli Türk Lirası olarak gösterilir. Ödeme, web sitesinde tanımlı güvenli ödeme sağlayıcısı üzerinden alınır.",
    "Ödeme sırasında kullanılan e-posta adresi ile sipariş formundaki e-posta adresinin aynı olması panel eşleşmesi için önerilir."
  ]},
  { title: "4. Teslimat", body: [
    "Ürün fiziki kargo ile gönderilmez. Satın alınan içerik AI medya üretim paketi olarak hazırlanır.",
    `Ödeme eşleşmesinden sonra hedef teslim süresi ${legalInfo.deliveryWindow}tir. Teknik yoğunluk, ödeme sağlayıcı doğrulaması, OpenAI/API erişimi veya bakım çalışmaları nedeniyle süre değişebilir.`,
    "Üretim dosyası, satın alma sırasında kullanılan e-posta ve 6 haneli dosya anahtarı ile erişilen Panelim alanında görüntülenir. Üretim dosyası e-posta gövdesi olarak gönderilmez."
  ]},
  { title: "5. Cayma hakkı ve dijital içerik istisnası", body: [
    "Alıcı, mesafeli satış mevzuatındaki genel cayma hakkı hakkında bilgilendirildiğini kabul eder.",
    "Kullanıcının onayıyla üretimine başlanan, müşteriye özel hazırlanan ve dijital ortamda teslim edilen paketlerde cayma hakkı, mevzuatta yer alan istisnalar kapsamında sınırlı olabilir.",
    "Üretim dosyası üretimi başlamadan önce iptal/düzeltme talepleri destek kanalı üzerinden incelenir. Üretim dosyası üretildikten veya panelde erişime açıldıktan sonra iade talepleri müşteriye özel dijital içerik niteliği dikkate alınarak değerlendirilir."
  ]},
  { title: "6. Kullanıcının sorumlulukları", body: [
    "Kullanıcı; doğru e-posta bilgisi vermek, ödeme ekranında aynı e-postayı kullanmak, talep numarasını ve 6 haneli dosya anahtarını saklamak ve üçüncü kişilere ait hassas/özel verileri izinsiz paylaşmamakla sorumludur.",
    "Kullanıcı; sağlık, hukuk, finans, güvenlik, kriz, kendine/başkasına zarar verme veya acil destek gerektiren konuları bu hizmetin konusu yapmamalıdır. Bu alanlarda yetkili profesyonellere başvurulmalıdır."
  ]},
  { title: "7. Hizmet sınırları", body: [
    "VivaMotion AI, OpenAI destekli AI medya üretim paketi üretir. Paketler profesyonel danışmanlık, üçüncü kişiler üzerinde etki veya sonuç garantisi niteliğinde değildir.",
    "Paketler kullanıcının sağladığı metinden yola çıkan yaratıcı, sembolik ve kreatif medya deneyimi olarak değerlendirilmelidir."
  ]},
  { title: "8. Uyuşmazlık", body: [
    "Taraflar, uyuşmazlıklarda öncelikle destek kanalı üzerinden çözüm arar. Mevzuattan doğan tüketici başvuru hakları saklıdır.",
    "Alıcı, sipariş tamamlamadan önce bu sözleşmeyi elektronik ortamda okuduğunu, anladığını ve kabul ettiğini beyan eder."
  ]}
];

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="studio-panel p-6 md:p-10 lg:p-12">
          <p className="eyebrow-chip mb-4">Hukuki metin</p>
          <h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Mesafeli Satış Sözleşmesi</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">Bu sayfa, VivaMotion AI üzerinden satın alınan AI medya paketlerinin satış ve teslim koşullarını açıklar.</p>
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
