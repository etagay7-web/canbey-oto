import type { Metadata } from "next";
import Link from "next/link";
import {
  Cog, Settings, GaugeCircle, Zap, PaintBucket, Droplets, Fuel, Wrench,
  Check, ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmetlerimiz - Motor, Şanzıman, Kaporta & Daha Fazlası",
  description:
    "Canbey Oto Tamir'de sunduğumuz tüm oto tamir ve bakım hizmetleri: motor revizyonu, şanzıman, fren, elektrik, kaporta-boya, periyodik bakım, LPG, ön takım.",
};

const services = [
  {
    title: "Motor Revizyonu", Icon: Cog,
    desc: "Tam motor revizyonu, segman değişimi, sübap ayarı, conta yenilemesi ve performans tuning. Tüm marka modellerde bilgisayarlı detaylı arıza tespiti.",
    points: ["Segman & piston değişimi", "Triger kayışı yenileme", "Yakıt sistem temizliği", "Performans chip tuning"],
  },
  {
    title: "Şanzıman Tamiri", Icon: Settings,
    desc: "Otomatik, manuel ve CVT şanzıman tamir, bakım ve komple değişim. Solenoid, valf bloğu, yağ ve filtre değişimi orijinal parça ile.",
    points: ["Otomatik şanzıman yağ değişimi", "Manuel şanzıman tamiri", "DSG-CVT bakımı", "Diferansiyel onarımı"],
  },
  {
    title: "Fren & Amortisör", Icon: GaugeCircle,
    desc: "Disk, balata, hidrolik fren sistemi, amortisör, helezon yay ve süspansiyon ayar hizmetleri. ABS ve EBS sistemleri için orijinal yedek parça.",
    points: ["Disk & balata değişimi", "Amortisör onarımı", "ABS arıza tespiti", "Süspansiyon kontrolü"],
  },
  {
    title: "Elektrik & Elektronik", Icon: Zap,
    desc: "Beyin yazılım güncellemesi, OBD arıza tespiti, alternatör-marş tamiri, akü ve antifiriz değişimi ile tüm elektrik tesisat hizmetleri.",
    points: ["ECU yazılımı", "Alternatör & marş", "Akü test & değişim", "Antifiriz kontrolü"],
  },
  {
    title: "Kaporta & Boya", Icon: PaintBucket,
    desc: "Çekme, düzeltme, fırın boya, lokal boya, polisaj ve sigorta anlaşmalı hasarlı araç tamiratı. Renk uyumu için spektrometrik analiz.",
    points: ["Tam kaporta restorasyon", "Fırın boya", "Lokal kaporta tamiri", "Polisaj & seramik kaplama"],
  },
  {
    title: "Ön Takım & Rot", Icon: Wrench,
    desc: "Ön takım yenileme, salıncak değişimi, rot mafsalı, viraj demir lastikleri ve aks burcu onarımı.",
    points: ["Ön takım yenileme", "Rot mafsalı", "Salıncak değişimi", "Viraj demir lastik"],
  },
  {
    title: "Periyodik Bakım", Icon: Droplets,
    desc: "Yağ bakımı, yağ filtresi, hava filtresi, polen filtresi, yakıt filtresi, triger seti değişimi. Marka servis prosedürlerine sadık bakım.",
    points: ["Motor yağı & filtre", "Tüm filtreler", "Triger seti", "Muayene öncesi hazırlık"],
  },
  {
    title: "LPG Montajı", Icon: Fuel,
    desc: "TSE belgeli BRC, Lovato, Atiker LPG sistemleri. Sıralı sistem montajı, gaz kit ayarı ve servis hizmeti.",
    points: ["Sıralı LPG sistem", "Gaz kiti ayarı", "Sızdırmazlık testi", "Periyodik LPG bakımı"],
  },
];

const packages = [
  {
    name: "EKONOMİK",
    features: ["Motor yağı & filtre değişimi", "Hava filtresi kontrolü", "Akü & alternatör test", "Genel araç kontrolü", "Fren balata kontrolü"],
  },
  {
    name: "STANDART", badge: "EN POPÜLER",
    features: ["Motor yağı & tüm filtreler", "Buji kontrolü & değişimi", "Fren bakımı", "Bilgisayarlı arıza tespit", "Polen filtresi", "Antifriz kontrolü", "Muayene öncesi hazırlık"],
  },
  {
    name: "PREMIUM",
    features: ["Standart paketin tamamı", "Triger seti kontrolü", "Şanzıman yağ kontrolü", "Klima bakımı & dezenfeksiyon", "Detaylı 80 nokta inspeksiyon", "Pasta cila", "12 ay garanti"],
  },
];

export default function HizmetlerPage() {
  return (
    <>
      <PageHeader title="HİZMETLERİMİZ" subtitle="8 Uzmanlık Alanı" desc="Aracınızın her ihtiyacı için tek adres. Uzman teknisyenler, son teknoloji ekipman, orijinal parça ve garantili işçilik." />

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="card card-hover grid lg:grid-cols-12 gap-6 p-7 lg:p-8 border-l-4 border-l-[#E63946]"
            >
              <div className="lg:col-span-4 flex flex-col">
                <div className="icon-tile icon-tile-lg mb-5">
                  <s.Icon size={26} strokeWidth={1.8} />
                </div>
                <h2 className="font-display text-2xl tracking-wider text-[#14141A]">
                  {s.title}
                </h2>
              </div>

              <div className="lg:col-span-8">
                <p className="text-[#5A5A66] leading-relaxed mb-5">{s.desc}</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-5">
                  {s.points.map((p) => (
                    <div key={p} className="flex items-start gap-2.5 text-sm">
                      <span className="w-4 h-4 rounded-full bg-[#FCEFF1] flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={3.5} className="text-[#E63946]" />
                      </span>
                      <span className="text-[#14141A]">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/iletisim" className="btn btn-primary">
                    Randevu Al <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                  <a href="tel:+905522913713" className="btn btn-ghost">Bilgi Al</a>
                </div>
              </div>
            </div>
          ))}
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
                  <div className="font-display text-3xl tracking-wider text-[#14141A]">
                    {p.name}
                  </div>
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
