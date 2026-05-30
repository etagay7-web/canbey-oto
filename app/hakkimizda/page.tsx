import type { Metadata } from "next";
import Image from "next/image";
import Stats from "@/components/Stats";
import {
  Target, Lightbulb, ShieldCheck, Star, Eye, BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda - 1998'den Beri Güvenin Adresi",
  description:
    "Canbey Oto Tamir 1998 yılından bu yana İstanbul'da oto tamir, bakım ve servis hizmeti veriyor. Misyonumuz, ekibimiz ve değerlerimiz.",
};

const values = [
  { title: "Dürüstlük", desc: "Yapılmayan iş için ücret alınmaz. Gerçekçi süre ve fiyat verilir.", Icon: ShieldCheck },
  { title: "Kalite", desc: "Sadece orijinal veya OEM kalitesinde yedek parça kullanılır.", Icon: Star },
  { title: "Şeffaflık", desc: "Tüm onarım süreçleri fotoğraf ve raporla belgelenir.", Icon: Eye },
  { title: "Sorumluluk", desc: "Her tamir 12 ay yazılı garantilidir. Sözümüz senettir.", Icon: BadgeCheck },
];

const team = [
  { name: "Hasan Canbey", role: "Kurucu & Usta Başı", spec: "Motor & Şanzıman", initials: "HC" },
  { name: "Murat Demir", role: "Kaporta Şefi", spec: "Kaporta & Boya", initials: "MD" },
  { name: "Selçuk Yıldız", role: "Elektrik Uzmanı", spec: "Beyin & ECU", initials: "SY" },
  { name: "İbrahim Kara", role: "Lastik & Süspansiyon", spec: "Rot, balans, amortisör", initials: "İK" },
];

const brands = ["BOSCH", "MOTUL", "VALEO", "BREMBO", "MANN", "CASTROL", "DENSO", "BRC"];

const milestones = [
  { year: "1998", title: "Kuruluş", desc: "Bağcılar'da 60 m² tamirhane olarak açıldı." },
  { year: "2005", title: "İlk Büyüme", desc: "400 m² atölye, 8 teknisyen, Bosch onaylı servis." },
  { year: "2012", title: "Kaporta-Boya", desc: "Yeni nesil fırın boya bölümü açıldı." },
  { year: "2018", title: "Dijital Dönüşüm", desc: "Online randevu ve dijital arıza takip sistemi." },
  { year: "2024", title: "Bugün", desc: "2.500 m² alan, 50+ teknisyen, 15.000+ mutlu müşteri." },
];

