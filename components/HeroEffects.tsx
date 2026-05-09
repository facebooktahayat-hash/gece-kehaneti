
export function HeroEffects() {
  const stars = Array.from({ length: 36 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020006]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(90,0,145,.42),transparent_17%),radial-gradient(circle_at_50%_46%,rgba(255,0,184,.18),transparent_28%),radial-gradient(circle_at_50%_18%,rgba(24,0,44,.78),transparent_36%),linear-gradient(90deg,#020006_0%,#0b0014_48%,#020006_100%)]" />

      <div className="absolute left-1/2 top-[38%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8d13ff]/16 blur-[86px] animate-violet-breath" />
      <div className="absolute left-1/2 top-[45%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff00b8]/12 blur-[55px] animate-violet-breath" />

      {/* Main huge ritual circle */}
      <svg
        className="absolute left-1/2 top-[41%] h-[980px] w-[980px] animate-ritual-rotate opacity-[.84]"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <circle cx="500" cy="500" r="382" className="ritual-main" strokeWidth="1" />
        <circle cx="500" cy="500" r="336" className="ritual-soft" strokeWidth=".75" />
        <circle cx="500" cy="500" r="279" className="ritual-main" strokeWidth=".4" strokeDasharray="5 16" opacity=".6" />
        <circle cx="500" cy="500" r="214" className="ritual-soft" strokeWidth=".6" />
        <circle cx="500" cy="500" r="118" className="ritual-main" strokeWidth=".7" opacity=".75" />
        <path d="M500 126 L602 382 L876 382 L654 537 L738 820 L500 651 L262 820 L346 537 L124 382 L398 382 Z" className="ritual-main" strokeWidth=".78" />
        <path d="M500 166 C674 201 812 329 812 500 C812 671 674 799 500 834 C326 799 188 671 188 500 C188 329 326 201 500 166Z" className="ritual-soft" strokeWidth=".55" />
        <path d="M214 214 L786 786 M786 214 L214 786 M500 118 L500 882 M118 500 L882 500" className="ritual-soft" strokeWidth=".36" />
      </svg>

      {/* Inner opposite spin circle */}
      <svg
        className="absolute left-1/2 top-[41%] h-[740px] w-[740px] animate-ritual-reverse opacity-[.53]"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <circle cx="500" cy="500" r="385" className="ritual-soft" strokeWidth=".45" strokeDasharray="18 18" />
        <circle cx="500" cy="500" r="248" className="ritual-main" strokeWidth=".42" strokeDasharray="9 17" />
        <path d="M500 244 L683 683 L317 683 Z" className="ritual-soft" strokeWidth=".42" />
        <path d="M500 756 L683 317 L317 317 Z" className="ritual-main" strokeWidth=".4" />
        <path d="M500 350 C582 350 650 418 650 500 C650 582 582 650 500 650 C418 650 350 582 350 500 C350 418 418 350 500 350Z" className="ritual-soft" strokeWidth=".38" />
      </svg>

      {/* side decorative icons */}
      <span className="absolute left-[7.2%] top-[35%] text-[3rem] text-ember/36 drop-shadow-[0_0_15px_rgba(255,0,184,.85)] animate-symbol-float">☾</span>
      <span className="absolute right-[8.8%] top-[38%] text-[2.3rem] text-ember/72 drop-shadow-[0_0_15px_rgba(255,0,184,.85)] animate-symbol-float">✦</span>

      <div className="absolute left-[8%] top-[17%] h-72 w-72 rounded-full bg-ember/8 blur-3xl animate-fog-left" />
      <div className="absolute right-[9%] top-[22%] h-72 w-72 rounded-full bg-poison/10 blur-3xl animate-fog-right" />
      <div className="absolute left-[37%] top-[7%] h-52 w-52 rounded-full bg-violet/10 blur-3xl animate-fog-left" />
      <div className="absolute right-[34%] bottom-[16%] h-56 w-56 rounded-full bg-ember/8 blur-3xl animate-fog-right" />

      {stars.map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white/75 animate-tiny-twinkle"
          style={{
            left: "{4 + (index * 8.2) % 92}%",
            top: "{11 + (index * 5.7) % 78}%",
            animationDelay: "{index * 0.17}s",
            animationDuration: "{3.1 + (index % 6) * 0.65}s",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:40px_40px] opacity-[.11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,.16)_42%,rgba(0,0,0,.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-abyss via-abyss/84 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/68 to-transparent" />
    </div>
  );
}
