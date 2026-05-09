import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getPackage } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function OrderPage({ params }: { params: { slug: string } }) {
  const item = getPackage(params.slug);
  if (!item) notFound();
  const c = getCategory(item.categorySlug);
  const isCoffee = item.categorySlug === "kahve-fali";

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href={`/urun/${item.slug}`} className="mb-8 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]"><ArrowLeft className="h-4 w-4" /> Pakete dön</Link>
        <div className="occult-panel p-7 md:p-10">
          <p className="eyebrow-rune mb-4">Bilgilerini bırak</p>
          <h1 className="mt-3 font-display text-[2.25rem] font-black text-bone md:text-[3.7rem]">Sipariş Formu</h1>
          <p className="mt-4 text-mourning">{item.name} · {item.price} TL · {c?.title}</p>
          <form className="mt-10 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Ad Soyad" placeholder="Adınız Soyadınız" />
              <Field label="E-posta" placeholder="ornek@mail.com" type="email" />
              <Field label="Telefon" placeholder="+90..." />
              <Field label="Doğum tarihi" placeholder="GG/AA/YYYY" />
            </div>
            <label className="grid gap-2">
              <span className="text-sm text-mourning">{isCoffee ? "Fincan fotoğrafı yükleme alanı" : "Sormak istediğin ana konu"}</span>
              {isCoffee ? (
                <div className="occult-card p-8 text-center text-mourning">Kahve falı için fincan görseli yükleme alanı. Gerçek backend bağlanınca dosya yükleme aktif edilecek.</div>
              ) : (
                <textarea className="occult-textarea min-h-36" placeholder="Sorunu, hislerini ve bilmemi istediğin detayları yaz." />
              )}
            </label>
            <label className="grid gap-2"><span className="text-sm text-mourning">Ek not</span><textarea className="occult-textarea min-h-28" placeholder="İsteğe bağlı ek not..." /></label>
            <label className="occult-card flex items-start gap-3 p-4 text-sm text-mourning"><input type="checkbox" className="mt-1" />Bu hizmetin eğlence ve kişisel farkındalık amaçlı olduğunu, kesin gelecek garantisi sunmadığını kabul ediyorum.</label>
            <Link href={`/odeme?paket=${item.slug}`} className="occult-button px-8 py-4 text-center font-semibold text-white"><span className="relative z-10">Ödeme Adımına Geç</span></Link>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return <label className="grid gap-2"><span className="text-sm text-mourning">{label}</span><input type={type} placeholder={placeholder} className="occult-input" /></label>;
}
