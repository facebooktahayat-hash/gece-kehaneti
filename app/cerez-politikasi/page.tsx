import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { legalInfo } from "@/lib/legal-info";

export const metadata: Metadata = buildPageMetadata({ title: "Çerez Politikası", description: "VivaMotion AI çerez politikası.", path: "/cerez-politikasi" });

const sections = [
  { title: "1. Çerez kullanımı", body: ["VivaMotion AI; oturum, panel erişimi, güvenlik, form akışı, performans ve tercihlerin hatırlanması için çerezler veya benzer teknolojiler kullanabilir."] },
  { title: "2. Zorunlu çerezler", body: ["Güvenli oturum, ödeme yönlendirmesi, panel erişimi ve form doğrulama gibi temel site işlevleri için gerekli çerezlerdir."] },
  { title: "3. Analitik ve performans", body: ["Site performansını ölçmek ve kullanıcı deneyimini iyileştirmek için anonim veya sınırlı analitik veriler kullanılabilir. Reklam/analitik servisleri eklenirse ilgili servislerin çerezleri ayrıca devreye girebilir."] },
  { title: "4. Yönetim", body: ["Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi panel, ödeme veya form akışını etkileyebilir."] },
  { title: "5. İletişim", body: [`Çerezler hakkında ${legalInfo.supportEmail} adresinden destek alabilirsiniz.`] }
];

export default function CookiePage() {
  return <section className="px-4 py-16 md:px-6"><div className="mx-auto max-w-5xl"><div className="studio-panel p-6 md:p-10 lg:p-12"><p className="eyebrow-chip mb-4">Teknik bilgiler</p><h1 className="font-display text-[2.25rem] font-black text-ink md:text-[3.7rem]">Çerez Politikası</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-soft md:text-base">Bu sayfa, sitede kullanılabilecek çerez ve benzer teknolojiler hakkında bilgi verir.</p><div className="mt-8 space-y-7 text-[15px] leading-8 text-soft md:text-[16px]">{sections.map((section) => <section key={section.title} className="rounded-[1.3rem] border border-cyan-100 bg-white/70 p-5 md:p-6"><h2 className="font-display text-[1.45rem] font-bold text-ink md:text-[1.75rem]">{section.title}</h2><div className="mt-4 space-y-4">{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div></div></div></section>;
}
