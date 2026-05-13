"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import { getPackage, formatPrice, buildPaymentCheckoutUrl } from "@/lib/data";
import { PaymentCheckoutButton } from "@/components/PaymentCheckoutButton";

export function OdemeClient() {
  const params = useSearchParams();
  const slug = params.get("paket") || "";
  const talep = params.get("talep") || "";
  const eposta = params.get("eposta") || "";
  const isim = params.get("isim") || "";
  const amount = Number(params.get("tutar") || 0);
  const item = getPackage(slug);
  const checkoutAmount = amount || item?.price || 0;
  const checkoutHref = buildPaymentCheckoutUrl(checkoutAmount, { amount: checkoutAmount, email: eposta, customerName: isim, orderId: talep, packageSlug: slug });

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="studio-panel p-8 md:p-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700"><CreditCard className="h-4 w-4" /> Güvenli ödeme adımı</div>
          <h1 className="font-display text-[2.25rem] font-black text-slate-950 md:text-[3.7rem]">Proje dosyanı panele bağla</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">Ödeme tamamlandığında talebin üretim kuyruğuna alınır. Teslim e-posta gövdesine gönderilmez; satın aldığın e-posta ve e-postana gönderilecek 6 haneli proje anahtarı ile Panelim alanında yaklaşık 3 saat içinde açılır.</p>

          <div className="mt-8 grid gap-5 md:grid-cols-[.95fr_1.05fr]">
            <div className="studio-card p-6">
              <h2 className="font-display text-2xl font-bold text-slate-950">Sipariş özeti</h2>
              <dl className="mt-5 grid gap-3 text-sm text-slate-600">
                <div className="flex justify-between gap-4"><dt>Ürün</dt><dd className="text-slate-950">{item?.name || "Seçilen paket"}</dd></div>
                <div className="flex justify-between gap-4"><dt>Tutar</dt><dd className="text-slate-950">{amount ? formatPrice(amount) : "Ödeme ekranında"}</dd></div>
                <div className="flex justify-between gap-4"><dt>Talep No</dt><dd className="text-slate-950">{talep || "-"}</dd></div>
                <div className="flex justify-between gap-4"><dt>E-posta</dt><dd className="text-slate-950 break-all">{eposta || "Ödeme ekranında aynı e-postayı kullan"}</dd></div>
              </dl>
              <div className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-xs leading-6 text-slate-600"><LockKeyhole className="mb-2 h-5 w-5 text-cyan-600" />Panelde dosyanı görebilmek için formdaki e-postayı kullan ve ödeme sonrası e-postana gelen 6 haneli proje anahtarını sakla.</div>
            </div>

            <div className="studio-card p-6">
              <h2 className="font-display text-2xl font-bold text-slate-950">Ödemeye geç</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Ödeme altyapısı bağlantısı çevre değişkeninden gelir. Canlı kullanımda güvenli ödeme sağlayıcı bağlantısı burada çalışır.</p>
              <div className="mt-5">
                <PaymentCheckoutButton href={checkoutHref} className="studio-button w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white"><span className="relative z-10">Ödemeye Güvenli Geç</span></PaymentCheckoutButton>
              </div>
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs leading-6 text-slate-600"><ShieldCheck className="mb-2 h-5 w-5 text-emerald-600" />Kart bilgileri VivaMotion AI tarafından saklanmaz. Ödeme sağlayıcı sayfasında işlem yapılır.</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3"><Link href="/panel" className="studio-button-shine px-6 py-3 text-sm text-cyan-700"><span className="relative z-10">Panelime Git</span></Link><Link href="/#paketler" className="studio-button-shine px-6 py-3 text-sm text-cyan-700"><span className="relative z-10">Paketlere Dön</span></Link></div>
        </div>
      </div>
    </section>
  );
}
