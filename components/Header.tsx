"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Clock, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

const PHONE_DISPLAY = "+90 552 291 3713";
const PHONE_TEL = "+905522913713";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top utility bar */}
      <div className="hidden md:block bg-[#14141A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-[#E63946] transition-colors">
              <Phone size={12} className="text-[#E63946]" strokeWidth={2.5} />
              <span className="font-semibold">{PHONE_DISPLAY}</span>
            </a>
            <span className="flex items-center gap-2 text-white/80">
              <Clock size={12} className="text-[#F4A400]" strokeWidth={2.5} />
              Pzt-Cum 08:00-19:00 · Cmt 09:00-17:00
            </span>
          </div>
          <a
            href="https://share.google/MKRWS2R1NSvommKWm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            Fatih M. Akif Blv. No:317, Bağcılar / İstanbul
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled || open
            ? "bg-white border-b border-[#E8E8EC] shadow-sm"
            : "bg-white/95 backdrop-blur"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label="Canbey Oto Tamir">
            <Image
              src="/logo.png"
              alt="Canbey Oto Tamir"
              width={180}
              height={180}
              priority
              className="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-cond font-semibold text-sm tracking-wider uppercase px-4 py-2 transition-colors relative ${
                    active
                      ? "text-[#E63946]"
                      : "text-[#14141A] hover:text-[#E63946]"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-4 right-4 -bottom-1 h-0.5 bg-[#E63946]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/iletisim" className="hidden md:inline-flex btn btn-primary !py-2.5 !px-5">
              Randevu Al
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-[#E63946] text-white"
              aria-label="Menü"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-[#E8E8EC]">
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-cond font-semibold text-sm tracking-wider uppercase py-3 px-4 border-l-2 transition-colors ${
                      active
                        ? "border-[#E63946] bg-[#FCEFF1] text-[#E63946]"
                        : "border-transparent text-[#14141A] hover:bg-[#F7F7F9]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/iletisim" className="btn btn-primary mt-3 !justify-center">
                Randevu Al
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
