"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, ShieldCheck, UploadCloud } from "lucide-react";
import { formatPrice, type Package } from "@/lib/data";

type OrderFormProps = { item: Package; categoryTitle?: string };
type OrderResponse = { ok?: boolean; orderId?: string; error?: string; mailSent?: boolean; warning?: string };

function createOrderId() {
  return `VM-${Date.now()}-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
}

export function OrderForm({ item, categoryTitle }: OrderFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const orderIdRef = useRef(createOrderId());
  const sentOrderIdRef = useRef("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  function buildPaymentPageUrl(orderId: string) {
    const form = formRef.current;
    const formData = form ? new FormData(form) : undefined;
    const params = new URLSearchParams({ paket: item.slug, talep: orderId, tutar: String(item.price) });
    const email = String(formData?.get("email") || "").trim();
    const fullName = String(formData?.get("fullName") || "").trim();
    if (email) params.set("eposta", email);
    if (fullName) params.set("isim", fullName);
    return `/odeme?${params.toString()}`;
  }

  function rememberOrderDraft(orderId: string) {
    const form = formRef.current;
    if (!form || typeof window === "undefined") return;
    const formData = new FormData(form);
    const draft = {
      orderId,
      productSlug: item.slug,
      productName: item.name,
      price: item.price,
      fullName: String(formData.get("fullName") || ""),
      email: String(formData.get("email") || ""),
      topic: String(formData.get("topic") || ""),
      notes: String(formData.get("notes") || ""),
      createdAt: new Date().toISOString()
    };
    try { window.localStorage.setItem("vivamotion-ai-last-order", JSON.stringify(draft)); } catch {}
  }

  function goToPaymentPage(orderId: string) { router.push(buildPaymentPageUrl(orderId)); }

  async function sendOrderForm() {
    const form = formRef.current;
    if (!form) return false;
    if (!form.reportValidity()) {
      setStatus("error");
      setMessage("Kreatif üretim talebi için zorunlu alanları doldurun.");
      return false;
    }
    if (sentOrderIdRef.current) {
      setStatus("sent");
      setMessage("Talebin daha önce alındı. Ödeme adımına yönlendiriliyorsun...");
      goToPaymentPage(sentOrderIdRef.current);
      return true;
    }
    setStatus("sending");
    setMessage("Kreatif üretim talebi oluşturuluyor...");
    try {
      const formData = new FormData(form);
      formData.set("orderId", orderIdRef.current);
      formData.set("productSlug", item.slug);
      rememberOrderDraft(orderIdRef.current);
      const response = await fetch("/api/order", { method: "POST", body: formData });
      const payload = (await response.json().catch(() => ({}))) as OrderResponse;
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Talep alınamadı.");
      sentOrderIdRef.current = payload.orderId || orderIdRef.current;
      setStatus("sent");
      setMessage(payload.warning || "Talebin alındı. Ödeme adımına yönlendiriliyorsun...");
      goToPaymentPage(sentOrderIdRef.current);
      return true;
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Talep oluşturulamadı.");
      return false;
    }
  }

  return (
    <form ref={formRef} className="mt-10 grid gap-5" encType="multipart/form-data">
      <input type="hidden" name="productSlug" value={item.slug} />
      <input type="hidden" name="orderId" value={orderIdRef.current} />
      <input type="hidden" name="price" value={item.price} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Ad / marka adı" name="fullName" placeholder="Panelde görünecek ad veya marka" required />
        <Field label="Satın alma e-postası" name="email" placeholder="Proje dosyanı bu e-posta ve anahtarla açacaksın" type="email" required />
        <Field label="Paket" name="packageName" value={`${item.name} · ${categoryTitle || item.categorySlug}`} readOnly />
        <Field label="Tutar" name="priceLabel" value={formatPrice(item.price)} readOnly />
        <Field label="Teslim" name="deliveryLabel" value={item.delivery} readOnly />
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-slate-600">Ürün fotoğrafı / referans görsel / kampanya ekranı yükle</span>
        <div className="studio-card p-5 text-slate-600">
          <div className="mb-3 flex items-center gap-2 text-sm"><UploadCloud className="h-5 w-5 text-cyan-600" />Ürününü veya referansını eklersen brief daha net hazırlanır. Zorunlu değildir.</div>
          <input className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 hover:file:bg-cyan-100" name="orderImages" type="file" accept="image/*" multiple />
          <p className="mt-3 text-xs leading-5 text-slate-500">Toplam dosya sınırı 10 MB. Yalnızca hak sahibi olduğun veya kullanım izni bulunan materyalleri yükle.</p>
        </div>
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-slate-600">Ürün / kampanya brief’i <span className="text-pink-500">*</span></span>
        <textarea name="topic" className="studio-textarea min-h-40" placeholder="Ürünün ne? Kime satılıyor? Hangi platform için istiyorsun? Reels, reklam görseli, ürün videosu, avatar sunucu veya kampanya hedefini kendi cümlelerinle yaz." required />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-slate-600">Ek not</span>
        <textarea name="notes" className="studio-textarea min-h-28" placeholder="İsteğe bağlı: marka tonu, renkler, yasaklı kelimeler, örnek rakipler, hedef ülke, kampanya süresi, özel istekler..." />
      </label>

      <label className="studio-card flex items-start gap-3 p-4 text-sm leading-6 text-slate-600">
        <input type="checkbox" name="consent" value="accepted" className="mt-1" required />
        <span>
          Satın aldığım içeriğin OpenAI destekli kreatif dijital üretim dosyası olduğunu; hak sahibi olmadığım kişi, ünlü, marka veya görsellerin taklit edilmesini talep etmeyeceğimi; teslimin e-posta gövdesine değil satın aldığım e-posta ve 6 haneli proje anahtarı ile Panelim alanına yapılacağını ve <a href="/on-bilgilendirme-formu" target="_blank" className="text-cyan-700 underline decoration-cyan-300 underline-offset-4">Ön Bilgilendirme Formu</a>, <a href="/mesafeli-satis-sozlesmesi" target="_blank" className="text-cyan-700 underline decoration-cyan-300 underline-offset-4">Mesafeli Satış Sözleşmesi</a>, <a href="/teslimat-iade-sartlari" target="_blank" className="text-cyan-700 underline decoration-cyan-300 underline-offset-4">Teslimat ve İade Şartları</a>, <a href="/gizlilik" target="_blank" className="text-cyan-700 underline decoration-cyan-300 underline-offset-4">Gizlilik Politikası</a> ve <a href="/kullanim-sartlari" target="_blank" className="text-cyan-700 underline decoration-cyan-300 underline-offset-4">Kullanım Şartları</a> metinlerini kabul ediyorum.
        </span>
      </label>

      <div className="overflow-hidden rounded-[1.25rem] border border-cyan-200 bg-gradient-to-br from-white via-cyan-50 to-pink-50 p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cyan-200 bg-white text-cyan-700 shadow-sm"><CreditCard className="h-5 w-5" /></div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2"><h2 className="font-display text-[1.25rem] font-bold leading-tight text-slate-950 sm:text-[1.45rem]">Panel teslim bilgisi</h2><span className="rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-pink-700">{formatPrice(item.price)}</span></div>
            <p className="mt-3 text-sm leading-7 text-slate-600">Ödeme tamamlandıktan sonra dosyan AI üretim kuyruğuna alınır. Proje dosyan <strong className="text-slate-950">yaklaşık 3 saat içinde</strong> satın aldığın e-posta ve e-postana gönderilecek 6 haneli proje anahtarı ile Panelim alanında açılır.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-200 bg-white p-4 text-xs leading-5 text-slate-600"><ShieldCheck className="mb-2 h-5 w-5 text-cyan-600" />Teslim dosyası panelde saklanır ve 6 haneli proje anahtarıyla açılır.</div>
              <div className="rounded-2xl border border-amber-200 bg-white p-4 text-xs leading-5 text-slate-600">Ödeme sonrası proje anahtarın e-postana gönderilir; panelde e-posta + anahtar gerekir.</div>
            </div>
          </div>
        </div>
      </div>

      {message && <p className={`rounded-xl border px-4 py-3 text-sm ${status === "error" ? "border-pink-200 bg-pink-50 text-pink-700" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>{message}</p>}

      <button type="button" onClick={sendOrderForm} disabled={status === "sending"} className="studio-button px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-60">
        <span className="relative z-10">{status === "sending" ? "Talep oluşturuluyor..." : "Dosyamı Oluştur ve Ödemeye Geç"}</span>
      </button>
    </form>
  );
}

function Field({ label, name, placeholder, type = "text", required, value, readOnly }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean; value?: string; readOnly?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-slate-600">{label}{required && <span className="text-pink-500"> *</span>}</span>
      <input name={name} type={type} placeholder={placeholder} required={required} defaultValue={value} readOnly={readOnly} className="studio-input" />
    </label>
  );
}
