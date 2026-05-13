import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "İletişim",
  description: "VivaMotion AI panel, ödeme, üretim dosyası teslimi ve teknik destek konuları için iletişim sayfası.",
  path: "/iletisim"
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
