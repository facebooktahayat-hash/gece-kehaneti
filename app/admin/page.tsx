import { notFound } from "next/navigation";

export default function AdminPage() {
  if (process.env.NEXT_PUBLIC_SHOW_ADMIN !== "true") notFound();
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="studio-panel p-8 md:p-12">
          <p className="eyebrow-chip mb-4">Yönetim odası</p>
          <h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Yönetici Paneli</h1>
          <p className="mt-5 text-soft">Bu alan yönetim görünümüdür. Gerçek backend bağlandığında üretim dosyası talepleri, kullanıcılar, ödeme eşleşmeleri ve panel dosyaları burada yönetilebilir.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Üretim dosyası Talepleri", "Kullanıcılar", "Panel Dosyaları", "İçerikler", "Ödeme Eşleşmeleri", "Ayarlar"].map((title) => <div key={title} className="studio-card p-5"><div className="font-display text-xl text-ink">{title}</div><p className="mt-2 text-sm text-soft">Kart görünümü</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
