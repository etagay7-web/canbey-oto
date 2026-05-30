"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, ArrowRight, X } from "lucide-react";

export type GalleryItem = {
  src: string;
  title: string;
  category: string;
  span?: string;
};

const defaultItems: GalleryItem[] = [
  { src: "/photos/canbey-01.jpeg", title: "Atölye Dış Cephe", category: "Atölye", span: "md:col-span-2 md:row-span-2" },
  { src: "/photos/canbey-02.jpeg", title: "Servis Veren Dükkan", category: "Atölye" },
  { src: "/photos/canbey-03.jpeg", title: "Hizmet Panosu", category: "Atölye" },
  { src: "/photos/canbey-04.jpeg", title: "Müşteri Aracı", category: "Servis" },
  { src: "/photos/canbey-05.jpeg", title: "Akşam Vardiyası", category: "Atölye" },
];

export default function Gallery({
  items = defaultItems,
  title = "ATÖLYEMİZDEN",
  subtitle = "Galeri",
  showFilters = false,
  variant = "preview",
}: {
  items?: GalleryItem[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  variant?: "preview" | "full";
}) {
  const cats = ["Tümü", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("Tümü");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const filtered = active === "Tümü" ? items : items.filter((i) => i.category === active);

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="tag mb-4 inline-flex">
            <Eye size={11} />
            <span>{subtitle}</span>
          </div>
          <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-[#14141A]">
            {title.split(" ")[0]} <span className="text-[#E63946]">{title.split(" ").slice(1).join(" ")}</span>
          </h2>
        </div>

        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-xs tracking-[0.18em] uppercase font-bold font-cond border transition-colors ${
                  active === c
                    ? "bg-[#E63946] border-[#E63946] text-white"
                    : "bg-white border-[#E8E8EC] text-[#5A5A66] hover:border-[#E63946] hover:text-[#E63946]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className={`grid grid-cols-2 md:grid-cols-3 ${variant === "full" ? "lg:grid-cols-4" : ""} gap-3 auto-rows-[240px]`}>
          {filtered.map((item, i) => (
            <button
              key={i}
              onClick={() => setLightbox(item)}
              className={`relative overflow-hidden group cursor-pointer text-left ${item.span ?? ""} border border-[#E8E8EC] bg-[#F7F7F9]`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-3 left-3">
                <span className="bg-white text-[#14141A] border border-[#E8E8EC] px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase font-bold font-cond">
                  {item.category}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <h3 className="font-display text-base sm:text-lg tracking-wider text-white leading-tight">
                  {item.title}
                </h3>
              </div>

              <div className="absolute inset-0 bg-[#E63946]/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center text-white">
                  <Eye size={28} strokeWidth={2} className="mx-auto mb-2" />
                  <div className="font-cond font-bold tracking-[0.22em] uppercase text-sm">
                    Büyük Gör
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {variant === "preview" && (
          <div className="text-center mt-12">
            <Link href="/galeri" className="btn btn-outline">
              Tüm Galeriyi Gör
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#14141A]/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Kapat"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#14141A] hover:bg-[#F7F7F9] flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
          <div className="relative max-w-5xl w-full max-h-[90vh] aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 border border-[#E8E8EC] font-cond text-xs tracking-wider font-bold text-[#14141A]">
              {lightbox.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
