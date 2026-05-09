import { dailyStats } from "@/lib/data";

export function Stats() {
  const stats = dailyStats();
  const items = [
    { label: "Toplam Fal Yorumu", value: stats.readings.toLocaleString("tr-TR") + "+" },
    { label: "Mutlu Danışan", value: stats.clients.toLocaleString("tr-TR") + "+" },
    { label: "Memnuniyet Oranı", value: "%" + stats.satisfaction.toLocaleString("tr-TR") },
    { label: "Bugün Teslim Edilen", value: stats.todayDelivered.toString() }
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
