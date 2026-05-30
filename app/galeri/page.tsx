import type { Metadata } from "next";
import Gallery, { GalleryItem } from "@/components/Gallery";
import { loadPage, loadList } from "@/lib/pages-content";

export const metadata: Metadata = {
  title: "Galeri - Atölyemizden Görüntüler",
  description:
    "Canbey Oto Tamir atölyesinden görüntüler. Bağcılar / İstanbul'da yağ bakımı, arıza tespiti, mekanik onarım.",
};

type GalleryRow = {
  id: string;
  title?: string | null;
  category?: string | null;
  image_url: string;
};

const fallback: GalleryItem[] = [
  { src: "/photos/canbey-01.jpeg", title: "Atölye Dış Cephe", category: "Atölye", span: "md:col-span-2 md:row-span-2" },
  { src: "/photos/canbey-02.jpeg", title: "Servis Veren Dükkan Görünümü", category: "Atölye" },
  { src: "/photos/canbey-03.jpeg", title: "Hizmet Listesi Panosu", category: "Atölye" },
  { src: "/photos/canbey-04.jpeg", title: "Müşteri Aracı", category: "Servis" },
  { src: "/photos/canbey-05.jpeg", title: "Akşam Vardiyası", category: "Atölye" },
];

export default async function GaleriPage() {
  const [content, rows] = await Promise.all([
    loadPage("galeri"),
    loadList<GalleryRow>("gallery", { activeOnly: true, orderBy: "order_index", ascending: true }),
  ]);

  const title = content.title || "GALERİ";
  const subtitle = content.subtitle || "Canbey Oto Tamir atölyesinden gerçek görüntüler.";

  const items: GalleryItem[] =
    rows.length > 0
      ? rows.map((r, i) => ({
          src: r.image_url,
          title: r.title || "",
          category: r.category || "Atölye",
          span: i === 0 ? "md:col-span-2 md:row-span-2" : undefined,
        }))
      : fallback;

  return (
    <>
      <section className="bg-[#F7F7F9] pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-[#E8E8EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="tag mb-4 inline-flex"><span>Atölyemiz</span></div>
          <h1 className="headline font-display text-5xl sm:text-6xl lg:text-7xl text-[#14141A] mb-4">
            {title}
          </h1>
          <p className="text-[#5A5A66] max-w-2xl text-base sm:text-lg">{subtitle}</p>
        </div>
      </section>

      <Gallery items={items} title="ATÖLYEMİZDEN" subtitle="Filtrele & İncele" showFilters variant="full" />
    </>
  );
}
