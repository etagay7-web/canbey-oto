"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

const FIELDS: Array<{ key: string; label: string; type?: "text" | "textarea" }> = [
  { key: "site_title", label: "Site Başlığı" },
  { key: "phone", label: "Telefon" },
  { key: "email", label: "E-posta" },
  { key: "address", label: "Adres", type: "textarea" },
  { key: "working_hours", label: "Çalışma Saatleri", type: "textarea" },
  { key: "whatsapp", label: "WhatsApp (rakam, başında ülke kodu)" },
  { key: "instagram", label: "Instagram URL" },
  { key: "facebook", label: "Facebook URL" },
];

export default function SettingsAdminPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("site_settings").select("key, value");
      if (error) toast.error(error.message);
      else {
        const obj: Record<string, string> = {};
        (data ?? []).forEach((r) => { obj[r.key] = r.value ?? ""; });
        setValues(obj);
      }
      setLoading(false);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const rows = FIELDS.map((f) => ({
      key: f.key,
      value: values[f.key] ?? "",
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });

    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Ayarlar kaydedildi"); await revalidateAll(); }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...</div>;
  }

  return (
    <>
      <PageTitle title="SİTE AYARLARI" description="İletişim bilgileri ve site geneli ayarları." />

      <form onSubmit={save} className="max-w-3xl bg-[#111111] border border-white/5 p-6 space-y-5">
        {FIELDS.map((f) => (
          <FormField key={f.key} label={f.label}>
            {f.type === "textarea" ? (
              <textarea
                rows={2}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className={adminInput}
              />
            ) : (
              <input
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className={adminInput}
              />
            )}
          </FormField>
        ))}

        <div className="pt-4 border-t border-white/5">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-6 py-2.5 disabled:opacity-50 transition-colors">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
          </button>
        </div>
      </form>
    </>
  );
}
