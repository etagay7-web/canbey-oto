import Link from "next/link";
import {
  Cog, Settings, GaugeCircle, Zap, PaintBucket, Droplets, Fuel, Wrench, Car, CircleDot, Sparkles,
  ArrowRight, type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  id?: string;
  title: string;
  description?: string | null;
  desc?: string;
  icon?: string | null;
};

export const servicesData: ServiceItem[] = [
  { id: "motor", title: "Motor Revizyonu", desc: "Tam motor revizyonu, segman, sübap ayarı ve performans tuning.", icon: "Cog" },
  { id: "sanziman", title: "Şanzıman Tamiri", desc: "Otomatik, manuel ve CVT şanzıman tamir, bakım, değişim.", icon: "Settings" },
  { id: "fren", title: "Fren & Amortisör", desc: "Disk, balata, amortisör, ABS ve süspansiyon servisleri.", icon: "GaugeCircle" },
  { id: "elektrik", title: "Elektrik & Elektronik", desc: "ECU yazılım, OBD-II arıza tespit, alternatör, marş.", icon: "Zap" },
  { id: "kaporta", title: "Kaporta & Boya", desc: "Fırın boya, çekme, lokal tamir, sigorta anlaşmalı.", icon: "PaintBucket" },
  { id: "on-takim", title: "Ön Takım & Rot", desc: "Ön takım yenileme, rot, balans, salıncak ve kapı altı.", icon: "Wrench" },
  { id: "bakim", title: "Periyodik Bakım", desc: "Yağ, filtre, triger ve marka servis prosedürleri.", icon: "Droplets" },
  { id: "lpg", title: "LPG Montajı", desc: "TSE belgeli BRC, Lovato, Atiker LPG sistem montajı.", icon: "Fuel" },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Cog, Settings, GaugeCircle, Zap, PaintBucket, Droplets, Fuel, Wrench, Car, CircleDot, Sparkles,
};

function pickIcon(name?: string | null): LucideIcon {
  if (name && ICON_MAP[name]) return ICON_MAP[name];
  return Wrench;
}

export default function Services({ items }: { items?: ServiceItem[] } = {}) {
  const data = items && items.length > 0 ? items : servicesData;
  return (
    <section className="bg-[#F7F7F9] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="tag mb-4 inline-flex">
            <span>Hizmetlerimiz</span>
          </div>
          <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-[#14141A] mb-4">
            UZMAN <span className="text-[#E63946]">OTO SERVİS</span>
          </h2>
          <p className="text-[#5A5A66] max-w-2xl mx-auto">
            Aracınızın her noktası için profesyonel çözüm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((s, i) => {
            const Icon = pickIcon(s.icon);
            const desc = s.description ?? s.desc ?? "";
            return (
              <div key={s.id ?? i} className="service-card group">
                <div className="icon-tile icon-tile-lg mb-5">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-xl tracking-wider text-[#14141A] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#5A5A66] leading-relaxed mb-5 min-h-[60px]">
                  {desc}
                </p>
                <Link
                  href="/hizmetler"
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase font-bold font-cond text-[#E63946] hover:gap-2.5 transition-all"
                >
                  Detay <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
