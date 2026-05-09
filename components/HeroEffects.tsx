export function HeroEffects() {
  const stars = Array.from({ length: 38 });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020006]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(92,0,142,.46),transparent_17%),radial-gradient(circle_at_50%_48%,rgba(255,0,184,.20),transparent_29%),radial-gradient(circle_at_50%_12%,rgba(28,0,52,.72),transparent_36%),radial-gradient(circle_at_50%_70%,rgba(120,0,50,.12),transparent_20%),linear-gradient(90deg,#000000_0%,#090012_50%,#000000_100%)]" />

      <div className="absolute left-1/2 top-[45%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-poison/16 blur-[96px] animate-breathe-purple" />
      <div className="absolute left-1/2 top-[50%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/13 blur-[60px] animate-breathe-purple" />

      <svg className="absolute left-1/2 top-[52%] h-[1080px] w-[1080px] animate-ring-clockwise opacity-[.84]" viewBox="0 0 1000 1000" fill="none">
        <circle cx="500" cy="500" r="398" className="ritual-purple" strokeWidth="1" />
        <circle cx="500" cy="500" r="344" className="ritual-pink" strokeWidth=".75" />
        <circle cx="500" cy="500" r="286" className="ritual-purple" strokeWidth=".42" strokeDasharray="5 14" />
        <circle cx="500" cy="500" r="218" className="ritual-cyan" strokeWidth=".62" />
        <circle cx="500" cy="500" r="122" className="ritual-pink" strokeWidth=".55" opacity=".7" />
        <path d="M500 122 L604 383 L882 383 L657 541 L742 827 L500 655 L258 827 L343 541 L118 383 L396 383 Z" className="ritual-pink" strokeWidth=".76" />
        <path d="M500 164 C678 200 815 326 815 500 C815 674 678 800 500 836 C322 800 185 674 185 500 C185 326 322 200 500 164Z" className="ritual-purple" strokeWidth=".55" />
        <path d="M214 214 L786 786 M786 214 L214 786 M500 118 L500 882 M118 500 L882 500" className="ritual-cyan" strokeWidth=".36" />
      </svg>

      <svg className="absolute left-1/2 top-[52%] h-[770px] w-[770px] animate-ring-counter opacity-[.57]" viewBox="0 0 1000 1000" fill="none">
        <circle cx="500" cy="500" r="388" className="ritual-pink" strokeWidth=".42" strokeDasharray="17 20" />
        <circle cx="500" cy="500" r="252" className="ritual-cyan" strokeWidth=".42" strokeDasharray="8 17" />
        <path d="M500 244 L684 684 L316 684 Z" className="ritual-purple" strokeWidth=".42" />
        <path d="M500 756 L684 316 L316 316 Z" className="ritual-pink" strokeWidth=".4" />
      </svg>

      <span className="absolute left-[8.5%] top-[26%] text-[3.15rem] text-frost/55 drop-shadow-[0_0_16px_rgba(0,215,255,.85)] animate-float-icon">☾</span>
      <span className="absolute right-[8.5%] top-[36%] text-[2.45rem] text-ember/76 drop-shadow-[0_0_16px_rgba(255,0,184,.85)] animate-float-icon">✦</span>
      <span className="absolute left-[18%] top-[62%] text-[1rem] text-ember/22 animate-drift-rune">✧</span>
      <span className="absolute right-[17%] top-[58%] text-[1rem] text-frost/20 animate-drift-rune">☽</span>

      <div className="absolute left-[7%] top-[15%] h-72 w-72 rounded-full bg-frost/7 blur-3xl animate-fog-a" />
      <div className="absolute right-[8%] top-[22%] h-72 w-72 rounded-full bg-ember/10 blur-3xl animate-fog-b" />
      <div className="absolute left-[36%] top-[4%] h-56 w-56 rounded-full bg-violet/10 blur-3xl animate-fog-a" />
      <div className="absolute right-[34%] bottom-[12%] h-56 w-56 rounded-full bg-poison/9 blur-3xl animate-fog-b" />
      <div className="absolute left-[44%] top-[30%] h-80 w-80 rounded-full bg-blood/10 blur-[110px] animate-fog-a" />

      {stars.map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white/70 animate-star-twinkle"
          style={{
            left: `${4 + (index * 8.2) % 92}%`,
            top: `${10 + (index * 5.8) % 79}%`,
            animationDelay: `${index * 0.17}s`,
            animationDuration: `${3.1 + (index % 6) * 0.68}s`
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,.075)_1px,transparent_1px)] [background-size:40px_40px] opacity-[.11]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,transparent_0%,rgba(0,0,0,.12)_42%,rgba(0,0,0,.78)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-abyss via-abyss/86 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
    </div>
  );
}
