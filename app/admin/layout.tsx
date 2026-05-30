"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  LayoutDashboard, Layers, Wrench, Images, Star, Users,
  BarChart3, Settings, MessageSquare, ExternalLink, LogOut, Menu, X, Code2,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero Bölümü", Icon: Layers },
  { href: "/admin/hizmetler", label: "Hizmetler", Icon: Wrench },
  { href: "/admin/galeri", label: "Galeri", Icon: Images },
  { href: "/admin/yorumlar", label: "Yorumlar", Icon: Star },
  { href: "/admin/ekip", label: "Ekip", Icon: Users },
  { href: "/admin/istatistikler", label: "İstatistikler", Icon: BarChart3 },
  { href: "/admin/ayarlar", label: "Site Ayarları", Icon: Settings },
  { href: "/admin/entegrasyonlar", label: "Entegrasyonlar", Icon: Code2 },
  { href: "/admin/mesajlar", label: "Mesajlar", Icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [supabase] = useState(() => createSupabaseBrowserClient());

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setReady(true);
      }
    });
  }, [isLogin, router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (isLogin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: "#111111", color: "#fff", border: "1px solid #222" } }} />
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-sm text-gray-400">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menü"
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#E63946] text-white flex items-center justify-center"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-[260px] bg-[#111111] border-r border-white/5 z-40 flex flex-col transition-transform ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-white/5">
          <Link href="/admin" className="block leading-none">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-2xl tracking-wider text-[#E63946]">CANBEY</span>
              <span className="font-display text-2xl tracking-wider text-gray-400">ADMIN</span>
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mt-1">Panel</div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors border-l-2 ${
                  active
                    ? "bg-[#E63946]/10 border-[#E63946] text-[#E63946] font-semibold"
                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <item.Icon size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-300 bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5"
          >
            <ExternalLink size={14} />
            Siteyi Gör
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-white bg-[#E63946] hover:bg-[#C82A38] transition-colors"
          >
            <LogOut size={14} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-[#0F0F0F] overflow-y-auto min-h-screen">
        <div className="p-6 lg:p-10 pt-20 lg:pt-10">{children}</div>
      </main>

      <Toaster position="top-right" toastOptions={{ style: { background: "#111111", color: "#fff", border: "1px solid #222" } }} />
    </div>
  );
}
