"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError(error.message);
      toast.error("Giriş başarısız");
      return;
    }
    toast.success("Hoş geldiniz!");
    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-2 mb-2">
            <span className="font-display text-4xl tracking-wider text-[#E63946]">CANBEY</span>
            <span className="font-display text-4xl tracking-wider text-gray-500">ADMIN</span>
          </div>
          <div className="text-xs tracking-[0.3em] uppercase text-gray-500">Panel · Yönetim</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] border border-white/5 p-8 space-y-5 shadow-2xl"
        >
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-2">
              E-posta
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@canbeyototamir.com"
                className="w-full bg-[#0A0A0A] border border-white/10 pl-10 pr-4 py-3 text-white text-sm focus:border-[#E63946] focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-2">
              Şifre
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0A0A0A] border border-white/10 pl-10 pr-4 py-3 text-white text-sm focus:border-[#E63946] focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-4 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

          <div className="text-xs text-gray-500 text-center pt-2 border-t border-white/5">
            Kimlik bilgileriniz Supabase üzerinden güvenli şekilde doğrulanır.
          </div>
        </form>
      </div>
    </div>
  );
}
