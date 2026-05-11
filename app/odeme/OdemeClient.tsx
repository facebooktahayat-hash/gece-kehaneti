"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { creditRateLabel, formatCredits, getPackage, packages } from "@/lib/data";
import { DePayPaymentButton } from "@/components/DePayPaymentButton";

const quickCreditPackages = [500, 625, 781, 977, 1221, 25000];

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function OdemeClient() {
  const searchParams = useSearchParams();
  const paket = searchParams.get("paket") || "";
  const talep = searchParams.get("talep") || "";
  const krediParam = searchParams.get("kredi") || "";

  const item = paket ? getPackage(paket) : undefined;
  const requestedCredit = Number(krediParam || item?.price || 500);
  const creditAmount = Number.isFinite(requestedCredit) && requestedCredit > 0 ? Math.round(requestedCredit) : item?.price || 500;
  const orderId = useMemo(() => talep || `GK-KREDI-${Date.now()}`, [talep]);
  const selectedSlug = item?.slug || "kredi-yukleme";
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [formError, setFormError] = useState("");

  const backHref = item ? `/siparis/${item.slug}` : "/";

  function validateBeforePayment() {
    const email = normalizeEmail(customerEmail);
    if (!email || !email.includes("@") || !email.includes(".")) {
      setFormError("Kredinin kimin adına yükleneceğini bilmemiz için geçerli bir e-posta yazın.");
      return false;
    }
    setFormError("");
    return true;
  }

  function buildPayload() {
    return {
      productSlug: selectedSlug,
      productName: item?.name || "Gece Kredisi",
      orderId,
      customerName: customerName.trim(),
      customerEmail: normalizeEmail(customerEmail),
      creditAmount,
      priceTl: creditAmount
    };
  }

  return (
    <section className="px-4 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link href={backHref} className="mb-7 inline-flex items-center gap-2 text-sm text-ember transition hover:text-[#ff6bd2] hover:drop-shadow-[0_0_14px_rgba(255,0,184,.7)]">
          <ArrowLeft className="h-4 w-4" /> Geri dön
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_.92fr] lg:items-start">
          <div className="occult-panel p-6 sm:p-8 md:p-10">
            <div className="relative z-10">
              <p className="eyebrow-rune mb-4">Gece Kredisi Yükleme</p>
              <h1 className="font-display text-[2.25rem] font-black leading-tight text-bone md:text-[3.65rem]">
                Kredini al, fal baktırma kapısını aç.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-mourning md:text-base">
                Gece Kredisi yalnızca Gece Kehaneti içinde yorum taleplerinde kullanılan site içi kullanım kredisidir. Oran sabittir: <strong className="text-bone">{creditRateLabel}</strong>.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <InfoCard icon={<ShieldCheck className="h-5 w-5" />} title="E-posta adına" text="Kredi talep no ve e-posta ile eşleşir." />
                <InfoCard icon={<LockKeyhole className="h-5 w-5" />} title="Kapalı kullanım" text="Nakde çevrilmez, devredilmez." />
                <InfoCard icon={<Sparkles className="h-5 w-5" />} title="Fal baktır" text="Kredinle seçili yorumu başlat." />
              </div>

              <div className="mt-8 rounded-[1.35rem] border border-ember/22 bg-ember/8 p-5">
                <h2 className="font-display text-[1.55rem] font-semibold text-bone">Hazır kredi seçenekleri</h2>
                <p className="mt-2 text-xs leading-6 text-mourning-dim">Paket bedelleri krediyle gösterilir. İstersen seçili yorum tutarı kadar kredi alabilirsin.</p>
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

              <div className="mt-8 rounded-[1.35rem] border border-[#c9a6df]/20 bg-black/25 p-5">
                <h2 className="font-display text-[1.55rem] font-semibold text-bone">Kredi kimin adına alınacak?</h2>
                <p className="mt-2 text-xs leading-6 text-mourning-dim">
                  Hesap oluşturmadan da kredi alabilirsin. Ödeme, yazdığın e-posta ve varsa yorum talep numarası ile eşleşir. Panel hesabı kullanacaksan aynı e-posta ile kayıt olman önerilir.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm text-mourning">Ad Soyad</span>
                    <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="occult-input" placeholder="İsteğe bağlı" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm text-mourning">E-posta <span className="text-ember">*</span></span>
                    <input value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} className="occult-input" placeholder="ornek@mail.com" type="email" />
                  </label>
                </div>
                {talep && <p className="mt-4 text-xs leading-5 text-mourning-dim">Bu ödeme şu yorum talebine bağlanacak: <span className="font-mono text-bone">{orderId}</span></p>}
                {formError && <p className="mt-4 rounded-xl border border-ember/28 bg-ember/10 px-4 py-3 text-sm text-[#ff8bdc]">{formError}</p>}
              </div>
            </div>
          </div>

          <aside className="occult-panel p-5 sm:p-7 lg:sticky lg:top-28">
            <div className="relative z-10">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-ember/30 bg-ember/12 text-ember shadow-[0_0_18px_rgba(255,0,184,.18)]">
                <CreditCard className="h-6 w-6" />
              </div>
              <p className="text-sm text-mourning-dim">Alınacak kredi</p>
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
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a6df]" /> Ödeme tamamlanınca kredi talep no ve e-posta adına işlenir.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a6df]" /> Yorum talebin kredi kontrolü sonrası hazırlanma sırasına alınır.</div>
                <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a6df]" /> Yorumlar eğlence ve sembolik anlatım amaçlıdır.</div>
              </div>

              <DePayPaymentButton
                productSlug={selectedSlug}
                productName={item?.name || "Gece Kredisi"}
                priceTl={creditAmount}
                creditAmount={creditAmount}
                orderId={orderId}
                customerEmail={normalizeEmail(customerEmail)}
                customerName={customerName.trim()}
                validateBeforePayment={validateBeforePayment}
                getPayload={buildPayload}
                className="occult-button mt-7 flex w-full justify-center px-5 py-4 text-center font-semibold text-white"
              >
                {creditAmount.toLocaleString("tr-TR")} Gece Kredisi Al
              </DePayPaymentButton>

              <p className="mt-3 text-xs leading-5 text-mourning-dim">
                Ödeme penceresi açıldığında tutar, talep no ve e-posta bilgisi ödeme kaydına gönderilir. Hesap oluşturmadan ödeme yapılabilir.
              </p>
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

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="mb-3 text-ember">{icon}</div>
      <div className="font-display text-lg font-semibold text-bone">{title}</div>
      <p className="mt-1 text-xs leading-5 text-mourning-dim">{text}</p>
    </div>
  );
}
