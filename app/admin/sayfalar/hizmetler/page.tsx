"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Save, Loader2, ArrowLeft, Info } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Content = { title?: string; subtitle?: string };

export default function HizmetlerSayfaAdmin() {
  const [data, setData] = useState<Content>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("pages_content")
        .select("content")
        .eq("page", "hizmetler")
        .maybeSingle();
      if (row?.content) setData(row.content as Content);
      setLoading(false);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("pages_content")
      .upsert({ page: "hizmetler", content: data, updated_at: new Date().toISOString() }, { onConflict: "page" });
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Kaydedildi"); await revalidateAll(); }
  };

  if (loading) return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...</div>;

  return (
    <>
      <Link href="/admin/sayfalar" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4">
        <ArrowLeft size={13} /> Sayfalar
      </Link>
      <PageTitle title="HİZMETLER (SAYFA)" description="Hizmetler sayfasının üst metnini düzenleyin." />

      <form onSubmit={save} className="max-w-3xl bg-[#111111] border border-white/5 p-6 space-y-5">
        <FormField label="Sayfa Başlığı">
          <input value={data.title ?? ""} onChange={(e) => setData({ ...data, title: e.target.value })} className={adminInput} />
        </FormField>
        <FormField label="Alt Başlık">
          <textarea rows={3} value={data.subtitle ?? ""} onChange={(e) => setData({ ...data, subtitle: e.target.value })} className={adminInput} />
        </FormField>

        <div className="bg-[#0A0A0A] border border-[#E63946]/30 border-l-4 border-l-[#E63946] p-4 flex items-start gap-3">
          <Info size={16} className="text-[#E63946] mt-0.5 shrink-0" />
          <div className="text-sm text-gray-300">
            Hizmet kartlarını eklemek/düzenlemek için sol menüden{" "}
            <Link href="/admin/hizmetler" className="text-[#E63946] hover:underline font-semibold">Hizmetler</Link>{" "}
            menüsünü kullanın.
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-6 py-2.5 disabled:opacity-50 transition-colors text-sm">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </>
  );
}
