"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Sparkles, X } from "lucide-react";

const STORAGE_KEY = "vivamotion-ai-global-notice-v4";

export function GlobalNoticePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const closePopup = useCallback(() => { try { window.localStorage.setItem(STORAGE_KEY, "accepted"); } catch {} setIsOpen(false); }, []);
  useEffect(() => { setIsReady(true); try { if (!window.localStorage.getItem(STORAGE_KEY)) setIsOpen(true); } catch { setIsOpen(true); } }, []);
  useEffect(() => { if (!isOpen) return; const previousOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closePopup(); }; window.addEventListener("keydown", handleKeyDown); return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKeyDown); }; }, [isOpen, closePopup]);
  if (!isReady || !isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-5 sm:px-6" role="dialog" aria-modal="true" aria-labelledby="global-notice-title">
      <button type="button" aria-label="Bilgilendirmeyi kapat" className="absolute inset-0 bg-slate-900/35 backdrop-blur-md" onClick={closePopup} />
      <div className="relative w-full max-w-[540px] overflow-hidden rounded-[1.7rem] border border-cyan-200 bg-white p-[1px] shadow-[0_28px_80px_rgba(14,165,233,.20)]">
        <div className="relative rounded-[1.65rem] bg-gradient-to-br from-white via-cyan-50 to-pink-50 px-5 py-5 text-center sm:px-7 sm:py-7">
          <button type="button" onClick={closePopup} aria-label="Bilgilendirmeyi kapat" className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-500 transition hover:border-pink-300 hover:text-slate-900"><X className="h-4 w-4" /></button>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200 bg-white shadow-[0_16px_42px_rgba(6,182,212,.18)]"><Sparkles className="h-7 w-7 text-cyan-600" /></div>
          <p className="mb-2 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[.28em] text-cyan-700"><Sparkles className="h-3.5 w-3.5" /> Panelde Açılan AI Medya</p>
          <h2 id="global-notice-title" className="font-display text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">Üretime başlamadan önce</h2>
          <div className="mt-4 space-y-3 text-left text-sm leading-6 text-slate-600 sm:text-[15px]">
            <p>VivaMotion AI, yazdığın ürün ve marka briefine göre OpenAI destekli kreatif AI medya paketi hazırlar. Teslim e-posta gövdesine gönderilmez; satın aldığın e-posta ve 6 haneli proje anahtarı ile Panelim alanında açılır.</p>
            <p>Paketler ürün videosu fikri, reklam görsel yönü, sosyal medya metni ve uygulanabilir prompt önerilerini tek panel tesliminde toplar.</p>
            <p>İzinsiz kişi, ünlü, marka, telifli karakter veya yanıltıcı taklit talepleri kabul edilmez.</p>
          </div>
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-xs leading-5 text-amber-700"><div className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /><span>Yüklediğin görseller ve verdiğin brief üzerinde gerekli hak ve izinlere sahip olmalısın.</span></div></div>
          <button type="button" onClick={closePopup} className="studio-button mt-6 w-full px-5 py-3 text-sm font-bold uppercase tracking-[.18em] text-white sm:w-auto sm:min-w-[260px]"><span className="relative z-10">Anladım, Devam Et</span></button>
        </div>
      </div>
    </div>
  );
}
