export const legalInfo = {
  brandName: "VivaMotion AI",
  website: (process.env.NEXT_PUBLIC_SITE_URL || "https://").replace(/\/$/, ""),
  tradeName: process.env.NEXT_PUBLIC_MERCHANT_TRADE_NAME || "Osman Kaya / VivaMotion AI",
  sellerType: process.env.NEXT_PUBLIC_MERCHANT_SELLER_TYPE || "Bireysel satıcı",
  address: process.env.NEXT_PUBLIC_MERCHANT_ADDRESS || "Bireysel satıcı — destek e-postası üzerinden iletişim",
  taxOffice: process.env.NEXT_PUBLIC_MERCHANT_TAX_OFFICE || "Bireysel satıcı",
  taxNumber: process.env.NEXT_PUBLIC_MERCHANT_TAX_NUMBER || "Vergi levhası bulunmamaktadır",
  mersis: process.env.NEXT_PUBLIC_MERCHANT_MERSIS || "Bulunmamaktadır",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "destek@example.com",
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "İletişim formu üzerinden destek",
  deliveryWindow: "Ödeme eşleşmesinden sonra yaklaşık 3 saat",
  productType: "OpenAI destekli kreatif AI medya üretimi",
  panelPath: "/panel"
};

export const legalProductSummary = [
  "VivaMotion AI; ürün, marka, kampanya ve sosyal medya brieflerinden yola çıkarak OpenAI destekli kreatif AI medya paketleri hazırlar.",
  "Paketler fiziki teslimat içermez; satın alma sırasında kullanılan e-posta ve 6 haneli proje anahtarı ile Panelim alanında görüntülenir.",
  "Paketler reklam fikri, görsel yön, video sahnesi ve sosyal medya metni üretir; izinsiz kişi, ünlü, marka veya telifli materyal taklidi talep edilmemelidir."
];
