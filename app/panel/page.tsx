"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { CalendarDays, CheckCircle2, Clock3, Eye, KeyRound, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/data";

type PanelOrder = {
  orderId: string;
  productName: string;
  categoryTitle: string;
  price: number;
  status: "draft" | "paid" | "queued" | "generating" | "delivered" | "failed";
  createdAt: string;
  paidAt?: string;
  deliveryDueAt?: string;
  deliveredAt?: string;
  lastError?: string;
  topic: string;
  interpretation?: string;
};

const emailKey = "vivamotion-ai-panel-email";
const fileKeyStorageKey = "vivamotion-ai-panel-file-key";

function statusLabel(status: PanelOrder["status"]) {
  if (status === "draft") return "Ödeme bekliyor";
  if (status === "queued") return "Üretim kuyruğunda";
  if (status === "generating") return "Dosya hazırlanıyor";
  if (status === "delivered") return "Dosya hazır";
  if (status === "failed") return "Tekrar denenecek";
  return "Hazırlanıyor";
}

function statusClass(status: PanelOrder["status"]) {
  if (status === "delivered") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "failed") return "border-pink-200 bg-pink-50 text-pink-700";
  if (status === "draft") return "border-slate-200 bg-slate-50 text-slate-600";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function markdownToBlocks(markdown: string) {
  return markdown.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
}

