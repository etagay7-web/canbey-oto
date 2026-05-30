import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ShieldCheck,
  ClipboardCheck,
  ArrowRight,
  Star,
  Phone,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppButton";

type HeroProps = {
  title?: string;
  subtitle?: string;
  button1Text?: string;
  button2Text?: string;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  phone?: string;
  phoneWa?: string;
};

const DEFAULTS = {
  title: "ARACINIZ EMİN ELLERDE",
  subtitle:
    "İstanbul'da yağ bakımı, ön takım, bilgisayarlı arıza tespiti, muayene öncesi hazırlık, akü ve antifiriz hizmetleri. Tüm marka araçlar için uzman mekanik.",
  button1Text: "Hemen Randevu Al",
  button2Text: "Hizmetler",
  badge1: "Orijinal\nParça",
  badge2: "Garantili\nİşçilik",
  badge3: "Ücretsiz\nEkspertiz",
  phone: "+90 552 291 3713",
  phoneWa: "905522913713",
};

function renderTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return <>{title}</>;
  if (words.length === 2)
    return (
      <>
        {words[0]} <span className="text-[#E63946]">{words[1]}</span>
      </>
    );
  // 3+ kelime: ilk kelime üst satır, kalanlar alt satır kırmızı
  const first = words[0];
  const rest = words.slice(1).join(" ");
  return (
    <>
      {first}
      <br />
      <span className="text-[#E63946]">{rest}</span>
    </>
  );
}

export default function Hero(props: HeroProps = {}) {
  const title = props.title || DEFAULTS.title;
  const subtitle = props.subtitle || DEFAULTS.subtitle;
  const button1Text = props.button1Text || DEFAULTS.button1Text;
  const button2Text = props.button2Text || DEFAULTS.button2Text;
  const badge1 = props.badge1 || DEFAULTS.badge1;
  const badge2 = props.badge2 || DEFAULTS.badge2;
  const badge3 = props.badge3 || DEFAULTS.badge3;
  const phone = props.phone || DEFAULTS.phone;
  const phoneWa = props.phoneWa || DEFAULTS.phoneWa;

  const badges = [
    { Icon: CheckCircle2, label: badge1 },
    { Icon: ShieldCheck, label: badge2 },
    { Icon: ClipboardCheck, label: badge3 },
  ];

  return (
    <section className="relative bg-[#F7F7F9] pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left */}
        <div className="lg:col-span-7">
          <div className="animate-slide-left delay-100 inline-flex items-center gap-2 mb-6 tag">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
            <span>İstanbul · Tüm Marka Servis</span>
          </div>

          <h1 className="animate-slide-left delay-200 headline font-display text-[52px] sm:text-[68px] lg:text-[84px] text-[#14141A] mb-5">
            {renderTitle(title)}
          </h1>

          <p className="animate-fade-up delay-300 text-base sm:text-lg text-[#5A5A66] max-w-xl mb-7 leading-relaxed">
            {subtitle}
          </p>

          {/* Brand badges */}
          <div className="animate-fade-up delay-400 mb-7 flex flex-wrap items-center gap-3 text-xs text-[#5A5A66]">
            <span className="font-cond uppercase tracking-widest font-bold text-[#14141A]">
              Servis verdiğimiz markalar:
            </span>
            <div className="flex flex-wrap gap-2">
              {["BMW", "Mercedes", "Audi", "VW", "Honda", "Skoda", "Peugeot", "Citroën", "Opel", "Ford", "Renault", "Hyundai", "Fiat"].map((b) => (
                <span key={b} className="px-2.5 py-1 bg-white border border-[#E8E8EC] font-semibold text-[#14141A]">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-fade-up delay-500 flex flex-wrap gap-3 mb-8">
            <Link href="/iletisim" className="btn btn-primary">
              <Phone size={14} strokeWidth={2.5} />
              {button1Text}
            </Link>
            <a
              href={`https://wa.me/${phoneWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
            <Link href="/hizmetler" className="btn btn-outline">
              {button2Text}
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="animate-fade-up delay-500 flex flex-wrap items-center gap-6 pt-6 border-t border-[#E8E8EC]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[#F4A400] text-[#F4A400]" />
                ))}
              </div>
              <span className="text-sm text-[#14141A] font-semibold">4.9 / 5.0</span>
            </div>
            <div className="h-6 w-px bg-[#E8E8EC]" />
            <a href={`tel:+${phoneWa}`} className="text-sm flex items-center gap-2 text-[#14141A] font-semibold hover:text-[#E63946]">
              <Phone size={14} className="text-[#E63946]" />
              {phone}
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="lg:col-span-5 animate-fade-up delay-300">
          <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-hidden bg-white border border-[#E8E8EC]">
            <Image
              src="/photos/canbey-02.jpeg"
              alt="Canbey Oto Tamir - dükkan görünümü"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#E63946] text-white px-3 py-1.5 font-cond font-bold text-xs tracking-[0.18em] uppercase">
              Atölyemiz
            </div>
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
              {badges.map((f) => (
                <div key={f.label} className="bg-white/95 backdrop-blur border border-[#E8E8EC] p-2.5 text-center">
                  <f.Icon size={18} className="text-[#E63946] mx-auto mb-1" strokeWidth={2} />
                  <div className="text-[10px] tracking-wide font-semibold text-[#14141A] whitespace-pre-line leading-tight">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
