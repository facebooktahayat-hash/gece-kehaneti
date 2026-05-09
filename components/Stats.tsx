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
        <div
          key={item.label}
          className="rounded-2xl border border-violet/22 bg-[#080010]/72 p-6 text-center shadow-[0_0_22px_rgba(255,0,184,.18)] backdrop-blur-xl transition hover:border-ember/35 hover:shadow-[0_0_32px_rgba(255,0,184,.32)]"
        >
          <div className="text-[2rem] font-black text-ember drop-shadow-[0_0_14px_rgba(255,0,184,.55)] md:text-[2.35rem]">
            {item.value}
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/42">{item.label}</div>
        </div>
      ))}
    </div>
  );
}