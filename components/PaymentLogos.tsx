import { LockKeyhole, ShieldCheck } from "lucide-react";

function LogoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-[56px] items-center justify-center rounded-[12px] border border-white/15 bg-white px-3 shadow-[0_10px_26px_rgba(0,0,0,.25)] ${className}`}
    >
      {children}
    </div>
  );
}

function MastercardLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-6 w-10">
        <span className="absolute left-0 top-0 h-6 w-6 rounded-full bg-[#EB001B]" />
        <span className="absolute right-0 top-0 h-6 w-6 rounded-full bg-[#F79E1B] mix-blend-multiply" />
      </div>
      <span className="text-[11px] font-bold tracking-tight text-[#222]">mastercard</span>
    </div>
  );
}

function AmexLogo() {
  return (
    <div className="rounded-[6px] bg-[#1F72CD] px-2 py-1 text-center leading-none text-white shadow-sm">
      <div className="text-[8px] font-black tracking-[0.08em]">AMERICAN</div>
      <div className="mt-0.5 text-[10px] font-black tracking-[0.08em]">EXPRESS</div>
    </div>
  );
}

function VisaLogo() {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-[22px] font-black italic leading-none tracking-tight text-[#1A1F71]">V</span>
      <span className="-ml-0.5 text-[22px] font-black italic leading-none tracking-tight text-[#1A1F71]">isa</span>
      <span className="ml-1 mt-3 block h-[3px] w-6 rounded-full bg-[#F7B600]" />
    </div>
  );
}

function TroyLogo() {
  return (
    <div className="flex items-end gap-[1px] text-[22px] font-black lowercase leading-none tracking-tight">
      <span className="text-[#25A55F]">t</span>
      <span className="text-[#1690D0]">r</span>
      <span className="text-[#F4A21D]">o</span>
      <span className="text-[#5B5B5B]">y</span>
    </div>
  );
}

type PaymentLogosProps = {
  compact?: boolean;
};

export function PaymentLogos({ compact = false }: PaymentLogosProps) {
  return (
    <div className={compact ? "rounded-[1.2rem] border border-white/10 bg-black/30 p-4" : "occult-panel p-6"}>
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <LogoCard>
            <MastercardLogo />
          </LogoCard>
          <LogoCard>
            <AmexLogo />
          </LogoCard>
          <LogoCard>
            <VisaLogo />
          </LogoCard>
          <LogoCard>
            <TroyLogo />
          </LogoCard>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mourning-dim">
          <LockKeyhole className="h-3.5 w-3.5 text-ember" />
          Güvenli ödeme bildirimi
        </div>
      </div>
    </div>
  );
}
