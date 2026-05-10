import { Moon, Send, Sparkles } from "lucide-react";

const contactNotes = [
  "Yanıt süresi: 12 saat içinde",
  "Çalışma: Her gün, 7/24"
];

export default function ContactPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="eyebrow-rune mb-4">İletişim</p>
          <h1 className="font-display text-[2.45rem] font-black leading-none text-bone md:text-[4.6rem]">Bize ulaş</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-mourning md:text-base">
            Sorun, görüş ve özel istekler için bize yaz. Gece sessizliğinde yanıtlarız.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div className="occult-panel p-7 md:p-9">
            <div className="relative z-10">
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-frost/20 bg-frost/10 shadow-[0_0_28px_rgba(0,215,255,.14)]">
                <Moon className="h-8 w-8 text-frost drop-shadow-[0_0_14px_rgba(0,215,255,.72)]" />
              </div>
              <h2 className="font-display text-3xl font-black text-bone">Gece hattı açık</h2>
              <p className="mt-4 text-sm leading-7 text-mourning">
                Sipariş durumun, özel talebin veya aklında kalan bir işaret varsa mesajını gönder. Karanlığın içinden seçilen yanıt sana döner.
              </p>

              <div className="mt-8 grid gap-3">
                {contactNotes.map((note, index) => (
                  <div key={note} className="rounded-[1.05rem] border border-violet/18 bg-black/25 px-4 py-4 text-sm text-mourning shadow-[inset_0_1px_0_rgba(255,255,255,.03)]">
                    <span className="mr-2 font-mono text-xs text-frost">0{index + 1}</span>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="occult-panel p-7 md:p-9">
            <form className="relative z-10 grid gap-4">
              <div className="mb-2 flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow-rune mb-3">Mesaj gönder</p>
                  <h2 className="font-display text-3xl font-black text-bone">Kehanet masasına not bırak</h2>
                </div>
                <Sparkles className="hidden h-8 w-8 text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.45)] sm:block" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Ad Soyad</span>
                  <input className="occult-input" placeholder="Adınız Soyadınız" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">E-posta</span>
                  <input className="occult-input" placeholder="Yanıt alacağınız adres" type="email" />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Konu</span>
                <input className="occult-input" placeholder="Sipariş, özel talep veya soru" />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-mourning">Mesaj</span>
                <textarea className="occult-textarea" placeholder="Geceye bırakmak istediğiniz mesajı yazın..." />
              </label>

              <button className="occult-button mt-2 w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white" type="button">
                <span className="relative z-10 inline-flex items-center gap-2">Gönder <Send className="h-4 w-4" /></span>
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
