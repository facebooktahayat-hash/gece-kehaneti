import { LockKeyhole, ShieldCheck } from "lucide-react";

const paymentLogos = [
  "VISA",
  "Mastercard",
  "TROY",
  "iyzico",
  "PayTR",
  "3D Secure"
];

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
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-bone">Ödeme Kuruluşları</h3>
            <p className="mt-1 text-xs leading-5 text-mourning">Kart ve güvenli ödeme altyapısı için görünür marka alanı.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {paymentLogos.map((name) => (
            <div
              key={name}
              className="group relative overflow-hidden rounded-xl border border-ember/18 bg-[linear-gradient(135deg,rgba(255,0,184,.10),rgba(124,28,255,.07),rgba(0,215,255,.05))] px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_0_16px_rgba(124,28,255,.08)]"
            >
              <span className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-frost/45 to-transparent opacity-60" />
              <span className="font-display text-[12px] font-black tracking-[0.14em] text-bone/88 drop-shadow-[0_0_10px_rgba(255,0,184,.20)]">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mourning-dim">
          <LockKeyhole className="h-3.5 w-3.5 text-ember" />
          Güvenli ödeme bildirimi
        </div>
      </div>
    </div>
  );
}
