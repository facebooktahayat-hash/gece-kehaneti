# VivaMotion AI

OpenAI destekli, panelde teslim edilen AI medya üretim stüdyosu.

## Konsept

VivaMotion AI; ürün videosu, AI reklam görseli, fotoğraf canlandırma, avatar sunucu video, Reels/TikTok içerik paketi ve marka kampanya dosyaları için kreatif brief, storyboard, sosyal medya metni ve üretim promptları hazırlar.

## Çalışma akışı

1. Kullanıcı paket seçer.
2. Ürün/kampanya brief’i ve isteğe bağlı görsellerini gönderir.
3. Ödeme adımına geçer.
4. Ödeme eşleşince dosya üretim kuyruğuna alınır.
5. Müşteri e-posta + 6 haneli proje anahtarı ile Panelim alanından dosyasını görüntüler.

## Yerel kurulum

```bash
npm install
npm run dev
```

Varsayılan adres:

```bash
http://localhost:3000
```

## Vercel / GitHub taşınabilirlik

Bu paket sabit domain bağımlılığı olmadan hazırlanmıştır. Canlıya alırken yalnızca ortam değişkenlerini Vercel paneline girin. Node sürümü `20.x` olarak sabitlenmiştir.

Önerilen minimum değişkenler:

```bash
NEXT_PUBLIC_SITE_URL=https://alan-adiniz.com
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
CUSTOMER_FROM_EMAIL="VivaMotion AI <noreply@alan-adiniz.com>"
CUSTOMER_REPLY_TO_EMAIL=destek@alan-adiniz.com
CONTACT_TO_EMAIL=destek@alan-adiniz.com
ORDER_TO_EMAIL=destek@alan-adiniz.com
NEXT_PUBLIC_PAYMENT_DEFAULT_URL=https://odeme-saglayici-linkiniz
```

## Opsiyonel değişkenler

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CRON_SECRET=
NEXT_PUBLIC_DELIVERY_LABEL="yaklaşık 3 saat içinde"
OPENAI_IMAGE_INPUT_LIMIT=4
ORDER_STORE_IMAGES_MAX_BYTES=3500000
```

Redis girilmezse yerel bellek kullanılır. Canlı ortamda kalıcı panel kayıtları için Redis önerilir.

## Build kontrolü

```bash
npm run build
npm run lint
```

Bu paket teslim öncesi build ve lint kontrolünden geçirilmiştir.

## Notlar

- OpenAI adı yalnızca kullanılan AI altyapısını açıklamak için geçer.
- İzinsiz gerçek kişi, ünlü, marka, logo veya telifli karakter taklidi talep edilmemelidir.
- Ürünler dijital kreatif içerik dosyasıdır; fiziksel teslimat yoktur.
