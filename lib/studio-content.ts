import { OrderDraft } from "@/lib/order-store";
import { siteUrl as baseSiteUrl } from "@/lib/seo";

export function siteUrl() {
  return baseSiteUrl;
}

export function deliveryLabel() {
  return process.env.NEXT_PUBLIC_DELIVERY_LABEL || "yaklaşık 3 saat içinde";
}

export function deliveryDelayMs() {
  const raw = Number(process.env.DELIVERY_DELAY_MS || process.env.NEXT_PUBLIC_DELIVERY_DELAY_MS || "10800000");
  return Number.isFinite(raw) && raw > 0 ? raw : 10800000;
}

export function imageSet(_order: Pick<OrderDraft, "categorySlug" | "productSlug">) {
  const base = siteUrl();
  return [
    `${base}/email-art/product-video.svg`,
    `${base}/email-art/ad-creative.svg`,
    `${base}/email-art/social-reels.svg`
  ];
}

function packageScope(order: OrderDraft) {
  const categoryScopes: Record<string, string> = {
    "ai-urun-videosu": "Ürün fotoğrafı ve satış vaadini kısa video sahnesi, kamera hareketi, ilk 3 saniye kancası ve CTA metnine dönüştür.",
    "fotograf-canlandirma": "Statik görseli hareket hissi olan sahneye taşı: kamera yönü, ışık akışı, hareket betimi ve güvenli üretim promptları oluştur.",
    "ai-reklam-gorseli": "Ürün görseli için arka plan, kompozisyon, ışık, slogan ve platforma uygun reklam karesi promptları hazırla.",
    "avatar-sunucu-video": "İzinli avatar veya marka sunucusu için konuşma metni, sahne planı, ton ve güvenli kullanım notları hazırla.",
    "reels-tiktok-paketi": "Reels, TikTok ve Shorts için hook, akış, altyazı, CTA ve üretim promptları hazırla.",
    "marka-kampanya-seti": "Video fikri, reklam görseli, sosyal medya metni, kreatif açı ve lansman akışını birleştir."
  };
  const tierScopes: Array<[string, string]> = [
    ["starter", "Starter paket: net, uygulanabilir, kısa ve hızlı üretim odağı."],
    ["pro", "Pro paket: daha fazla alternatif, satış açısı, platform uyumu ve ayrıntılı prompt seti."],
    ["viral", "Viral paket: çoklu içerik açısı, güçlü hook seti, storyboard ve kampanya varyasyonları."],
    ["ultimate-ai-kampanya", "Ultimate paket: en kapsamlı kampanya dosyası; video, görsel, sosyal medya ve reklam metinlerini tek stratejide birleştir."]
  ];
  const tier = tierScopes.find(([key]) => order.productSlug.includes(key) || order.productSlug === key)?.[1] || "Paket kapsamına göre detay yoğunluğunu ayarla.";
  return `${categoryScopes[order.categorySlug] || categoryScopes["ai-urun-videosu"]}\n${tier}`;
}

export function safetyFrame() {
  return [
    "İzinsiz gerçek kişi, ünlü, marka, logo, telifli karakter veya üçüncü taraf varlığını taklit eden yönerge yazma.",
    "Kullanıcının hak sahibi olmadığı görselleri kullanmasını teşvik etme; gerekli izin ve lisans sorumluluğunu hatırlat.",
    "Yanıltıcı deepfake, sahte beyan, gerçek kişi adına konuşma veya aldatıcı reklam dili üretme.",
    "Sağlık, hukuk, finans, güvenlik veya kriz konularında profesyonel tavsiye verme.",
    "Metni satış odaklı yaz ama manipülatif, yanıltıcı veya garanti vaat eden cümlelerden kaçın.",
    "Üretim promptlarını güvenli, marka uyumlu, uygulanabilir ve platforma dönük hazırlamaya odaklan."
  ].join("\n");
}

