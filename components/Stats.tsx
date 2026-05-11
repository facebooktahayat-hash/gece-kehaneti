export function Stats() {
  const items = [
    {
      label: "Kredi Kapısı",
      value: "Gece Kredisi",
      note: "1 TL = 1 kredi"
    },
    {
      label: "Yorum Akışı",
      value: "Talep → Kredi",
      note: "Formdan sonra ödeme"
    },
    {
      label: "Teslim Aralığı",
      value: "24-72 Saat",
      note: "Pakete göre hazırlanır"
    },
    {
      label: "Gizli Teslim",
      value: "E-posta",
      note: "Kredi alınan adrese"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="occult-card group overflow-hidden p-5 text-left transition hover:-translate-y-0.5 hover:border-ember/35 sm:p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-mourning-dim">{item.label}</div>
          <div className="mt-3 font-display text-[1.55rem] font-black leading-tight text-bone drop-shadow-[0_0_12px_rgba(124,28,255,.25)] sm:text-[1.8rem] md:text-[1.55rem] lg:text-[1.75rem]">
            {item.value}
          </div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-ember/45 via-[#7c1cff]/25 to-transparent" />
          <p className="mt-3 text-xs leading-5 text-mourning-dim">{item.note}</p>
        </div>
      ))}
    </div>
  );
}
