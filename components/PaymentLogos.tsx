import { Bitcoin, LockKeyhole, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

function CompactLogoPill({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-10 w-[84px] shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white px-2.5 shadow-[0_8px_20px_rgba(0,0,0,.22)] sm:h-11 sm:w-[96px] sm:px-3">
      <div className="max-w-full scale-[0.88] sm:scale-[0.95]">{children}</div>
    </div>
  );
}

function LogoCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[68px] items-center justify-center rounded-2xl border border-white/12 bg-white px-4 shadow-[0_12px_28px_rgba(0,0,0,.24)]">
      {children}
    </div>
  );
}

function MastercardMark({ small = false }: { small?: boolean }) {
  const circle = small ? "h-4 w-4" : "h-5 w-5";
  const text = small ? "text-[10px]" : "text-[11px]";
  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${small ? "w-7" : "w-8"} h-5`}>
        <span className={`absolute left-0 top-0 ${circle} rounded-full bg-[#EB001B]`} />
        <span className={`absolute ${small ? "left-[10px]" : "left-[12px]"} top-0 ${circle} rounded-full bg-[#F79E1B] mix-blend-multiply`} />
      </div>
      <span className={`${text} font-bold tracking-tight text-[#222]`}>mastercard</span>
    </div>
  );
}

function AmexMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`rounded-md bg-[#1F72CD] ${small ? "px-2 py-1" : "px-2.5 py-1.5"} text-center text-white shadow-sm`}>
      <div className={`${small ? "text-[7px]" : "text-[8px]"} font-black leading-none tracking-[0.08em]`}>AMERICAN</div>
      <div className={`${small ? "mt-0.5 text-[8px]" : "mt-0.5 text-[10px]"} font-black leading-none tracking-[0.08em]`}>EXPRESS</div>
    </div>
  );
}

function VisaMark({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center">
      <span className={`${small ? "text-[22px]" : "text-[26px]"} font-black italic leading-none tracking-tight text-[#1A1F71]`}>Visa</span>
      <span className={`${small ? "ml-1 mt-3 w-5" : "ml-1 mt-4 w-6"} block h-[3px] rounded-full bg-[#F7B600]`} />
    </div>
  );
}

function TroyMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`flex items-end gap-[1px] ${small ? "text-[22px]" : "text-[26px]"} font-black lowercase leading-none tracking-tight`}>
      <span className="text-[#25A55F]">t</span>
      <span className="text-[#1690D0]">r</span>
      <span className="text-[#F4A21D]">o</span>
      <span className="text-[#5B5B5B]">y</span>
    </div>
  );
}

function PaypalMark({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`${small ? "text-[20px]" : "text-[24px]"} font-black italic leading-none text-[#003087]`}>P</span>
      <span className={`${small ? "-ml-2 text-[20px]" : "-ml-2 text-[24px]"} font-black italic leading-none text-[#009CDE]`}>P</span>
      <span className={`${small ? "ml-0.5 text-[12px]" : "ml-1 text-[14px]"} font-bold text-[#253B80]`}>PayPal</span>
    </div>
  );
}

function StripeMark({ small = false }: { small?: boolean }) {
  return <span className={`${small ? "text-[18px]" : "text-[24px]"} font-black leading-none tracking-tight text-[#635BFF]`}>stripe</span>;
}

function BitcoinMark({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`grid ${small ? "h-6 w-6" : "h-7 w-7"} place-items-center rounded-full bg-[#F7931A]`}>
        <Bitcoin className={`${small ? "h-3.5 w-3.5" : "h-4 w-4"} text-white`} strokeWidth={2.5} />
      </span>
      <span className={`${small ? "text-[12px]" : "text-[14px]"} font-bold text-[#222]`}>Bitcoin</span>
    </div>
  );
}

const mobileLogoItems = [
  { key: "mastercard", node: <MastercardMark small /> },
  { key: "amex", node: <AmexMark small /> },
  { key: "visa", node: <VisaMark small /> },
  { key: "troy", node: <TroyMark small /> },
  { key: "paypal", node: <PaypalMark small /> },
  { key: "stripe", node: <StripeMark small /> },
  { key: "bitcoin", node: <BitcoinMark small /> },
];

type PaymentLogosProps = {
  compact?: boolean;
};

export function PaymentLogos({ compact = false }: PaymentLogosProps) {
  if (compact) {
    return (
      <div className="rounded-[1.1rem] border border-white/10 bg-black/35 px-3.5 pb-3 pt-3 shadow-[0_0_24px_rgba(124,28,255,.08)] sm:px-4 lg:pt-2.5">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-frost/20 bg-frost/10 shadow-[0_0_16px_rgba(0,215,255,.14)]">
            <ShieldCheck className="h-4.5 w-4.5 text-frost" />
          </span>
          <div>
            <h3 className="font-display text-[12px] font-semibold uppercase tracking-[0.13em] text-bone sm:text-sm sm:tracking-[0.16em]">Güvenli Alışveriş</h3>
            <p className="mt-0.5 text-[9px] leading-4 text-mourning sm:text-[11px]">Ödeme altyapısı destek logoları.</p>
          </div>
        </div>

        <div className="relative md:hidden">
          <div className="mx-auto max-w-[268px] overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/75 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/75 to-transparent" />
            <div className="payment-logo-marquee flex w-max gap-2">
              {[...mobileLogoItems, ...mobileLogoItems].map((item, index) => (
                <CompactLogoPill key={`${item.key}-${index}`}>{item.node}</CompactLogoPill>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden flex-wrap gap-2 md:flex">
          {mobileLogoItems.map((item) => (
            <CompactLogoPill key={item.key}>{item.node}</CompactLogoPill>
          ))}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-mourning-dim sm:mt-3 sm:text-[10px] sm:tracking-[0.16em]">
          <LockKeyhole className="h-3.5 w-3.5 text-ember" />
          Güvenli ödeme bildirimi
        </div>
      </div>
    );
  }

  return (
    <div className="occult-panel p-6">
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-frost/20 bg-frost/10 shadow-[0_0_18px_rgba(0,215,255,.16)]">
            <ShieldCheck className="h-5 w-5 text-frost drop-shadow-[0_0_10px_rgba(0,215,255,.55)]" />
          </span>
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-bone">Güvenli Alışveriş</h3>
            <p className="mt-1 text-xs leading-5 text-mourning">Desteklenen kart ve ödeme altyapısı logoları.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <LogoCard><MastercardMark /></LogoCard>
          <LogoCard><AmexMark /></LogoCard>
          <LogoCard><VisaMark /></LogoCard>
          <LogoCard><TroyMark /></LogoCard>
          <LogoCard><PaypalMark /></LogoCard>
          <LogoCard><StripeMark /></LogoCard>
          <LogoCard><BitcoinMark /></LogoCard>
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/12 bg-white/5 px-4 text-center text-xs leading-5 text-mourning">Güvenli ödeme geçidi entegrasyonuna hazır</div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mourning-dim">
          <LockKeyhole className="h-3.5 w-3.5 text-ember" />
          Güvenli ödeme bildirimi
        </div>
      </div>
    </div>
  );
}
