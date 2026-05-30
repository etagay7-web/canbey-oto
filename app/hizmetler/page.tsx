import type { Metadata } from "next";
import Link from "next/link";
import {
  Cog, Settings, GaugeCircle, Zap, PaintBucket, Droplets, Fuel, Wrench, Car, CircleDot, Sparkles,
  Check, ArrowRight, type LucideIcon,
} from "lucide-react";
import { loadPage, loadList } from "@/lib/pages-content";

export const metadata: Metadata = {
  title: "Hizmetlerimiz - Motor, Şanzıman, Kaporta & Daha Fazlası",
  description:
    "Canbey Oto Tamir'de sunduğumuz tüm oto tamir ve bakım hizmetleri: motor revizyonu, şanzıman, fren, elektrik, kaporta-boya, periyodik bakım, LPG, ön takım.",
};

type ServiceRow = {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  detail_content?: string | null;
};

const ICON_MAP: Record<string, LucideIcon> = {
  Cog, Settings, GaugeCircle, Zap, PaintBucket, Droplets, Fuel, Wrench, Car, CircleDot, Sparkles,
};

function pickIcon(name?: string | null): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name];
  return Wrench;
}

const fallbackServices = [
  { id: "motor", title: "Motor Revizyonu", icon: "Cog", description: "Tam motor revizyonu, segman değişimi, sübap ayarı, conta yenilemesi ve performans tuning. Tüm marka modellerde bilgisayarlı detaylı arıza tespiti.", detail_content: "Segman & piston değişimi\nTriger kayışı yenileme\nYakıt sistem temizliği\nPerformans chip tuning" },
  { id: "sanziman", title: "Şanzıman Tamiri", icon: "Settings", description: "Otomatik, manuel ve CVT şanzıman tamir, bakım ve komple değişim. Solenoid, valf bloğu, yağ ve filtre değişimi orijinal parça ile.", detail_content: "Otomatik şanzıman yağ değişimi\nManuel şanzıman tamiri\nDSG-CVT bakımı\nDiferansiyel onarımı" },
  { id: "fren", title: "Fren & Amortisör", icon: "GaugeCircle", description: "Disk, balata, hidrolik fren sistemi, amortisör, helezon yay ve süspansiyon ayar hizmetleri.", detail_content: "Disk & balata değişimi\nAmortisör onarımı\nABS arıza tespiti\nSüspansiyon kontrolü" },
  { id: "elektrik", title: "Elektrik & Elektronik", icon: "Zap", description: "Beyin yazılım güncellemesi, OBD arıza tespiti, alternatör-marş tamiri, akü ve antifiriz değişimi.", detail_content: "ECU yazılımı\nAlternatör & marş\nAkü test & değişim\nAntifiriz kontrolü" },
  { id: "kaporta", title: "Kaporta & Boya", icon: "PaintBucket", description: "Çekme, düzeltme, fırın boya, lokal boya, polisaj ve sigorta anlaşmalı hasarlı araç tamiratı.", detail_content: "Tam kaporta restorasyon\nFırın boya\nLokal kaporta tamiri\nPolisaj & seramik kaplama" },
  { id: "on-takim", title: "Ön Takım & Rot", icon: "Wrench", description: "Ön takım yenileme, salıncak değişimi, rot mafsalı, viraj demir lastikleri ve aks burcu onarımı.", detail_content: "Ön takım yenileme\nRot mafsalı\nSalıncak değişimi\nViraj demir lastik" },
  { id: "bakim", title: "Periyodik Bakım", icon: "Droplets", description: "Yağ bakımı, filtreler, triger seti değişimi. Marka servis prosedürlerine sadık bakım.", detail_content: "Motor yağı & filtre\nTüm filtreler\nTriger seti\nMuayene öncesi hazırlık" },
  { id: "lpg", title: "LPG Montajı", icon: "Fuel", description: "TSE belgeli BRC, Lovato, Atiker LPG sistemleri. Sıralı sistem montajı ve servis hizmeti.", detail_content: "Sıralı LPG sistem\nGaz kiti ayarı\nSızdırmazlık testi\nPeriyodik LPG bakımı" },
];

