import Link from "next/link";
import {
  Cog, Settings, GaugeCircle, Zap, PaintBucket, Droplets, Fuel, Wrench,
  ArrowRight,
} from "lucide-react";

export const servicesData = [
  { id: "motor", title: "Motor Revizyonu", desc: "Tam motor revizyonu, segman, sübap ayarı ve performans tuning.", Icon: Cog },
  { id: "sanziman", title: "Şanzıman Tamiri", desc: "Otomatik, manuel ve CVT şanzıman tamir, bakım, değişim.", Icon: Settings },
  { id: "fren", title: "Fren & Amortisör", desc: "Disk, balata, amortisör, ABS ve süspansiyon servisleri.", Icon: GaugeCircle },
  { id: "elektrik", title: "Elektrik & Elektronik", desc: "ECU yazılım, OBD-II arıza tespit, alternatör, marş.", Icon: Zap },
  { id: "kaporta", title: "Kaporta & Boya", desc: "Fırın boya, çekme, lokal tamir, sigorta anlaşmalı.", Icon: PaintBucket },
  { id: "on-takim", title: "Ön Takım & Rot", desc: "Ön takım yenileme, rot, balans, salıncak ve kapı altı.", Icon: Wrench },
  { id: "bakim", title: "Periyodik Bakım", desc: "Yağ, filtre, triger ve marka servis prosedürleri.", Icon: Droplets },
  { id: "lpg", title: "LPG Montajı", desc: "TSE belgeli BRC, Lovato, Atiker LPG sistem montajı.", Icon: Fuel },
];

export default function Services() {
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
            Aracınızın her noktası için 8 farklı uzmanlık alanında profesyonel çözüm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesData.map((s) => (
            <div key={s.id} className="service-card group">
              <div className="icon-tile icon-tile-lg mb-5">
                <s.Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-xl tracking-wider text-[#14141A] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[#5A5A66] leading-relaxed mb-5 min-h-[60px]">
                {s.desc}
              </p>
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase font-bold font-cond text-[#E63946] hover:gap-2.5 transition-all"
              >
                Detay <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
