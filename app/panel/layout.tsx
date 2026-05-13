import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Panelim",
  description: "VivaMotion AI kullanıcı paneli.",
  path: "/panel",
  noIndex: true
});

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