export function buildInterpretationPrompt(order: OrderDraft) {
  return `VivaMotion AI markası için müşterinin panelinde açılacak Türkçe kreatif üretim dosyası hazırla.

MARKA TONU:
- Ferah, modern, enerjik, yaratıcı ve profesyonel.
- Sıradan chatbot cevabı gibi yazma; dosya bir kreatif stüdyo brief’i gibi düzenli, uygulanabilir ve satış odaklı olsun.
- Müşteriye doğrudan "sen" diliyle yaz.
- Net başlıklar, kısa açıklamalar, prompt blokları ve uygulanabilir üretim yönergeleri kullan.

ÜRÜN KONSEPTİ:
${packageScope(order)}

MÜŞTERİ BİLGİLERİ:
Ad / marka: ${order.fullName}
E-posta: ${order.email}
Kategori: ${order.categoryTitle}
Ürün: ${order.productName}
Talep No: ${order.orderId}

MÜŞTERİNİN YAZDIĞI BRIEF:
${order.topic}

EK NOTLAR:
${order.notes || "Yok"}

GÖRSELLER:
${order.images.length ? `${order.images.length} görsel gönderildi. Görselleri yalnızca ürün, renk, ışık, kompozisyon ve kreatif referans açısından değerlendir. Hassas nitelik, kimlik, yaş, sağlık, din, etnik köken veya cinsel yönelim çıkarımı yapma.` : "Müşteri görsel göndermedi; dosyayı yazılı bilgilere göre hazırla."}

GÜVENLİK ÇERÇEVESİ:
${safetyFrame()}

İSTENEN YAPI:
# Kısa ve güçlü proje başlığı
## Hızlı Kreatif Özet
Ürün/marka için ana satış fikri.
## Hedef Kitle ve İlk 3 Saniye
Kime seslenilecek, ilk anda ne gösterilecek?
## Video / Görsel Sahne Planı
Sahne, kamera, ışık, arka plan, tempo ve kompozisyon yönergeleri.
## AI Üretim Promptları
En az 5 uygulanabilir prompt. Paket kapsamı uygunsa 10+ prompt yaz.
## Sosyal Medya Metinleri
Hook, kısa açıklama, altyazı ve CTA seçenekleri.
## Reklam Açısı
Fayda, problem, kanıt, teklif ve çağrı kurgusu.
## Güvenli Kullanım Notları
Hak, izin ve yanıltıcı içerikten kaçınma notları.
## Hemen Uygulanacak Mini Plan
3 maddelik aksiyon planı.

ÇIKTI:
- Sadece müşterinin panelinde gösterilecek dosyayı yaz.
- Türkçe yaz.
- Markdown başlıkları kullan.
- Gerçek kişi/ünlü/marka taklidi veya yanıltıcı içerik önermeden yaratıcı yön ver.
- OpenAI destekli modern kreatif stüdyo deneyimi gibi hissettir.`;
}

export function fallbackInterpretation(order: OrderDraft) {
  return `# ${order.productName} Kreatif Dosyan

${order.fullName}, bu dosya seçtiğin ${order.productName} kapsamında hazırlandı. Aşağıdaki yapı, ürününü veya kampanya fikrini daha uygulanabilir video, görsel ve sosyal medya üretim akışına dönüştürmek için tasarlandı.

## Hızlı Kreatif Özet

Ürünün için en güçlü başlangıç noktası net bir fayda cümlesi kurmak: izleyici ilk saniyede ne gördüğünü, neden ilgilenmesi gerektiğini ve sonraki adımın ne olduğunu anlamalı.

## Hedef Kitle ve İlk 3 Saniye

İlk sahnede ürün net görünmeli. Arka plan sade, ışık temiz ve hareket yumuşak olmalı. İlk metin, ürünün çözdüğü problemi kısa bir cümleyle açmalı.

## Video / Görsel Sahne Planı

1. Ürün temiz ve ferah bir zeminde görünür.
2. Kamera yavaşça ürüne yaklaşır.
3. Ürünün ana faydası kısa yazıyla ekrana gelir.
4. Son karede marka adı, teklif ve net çağrı bulunur.

## AI Üretim Promptları

- Modern, aydınlık stüdyo ortamında ürün odaklı reklam görseli, temiz ışık geçişleri, temiz arka plan, premium e-ticaret estetiği.
- Ürün fotoğrafından kısa sosyal medya videosu hissi, yavaş kamera yaklaşımı, parlak ışık geçişi, sade tipografi alanı.
- Instagram Reels için enerjik ürün tanıtımı, ilk 3 saniyede dikkat çekici hareket, finalde net satın alma çağrısı.
- Minimal beyaz arka plan, pastel renk patlamaları, ürün merkezde, modern reklam kompozisyonu.
- Kısa video storyboard: problem, ürün gösterimi, fayda, sosyal kanıt, CTA.

## Sosyal Medya Metinleri

- "Ürünün farkını ilk bakışta göster."
- "Daha temiz, daha hızlı, daha dikkat çekici bir tanıtım."
- "Şimdi keşfet, ürünü vitrinin merkezine taşı."

## Reklam Açısı

Mesajı tek fayda etrafında kur: ürün neyi kolaylaştırıyor, kimin işine yarıyor ve neden şimdi denenmeli?

## Güvenli Kullanım Notları

Yalnızca hak sahibi olduğun görsel, marka ve ürün materyallerini kullan. İzinsiz kişi, ünlü, logo veya telifli karakter taklidi isteme.

## Hemen Uygulanacak Mini Plan

1. Ürünün en net faydasını tek cümleye indir.
2. Bir ana görsel ve bir kısa video promptu seç.
3. Reels veya reklam formatında ilk denemeyi yayına hazırla.`;
}
