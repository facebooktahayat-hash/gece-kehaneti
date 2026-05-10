"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { DePayPaymentButton } from "@/components/DePayPaymentButton";
import type { Category, Package } from "@/lib/data";

type OrderFormProps = {
  item: Package;
  category?: Category;
};

type OrderResponse = {
  ok?: boolean;
  orderId?: string;
  error?: string;
};

function createOrderId() {
  return `GK-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
}

export function OrderForm({ item, category }: OrderFormProps) {
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
        <Field label="Doğum tarihi" name="birthDate" placeholder="GG/AA/YYYY" required />
        <Field label="Paket" name="packageName" value={`${item.name} · ${category?.title || item.categorySlug}`} readOnly />
      </div>

      {isCoffee && (
        <label className="grid gap-2">
          <span className="text-sm text-mourning">Kahve fincanı fotoğrafları <span className="text-ember">*</span></span>
          <div className="occult-card p-5 text-mourning">
            <div className="mb-3 flex items-center gap-2 text-sm"><UploadCloud className="h-5 w-5 text-[#c9a6df]" /> Fincan ve tabak görsellerini yükleyin.</div>
            <input
              className="block w-full text-sm text-mourning file:mr-4 file:rounded-full file:border-0 file:bg-frost/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-frost hover:file:bg-frost/20"
              name="coffeeImages"
              type="file"
              accept="image/*"
              multiple
              required
            />
            <p className="mt-3 text-xs leading-5 text-mourning-dim">Toplam dosya sınırı 10 MB. Net ışıkta çekilmiş fincan ve tabak fotoğrafları önerilir.</p>
          </div>
        </label>
      )}

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

      <DePayPaymentButton
        productSlug={item.slug}
        productName={item.name}
        priceTl={item.price}
        validateBeforePayment={sendOrderForm}
        getPayload={() => ({ orderId: sentOrderIdRef.current || orderIdRef.current })}
        className="occult-button px-8 py-4 text-center font-semibold text-white"
      >
        Formu Gönder ve DePay Kripto Ödemesine Geç
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
