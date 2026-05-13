import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { legalInfo, legalProductSummary } from "@/lib/legal-info";

export const metadata: Metadata = buildPageMetadata({
  title: "Ön Bilgilendirme Formu",
  description: "VivaMotion AI kişiye özel dijital AI paketleri için ön bilgilendirme formu.",
  path: "/on-bilgilendirme-formu"
});

const rows = [
  ["Satıcı/Hizmet Sağlayıcı", legalInfo.tradeName],
  ["Satıcı Türü", legalInfo.sellerType],
  ["Web Sitesi", legalInfo.website],
  ["Adres", legalInfo.address],
  ["Vergi Bilgisi", `${legalInfo.taxOffice} — ${legalInfo.taxNumber}`],
  ["Destek", `${legalInfo.supportEmail} · ${legalInfo.supportPhone}`],
  ["Ürün/Hizmet", legalInfo.productType],
  ["Teslimat", `Fiziki kargo yoktur. Üretim dosyası ${legalInfo.deliveryWindow} içinde Panelim alanında görüntülenir.`],
  ["Ödeme", "Web sitesinde tanımlı güvenli ödeme sağlayıcısı üzerinden alınır."],
  ["İade/İptal", "Kişiye özel dijital içerik niteliği nedeniyle üretim başladıktan veya panelde teslim edildikten sonra iade koşulları sınırlıdır."],
  ["Panel Erişimi", "Kullanıcı satın alma e-postası ve 6 haneli dosya anahtarıyla Panelim alanından üretim dosyanınu görüntüler."]
];

export default function OnBilgilendirmePage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="studio-panel p-6 md:p-10 lg:p-12">
          <p className="eyebrow-chip mb-4">Satın alma öncesi</p>
          <h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Ön Bilgilendirme Formu</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">Bu form, satın alma tamamlanmadan önce ürünün niteliği, teslim şekli ve temel tüketici koşulları hakkında bilgilendirme sağlar.</p>
          <div className="mt-8 overflow-hidden rounded-[1.3rem] border border-cyan-100">
            {rows.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-cyan-100 bg-white/70 p-4 last:border-b-0 md:grid-cols-[240px_1fr] md:p-5">
                <div className="font-display text-ink">{label}</div>
                <div className="text-sm leading-7 text-soft md:text-base">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-5 rounded-[1.3rem] border border-cyan-100 bg-white/70 p-5 text-sm leading-7 text-soft md:p-6 md:text-base">
            {legalProductSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p>Satın alma öncesinde ürün adı, fiyatı, teslim süresi ve ödeme bilgileri sipariş/ödeme sayfasında ayrıca gösterilir.</p>
            <p>Kullanıcı, ödeme öncesinde <Link href="/mesafeli-satis-sozlesmesi" className="text-coral underline decoration-coral/40 underline-offset-4">Mesafeli Satış Sözleşmesi</Link>, <Link href="/teslimat-iade-sartlari" className="text-coral underline decoration-coral/40 underline-offset-4">Teslimat ve İade Şartları</Link> ve <Link href="/gizlilik" className="text-coral underline decoration-coral/40 underline-offset-4">Gizlilik Politikası</Link> metinlerini okuyup kabul eder.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
