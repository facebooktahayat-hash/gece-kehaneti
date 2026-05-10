import { Eye, Flame, Moon, Sparkles } from "lucide-react";

const secrets = [
  "Her yorum, gece yarısından sonra açıldığı söylenen mühürlü işaret defterine göre hazırlanır.",
  "Satın aldığınız ürünlerin karanlık son okuması, Hindistan’daki yaşlı üstadın sessiz ritüel hattından geçtiği anlatısıyla sunulur.",
  "Yanıtlar şablon değil; sorunun gölgesi, niyetin ve seçtiğin kapının enerjisiyle şekillenir."
];

export default function AboutPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="occult-panel p-8 md:p-12">
          <div className="relative z-10 grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
            <div>
              <p className="eyebrow-rune mb-4">Biz kimiz</p>
              <h1 className="font-display text-[2.35rem] font-black leading-none text-bone md:text-[4.5rem]">Hakkımızda</h1>
              <p className="mt-6 text-base leading-8 text-mourning">
                Gece Kehaneti, perdenin arkasında kalan işaretleri karanlık ve premium bir yorum diliyle açığa çıkaran gizemli bir fal atölyesidir.
              </p>
              <p className="mt-5 text-base leading-8 text-mourning">
                Anlatıya göre perdenin öte yanında, Hindistan’da bugün hâlâ yaşadığı fısıldanan efsanevi bir büyücüyle gizli bir irtibat korunur. Siteden aldığınız her ürünün yorumu, onun kadim işaretleri okuyan sessiz süzgecinden geçirilir; kelimeler son şeklini almadan önce geceye, tütsüye ve o eski bakışın gölgesine bırakılır.
              </p>
              <p className="mt-5 text-base leading-8 text-mourning">
                Bu yüzden burada yapılan her yorum, yalnızca yazılmış bir metin gibi değil; uzak bir odada yankılanan, kime ait olduğu bilinmeyen ağır bir fısıltı gibi hazırlanır. Tarot, kahve falı, aşk yorumu, astroloji, rüya ve ritüel ürünlerinde amaç; sadece cevap vermek değil, müşterinin içinden geçip uzun süre susmayan ürkütücü bir işaret bırakmaktır.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-violet/22 bg-black/30 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
              <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-ember/30 bg-ember/10 shadow-[0_0_26px_rgba(255,0,184,.18)]">
                <Eye className="h-8 w-8 text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.45)]" />
              </div>
              <h2 className="font-display text-3xl font-black text-bone">Gecenin mührü</h2>
              <div className="mt-6 grid gap-4">
                {secrets.map((secret, index) => (
                  <div key={secret} className="occult-card p-5">
                    <div className="relative z-10 flex gap-3">
                      {index === 0 && <Moon className="mt-1 h-5 w-5 shrink-0 text-frost" />}
                      {index === 1 && <Flame className="mt-1 h-5 w-5 shrink-0 text-ember" />}
                      {index === 2 && <Sparkles className="mt-1 h-5 w-5 shrink-0 text-gold" />}
                      <p className="text-sm leading-7 text-mourning">{secret}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
