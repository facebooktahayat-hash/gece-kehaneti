import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: "Hakkımızda", description: "VivaMotion AI, ürün ve marka brieflerini OpenAI destekli kreatif AI medya paketlerine dönüştüren panel odaklı bir stüdyodur.", path: "/hakkimizda" });

export default function AboutPage() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="studio-panel p-7 md:p-12">
          <p className="eyebrow-chip mb-4">VivaMotion AI</p>
          <h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Canlı ve ferah bir AI medya stüdyosu</h1>
          <div className="mt-7 grid gap-6 text-[15px] leading-8 text-soft md:text-[16px]">
            <p>VivaMotion AI, ürün fotoğrafı, marka bilgisi, kampanya hedefi ve sosyal medya briefini OpenAI destekli kreatif medya paketlerine dönüştüren dijital bir üretim platformudur.</p>
            <p>Kullanıcı paketini seçer, ürünü veya markayı anlatır, varsa görsellerini yükler. Ödeme sonrası proje üretim kuyruğuna alınır ve yaklaşık 3 saat içinde satın alma e-postası ile 6 haneli proje anahtarı kullanılarak Panelim alanında açılır.</p>
            <p>Markanın atmosferi enerjik, sinematik ve satış odaklıdır. Amaç; ürün videosu fikri, reklam görsel yönü, sosyal medya metni, kampanya kancası ve uygulanabilir prompt setini tek yerde toplamaktır.</p>
            <div className="rounded-[1.25rem] border border-aqua/20 bg-aqua/10 p-5 text-sm leading-7 text-soft"><strong className="text-ink">Net sınır:</strong> VivaMotion AI, OpenAI altyapısını kullanan bağımsız bir kreatif stüdyodur. İzinsiz kişi, ünlü, marka, telifli karakter veya yanıltıcı taklit talepleri kabul edilmez.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
