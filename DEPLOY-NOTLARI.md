# Deploy Notları

Bu paket başka GitHub/Vercel hesabına taşınabilir şekilde hazırlanmıştır. Sabit domain eklenmedi; canlı adres `NEXT_PUBLIC_SITE_URL` ortam değişkeninden okunur.

## Önerilen Node sürümü

- Node.js: `20.x`
- Paket yöneticisi: `npm`

Projede `.nvmrc`, `.node-version` ve `package.json > engines` Node 20 ile uyumlu bırakıldı.

## Kurulum

```bash
npm install
npm run build
npm run start
```

## Vercel ortam değişkenleri

Zorunlu/asgari:

```bash
NEXT_PUBLIC_SITE_URL=https://vercel-domaininiz.vercel.app
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
CUSTOMER_FROM_EMAIL="VivaMotion AI <noreply@domaininiz.com>"
CUSTOMER_REPLY_TO_EMAIL=destek@domaininiz.com
CONTACT_TO_EMAIL=destek@domaininiz.com
ORDER_TO_EMAIL=destek@domaininiz.com
NEXT_PUBLIC_PAYMENT_DEFAULT_URL=https://odeme-linkiniz
```

Opsiyonel:

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
CRON_SECRET=
NEXT_PUBLIC_DELIVERY_LABEL="yaklaşık 3 saat içinde"
```

Redis girilmezse panel kayıtları geçici yerel bellekle çalışır. Canlı satış için Upstash Redis önerilir.

## Kontrol sonucu

- `npm run build` başarılı.
- `npm run lint` uyarısız geçti.
- Eski konsept kelime taraması yapıldı; görünen site metinleri yeni AI medya stüdyosu konseptine çevrildi.
- Ana sayfa, kategori, ürün, sipariş, ödeme, panel, yasal sayfalar, SEO metadata, sitemap ve robots yeni konsepte göre güncellendi.
