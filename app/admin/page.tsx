"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Wrench, Images, Star, MessageSquare, ArrowRight, Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";

type Counts = {
  services: number;
  gallery: number;
  testimonials: number;
  unread: number;
};

type Submission = {
  id: string;
  name: string | null;
  phone: string | null;
  service_type: string | null;
  is_read: boolean;
  created_at: string;
};

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recent, setRecent] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [
        { count: services },
        { count: gallery },
        { count: testimonials },
        { count: unread },
        { data: recent },
      ] = await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
        supabase
          .from("contact_submissions")
          .select("id, name, phone, service_type, is_read, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);

      setCounts({
        services: services ?? 0,
        gallery: gallery ?? 0,
        testimonials: testimonials ?? 0,
        unread: unread ?? 0,
      });
      setRecent(recent ?? []);
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Toplam Hizmet", value: counts?.services ?? 0, Icon: Wrench, href: "/admin/hizmetler" },
    { label: "Galeri Görseli", value: counts?.gallery ?? 0, Icon: Images, href: "/admin/galeri" },
    { label: "Müşteri Yorumu", value: counts?.testimonials ?? 0, Icon: Star, href: "/admin/yorumlar" },
    {
      label: "Okunmamış Mesaj",
      value: counts?.unread ?? 0,
      Icon: MessageSquare,
      href: "/admin/mesajlar",
      badge: (counts?.unread ?? 0) > 0,
    },
  ];

  return (
    <>
      <PageTitle
        title="HOŞ GELDİNİZ"
        description="Canbey Oto Tamir admin paneli — site içeriğinizi buradan yönetin."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group bg-[#111111] border border-white/5 hover:border-[#E63946]/40 p-5 transition-colors relative"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] flex items-center justify-center">
                <c.Icon size={18} strokeWidth={1.8} />
              </div>
              {c.badge && (
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold bg-[#E63946] text-white px-2 py-0.5">
                  Yeni
                </span>
              )}
            </div>
            <div className="font-display text-4xl text-white leading-none mb-1">
              {loading ? <Loader2 size={20} className="animate-spin text-gray-500" /> : c.value}
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-gray-400 font-semibold">
              {c.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-10">
        <h2 className="text-xs tracking-[0.2em] uppercase font-bold text-gray-400 mb-3">Hızlı Git</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: "/admin/hero", label: "Hero" },
            { href: "/admin/hizmetler", label: "Hizmetler" },
            { href: "/admin/galeri", label: "Galeri" },
            { href: "/admin/yorumlar", label: "Yorumlar" },
            { href: "/admin/ekip", label: "Ekip" },
            { href: "/admin/istatistikler", label: "İstatistikler" },
            { href: "/admin/ayarlar", label: "Ayarlar" },
            { href: "/admin/entegrasyonlar", label: "Entegrasyonlar" },
            { href: "/admin/mesajlar", label: "Mesajlar" },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="text-xs tracking-wider uppercase font-semibold bg-white/[0.03] hover:bg-[#E63946]/20 hover:text-[#E63946] border border-white/5 hover:border-[#E63946]/40 px-3 py-2 transition-colors text-gray-300"
            >
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent messages */}
      <div className="bg-[#111111] border border-white/5">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-display text-lg tracking-wider text-white">SON MESAJLAR</h2>
          <Link href="/admin/mesajlar" className="text-xs text-[#E63946] hover:text-white flex items-center gap-1">
            Tümünü Gör <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-gray-400">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] tracking-widest uppercase font-bold">İsim</th>
                <th className="px-5 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Telefon</th>
                <th className="px-5 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Hizmet</th>
                <th className="px-5 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Tarih</th>
                <th className="px-5 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Durum</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                    <Loader2 size={18} className="inline animate-spin" />
                  </td>
                </tr>
              ) : recent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                    Henüz mesaj yok.
                  </td>
                </tr>
              ) : (
                recent.map((m) => (
                  <tr key={m.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-white">{m.name || "—"}</td>
                    <td className="px-5 py-3 text-gray-300">{m.phone || "—"}</td>
                    <td className="px-5 py-3 text-gray-300">{m.service_type || "—"}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {new Date(m.created_at).toLocaleString("tr-TR")}
                    </td>
                    <td className="px-5 py-3">
                      {m.is_read ? (
                        <span className="text-[10px] tracking-widest uppercase font-bold text-gray-500">
                          Okundu
                        </span>
                      ) : (
                        <span className="text-[10px] tracking-widest uppercase font-bold bg-[#E63946] text-white px-2 py-0.5">
                          Yeni
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
