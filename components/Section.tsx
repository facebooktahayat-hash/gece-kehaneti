import { ReactNode } from "react";

export function Section({ eyebrow, title, text, children, id }: { eyebrow?: string; title?: string; text?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="relative px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || text) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.42em] text-ember/82">{eyebrow}</p>}
            {title && <h2 className="font-display text-3xl font-bold text-[#f3ebfa] drop-shadow-[0_0_14px_rgba(255,255,255,.07)] md:text-5xl">{title}</h2>}
            {text && <p className="mt-5 text-base leading-8 text-whisper">{text}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