export default function PanelPage() {
  const [email, setEmail] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [orders, setOrders] = useState<PanelOrder[]>([]);
  const [activeEmail, setActiveEmail] = useState("");
  const [activeFileKey, setActiveFileKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const restoredRef = useRef(false);

  const loadOrders = useCallback(async (emailToLoad = email, fileKeyToLoad = fileKey) => {
    const normalized = emailToLoad.trim().toLowerCase();
    const normalizedFileKey = fileKeyToLoad.replace(/\D/g, "").slice(0, 6);
    if (!normalized || !/^\S+@\S+\.\S+$/.test(normalized)) {
      setError("Satın alma sırasında kullandığın geçerli e-postayı yaz.");
      return;
    }
    if (!/^\d{6}$/.test(normalizedFileKey)) {
      setError("E-postana gönderilen 6 haneli proje anahtarını yaz.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/panel/orders?email=${encodeURIComponent(normalized)}&key=${encodeURIComponent(normalizedFileKey)}`, { cache: "no-store" });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; orders?: PanelOrder[]; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Panel kayıtları alınamadı.");
      setOrders(payload.orders || []);
      setActiveEmail(normalized);
      setActiveFileKey(normalizedFileKey);
      try {
        window.localStorage.setItem(emailKey, normalized);
        window.localStorage.setItem(fileKeyStorageKey, normalizedFileKey);
      } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : "Panel kayıtları alınamadı.");
    } finally {
      setLoading(false);
    }
  }, [email, fileKey]);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const savedEmail = window.localStorage.getItem(emailKey) || "";
      const savedFileKey = window.localStorage.getItem(fileKeyStorageKey) || "";
      if (savedEmail) setEmail(savedEmail);
      if (savedFileKey) setFileKey(savedFileKey);
      if (savedEmail && savedFileKey) void loadOrders(savedEmail, savedFileKey);
    } catch {}
  }, [loadOrders]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadOrders();
  }

  return (
    <section className="px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="studio-panel p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-cyan-200 bg-cyan-50 shadow-sm"><LockKeyhole className="h-7 w-7 text-cyan-700" /></div>
              <p className="eyebrow-chip mb-4">Panelim</p>
              <h1 className="font-display text-[2.2rem] font-black leading-none text-slate-950 md:text-[4.2rem]">Kreatif Dosyalarım</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">Satın alma e-postanı ve e-postana gönderilen 6 haneli proje anahtarını yaz. Teslim dosyası e-postaya gönderilmez; yalnızca eşleşen dosya burada görünür.</p>
              <form onSubmit={handleSubmit} className="mt-7 rounded-[1.35rem] border border-sky-100 bg-white p-5 shadow-sm md:p-6">
                <div className="grid gap-4">
                  <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.20em] text-slate-500">Satın alma e-postası</span><input value={email} onChange={(event) => setEmail(event.target.value)} className="studio-input" placeholder="mail@ornek.com" type="email" autoComplete="email" /></label>
                  <label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.20em] text-slate-500">6 haneli proje anahtarı</span><input value={fileKey} onChange={(event) => setFileKey(event.target.value.replace(/\D/g, "").slice(0, 6))} className="studio-input tracking-[0.35em]" placeholder="123456" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" /></label>
                </div>
                {error && <p className="mt-4 rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">{error}</p>}
                <button className="studio-button mt-6 w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white" type="submit" disabled={loading}><span className="relative z-10 inline-flex items-center gap-2">{loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />} Dosyamı Aç</span></button>
              </form>
              <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-xs leading-6 text-slate-600"><ShieldCheck className="mb-2 h-5 w-5 text-cyan-700" />Panel yalnızca e-posta ve 6 haneli proje anahtarı eşleşince açılır. Dosya hazır değilse ödeme eşleşmesi ve yaklaşık 3 saatlik üretim süresini bekleyin.</div>
            </div>

            <div>
              <div className="mb-5 flex items-center justify-between gap-4"><div><h2 className="font-display text-2xl font-black text-slate-950">Dosya Durumu</h2><p className="mt-1 text-xs text-slate-500">{activeEmail ? `${activeEmail} · Anahtar ${activeFileKey}` : "E-posta ve proje anahtarı bekleniyor"}</p></div>{activeEmail && <button onClick={() => loadOrders(activeEmail)} className="rounded-full border border-sky-100 bg-white px-4 py-2 text-xs text-slate-600 transition hover:text-cyan-700" type="button">Yenile</button>}</div>

              {!activeEmail && <div className="studio-card p-8 text-center text-slate-600"><Eye className="mx-auto mb-4 h-10 w-10 text-cyan-600" />E-posta ve 6 haneli proje anahtarını yazınca dosyan burada görünür.</div>}
              {activeEmail && !loading && orders.length === 0 && <div className="studio-card p-8 text-center text-slate-600"><Eye className="mx-auto mb-4 h-10 w-10 text-cyan-600" />Bu bilgilerle eşleşen dosya bulunamadı. E-posta veya proje anahtarını kontrol et.</div>}
              <div className="grid gap-5">
                {orders.map((order) => (
                  <article key={order.orderId} className="studio-card overflow-hidden p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div><div className="font-display text-[1.55rem] font-bold text-slate-950">{order.productName}</div><p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{order.categoryTitle} · {order.orderId}</p></div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
                    </div>
                    <div className="mt-5 grid gap-3 text-xs text-slate-600 md:grid-cols-3"><div className="rounded-xl border border-sky-100 bg-white p-3"><CalendarDays className="mb-2 h-4 w-4 text-cyan-600" />Talep: {formatDate(order.createdAt)}</div><div className="rounded-xl border border-sky-100 bg-white p-3"><Clock3 className="mb-2 h-4 w-4 text-amber-500" />Hedef: {formatDate(order.deliveryDueAt)}</div><div className="rounded-xl border border-sky-100 bg-white p-3"><CheckCircle2 className="mb-2 h-4 w-4 text-emerald-500" />Tutar: {formatPrice(order.price)}</div></div>
                    <details className="mt-5 rounded-2xl border border-sky-100 bg-white p-4"><summary className="cursor-pointer text-sm font-semibold text-slate-950">Gönderdiğim brief</summary><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{order.topic}</p></details>
                    {order.status === "delivered" && order.interpretation ? (
                      <div className="mt-5 rounded-[1.25rem] border border-cyan-200 bg-gradient-to-br from-white via-cyan-50 to-pink-50 p-5">
                        <div className="mb-4 text-xs font-bold uppercase tracking-[0.20em] text-cyan-700">Kreatif Dosya Hazır</div>
                        <div className="max-w-none text-slate-600">
                          {markdownToBlocks(order.interpretation).map((block, index) => {
                            if (block.startsWith("# ")) return <h2 key={index} className="mt-7 font-display text-3xl font-black text-slate-950">{block.slice(2)}</h2>;
                            if (block.startsWith("## ")) return <h3 key={index} className="mt-6 font-display text-2xl font-bold text-slate-950">{block.slice(3)}</h3>;
                            return <p key={index} className="whitespace-pre-wrap text-sm leading-8 text-slate-600 md:text-base">{block}</p>;
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-700">Dosya henüz hazır değil. Ödeme eşleştikten sonra üretim dosyası yaklaşık 3 saat içinde panelde görünür. Bu ekranı daha sonra yenileyebilirsin.</div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
