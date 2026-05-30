"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Content = { title?: string; subtitle?: string };
const SETTING_KEYS = ["phone", "email", "address", "working_hours", "whatsapp"];

export default function IletisimSayfaAdmin() {
  const [content, setContent] = useState<Content>({});
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const [contentRes, settingsRes] = await Promise.all([
        supabase.from("pages_content").select("content").eq("page", "iletisim").maybeSingle(),
        supabase.from("site_settings").select("key, value").in("key", SETTING_KEYS),
      ]);
      if (contentRes.data?.content) setContent(contentRes.data.content as Content);
      const obj: Record<string, string> = {};
      SETTING_KEYS.forEach((k) => (obj[k] = ""));
      (settingsRes.data ?? []).forEach((r) => (obj[r.key] = r.value ?? ""));
      setSettings(obj);
      setLoading(false);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const [contentRes, settingsRes] = await Promise.all([
      supabase
        .from("pages_content")
        .upsert({ page: "iletisim", content, updated_at: new Date().toISOString() }, { onConflict: "page" }),
      supabase
        .from("site_settings")
        .upsert(
          SETTING_KEYS.map((k) => ({
            key: k,
            value: settings[k] ?? "",
            updated_at: new Date().toISOString(),
          })),
          { onConflict: "key" }
        ),
    ]);

    setSaving(false);
    if (contentRes.error || settingsRes.error) {
      toast.error((contentRes.error || settingsRes.error)?.message ?? "Hata");
    } else {
      toast.success("İletişim kaydedildi");
      await revalidateAll();
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...</div>;

  return (
    <>
      <Link href="/admin/sayfalar" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4">
        <ArrowLeft size={13} /> Sayfalar
      </Link>
      <PageTitle title="İLETİŞİM" description="Sayfa metinleri + iletişim bilgileri." />

      <form onSubmit={save} className="max-w-3xl space-y-5">
        {/* Bölüm 1: Sayfa İçeriği */}
        <div className="bg-[#111111] border border-white/5 p-6 space-y-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#E63946] mb-1">Bölüm 1</div>
          <h3 className="font-display text-xl tracking-wider text-white -mt-3">SAYFA İÇERİĞİ</h3>
          <FormField label="Sayfa Başlığı">
            <input value={content.title ?? ""} onChange={(e) => setContent({ ...content, title: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Alt Başlık">
            <textarea rows={3} value={content.subtitle ?? ""} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} className={adminInput} />
          </FormField>
        </div>

        {/* Bölüm 2: İletişim Bilgileri */}
        <div className="bg-[#111111] border border-white/5 p-6 space-y-5">
          <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#E63946] mb-1">Bölüm 2</div>
          <h3 className="font-display text-xl tracking-wider text-white -mt-3">İLETİŞİM BİLGİLERİ</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Telefon">
              <input value={settings.phone ?? ""} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className={adminInput} />
            </FormField>
            <FormField label="WhatsApp" hint="Sadece rakam, ülke kodu ile (ör: 905522913713)">
              <input value={settings.whatsapp ?? ""} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className={adminInput} />
            </FormField>
          </div>
          <FormField label="E-posta">
            <input value={settings.email ?? ""} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Adres">
            <textarea rows={2} value={settings.address ?? ""} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Çalışma Saatleri">
            <textarea rows={2} value={settings.working_hours ?? ""} onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })} className={adminInput} />
          </FormField>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-6 py-2.5 disabled:opacity-50 transition-colors text-sm">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
          </button>
        </div>
      </form>
    </>
  );
}
