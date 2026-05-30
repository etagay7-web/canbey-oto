"use client";

import { MessageCircle } from "lucide-react";

const PHONE = "905522913713";
const MESSAGE = "Merhaba, Canbey Oto Tamir hizmetleriniz hakkında bilgi almak istiyorum.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full animate-pulse-wa" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(37,211,102,0.6)] hover:bg-[#1FB855] transition-colors">
        <WhatsAppIcon className="w-7 h-7" />
      </span>
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-white text-[#14141A] border border-[#E8E8EC] px-3 py-1.5 text-sm font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded">
        <MessageCircle size={12} className="inline mr-1.5 -mt-0.5" />
        WhatsApp ile yaz
      </span>
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.36.682 4.553 1.859 6.41L4 28l6.78-1.823A11.94 11.94 0 0016.001 27C22.628 27 28 21.628 28 15S22.628 3 16.001 3zm0 21.6a9.553 9.553 0 01-4.873-1.333l-.349-.207-3.985 1.072 1.075-3.886-.227-.359A9.564 9.564 0 016.4 15c0-5.293 4.31-9.6 9.601-9.6 5.292 0 9.601 4.307 9.601 9.6 0 5.293-4.309 9.6-9.601 9.6zm5.481-7.197c-.301-.151-1.78-.879-2.056-.98-.276-.101-.477-.151-.679.151-.201.301-.778.98-.953 1.181-.175.201-.351.226-.652.075-.301-.151-1.272-.469-2.422-1.494-.895-.798-1.498-1.785-1.674-2.086-.176-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.151-.176.201-.301.301-.502.101-.201.05-.377-.025-.527-.075-.151-.679-1.633-.93-2.235-.245-.589-.494-.509-.679-.518l-.578-.011c-.201 0-.527.076-.803.377-.276.301-1.054 1.029-1.054 2.512 0 1.483 1.08 2.918 1.231 3.119.151.201 2.122 3.244 5.137 4.55.718.31 1.279.495 1.716.633.721.229 1.378.197 1.898.12.579-.086 1.78-.728 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.578-.352z" />
    </svg>
  );
}
