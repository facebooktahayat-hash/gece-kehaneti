import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Yönetici Paneli",
  description: "VivaMotion AI yönetici paneli.",
  path: "/admin",
  noIndex: true
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
