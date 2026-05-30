"use client";

import { useEffect, useState } from "react";
import { X, Phone, Gift, Check } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppButton";

const PHONE_WA = "905522913713";
const PHONE_DISPLAY = "+90 552 291 3713";
const MESSAGE =
  "Merhaba, web sitenizdeki ÜCRETSİZ ARIZA TESPİTİ kampanyasından faydalanmak istiyorum.";

const STORAGE_KEY = "canbey-popup-seen";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#14141A]/70 backdrop-blur-sm p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="relative w-full max-w-md bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[95vh] overflow-y-auto animate-scale-in"
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Kapat"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5A5A66] hover:bg-[#F7F7F9] hover:text-[#14141A] transition-colors shadow-sm border border-[#E8E8EC]"
        >
          <X size={18} />
        </button>

        {/* Red header */}
        <div className="relative bg-[#E63946] text-white px-6 pt-7 pb-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-[11px] tracking-[0.18em] uppercase font-bold font-cond mb-3">
            <Gift size={12} />
            Özel Kampanya
          </div>
          <h2 className="font-display text-3xl tracking-wider leading-none">
            ÜCRETSİZ ARIZA TESPİTİ
          </h2>
          <p className="text-sm text-white/90 mt-2">
            Aracınızı getirin, bilgisayarlı arıza tespitini ücretsiz yapalım.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 bg-white">
          <ul className="space-y-2.5 mb-6">
            {[
              "Bilgisayarlı arıza tespiti",
              "Muayene öncesi hazırlık kontrolü",
              "Şeffaf fiyat teklifi",
              "Tamir kararı tamamen size kalır",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#FCEFF1] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={12} className="text-[#E63946]" strokeWidth={3} />
                </span>
                <span className="text-[#14141A]">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={`https://wa.me/${PHONE_WA}?text=${encodeURIComponent(MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="btn btn-whatsapp flex-1 !justify-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:+${PHONE_WA}`}
              onClick={close}
              className="btn btn-primary flex-1 !justify-center"
            >
              <Phone size={14} strokeWidth={2.5} />
              Hemen Ara
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E8EC] text-center text-xs text-[#5A5A66]">
            <strong className="text-[#14141A]">Canbey Oto Tamir</strong> · {PHONE_DISPLAY}
          </div>
        </div>
      </div>
    </div>
  );
}
