export function HeroEffects() {
  const stars = Array.from({ length: 34 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020006]">
      {/* Base black-purple depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(94,0,148,.48),transparent_18%),radial-gradient(circle_at_50%_47%,rgba(255,0,184,.14),transparent_29%),radial-gradient(circle_at_50%_16%,rgba(32,0,60,.62),transparent_38%),linear-gradient(90deg,#020006_0%,#0b0014_48%,#020006_100%)]" />

      {/* Soft purple center cloud like Lovable */}
      <div className="absolute left-1/2 top-[43%] h-[430px] w-[430px] rounded-full bg-[#8c16ff]/18 blur-[70px] animate-violet-breath" />
      <div className="absolute left-1/2 top-[47%] h-[170px] w-[170px] rounded-full bg-[#ff00b8]/10 blur-[48px] animate-violet-breath" />

      {/* Huge ritual circle: visible behind title, subtle, moving */}
      <svg
        className="absolute left-1/2 top-[43%] h-[790px] w-[790px] animate-ritual-rotate opacity-[.82]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="326" className="ritual-main" strokeWidth="1" />
        <circle cx="400" cy="400" r="279" className="ritual-soft" strokeWidth=".8" />
        <circle cx="400" cy="400" r="214" className="ritual-cyan" strokeWidth=".55" strokeDasharray="6 15" />
        <path d="M400 92 L488 316 L728 316 L534 452 L608 700 L400 552 L192 700 L266 452 L72 316 L312 316 Z" className="ritual-main" strokeWidth=".8" />
        <path d="M153 153 L647 647 M647 153 L153 647 M400 62 L400 738 M62 400 L738 400" className="ritual-cyan" strokeWidth=".42" />
        <path d="M400 118 C555 150 682 262 682 400 C682 538 555 650 400 682 C245 650 118 538 118 400 C118 262 245 150 400 118Z" className="ritual-soft" strokeWidth=".55" />
      </svg>

      {/* Secondary dashed circle, opposite direction */}
      <svg
        className="absolute left-1/2 top-[43%] h-[610px] w-[610px] animate-ritual-reverse opacity-[.48]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="400" cy="400" r="330" className="ritual-cyan" strokeWidth=".55" strokeDasharray="18 22" />
        <circle cx="400" cy="400" r="254" className="ritual-main" strokeWidth=".45" strokeDasharray="8 18" />
        <circle cx="400" cy="400" r="146" className="ritual-soft" strokeWidth=".55" />
        <path d="M400 162 L574 574 L226 574 Z" className="ritual-soft" strokeWidth=".48" />
        <path d="M400 638 L574 226 L226 226 Z" className="ritual-cyan" strokeWidth=".42" />
      </svg>

      {/* Side symbols exactly like small decorative Lovable feel */}
      <span className="absolute left-[7%] top-[27%] text-3xl text-frost/55 drop-shadow-[0_0_12px_rgba(0,217,255,.75)] animate-symbol-float">☾</span>
      <span className="absolute left-[10%] bottom-[28%] text-2xl text-violet/45 drop-shadow-[0_0_12px_rgba(124,29,255,.65)] animate-symbol-float">☽</span>
      <span className="absolute right-[8%] top-[30%] text-2xl text-ember/70 drop-shadow-[0_0_12px_rgba(255,0,184,.75)] animate-symbol-float">✦</span>
      <span className="absolute right-[12%] bottom-[22%] text-3xl text-poison/55 drop-shadow-[0_0_14px_rgba(183,0,255,.72)] animate-symbol-float">✧</span>

      {/* Soft fog clouds */}
      <div className="absolute left-[8%] top-[15%] h-64 w-64 rounded-full bg-frost/7 blur-3xl animate-fog-left" />
      <div className="absolute right-[7%] top-[22%] h-72 w-72 rounded-full bg-ember/10 blur-3xl animate-fog-right" />
      <div className="absolute left-[36%] top-[4%] h-52 w-52 rounded-full bg-violet/10 blur-3xl animate-fog-left" />
      <div className="absolute right-[35%] bottom-[14%] h-56 w-56 rounded-full bg-poison/9 blur-3xl animate-fog-right" />

      {/* Star dust */}
      {stars.map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white/75 animate-tiny-twinkle"
          style={{
            left: `${4 + (index * 8.37) % 92}%`,
            top: `${10 + (index * 5.91) % 78}%`,
            animationDelay: `${index * 0.19}s`,
            animationDuration: `${3.2 + (index % 6) * 0.72}s`
          }}
        />
      ))}

      {/* Grainy star layer + dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:39px_39px] opacity-[.11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,.18)_42%,rgba(0,0,0,.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-abyss via-abyss/84 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/64 to-transparent" />
    </div>
  );
}