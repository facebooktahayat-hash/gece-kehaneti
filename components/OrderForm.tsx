"use client";

import { useRef, useState } from "react";
import { Info, ShieldCheck, UploadCloud, CreditCard } from "lucide-react";
import { creditRateLabel, formatCredits, type Package } from "@/lib/data";

type OrderFormProps = {
  item: Package;
  categoryTitle?: string;
};

type OrderResponse = {
  ok?: boolean;
  orderId?: string;
  error?: string;
};

function createOrderId() {
  return `GK-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
}

export function OrderForm({ item, categoryTitle }: OrderFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const orderIdRef = useRef(createOrderId());
  const sentOrderIdRef = useRef("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const isCoffee = item.categorySlug === "kahve-fali";
  const needsBirthDate = item.categorySlug === "astroloji" || item.categorySlug === "numeroloji";

  async function sendOrderForm() {
    const form = formRef.current;
    if (!form) return false;

    if (!form.reportValidity()) {
      setStatus("error");
      setMessage("Yorum talebi için zorunlu alanları doldurun.");
      return false;
    }

    if (sentOrderIdRef.current) {
      setStatus("sent");
      setMessage("Yorum talebin daha önce alındı. Gece Kredisi kontrolü sonrası hazırlanma sırasına alınır.");
      return true;
    }

    setStatus("sending");
    setMessage("Yorum talebi gönderiliyor...");

    try {
      const formData = new FormData(form);
      formData.set("orderId", orderIdRef.current);
      formData.set("productSlug", item.slug);

      const response = await fetch("/api/order", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json().catch(() => ({}))) as OrderResponse;

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Yorum talebi gönderilemedi.");
      }

      sentOrderIdRef.current = payload.orderId || orderIdRef.current;
      setStatus("sent");
      setMessage("Yorum talebin alındı. Gece Kredisi bakiyesi/kredi yükleme kontrolü sonrası hazırlanma sırasına alınır.");
      return true;
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Yorum talebi gönderilemedi.");
      return false;
    }
  }

  return (
    <form ref={formRef} className="mt-10 grid gap-5" encType="multipart/form-data">
      <input type="hidden" name="productSlug" value={item.slug} />
      <input type="hidden" name="orderId" value={orderIdRef.current} />
      <input type="hidden" name="creditCost" value={item.price} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Ad Soyad" name="fullName" placeholder="Adınız Soyadınız" required />
        <Field label="E-posta" name="email" placeholder="ornek@mail.com" type="email" required />
        <Field label="Telefon" name="phone" placeholder="İsteğe bağlı" />
        <Field label="Doğum tarihi" name="birthDate" placeholder="GG/AA/YYYY" required={needsBirthDate} />
        <Field label="Paket" name="packageName" value={`${item.name} · ${categoryTitle || item.categorySlug}`} readOnly />
        <Field label="Gerekli Gece Kredisi" name="creditLabel" value={formatCredits(item.price)} readOnly />
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-mourning">
          {isCoffee ? "Kahve fincanı fotoğrafları" : "Fotoğraf yükle"}
          {isCoffee && <span className="text-ember"> *</span>}
        </span>
        <div className="occult-card p-5 text-mourning">
          <div className="mb-3 flex items-center gap-2 text-sm">
            <UploadCloud className="h-5 w-5 text-[#c9a6df]" />
            {isCoffee ? "Fincan ve tabak görsellerini yükleyin." : "Bu yorum için görsel yüklemek zorunlu değildir."}
          </div>
          <input
            className="block w-full text-sm text-mourning file:mr-4 file:rounded-full file:border-0 file:bg-frost/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-frost hover:file:bg-frost/20"
            name="orderImages"
            type="file"
            accept="image/*"
            multiple
            required={isCoffee}
          />
          <p className="mt-3 text-xs leading-5 text-mourning-dim">
            {isCoffee
              ? "Kahve falı için fincan ve tabak görselleri zorunludur. Toplam dosya sınırı 10 MB."
              : "İstersen net bir fotoğraf veya ekran görüntüsü ekleyebilirsin. Toplam dosya sınırı 10 MB."}
          </p>
        </div>
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-mourning">{isCoffee ? "Fal için sormak istediğin konu" : "Sormak istediğin ana konu / sorular"} <span className="text-ember">*</span></span>
        <textarea name="topic" className="occult-textarea min-h-36" placeholder="Sorunu, hislerini ve bilmemi istediğin detayları yaz." required />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-mourning">Ek not</span>
        <textarea name="notes" className="occult-textarea min-h-28" placeholder="İsteğe bağlı ek not..." />
      </label>

      <label className="occult-card flex items-start gap-3 p-4 text-sm text-mourning">
        <input type="checkbox" name="consent" value="accepted" className="mt-1" required />
        <span>Bu yorumun eğlence, sembolik anlatım ve kişisel farkındalık amaçlı olduğunu; kesin gelecek bilgisi veya garanti sunmadığını kabul ediyorum.</span>
      </label>

      <div className="overflow-hidden rounded-[1.25rem] border border-ember/30 bg-gradient-to-br from-ember/14 via-black/35 to-[#7c1cff]/14 p-4 shadow-[0_0_28px_rgba(255,0,184,.08)] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ember/30 bg-ember/12 text-ember shadow-[0_0_18px_rgba(255,0,184,.18)]">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-[1.25rem] font-bold leading-tight text-bone sm:text-[1.45rem]">Gece Kredisi bilgisi</h2>
              <span className="rounded-full border border-[#c9a6df]/25 bg-[#7c1cff]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d9c4ff]">
                {creditRateLabel}
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-mourning">
              Bu yorum için gerekli tutar <strong className="text-bone">{formatCredits(item.price)}</strong>. Gece Kredisi yalnızca bu platformdaki eğlence amaçlı sembolik yorum taleplerinde kullanılan site içi kullanım kredisidir.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-6 text-mourning-dim">
                <div className="mb-1 flex items-center gap-2 font-semibold text-mourning">
                  <ShieldCheck className="h-4 w-4 text-[#c9a6df]" /> Site içi kullanım
                </div>
                Kredi devredilemez, nakde çevrilemez ve yalnızca Gece Kehaneti içindeki yorum taleplerinde kullanılır.
              </div>
              <div className="rounded-2xl border border-ember/18 bg-ember/8 p-3 text-xs leading-6 text-mourning-dim">
                <div className="mb-1 flex items-center gap-2 font-semibold text-mourning">
                  <Info className="h-4 w-4 text-ember" /> Kısa uyarı
                </div>
                Gece Kredisi yatırım aracı, elektronik para değildir.
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-mourning-dim">
              Yorumlar sağlık, hukuk, yatırım, psikoloji veya resmi karar danışmanlığı niteliği taşımaz.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={sendOrderForm}
        disabled={status === "sending"}
        className="occult-button px-8 py-4 text-center font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="relative z-10">{status === "sending" ? "Gönderiliyor..." : "Gece Kredisi ile Talebi Başlat"}</span>
      </button>

      {message && (
        <p className={`text-sm leading-6 ${status === "error" ? "text-ember" : "text-mourning"}`} role="status">
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  value,
  readOnly = false
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-mourning">{label}{required && <span className="text-ember"> *</span>}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        readOnly={readOnly}
        className="occult-input"
      />
    </label>
  );
}
