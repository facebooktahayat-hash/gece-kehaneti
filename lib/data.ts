import { Moon, Coffee, Heart, Briefcase, Sparkles, Eye, Star, Flame, CloudMoon, ShieldCheck, Clock3, LockKeyhole, Gem, LucideIcon } from "lucide-react";
export type Category={slug:string;title:string;icon:LucideIcon;intro:string;description:string;accent:string};
export type Package={slug:string;name:string;price:number;delivery:string;level:string;description:string;includes:string[];categorySlug:string};
export const categories:Category[]=[
{slug:"tarot",title:"Tarot Falı",icon:Sparkles,intro:"Kartların gölgesinde saklanan mesajları çöz.",description:"İlişki, kariyer ve içsel kararlar için sezgisel tarot açılımları.",accent:"from-ember to-poison"},
{slug:"kahve-fali",title:"Kahve Falı",icon:Coffee,intro:"Fincanın dibinde kalan sırları oku.",description:"Kahve fincanı görselin üzerinden sembol, yol ve enerji yorumları.",accent:"from-ember to-blood"},
{slug:"ask-fali",title:"Aşk Falı",icon:Heart,intro:"Kalbin karanlıkta sakladığı cevabı hisset.",description:"İlişki, eski sevgili, yeni tanışma ve duygu analizi için yorumlar.",accent:"from-ember to-blood"},
{slug:"kariyer-fali",title:"Kariyer Falı",icon:Briefcase,intro:"İş, para ve yön değişimi için sisin ardına bak.",description:"Kariyer yolları, fırsatlar ve karar dönemleri için sezgisel analiz.",accent:"from-ember to-poison"},
{slug:"astroloji",title:"Astroloji Yorumu",icon:Moon,intro:"Gökyüzünün gece haritasını yorumla.",description:"Doğum tarihi ve burç enerjilerine göre kişisel farkındalık yorumu.",accent:"from-violet to-ember"},
{slug:"ruya-yorumu",title:"Rüya Yorumu",icon:CloudMoon,intro:"Rüyalarının sembollerini karanlıkta takip et.",description:"Rüyalardaki sembol, kişi ve duygu izlerini sezgisel olarak yorumlar.",accent:"from-ember to-violet"},
{slug:"numeroloji",title:"Numeroloji",icon:Star,intro:"Sayıların sessiz kehanetine yaklaş.",description:"İsim, doğum tarihi ve yaşam yolu sayılarına göre yorumlar.",accent:"from-ember to-poison"},
{slug:"enerji-bagi",title:"Enerji Bağı Analizi",icon:Flame,intro:"İki enerji arasındaki görünmeyen bağı hisset.",description:"Kişiler arası uyum, çekim ve mesafe enerjisi üzerine yorumlar.",accent:"from-blood to-ember"}
];
const tpl=[
{key:"kisa-yorum",name:"Kısa Yorum",price:149,delivery:"24 saat",level:"Hızlı başlangıç",description:"Tek konuya odaklı, net ve kısa sezgisel yorum.",includes:["1 ana soru","Kısa enerji yorumu","Net sonuç özeti"]},
{key:"derin-yorum",name:"Derin Yorum",price:299,delivery:"24-48 saat",level:"En çok seçilen",description:"Konuya daha derin bakan, sembol ve enerji odaklı kapsamlı yorum.",includes:["3 ana soru","Detaylı analiz","Kişisel öneri notları"]},
{key:"kabus-gibi-detayli-yorum",name:"Kabus Gibi Detaylı Yorum",price:499,delivery:"48 saat",level:"Yoğun analiz",description:"Karanlık detayları, gizli işaretleri ve olası yönleri daha geniş yorumlar.",includes:["5 ana soru","Derin sembol okuması","Geniş sonuç raporu"]},
{key:"acil-kehanet",name:"Acil Kehanet",price:699,delivery:"Aynı gün",level:"Öncelikli",description:"Acil cevap bekleyen konular için öncelikli hazırlanır.",includes:["Öncelikli teslim","Hızlı değerlendirme","Kişisel sonuç mesajı"]},
{key:"premium-rituel-yorum",name:"Premium Ritüel Yorum",price:999,delivery:"48-72 saat",level:"Premium",description:"Kapsamlı, katmanlı ve kişiye özel hazırlanmış premium yorum.",includes:["7 ana soru","Kapsamlı analiz","Özel kapanış yorumu","Premium rapor"]}
];
export const packages:Package[]=categories.flatMap(c=>tpl.map(t=>({slug:`${c.slug}-${t.key}`,categorySlug:c.slug,...t})));
export const testimonials=[
{name:"Eylül K.",category:"Tarot Falı",rating:5,text:"Yorum net, özenli ve düşündürücüydü. Özellikle ilişki konusunda kendimi daha sakin hissettim."},
{name:"Mert A.",category:"Kariyer Falı",rating:5,text:"Karar verme sürecimde farklı bir açıdan bakmamı sağladı. Anlatım dili profesyoneldi."},
{name:"Derya S.",category:"Kahve Falı",rating:5,text:"Fincandaki semboller çok güzel açıklanmıştı. Kişiye özel hazırlanmış gibi hissettirdi."},
{name:"Nehir T.",category:"Aşk Falı",rating:4,text:"Abartılı vaatler yoktu, daha çok iç sesimi düzenlememe yardımcı olan bir yorumdu."},
{name:"Bora E.",category:"Astroloji",rating:5,text:"Kısa ama etkiliydi. Özellikle zamanlama ve ruh hali yorumlarını sevdim."},
{name:"Selin R.",category:"Rüya Yorumu",rating:5,text:"Rüyamdaki sembolleri daha anlamlı okumamı sağladı. Dili sade ve etkileyiciydi."}
];
export const trustBadges=[
{title:"Gizli ve Güvenli",description:"Paylaştığın bilgiler özenle korunur.",icon:LockKeyhole},
{title:"Hızlı Teslim",description:"Seçtiğin pakete göre yorumun hazırlanır.",icon:Clock3},
{title:"Kişiye Özel",description:"Her yorum kendi soruna göre şekillenir.",icon:Eye},
{title:"Premium Deneyim",description:"Karanlık, şık ve net bir sunum.",icon:Gem},
{title:"Ödeme Altyapısına Uygun",description:"DePay veya farklı ödeme sistemlerine hazır.",icon:ShieldCheck}
];
export function getPackage(slug:string){return packages.find(i=>i.slug===slug)}
export function getCategory(slug:string){return categories.find(i=>i.slug===slug)}
export function packagesByCategory(slug:string){return packages.filter(i=>i.categorySlug===slug)}
export function dailyStats(){const start=new Date("2026-01-01T00:00:00Z").getTime();const diff=Math.max(0,Math.floor((Date.now()-start)/86400000));const wave=diff%5;return{readings:12480+diff*4+wave,clients:8410+diff*3+(diff%3),satisfaction:98.7,todayDelivered:17+wave}}
