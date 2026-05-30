import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube,
} from "lucide-react";

const PHONE_DISPLAY = "+90 552 291 3713";
const PHONE_TEL = "+905522913713";

const services = [
  "Motor Revizyonu",
  "Şanzıman Tamiri",
  "Fren & Amortisör",
  "Elektrik & Elektronik",
  "Kaporta & Boya",
  "Ön Takım & Rot",
  "Periyodik Bakım",
  "LPG Montajı",
];

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

const socials = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F7F7F9] text-[#14141A] border-t border-[#E8E8EC]">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex mb-5" aria-label="Canbey Oto Tamir">
            <Image
              src="/logo.png"
              alt="Canbey Oto Tamir"
              width={180}
              height={180}
              className="h-20 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-[#5A5A66] leading-relaxed mb-5">
            Bağcılar / İstanbul&apos;da yağ bakımı, ön takım, bilgisayarlı arıza
            tespiti ve tüm marka araç servisi.
          </p>
          <div className="flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 bg-white border border-[#E8E8EC] hover:bg-[#E63946] hover:border-[#E63946] hover:text-white text-[#5A5A66] flex items-center justify-center transition-colors"
              >
                <Icon size={15} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-display text-lg tracking-wider mb-5 text-[#14141A]">HİZMETLERİMİZ</h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s}>
                <Link href="/hizmetler" className="text-sm text-[#5A5A66] hover:text-[#E63946] transition-colors">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-lg tracking-wider mb-5 text-[#14141A]">HIZLI LİNKLER</h3>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-[#5A5A66] hover:text-[#E63946] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg tracking-wider mb-5 text-[#14141A]">İLETİŞİM</h3>
          <ul className="space-y-3 text-sm text-[#5A5A66]">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-[#E63946] mt-0.5 shrink-0" />
              <a
                href="https://share.google/MKRWS2R1NSvommKWm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#14141A] transition-colors"
              >
                Fatih Mehmet Akif Bulvarı No:317<br />Tavukçu Deresi, 34204 Bağcılar / İstanbul
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={15} className="text-[#E63946] mt-0.5 shrink-0" />
              <a href={`tel:${PHONE_TEL}`} className="hover:text-[#14141A]">{PHONE_DISPLAY}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={15} className="text-[#E63946] mt-0.5 shrink-0" />
              <a href="mailto:info@canbeyototamir.com" className="hover:text-[#14141A]">info@canbeyototamir.com</a>
            </li>
          </ul>
          <div className="mt-5 pt-5 border-t border-[#E8E8EC] text-xs">
            <div className="font-cond font-bold text-[#14141A] text-[11px] tracking-[0.2em] uppercase mb-2">Çalışma Saatleri</div>
            <div className="flex justify-between mb-1 text-[#5A5A66]"><span>Pzt - Cuma</span><span className="text-[#14141A] font-semibold">08:00 - 19:00</span></div>
            <div className="flex justify-between mb-1 text-[#5A5A66]"><span>Cumartesi</span><span className="text-[#14141A] font-semibold">09:00 - 17:00</span></div>
            <div className="flex justify-between text-[#5A5A66]"><span>Pazar</span><span className="text-[#E63946] font-semibold">Kapalı</span></div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E8E8EC] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#5A5A66]">
          <div>© 2024 <span className="text-[#14141A] font-semibold">Canbey Oto Tamir</span>. Tüm hakları saklıdır.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#E63946]">Gizlilik</a>
            <a href="#" className="hover:text-[#E63946]">KVKK</a>
            <a href="#" className="hover:text-[#E63946]">Çerez</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