export default function HakkimizdaPage() {
  return (
    <>
      <section className="bg-[#F7F7F9] pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-[#E8E8EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="tag mb-4 inline-flex"><span>1998&apos;den Beri Yoldayız</span></div>
          <h1 className="headline font-display text-5xl sm:text-6xl lg:text-7xl text-[#14141A] mb-4">
            HAKKIMIZDA
          </h1>
          <p className="text-[#5A5A66] max-w-2xl text-base sm:text-lg">
            İstanbul&apos;da bir mahalle tamirhanesi olarak başladığımız yolculuk,
            bugün 50 kişilik uzman ekibe ulaştı.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden border border-[#E8E8EC]">
            <Image
              src="/photos/canbey-07.jpeg"
              alt="Canbey Oto Tamir atölyesi"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 border border-[#E8E8EC] font-cond text-xs tracking-wider font-bold text-[#14141A]">
              Atölyemiz · İstanbul
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="tag mb-4 inline-flex"><span>Hikayemiz</span></div>
            <h2 className="headline font-display text-4xl sm:text-5xl text-[#14141A] mb-6">
              ÜÇ NESİL <br /><span className="text-[#E63946]">USTA İŞÇİLİĞİ</span>
            </h2>
            <div className="space-y-4 text-[#5A5A66] leading-relaxed">
              <p>
                <strong className="text-[#14141A]">Canbey Oto Tamir</strong>, 1998 yılında Hasan Canbey tarafından
                İstanbul Bağcılar&apos;da 60 m² küçük bir tamirhane olarak kuruldu. O günden bu yana
                değişmeyen tek bir prensibimiz oldu: <em className="text-[#E63946] not-italic font-semibold">yapılmayan iş için para alınmaz, yapılan iş garantilidir.</em>
              </p>
              <p>
                Bugün <strong className="text-[#14141A]">2.500 m² kapalı alanda</strong>, 8 ayrı uzmanlık atölyesi, 50&apos;den fazla
                sertifikalı teknisyen ve son nesil teşhis ekipmanları ile İstanbul&apos;un en güvenilir bağımsız
                oto servislerinden biri olmanın gururunu yaşıyoruz.
              </p>
              <p>
                İkinci nesil olarak işin başına geçen oğullar, dijital çağın gerekliliklerini
                ata mesleğin disipliniyle birleştirdi. Online randevu, dijital arıza raporu, fotoğraflı süreç takibi —
                ama temelde aynı yaklaşım: <strong className="text-[#14141A]">aracın sahibi bir misafirdir, aracı emanet bir mülk.</strong>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card p-7">
              <div className="font-cond text-[11px] tracking-[0.22em] uppercase font-bold text-[#E63946] mb-1">Kilometre Taşları</div>
              <h3 className="font-display text-2xl text-[#14141A] tracking-wider mb-6">25 YILLIK YOLCULUK</h3>

              <div className="relative pl-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E8E8EC]" />
                {milestones.map((m) => (
                  <div key={m.year} className="relative mb-5 last:mb-0">
                    <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#E63946] border-2 border-white" />
                    <div className="flex items-baseline gap-3">
                      <div className="font-display text-xl text-[#E63946]">{m.year}</div>
                      <div className="font-cond text-sm tracking-wider uppercase font-bold text-[#14141A]">{m.title}</div>
                    </div>
                    <div className="text-sm text-[#5A5A66] mt-0.5">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Mission / Vision / Values */}
      <section className="py-20 lg:py-24 bg-[#F7F7F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5 mb-12">
            <div className="card p-7 lg:p-8 border-l-4 border-l-[#E63946]">
              <div className="tag mb-3 inline-flex"><Target size={11} /><span>Misyonumuz</span></div>
              <h3 className="font-display text-2xl text-[#14141A] mb-3 tracking-wider">DOĞRU İŞ, DOĞRU FİYAT</h3>
              <p className="text-[#5A5A66] leading-relaxed">
                Her müşterimize, kendi aracımız gibi yaklaşmak. Şeffaf süreç, dürüst fiyat, garantili işçilik
                ve uzun ömürlü çözümlerle aracınızın yol ömrünü maksimuma çıkarmak.
              </p>
            </div>

            <div className="card p-7 lg:p-8 border-l-4 border-l-[#F4A400]">
              <div className="tag tag-gold mb-3 inline-flex"><Lightbulb size={11} /><span>Vizyonumuz</span></div>
              <h3 className="font-display text-2xl text-[#14141A] mb-3 tracking-wider">TÜRKİYE&apos;NİN ADI</h3>
              <p className="text-[#5A5A66] leading-relaxed">
                Bağımsız oto servis denildiğinde Türkiye&apos;nin ilk akla gelen, kalite ve dürüstlüğüyle marka olmuş
                referans noktası olmak. Elektrikli araç dönüşümüne öncülük etmek.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="tag mb-3 inline-flex"><span>Değerlerimiz</span></div>
            <h3 className="headline font-display text-3xl sm:text-4xl text-[#14141A]">
              BİZİ BİZ <span className="text-[#E63946]">YAPAN</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="card card-hover p-6 text-center">
                <div className="icon-tile icon-tile-lg mx-auto mb-4">
                  <v.Icon size={24} strokeWidth={1.8} />
                </div>
                <h4 className="font-display text-lg tracking-wider text-[#14141A] mb-2">{v.title}</h4>
                <p className="text-sm text-[#5A5A66]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="tag mb-4 inline-flex"><span>Uzman Kadro</span></div>
            <h2 className="headline font-display text-4xl sm:text-5xl text-[#14141A]">
              EKİBİMİZLE <span className="text-[#E63946]">TANIŞIN</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m) => (
              <div key={m.name} className="card card-hover overflow-hidden">
                <div className="relative aspect-square bg-[#F7F7F9] flex items-center justify-center border-b border-[#E8E8EC]">
                  <div className="font-display text-7xl text-[#E8E8EC]">{m.initials}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg tracking-wider text-[#14141A]">{m.name}</h3>
                  <div className="text-[11px] text-[#E63946] font-semibold tracking-wider uppercase font-cond mt-0.5">{m.role}</div>
                  <div className="text-xs text-[#5A5A66] mt-2 pt-2 border-t border-[#E8E8EC]">
                    Uzmanlık: <span className="text-[#14141A]">{m.spec}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-[#F7F7F9] border-t border-[#E8E8EC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="tag tag-gold mb-3 inline-flex"><BadgeCheck size={11} /><span>Güvendiğimiz Markalar</span></div>
            <h2 className="headline font-display text-3xl sm:text-4xl text-[#14141A]">
              KALİTE <span className="text-[#E63946]">ORTAKLARIMIZ</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {brands.map((b) => (
              <div key={b} className="card aspect-[3/2] flex items-center justify-center font-display text-[#5A5A66] tracking-wider text-base hover:text-[#E63946] hover:border-[#E63946] transition-colors">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
