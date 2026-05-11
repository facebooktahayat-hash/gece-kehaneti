import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { creditRateLabel, formatCredits, getPackage, packages } from "@/lib/data";

type PaymentPageProps = {
  searchParams?: {
    paket?: string;
    talep?: string;
    kredi?: string;
  };
};

const quickCreditPackages = [500, 625, 781, 977, 1221, 25000];

function getSafeGatewayUrl(params: { paket: string; talep: string; kredi: number }) {
  const baseUrl = process.env.NEXT_PUBLIC_CREDIT_PAYMENT_URL;
  if (!baseUrl) return "";

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("paket", params.paket);
    url.searchParams.set("talep", params.talep);
    url.searchParams.set("kredi", String(params.kredi));
    return url.toString();
  } catch {
    return "";
  }
}

export default function PaymentPage({ searchParams }: PaymentPageProps) {
  const item = searchParams?.paket ? getPackage(searchParams.paket) : undefined;
  const requestedCredit = Number(searchParams?.kredi || item?.price || 500);
  const creditAmount = Number.isFinite(requestedCredit) && requestedCredit > 0 ? Math.round(requestedCredit) : item?.price || 500;
  const orderId = searchParams?.talep || `GK-${Date.now()}`;
  const selectedSlug = item?.slug || "kredi-yukleme";
  const gatewayUrl = getSafeGatewayUrl({ paket: selectedSlug, talep: orderId, kredi: creditAmount });

  if (searchParams?.paket && !item) {
    notFound();
  }

  return (
    <section className="px-4 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link href={item ? `/siparis/${item.slug}` : "/"} className="mb-7 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]">
          <ArrowLeft className="h-4 w-4" /> Geri dön
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
          <div className="occult-panel p-6 sm:p-8 md:p-10">
            <div className="relative z-10">
              <p className="eyebrow-rune mb-4">Gece Kredisi Yükleme</p>
              <h1 className="font-display text-[2.25rem] font-black leading-tight text-bone md:text-[3.65rem]">
                Kredini yükle, fal baktırma kapısını aç.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-mourning md:text-base">
                Gece Kredisi yalnızca Gece Kehaneti içinde yorum taleplerinde kullanılan site içi kullanım kredisidir. Oran sabittir: <strong className="text-bone">{creditRateLabel}</strong>.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <InfoCard icon={<ShieldCheck className="h-5 w-5" />} title="Site içi" text="Yalnızca yorum taleplerinde kullanılır." />
                <InfoCard icon={<LockKeyhole className="h-5 w-5" />} title="Kapalı kullanım" text="Nakde çevrilmez, devredilmez." />
                <InfoCard icon={<Sparkles className="h-5 w-5" />} title="Fal baktır" text="Kredinle seçili yorumu başlat." />
              </div>

              <div className="mt-8 rounded-[1.35rem] border border-ember/22 bg-ember/8 p-5">
                <h2 className="font-display text-[1.55rem] font-semibold text-bone">Hazır kredi seçenekleri</h2>
                <p className="mt-2 text-xs leading-6 text-mourning-dim">Paket bedelleri krediyle gösterilir. İstersen seçili yorum tutarı kadar kredi yükleyebilirsin.</p>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {quickCreditPackages.map((amount) => (
                    <Link
                      key={amount}
                      href={`/odeme?kredi=${amount}`}
                      className={`rounded-2xl border px-3 py-4 text-center transition hover:-translate-y-0.5 hover:border-ember/45 hover:bg-ember/10 ${amount === creditAmount ? "border-ember/50 bg-ember/12 shadow-[0_0_22px_rgba(255,0,184,.10)]" : "border-white/10 bg-black/25"}`}
                    >
                      <div className="font-display text-lg font-bold text-bone sm:text-xl">{amount.toLocaleString("tr-TR")}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-mourning-dim">Gece Kredisi</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="occult-panel p-5 sm:p-7 lg:sticky lg:top-28">
            <div className="relative z-10">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-ember/30 bg-ember/12 text-ember shadow-[0_0_18px_rgba(255,0,184,.18)]">
                <CreditCard className="h-6 w-6" />
              </div>
              <p className="text-sm text-mourning-dim">Yüklenecek tutar</p>
              <div className="mt-2 font-display text-[2.45rem] font-black leading-none text-ember drop-shadow-[0_0_16px_rgba(255,0,184,.35)] sm:text-5xl">
                {formatCredits(creditAmount)}
              </div>
              <p className="mt-2 text-sm text-mourning">Ödenecek tutar: <strong className="text-bone">{creditAmount.toLocaleString("tr-TR")} TL</strong></p>

              {item && (
                <div className="mt-6 rounded-[1.15rem] border border-white/10 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-mourning-dim">Seçili yorum</div>
                  <div className="mt-2 font-display text-[1.45rem] font-semibold text-bone">{item.name}</div>
                  <div className="mt-2 text-sm text-mourning">Talep no: <span className="text-bone">{orderId}</span></div>
                </div>
              )}

              <div className="mt-6 grid gap-3 text-sm leading-6 text-mourning">
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a6df]" /> Kredi yüklendikten sonra talebin hazırlanma sırasına alınır.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a6df]" /> Kullanılmayan krediler kullanım şartlarına göre değerlendirilir.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a6df]" /> Yorumlar eğlence ve sembolik anlatım amaçlıdır.</div>
              </div>

              {gatewayUrl ? (
                <a href={gatewayUrl} className="occult-button mt-7 flex w-full justify-center px-5 py-4 text-center font-semibold text-white">
                  <span className="relative z-10">Kartla Gece Kredisi Yükle</span>
                </a>
              ) : (
                <Link href="/iletisim" className="occult-button mt-7 flex w-full justify-center px-5 py-4 text-center font-semibold text-white">
                  <span className="relative z-10">Kredi Yükleme İçin Destek Al</span>
                </Link>
              )}

              {!gatewayUrl && (
                <p className="mt-3 text-xs leading-5 text-mourning-dim">
                  Kartlı ödeme sağlayıcısı bağlanınca bu buton doğrudan kredi yükleme ekranına yönlendirilir. Şimdilik destek üzerinden talep alınır.
                </p>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-8 occult-panel p-5 sm:p-7">
          <div className="relative z-10">
            <h2 className="font-display text-[1.55rem] font-semibold text-bone">Popüler fal kapıları</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {packages.slice(0, 4).map((pack) => (
                <Link key={pack.slug} href={`/urun/${pack.slug}`} className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:border-ember/35 hover:bg-ember/8">
                  <div className="font-display text-lg font-semibold text-bone">{pack.name}</div>
                  <div className="mt-2 text-sm text-ember">{formatCredits(pack.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="mb-3 text-ember">{icon}</div>
      <div className="font-display text-lg font-semibold text-bone">{title}</div>
      <p className="mt-1 text-xs leading-5 text-mourning-dim">{text}</p>
    </div>
  );
}
