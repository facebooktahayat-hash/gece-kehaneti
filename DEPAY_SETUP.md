# DePay Kurulum Notu

Bu sürümde Gumroad bağlantısı kullanılmaz. Tüm ürünlerde DePay Payment Widget açılır.

## DePay panelinde
1. Dinamik yapılandırma açık kalsın.
2. Uç nokta:
https://gece-kehaneti.vercel.app/api/depay/payment

3. Alan adları:
gece-kehaneti.vercel.app

4. Açık Anahtar / Public Key alanına şu dosyadaki anahtarı yapıştır:
DEPAY_PUBLIC_KEY_TO_PASTE_IN_DEPAY.txt

## Vercel Environment Variables
Vercel > Project > Settings > Environment Variables bölümüne şunları ekle:

NEXT_PUBLIC_SITE_URL=https://gece-kehaneti.vercel.app
DEPAY_DYNAMIC_PRIVATE_KEY=private key değeri
DEPAY_RECEIVER_ADDRESS=paranın yatacağı cüzdan adresi
DEPAY_BLOCKCHAIN=polygon
DEPAY_TOKEN_ADDRESS=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
DEPAY_TL_PER_USD=40

Not:
- DEPAY_DYNAMIC_PRIVATE_KEY GitHub'a yüklenmemeli.
- DEPAY_RECEIVER_ADDRESS kendi Polygon/USDC uyumlu cüzdan adresin olmalı.
- DEPAY_TL_PER_USD sabit kurdur. 40 yazarsa 50.000 TL ürün DePay'e 1250 USD olarak gider.