const packages = [
  { name: "EKONOMİK", features: ["Motor yağı & filtre değişimi", "Hava filtresi kontrolü", "Akü & alternatör test", "Genel araç kontrolü", "Fren balata kontrolü"] },
  { name: "STANDART", badge: "EN POPÜLER", features: ["Motor yağı & tüm filtreler", "Buji kontrolü & değişimi", "Fren bakımı", "Bilgisayarlı arıza tespit", "Polen filtresi", "Antifriz kontrolü", "Muayene öncesi hazırlık"] },
  { name: "PREMIUM", features: ["Standart paketin tamamı", "Triger seti kontrolü", "Şanzıman yağ kontrolü", "Klima bakımı & dezenfeksiyon", "Detaylı 80 nokta inspeksiyon", "Pasta cila", "12 ay garanti"] },
];

export default async function HizmetlerPage() {
  const [content, services] = await Promise.all([
    loadPage("hizmetler"),
    loadList<ServiceRow>("services", { activeOnly: true, orderBy: "order_index", ascending: true }),
  ]);

  const title = content.title || "HİZMETLERİMİZ";
  const subtitle = content.subtitle || "Aracınızın her ihtiyacı için tek adres. Uzman teknisyenler, son teknoloji ekipman, orijinal parça ve garantili işçilik.";
  const list = services.length > 0 ? services : fallbackServices;

  return (
    <>
      <PageHeader title={title} subtitle="8 Uzmanlık Alanı" desc={subtitle} />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          {list.map((s) => {
            const Icon = pickIcon(s.icon);
            const points = (s.detail_content || "")
              .split(/\n+/)
              .map((p) => p.trim())
              .filter(Boolean);
            return (
              <div key={s.id} className="card card-hover grid lg:grid-cols-12 gap-6 p-7 lg:p-8 border-l-4 border-l-[#E63946]">
                <div className="lg:col-span-4 flex flex-col">
                  <div className="icon-tile icon-tile-lg mb-5">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h2 className="font-display text-2xl tracking-wider text-[#14141A]">
                    {s.title}
                  </h2>
                </div>

                <div className="lg:col-span-8">
                  {s.description && <p className="text-[#5A5A66] leading-relaxed mb-5">{s.description}</p>}
                  {points.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-2 mb-5">
                      {points.map((p) => (
                        <div key={p} className="flex items-start gap-2.5 text-sm">
                          <span className="w-4 h-4 rounded-full bg-[#FCEFF1] flex items-center justify-center shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={3.5} className="text-[#E63946]" />
                          </span>
                          <span className="text-[#14141A]">{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Link href="/iletisim" className="btn btn-primary">
                      Randevu Al <ArrowRight size={14} strokeWidth={2.5} />
                    </Link>
                    <a href="tel:+905522913713" className="btn btn-ghost">Bilgi Al</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 lg:py-24 bg-[#F7F7F9] border-t border-[#E8E8EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="tag mb-4 inline-flex"><span>Servis Paketleri</span></div>
            <h2 className="headline font-display text-4xl sm:text-5xl text-[#14141A] mb-3">
              SİZE UYGUN <span className="text-[#E63946]">PAKETİ SEÇİN</span>
            </h2>
            <p className="text-[#5A5A66] max-w-2xl mx-auto">
              Aracınızın yaşına ve ihtiyacına göre kapsamlı bakım paketleri.
              Detaylı fiyat için iletişime geçin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((p) => (
              <div key={p.name} className={`relative card flex flex-col ${p.badge ? "border-2 border-[#E63946] lg:scale-105" : ""}`}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E63946] text-white text-[10px] tracking-[0.2em] uppercase font-extrabold px-3 py-1 font-cond">
                    {p.badge}
                  </div>
                )}
                <div className="p-7 text-center border-b border-[#E8E8EC]">
                  <div className="font-display text-3xl tracking-wider text-[#14141A]">{p.name}</div>
                  <div className="text-xs text-[#5A5A66] mt-2">Paket içeriği</div>
                </div>
                <ul className="p-7 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#14141A]">
                      <span className="w-4 h-4 rounded-full bg-[#FCEFF1] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3.5} className="text-[#E63946]" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-7 pt-0">
                  <Link href="/iletisim" className={`${p.badge ? "btn btn-primary" : "btn btn-outline"} w-full !justify-center`}>
                    Fiyat Teklifi Al
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PageHeader({ title, subtitle, desc }: { title: string; subtitle: string; desc: string }) {
  return (
    <section className="bg-[#F7F7F9] pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-[#E8E8EC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="tag mb-4 inline-flex"><span>{subtitle}</span></div>
        <h1 className="headline font-display text-5xl sm:text-6xl lg:text-7xl text-[#14141A] mb-4">
          {title}
        </h1>
        <p className="text-[#5A5A66] max-w-2xl text-base sm:text-lg">{desc}</p>
      </div>
    </section>
  );
}
