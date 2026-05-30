"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Hero = {
  id?: string;
  title: string;
  subtitle: string | null;
  button1_text: string | null;
  button2_text: string | null;
  badge1: string | null;
  badge2: string | null;
  badge3: string | null;
};

const empty: Hero = {
  title: "",
  subtitle: "",
  button1_text: "",
  button2_text: "",
  badge1: "",
  badge2: "",
  badge3: "",
};

export default function HeroAdminPage() {
  const [data, setData] = useState<Hero>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: rows, error } = await supabase
        .from("hero_content")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1);

      if (error) {
        toast.error("Veri yüklenemedi: " + error.message);
      } else if (rows && rows[0]) {
        setData(rows[0]);
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...data, updated_at: new Date().toISOString() };
    const { error } = data.id
      ? await supabase.from("hero_content").update(payload).eq("id", data.id)
      : await supabase.from("hero_content").insert(payload);

    setSaving(false);
    if (error) {
      toast.error("Kaydedilemedi: " + error.message);
    } else {
      toast.success("Hero kaydedildi");
      await revalidateAll();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...
      </div>
    );
  }

  return (
    <>
      <PageTitle title="HERO BÖLÜMÜ" description="Ana sayfanın en üstündeki büyük başlık alanını düzenleyin." />

      <form onSubmit={handleSave} className="max-w-3xl space-y-5 bg-[#111111] border border-white/5 p-6">
        <FormField label="Başlık" required>
          <textarea
            required
            rows={2}
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className={adminInput}
          />
        </FormField>

        <FormField label="Alt Başlık">
          <textarea
            rows={3}
            value={data.subtitle ?? ""}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className={adminInput}
          />
        </FormField>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField label="Buton 1 Metni">
            <input
              value={data.button1_text ?? ""}
              onChange={(e) => setData({ ...data, button1_text: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <FormField label="Buton 2 Metni">
            <input
              value={data.button2_text ?? ""}
              onChange={(e) => setData({ ...data, button2_text: e.target.value })}
              className={adminInput}
            />
          </FormField>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <FormField label="Rozet 1">
            <input
              value={data.badge1 ?? ""}
              onChange={(e) => setData({ ...data, badge1: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <FormField label="Rozet 2">
            <input
              value={data.badge2 ?? ""}
              onChange={(e) => setData({ ...data, badge2: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <FormField label="Rozet 3">
            <input
              value={data.badge3 ?? ""}
              onChange={(e) => setData({ ...data, badge3: e.target.value })}
              className={adminInput}
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-white/5">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-6 py-2.5 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </>
  );
}
