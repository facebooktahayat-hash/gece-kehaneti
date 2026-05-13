"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";

const contactNotes = ["Destek e-postası: destek@example.com", "Yanıt süresi: 12 saat içinde", "Panel ve ödeme desteği", "Memnuniyet, şikayet ve teknik bildirimler"];
type ContactResponse = { ok?: boolean; error?: string };

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setMessage("Mesaj gönderiliyor...");
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fullName: String(formData.get("fullName") || ""), email: String(formData.get("email") || ""), subject: String(formData.get("subject") || ""), message: String(formData.get("message") || "") }) });
      const payload = (await response.json().catch(() => ({}))) as ContactResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Mesaj gönderilemedi.");
      form.reset(); setStatus("sent"); setMessage("Mesajın alındı. Yanıt destek@example.com üzerinden takip edilecek.");
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "Mesaj gönderilemedi."); }
  }
  return (
    <section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-6xl"><div className="mb-10 text-center"><p className="eyebrow-chip mb-4">İletişim</p><h1 className="font-display text-[2.45rem] font-black leading-none text-ink md:text-[4.6rem]">Bize ulaş</h1><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-soft md:text-base">Panel, ödeme, üretim dosyası teslimi veya teknik konular için bize yaz.</p></div>
      <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]"><div className="studio-panel p-7 md:p-9"><div className="relative z-10"><div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-aqua/20 bg-aqua/10 shadow-[0_0_28px_rgba(0,215,255,.14)]"><MessageCircle className="h-8 w-8 text-aqua" /></div><h2 className="font-display text-3xl font-black text-ink">Viva hattı açık</h2><p className="mt-4 text-sm leading-7 text-soft">Talep numaran, ödeme e-postan veya panel erişiminle ilgili destek için mesaj bırak.</p><div className="mt-8 grid gap-3">{contactNotes.map((note, index) => <div key={note} className="rounded-[1.05rem] border border-violet/18 bg-white/70 px-4 py-4 text-sm text-soft"><span className="mr-2 font-mono text-xs text-aqua">0{index + 1}</span>{note}</div>)}</div></div></div>
      <div className="studio-panel p-7 md:p-9"><form className="relative z-10 grid gap-4" onSubmit={handleSubmit}><div className="mb-2 flex items-center justify-between gap-4"><div><p className="eyebrow-chip mb-3">Mesaj gönder</p><h2 className="font-display text-3xl font-black text-ink">Stüdyo ekibine not bırak</h2></div><Sparkles className="hidden h-8 w-8 text-coral sm:block" /></div><div className="grid gap-4 md:grid-cols-2"><label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-soft">Ad Soyad</span><input name="fullName" className="studio-input" placeholder="Adınız Soyadınız" required /></label><label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-soft">E-posta</span><input name="email" className="studio-input" placeholder="Yanıt alacağınız adres" type="email" required /></label></div><label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-soft">Konu</span><input name="subject" className="studio-input" placeholder="Panel, ödeme, üretim dosyası veya teknik destek" required /></label><label className="block"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-soft">Mesaj</span><textarea name="message" className="studio-textarea" placeholder="Mesajını yaz..." required /></label><button className="studio-button mt-2 w-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-70" type="submit" disabled={status === "sending"}><span className="relative z-10 inline-flex items-center gap-2">{status === "sending" ? "Gönderiliyor" : "Gönder"} <Send className="h-4 w-4" /></span></button>{message && <p className={`text-sm leading-6 ${status === "error" ? "text-coral" : "text-soft"}`} role="status">{message}</p>}</form></div></div></div></section>
  );
}
