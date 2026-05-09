import { ReactNode } from "react";

export function Section({ eyebrow, title, text, children, id }: { eyebrow?: string; title?: string; text?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="relative px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || text) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && <p className="eyebrow-rune mb-4">{eyebrow}</p>}
            {title && <h2 className="font-display text-[2.2rem] font-bold leading-tight text-[#f3ebfa] drop-shadow-[0_0_14px_rgba(255,255,255,.07)] md:text-[3.3rem]">{title}</h2>}
            {text && <p className="mt-5 text-[15px] leading-8 text-whisper md:text-base">{text}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
