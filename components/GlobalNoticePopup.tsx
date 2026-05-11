"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Moon, Sparkles, X } from "lucide-react";

const STORAGE_KEY = "gece-kehaneti-global-notice-v2";

export function GlobalNoticePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const closePopup = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // localStorage kapalıysa sadece mevcut oturumda kapatılır.
    }

    setIsOpen(false);
  }, []);

  useEffect(() => {
    setIsReady(true);

    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (!seen) setIsOpen(true);
    } catch {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePopup]);

  if (!isReady || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-5 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-notice-title"
    >
      <button
        type="button"
        aria-label="Bilgilendirmeyi kapat"
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={closePopup}
      />

      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[1.7rem] border border-ember/30 bg-gradient-to-b from-[#12001f]/95 via-[#07000d]/96 to-black/98 p-[1px] shadow-[0_0_70px_rgba(255,0,184,.22)]">
        <div className="pointer-events-none absolute -left-24 -top-24 h-52 w-52 rounded-full bg-ember/18 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent" />

        <div className="relative rounded-[1.65rem] bg-black/35 px-5 py-5 text-center sm:px-7 sm:py-7">
          <button
            type="button"
            onClick={closePopup}
            aria-label="Bilgilendirmeyi kapat"
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-ember/50 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-ember/35 bg-ember/10 shadow-[0_0_28px_rgba(255,0,184,.28)]">
            <Moon className="h-7 w-7 text-ember" />
          </div>

          <p className="mb-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[.28em] text-frost/80">
            <Sparkles className="h-3.5 w-3.5" /> Gece Kredisi Bilgilendirmesi
          </p>

          <h2
            id="global-notice-title"
            className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl"
          >
            Kehanete başlamadan önce
          </h2>

          <div className="mt-4 space-y-3 text-left text-sm leading-6 text-white/74 sm:text-[15px]">
            <p>
              Gece Kehaneti üzerinde her yorum için önce yorum talep formu doldurulur; gerekli tutar Gece Kredisi olarak gösterilir.
            </p>
            <p>
              Gece Kredisi yalnızca bu platform içinde eğlence amaçlı sembolik yorum taleplerinde kullanılabilen site içi kullanım kredisidir. 1 Gece Kredisi = 0.01 USD oranı esas alınır; kredi paketleri Gumroad üzerinden satın alınır.
            </p>
            <p>
              Yorumlar kişisel farkındalık ve sembolik anlatım amacı taşır; sağlık, hukuk, yatırım, psikoloji veya resmi karar danışmanlığı değildir.
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-left text-xs leading-5 text-gold/80">
            <div className="flex gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Gece Kredisi devredilemez, nakde çevrilemez ve yatırım aracı değildir. Yorum teslimi, Gumroad satın alma e-postası üzerinden takip edilir.</span>
            </div>
          </div>

          <button
            type="button"
            onClick={closePopup}
            className="occult-button mt-6 w-full px-5 py-3 text-sm font-bold uppercase tracking-[.18em] text-white sm:w-auto sm:min-w-[260px]"
          >
            <span className="relative z-10">Anladım, Devam Et</span>
          </button>
        </div>
      </div>
    </div>
  );
}
