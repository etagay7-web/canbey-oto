import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services, { type ServiceItem } from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Gallery, { type GalleryItem } from "@/components/Gallery";
import Testimonials, { type TestimonialItem } from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import { loadPage, loadList, loadSettings } from "@/lib/pages-content";

type HeroRow = {
  title?: string | null;
  subtitle?: string | null;
  button1_text?: string | null;
  button2_text?: string | null;
  badge1?: string | null;
  badge2?: string | null;
  badge3?: string | null;
};

type StatRow = { label: string; value: string; order_index?: number };

type ServiceRow = {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
};

type TestimonialRow = {
  id: string;
  name: string;
  title?: string | null;
  content: string;
  rating?: number;
};

type GalleryRow = {
  id: string;
  title?: string | null;
  category?: string | null;
  image_url: string;
};

export default async function Home() {
  const [anasayfa, heroes, stats, services, testimonials, gallery, settings] =
    await Promise.all([
      loadPage("anasayfa"),
      loadList<HeroRow>("hero_content", { orderBy: "updated_at", ascending: false }),
      loadList<StatRow>("stats", { orderBy: "order_index", ascending: true }),
      loadList<ServiceRow>("services", { activeOnly: true, orderBy: "order_index", ascending: true }),
      loadList<TestimonialRow>("testimonials", { activeOnly: true, orderBy: "created_at", ascending: false }),
      loadList<GalleryRow>("gallery", { activeOnly: true, orderBy: "order_index", ascending: true }),
      loadSettings(),
    ]);

  const hero = heroes[0];

  const servicesProp: ServiceItem[] = services.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
  }));

  const testimonialsProp: TestimonialItem[] = testimonials.map((t) => ({
    name: t.name,
    title: t.title,
    content: t.content,
    rating: t.rating ?? 5,
  }));

  const galleryProp: GalleryItem[] = gallery.slice(0, 5).map((g, i) => ({
    src: g.image_url,
    title: g.title ?? "",
    category: g.category ?? "Atölye",
    span: i === 0 ? "md:col-span-2 md:row-span-2" : undefined,
  }));

  const whyusItems = (anasayfa.whyus_items || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <Hero
        title={hero?.title ?? anasayfa.title ?? undefined}
        subtitle={hero?.subtitle ?? anasayfa.subtitle ?? undefined}
        button1Text={hero?.button1_text ?? undefined}
        button2Text={hero?.button2_text ?? undefined}
        badge1={hero?.badge1 ?? undefined}
        badge2={hero?.badge2 ?? undefined}
        badge3={hero?.badge3 ?? undefined}
        phone={settings.phone || undefined}
        phoneWa={settings.whatsapp || undefined}
      />
      <Stats items={stats.length > 0 ? stats : undefined} />
      <Services items={servicesProp.length > 0 ? servicesProp : undefined} />
      <WhyUs
        title={anasayfa.whyus_title || undefined}
        items={whyusItems.length > 0 ? whyusItems : undefined}
      />
      <Gallery items={galleryProp.length > 0 ? galleryProp : undefined} />
      <Testimonials items={testimonialsProp.length > 0 ? testimonialsProp : undefined} />
      <ContactForm
        phone={settings.phone || undefined}
        whatsapp={settings.whatsapp || undefined}
        email={settings.email || undefined}
        address={settings.address || undefined}
        workingHours={settings.working_hours || undefined}
      />
    </>
  );
}
