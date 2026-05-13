export function Stats() {
  const items = [
    { label: "AI Medya", value: "Video + Görsel", note: "Ürün, kampanya ve sosyal medya için kreatif çıktı" },
    { label: "Teslim", value: "Panel", note: "Satın alma e-postası + proje anahtarı ile giriş" },
    { label: "Süre", value: "≈ 3 Saat", note: "Ödeme eşleşince üretim kuyruğu açılır" },
    { label: "Güven", value: "Hak Odaklı", note: "İzinsiz kişi, ünlü veya marka taklidi kabul edilmez" }
  ];
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="studio-card group overflow-hidden p-5 text-left transition hover:-translate-y-0.5 hover:border-coral/35 sm:p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-soft-dim">{item.label}</div>
          <div className="mt-3 font-display text-[1.55rem] font-black leading-tight text-ink drop-shadow-[0_0_12px_rgba(14,165,233,.15)] sm:text-[1.8rem] md:text-[1.55rem] lg:text-[1.75rem]">{item.value}</div>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-coral/45 via-aqua/30 to-transparent" />
          <p className="mt-3 text-xs leading-5 text-soft-dim">{item.note}</p>
        </div>
      ))}
    </div>
  );
}
