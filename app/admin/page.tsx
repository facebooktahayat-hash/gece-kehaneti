import { notFound } from "next/navigation";

export default function AdminPage() {
  if (process.env.NEXT_PUBLIC_SHOW_ADMIN !== "true") {
    notFound();
  }

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="occult-panel p-8 md:p-12">
          <p className="eyebrow-rune mb-4">Yönetim odası</p>
          <h1 className="font-display text-[2.25rem] font-black text-bone md:text-[3.7rem]">Yönetici Paneli</h1>
          <p className="mt-5 text-mourning">Bu alan yönetim görünümüdür. Gerçek backend bağlandığında yorum talepleri, kullanıcılar, kredi hareketleri ve içerikler burada yönetilebilir.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Yorum Talepleri", "Kullanıcılar", "Yorumlar", "İçerikler", "Kredi Hareketleri", "Ayarlar"].map((title) => (
              <div key={title} className="occult-card p-5">
                <div className="font-display text-xl text-bone">{title}</div>
                <p className="mt-2 text-sm text-mourning">Kart görünümü</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
