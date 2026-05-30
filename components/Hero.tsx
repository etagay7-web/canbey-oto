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

const PHONE_DISPLAY = "+90 552 291 3713";
const PHONE_WA = "905522913713";

export default function Hero() {
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
            ARACINIZ
            <br />
            <span className="text-[#E63946]">EMİN ELLERDE</span>
          </h1>

          <p className="animate-fade-up delay-300 text-base sm:text-lg text-[#5A5A66] max-w-xl mb-7 leading-relaxed">
            İstanbul&apos;da yağ bakımı, ön takım, bilgisayarlı arıza tespiti,
            muayene öncesi hazırlık, akü ve antifiriz hizmetleri.
            Tüm marka araçlar için uzman mekanik.
          </p>

          {/* Brand badges */}
          <div className="animate-fade-up delay-400 mb-7 flex flex-wrap items-center gap-3 text-xs text-[#5A5A66]">
            <span className="font-cond uppercase tracking-widest font-bold text-[#14141A]">Servis verdiğimiz markalar:</span>
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
              Hemen Randevu Al
            </Link>
            <a
              href={`https://wa.me/${PHONE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
            <Link href="/hizmetler" className="btn btn-outline">
              Hizmetler
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
            <a href={`tel:+${PHONE_WA}`} className="text-sm flex items-center gap-2 text-[#14141A] font-semibold hover:text-[#E63946]">
              <Phone size={14} className="text-[#E63946]" />
              {PHONE_DISPLAY}
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
            {/* Top tag */}
            <div className="absolute top-4 left-4 bg-[#E63946] text-white px-3 py-1.5 font-cond font-bold text-xs tracking-[0.18em] uppercase">
              Atölyemiz
            </div>
            {/* Bottom feature pills */}
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
              {[
                { Icon: CheckCircle2, label: "Orijinal\nParça" },
                { Icon: ShieldCheck, label: "Garantili\nİşçilik" },
                { Icon: ClipboardCheck, label: "Ücretsiz\nEkspertiz" },
              ].map((f) => (
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
