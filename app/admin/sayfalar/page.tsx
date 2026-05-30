import Link from "next/link";
import { Home, Info, Wrench, Images, Mail, Settings, ArrowRight, FileEdit } from "lucide-react";
import PageTitle from "@/components/admin/PageTitle";

const pages = [
  {
    href: "/admin/sayfalar/anasayfa",
    label: "Ana Sayfa",
    Icon: Home,
    description: "Hero, neden biz ve istatistikler.",
  },
  {
    href: "/admin/sayfalar/hakkimizda",
    label: "Hakkımızda",
    Icon: Info,
    description: "Şirket hikayesi, misyon, vizyon.",
  },
  {
    href: "/admin/sayfalar/hizmetler",
    label: "Hizmetler",
    Icon: Wrench,
    description: "Sayfa başlığı ve alt başlık.",
  },
  {
    href: "/admin/sayfalar/galeri",
    label: "Galeri",
    Icon: Images,
    description: "Sayfa başlığı ve alt başlık.",
  },
  {
    href: "/admin/sayfalar/iletisim",
    label: "İletişim",
    Icon: Mail,
    description: "Sayfa metni + iletişim bilgileri.",
  },
  {
    href: "/admin/ayarlar",
    label: "Site Ayarları",
    Icon: Settings,
    description: "Telefon, e-posta, adres, WhatsApp.",
  },
];

export default function SayfalarDashboard() {
  return (
    <>
      <PageTitle
        title="SAYFALAR"
        description="Düzenlemek istediğiniz sayfayı seçin. Tüm değişiklikler anında yayına alınır."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group bg-[#111111] border border-white/5 hover:border-[#E63946]/40 p-6 transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] flex items-center justify-center">
                <p.Icon size={22} strokeWidth={1.8} />
              </div>
              <FileEdit size={16} className="text-gray-600 group-hover:text-[#E63946] transition-colors" />
            </div>
            <h3 className="font-display text-xl tracking-wider text-white mb-2">
              {p.label}
            </h3>
            <p className="text-sm text-gray-400 mb-5 flex-1">{p.description}</p>
            <div className="inline-flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase font-bold text-[#E63946] group-hover:gap-2.5 transition-all">
              Düzenle <ArrowRight size={13} strokeWidth={2.5} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
