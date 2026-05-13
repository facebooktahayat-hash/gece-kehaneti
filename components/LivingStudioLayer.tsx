"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type StudioStage = {
  label: string;
  hint: string;
};

const stages: StudioStage[] = [
  { label: "Stüdyo Hazır", hint: "Kreatif akış başladı" },
  { label: "Fikir Netleşiyor", hint: "Paketleri incele" },
  { label: "Sahne Kuruluyor", hint: "Ürününü öne çıkar" },
  { label: "Üretime Geç", hint: "AI paketini seç" }
];

const hiddenPrefixes = ["/admin", "/panel", "/odeme"];

export function LivingStudioLayer() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const shouldHide = hiddenPrefixes.some((prefix) => pathname?.startsWith(prefix));
  const ctaHref = pathname === "/" ? "#paketler" : "/paketler";

  useEffect(() => {
    if (shouldHide) return;

    let frame = 0;
    const updateProgress = () => {
      const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const nextProgress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
      document.documentElement.style.setProperty("--studio-progress", String(nextProgress));
      setProgress(nextProgress);
      setVisible(window.scrollY > 160);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [shouldHide]);

  const stage = useMemo(() => {
    if (progress > 0.78) return stages[3];
    if (progress > 0.50) return stages[2];
    if (progress > 0.20) return stages[1];
    return stages[0];
  }, [progress]);

  if (shouldHide) return null;

  return (
    <>
      <div className="living-studio-atmosphere" aria-hidden="true">
        <span className="studio-fog-orb studio-fog-orb-a" />
        <span className="studio-fog-orb studio-fog-orb-b" />
        <span className="studio-fog-orb studio-fog-orb-c" />
        <span className="studio-star-dust studio-star-dust-a" />
        <span className="studio-star-dust studio-star-dust-b" />
      </div>

      <div className="studio-scroll-line" aria-hidden="true" />

      <Link
        href={ctaHref}
        className={`studio-status-seal ${visible ? "studio-status-seal-visible" : ""}`}
        aria-label={`${stage.label}. ${stage.hint}`}
      >
        <span className="studio-status-orb" aria-hidden="true" />
        <span className="min-w-0">
          <span className="studio-status-label">{stage.label}</span>
          <span className="studio-status-hint">{stage.hint}</span>
        </span>
      </Link>
    </>
  );
}
