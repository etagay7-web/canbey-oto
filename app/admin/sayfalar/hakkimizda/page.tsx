"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Content = {
  title?: string;
  subtitle?: string;
  story?: string;
  mission?: string;
  vision?: string;
};

export default function HakkimizdaAdminPage() {
  const [data, setData] = useState<Content>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("pages_content")
        .select("content")
        .eq("page", "hakkimizda")
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
      .upsert(
        { page: "hakkimizda", content: data, updated_at: new Date().toISOString() },
        { onConflict: "page" }
      );
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Kaydedildi"); await revalidateAll(); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...</div>;
  }

  return (
    <>
      <Link href="/admin/sayfalar" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4">
        <ArrowLeft size={13} /> Sayfalar
      </Link>

      <PageTitle title="HAKKIMIZDA" description="Sayfa başlığı, hikaye, misyon ve vizyon metinlerini düzenleyin." />

      <form onSubmit={save} className="max-w-3xl bg-[#111111] border border-white/5 p-6 space-y-5">
        <FormField label="Sayfa Başlığı">
          <input value={data.title ?? ""} onChange={(e) => setData({ ...data, title: e.target.value })} className={adminInput} />
        </FormField>
        <FormField label="Alt Başlık">
          <input value={data.subtitle ?? ""} onChange={(e) => setData({ ...data, subtitle: e.target.value })} className={adminInput} />
        </FormField>
        <FormField label="Şirket Hikayesi">
          <textarea rows={6} value={data.story ?? ""} onChange={(e) => setData({ ...data, story: e.target.value })} className={adminInput} />
        </FormField>
        <FormField label="Misyon">
          <textarea rows={3} value={data.mission ?? ""} onChange={(e) => setData({ ...data, mission: e.target.value })} className={adminInput} />
        </FormField>
        <FormField label="Vizyon">
          <textarea rows={3} value={data.vision ?? ""} onChange={(e) => setData({ ...data, vision: e.target.value })} className={adminInput} />
        </FormField>
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
