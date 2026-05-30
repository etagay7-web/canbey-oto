import type { Metadata } from "next";
import Gallery, { GalleryItem } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Galeri - Atölyemizden Görüntüler",
  description:
    "Canbey Oto Tamir atölyesinden görüntüler. Bağcılar / İstanbul'da yağ bakımı, arıza tespiti, mekanik onarım.",
};

const items: GalleryItem[] = [
  { src: "/photos/canbey-01.jpeg", title: "Atölye Dış Cephe", category: "Atölye", span: "md:col-span-2 md:row-span-2" },
  { src: "/photos/canbey-02.jpeg", title: "Servis Veren Dükkan Görünümü", category: "Atölye" },
  { src: "/photos/canbey-03.jpeg", title: "Hizmet Listesi Panosu", category: "Atölye" },
  { src: "/photos/canbey-04.jpeg", title: "Müşteri Aracı", category: "Servis" },
  { src: "/photos/canbey-05.jpeg", title: "Akşam Vardiyası", category: "Atölye" },
];

export default function GaleriPage() {
  return (
    <>
      <section className="bg-[#F7F7F9] pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-[#E8E8EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="tag mb-4 inline-flex"><span>Atölyemiz</span></div>
          <h1 className="headline font-display text-5xl sm:text-6xl lg:text-7xl text-[#14141A] mb-4">
            GALERİ
          </h1>
          <p className="text-[#5A5A66] max-w-2xl text-base sm:text-lg">
            Canbey Oto Tamir atölyesinden gerçek görüntüler. Bağcılar /
            İstanbul&apos;da tüm marka araç servisi.
          </p>
        </div>
      </section>

      <Gallery items={items} title="ATÖLYEMİZDEN" subtitle="Filtrele & İncele" showFilters variant="full" />
    </>
  );
}
