import {
  MapPin, Phone, Mail, Clock, Calendar,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppButton";

const PHONE_DISPLAY = "+90 552 291 3713";
const PHONE_WA = "905522913713";
const PHONE_TEL = "+905522913713";
const MAPS_LINK = "https://share.google/MKRWS2R1NSvommKWm";

export default function ContactForm() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="tag mb-4 inline-flex">
            <Calendar size={11} />
            <span>İletişim & Randevu</span>
          </div>
          <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-[#14141A] mb-4">
            BİZE <span className="text-[#E63946]">ULAŞIN</span>
          </h2>
          <p className="text-[#5A5A66] max-w-2xl mx-auto mb-8">
            Aracınızla ilgili randevu, fiyat teklifi veya yol yardım için
            WhatsApp&apos;tan yazın veya hemen arayın.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${PHONE_WA}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp ile Yaz
            </a>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">
              <Phone size={14} strokeWidth={2.5} />
              Hemen Ara
            </a>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <InfoCard
            Icon={MapPin}
            title="Adres"
            lines={["Fatih M. Akif Bulvarı No:317", "Tavukçu Deresi, 34204 Bağcılar / İstanbul"]}
            link={{ href: MAPS_LINK, external: true }}
          />
          <InfoCard
            Icon={Phone}
            title="Telefon"
            lines={[PHONE_DISPLAY, "7/24 Yol Yardım"]}
            action={{ label: "Hemen Ara", href: `tel:${PHONE_TEL}` }}
          />
          <InfoCard
            Icon={Mail}
            title="E-posta"
            lines={["info@canbeyototamir.com"]}
            action={{ label: "Mail Gönder", href: "mailto:info@canbeyototamir.com" }}
          />
          <InfoCard
            Icon={Clock}
            title="Çalışma Saatleri"
            lines={["Pzt - Cuma: 08:00 - 19:00", "Cumartesi: 09:00 - 17:00", "Pazar: Kapalı"]}
          />
        </div>

        {/* Map - full width */}
        <div className="card aspect-[21/9] sm:aspect-[21/8] relative overflow-hidden">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.8467%2C41.0292%2C28.8667%2C41.0492&amp;layer=mapnik&amp;marker=41.0392%2C28.8567"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            title="Servis konumu"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-3 py-2 border border-[#E8E8EC] shadow-sm">
            <MapPin size={15} className="text-[#E63946]" />
            <span className="font-cond text-xs tracking-wider font-bold text-[#14141A]">Canbey Oto Tamir</span>
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 btn btn-primary !py-2.5 !px-4"
          >
            <MapPin size={13} strokeWidth={2.5} />
            Haritada Aç
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  Icon, title, lines, action, link,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  lines: string[];
  action?: { label: string; href: string };
  link?: { href: string; external?: boolean };
}) {
  const Wrapper: React.ElementType = link ? "a" : "div";
  const wrapperProps = link
    ? {
        href: link.href,
        ...(link.external && { target: "_blank", rel: "noopener noreferrer" }),
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`card card-hover p-6 flex flex-col ${link ? "cursor-pointer" : ""}`}
    >
      <div className="icon-tile icon-tile-lg mb-4">
        <Icon size={22} strokeWidth={2} />
      </div>
      <h3 className="font-display text-xl tracking-wider text-[#14141A] mb-2">{title}</h3>
      <div className="space-y-0.5 text-[#5A5A66] text-sm flex-1">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center mt-4 pt-4 border-t border-[#E8E8EC] text-xs tracking-[0.18em] uppercase font-bold font-cond text-[#E63946] hover:text-[#C82A38] transition-colors"
        >
          {action.label} →
        </a>
      )}
    </Wrapper>
  );
}
