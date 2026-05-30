import Link from "next/link";
import {
  GraduationCap, PackageCheck, ShieldCheck, Headphones, CalendarCheck, ArrowRight, type LucideIcon,
} from "lucide-react";

const DEFAULT_TITLE = "NEDEN CANBEY OTO?";

const DEFAULT_ITEMS = [
  { title: "Sertifikalı Teknisyenler", desc: "Bosch, TSE ve marka onaylı eğitimlerden geçmiş usta kadro.", Icon: GraduationCap },
  { title: "Orijinal Parça Garantisi", desc: "Sadece OEM ve birinci sınıf parça tedariği yapıyoruz.", Icon: PackageCheck },
  { title: "Sigorta Anlaşmalı", desc: "Tüm büyük sigorta şirketleri ile anlaşmalı hasarsız onarım.", Icon: ShieldCheck },
  { title: "7/24 Yol Yardım", desc: "Aracınız nerede olursa olsun çekici ve yerinde müdahale.", Icon: Headphones },
  { title: "Online Randevu", desc: "Bekleme yok. Tek tıkla saatinizi seçin, aracınız hazır.", Icon: CalendarCheck },
];

const ICON_BY_INDEX: LucideIcon[] = [
  GraduationCap, PackageCheck, ShieldCheck, Headphones, CalendarCheck,
];

function renderTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return <>{title}</>;
  if (words.length === 2) {
    return (
      <>
        {words[0]}
        <br />
        <span className="text-[#E63946]">{words[1]}</span>
      </>
    );
  }
  const first = words[0];
  const rest = words.slice(1).join(" ");
  return (
    <>
      {first}
      <br />
      <span className="text-[#E63946]">{rest}</span>
    </>
  );
}

export default function WhyUs({
  title,
  items,
}: {
  title?: string;
  items?: string[];
}) {
  const heading = title || DEFAULT_TITLE;
  const list =
    items && items.length > 0
      ? items.map((label, i) => ({
          title: label,
          desc: "",
          Icon: ICON_BY_INDEX[i % ICON_BY_INDEX.length],
        }))
      : DEFAULT_ITEMS;

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <div className="lg:col-span-5">
          <div className="tag mb-4 inline-flex">
            <span>Neden Biz</span>
          </div>
          <h2 className="headline font-display text-4xl sm:text-5xl lg:text-6xl text-[#14141A] mb-5">
            {renderTitle(heading)}
          </h2>
          <p className="text-[#5A5A66] mb-7 leading-relaxed">
            Çünkü aracınız sadece bir araç değil — yatırımınız ve güveniniz.
            Bizden iyi koruyacak kimse yok.
          </p>
          <Link href="/iletisim" className="btn btn-primary">
            Randevu Oluştur
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Right: reason list */}
        <div className="lg:col-span-7">
          <ul className="space-y-2">
            {list.map((r) => (
              <li
                key={r.title}
                className="card card-hover flex items-start gap-4 p-5 group"
              >
                <div className="icon-tile">
                  <r.Icon size={22} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl tracking-wider text-[#14141A] mb-1">
                    {r.title}
                  </h3>
                  {r.desc && <p className="text-sm text-[#5A5A66]">{r.desc}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
