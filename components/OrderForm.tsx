"use client";

import { useRef, useState } from "react";
import { AlertTriangle, ShieldCheck, UploadCloud, WalletCards } from "lucide-react";
import { DePayPaymentButton } from "@/components/DePayPaymentButton";
import type { Package } from "@/lib/data";

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

  async function sendOrderForm() {
    const form = formRef.current;
    if (!form) return false;

    if (!form.reportValidity()) {
      setStatus("error");
      setMessage("Ödemeye geçmeden önce tüm zorunlu alanları doldurun.");
      return false;
    }

    if (sentOrderIdRef.current) {
      return true;
    }

    setStatus("sending");
    setMessage("Form gönderiliyor...");

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
        throw new Error(payload.error || "Sipariş formu gönderilemedi.");
      }

      sentOrderIdRef.current = payload.orderId || orderIdRef.current;
      setStatus("sent");
      setMessage("Form alındı. Ödeme penceresi açılıyor.");
      return true;
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Sipariş formu gönderilemedi.");
      return false;
    }
  }

  return (
    <form ref={formRef} className="mt-10 grid gap-5" encType="multipart/form-data">
      <input type="hidden" name="productSlug" value={item.slug} />
      <input type="hidden" name="orderId" value={orderIdRef.current} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Ad Soyad" name="fullName" placeholder="Adınız Soyadınız" required />
        <Field label="E-posta" name="email" placeholder="ornek@mail.com" type="email" required />
        <Field label="Telefon" name="phone" placeholder="05xx xxx xx xx" />
        <Field label="Doğum tarihi" name="birthDate" placeholder="GG/AA/YYYY" required />
        <Field label="Paket" name="packageName" value={`${item.name} · ${categoryTitle || item.categorySlug}`} readOnly />
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-mourning">
          {isCoffee ? "Kahve fincanı fotoğrafları" : "Fotoğraf yükle"}
          {isCoffee && <span className="text-ember"> *</span>}
        </span>
        <div className="occult-card p-5 text-mourning">
          <div className="mb-3 flex items-center gap-2 text-sm">
            <UploadCloud className="h-5 w-5 text-[#c9a6df]" />
            {isCoffee ? "Fincan ve tabak görsellerini yükleyin." : "İsteğe bağlı görsel ekleyebilirsiniz."}
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
              : "Bu yorum için zorunlu değildir. İstersen net bir fotoğraf veya ekran görüntüsü ekleyebilirsin. Toplam dosya sınırı 10 MB."}
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
        <span>Bu hizmetin eğlence ve kişisel farkındalık amaçlı olduğunu, kesin gelecek garantisi sunmadığını kabul ediyorum.</span>
      </label>

      <div className="overflow-hidden rounded-[1.25rem] border border-ember/30 bg-gradient-to-br from-ember/14 via-black/35 to-[#7c1cff]/14 p-4 shadow-[0_0_28px_rgba(255,0,184,.08)] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ember/30 bg-ember/12 text-ember shadow-[0_0_18px_rgba(255,0,184,.18)]">
            <WalletCards className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-[1.25rem] font-bold leading-tight text-bone sm:text-[1.45rem]">Ödeme bilgisi</h2>
              <span className="rounded-full border border-[#c9a6df]/25 bg-[#7c1cff]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d9c4ff]">
                Polygon USDC
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-mourning">
              Bu siparişte ödeme yalnızca <strong className="text-bone">Polygon ağı üzerindeki USDC</strong> ile alınır. Cüzdanında yeterli Polygon USDC yoksa ödeme ekranı işlemi tamamlamaz.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-6 text-mourning-dim">
                <div className="mb-1 flex items-center gap-2 font-semibold text-mourning">
                  <ShieldCheck className="h-4 w-4 text-[#c9a6df]" /> Doğru ağ
                </div>
                Cüzdan ağı: <span className="text-bone">Polygon / Polygon POS</span><br />
                Token: <span className="text-bone">USDC</span>
              </div>
              <div className="rounded-2xl border border-ember/18 bg-ember/8 p-3 text-xs leading-6 text-mourning-dim">
                <div className="mb-1 flex items-center gap-2 font-semibold text-mourning">
                  <AlertTriangle className="h-4 w-4 text-ember" /> Yetersiz bakiye uyarısı
                </div>
                Ödeme ekranında <span className="text-bone">“Not Enough Funds”</span> görürsen, anlamı cüzdanda yeterli Polygon USDC olmadığıdır.
              </div>
            </div>
            <p className="mt-3 text-[11px] leading-5 text-mourning-dim">
              Yanlış ağdan veya farklı token ile gönderim yapmayın. İlk kez kripto ödeme yapıyorsanız bilen birinden destek almanız önerilir.
            </p>
          </div>
        </div>
      </div>

      <DePayPaymentButton
        productSlug={item.slug}
        productName={item.name}
        priceTl={item.price}
        validateBeforePayment={sendOrderForm}
        getPayload={() => ({ orderId: sentOrderIdRef.current || orderIdRef.current })}
        className="occult-button px-8 py-4 text-center font-semibold text-white"
      >
        Formu Gönder ve Polygon USDC Ödemesine Geç
      </DePayPaymentButton>

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
