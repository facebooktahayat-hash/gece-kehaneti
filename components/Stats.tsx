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
          className="rounded-[1.35rem] border border-ember/18 bg-[#170024]/76 p-6 text-center shadow-[0_0_22px_rgba(255,0,184,.22)] backdrop-blur-xl"
        >
          <div className="text-[2rem] font-black text-white drop-shadow-[0_0_13px_rgba(255,255,255,.14)] md:text-[2.35rem]">
            {item.value}
          </div>
          <div className="mt-2 text-[10px] text-white/42">{item.label}</div>
        </div>
      ))}
    </div>
  );
}