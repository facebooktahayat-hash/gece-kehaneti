export function Stats() {
  const items = [
    { label: "Gece Kredisi", value: "Site İçi" },
    { label: "Yorum Türü", value: "Sembolik" },
    { label: "Teslim Aralığı", value: "24-72s" },
    { label: "Kredi Oranı", value: "1 TL = 1" }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="occult-card p-6 text-center">
          <div className="font-display text-[2.1rem] font-black text-[#d8c0ea] drop-shadow-[0_0_12px_rgba(124,28,255,.30)] md:text-[2.55rem]">{item.value}</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-mourning-dim">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
