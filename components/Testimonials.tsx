import { Star, Quote } from "lucide-react";

export type TestimonialItem = {
  name: string;
  title?: string | null;
  content: string;
  rating?: number;
};

const DEFAULT_ITEMS: TestimonialItem[] = [
  {
    name: "Ahmet Yılmaz",
    title: "BMW 320d Sürücüsü",
    content: "Motor tamirinde inanılmaz işçilik gördüm. Yetkili servisin yarısı fiyatına orijinal parça ile değişim yaptılar. Aracım fabrika çıkışından daha iyi.",
    rating: 5,
  },
  {
    name: "Kemal Demir",
    title: "Ford Focus Sahibi",
    content: "20 yıldır bu servise gidiyorum. Asla beni hayal kırıklığına uğratmadılar. Dürüst, hızlı ve garantili. Canbey Usta ve ekibine sonsuz teşekkür.",
    rating: 5,
  },
  {
    name: "Selin Mutlu",
    title: "Volkswagen Polo Sahibi",
    content: "Kaporta boyasında mükemmel sonuç aldım. Çarpışma izi bile yok. Sigorta süreciyle de baştan sona ilgilendiler. Güvenle gidiyorum.",
    rating: 5,
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export default function Testimonials({ items }: { items?: TestimonialItem[] } = {}) {
  const data = items && items.length > 0 ? items : DEFAULT_ITEMS;
  return (
    <section className="bg-[#F7F7F9] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="tag tag-gold mb-4 inline-flex">
            <Star size={11} className="fill-current" />
            <span>Müşteri Yorumları</span>
          </div>
          <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-[#14141A] mb-4">
            BİZE <span className="text-[#E63946]">GÜVENENLER</span>
          </h2>
          <p className="text-[#5A5A66] max-w-2xl mx-auto">
            Müşterilerimizden notlar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {data.map((t, i) => (
            <div key={i} className="card card-hover p-7 relative flex flex-col">
              <Quote size={48} className="absolute top-5 right-5 text-[#E63946]/10" strokeWidth={1.5} />

              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(t.rating ?? 5)].map((_, j) => (
                  <Star key={j} size={15} className="fill-[#F4A400] text-[#F4A400]" />
                ))}
              </div>

              <p className="text-[15px] text-[#14141A] leading-relaxed mb-6 flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-[#E8E8EC]">
                <div className="w-11 h-11 bg-[#E63946] text-white flex items-center justify-center font-cond font-bold text-sm tracking-wider shrink-0 rounded-full">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="font-display text-base tracking-wider text-[#14141A]">
                    {t.name}
                  </div>
                  {t.title && <div className="text-[11px] text-[#5A5A66]">{t.title}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
