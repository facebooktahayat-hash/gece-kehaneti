import { ReactNode } from "react";

export function Section({ eyebrow, title, text, children, id }: { eyebrow?: string; title?: string; text?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="studio-section relative px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || text) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {eyebrow && <p className="eyebrow-chip mb-4">{eyebrow}</p>}
            {title && <h2 className="font-display text-[1.95rem] font-bold leading-tight text-slate-950 md:text-[3.15rem]">{title}</h2>}
            {text && <p className="mt-5 text-[15px] leading-8 text-slate-600 md:text-base">{text}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
