import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LivingStudioLayer } from "@/components/LivingStudioLayer";
import { buildPageMetadata, defaultDescription, siteName } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...buildPageMetadata({ title: `OpenAI Destekli AI Medya Stüdyosu | ${siteName}`, description: defaultDescription, path: "/" }),
  title: { default: `OpenAI Destekli AI Medya Stüdyosu | ${siteName}`, template: `%s | ${siteName}` },
  applicationName: siteName,
  category: "digital-content"
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr"><body><Header /><LivingStudioLayer /><main className="min-h-screen bg-radial-studio">{children}</main><Footer /></body></html>;
}
