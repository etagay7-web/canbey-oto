"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Save, Loader2, ArrowLeft, Layers, ListChecks, BarChart3 } from "lucide-react";
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

type Stat = { id?: string; label: string; value: string; order_index: number };

type AnasayfaContent = {
  whyus_title?: string;
  whyus_items?: string; // virgülle ayrılmış
};

const heroEmpty: Hero = {
  title: "ARACINIZ EMİN ELLERDE",
  subtitle: "",
  button1_text: "Hemen Randevu Al",
  button2_text: "Hizmetlerimizi Gör",
  badge1: "Orijinal Yedek Parça",
  badge2: "Garantili İşçilik",
  badge3: "Ücretsiz Ekspertiz",
};

type Tab = "hero" | "neden-biz" | "istatistikler";

export default function AnasayfaAdminPage() {
  const [tab, setTab] = useState<Tab>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [hero, setHero] = useState<Hero>(heroEmpty);
  const [content, setContent] = useState<AnasayfaContent>({});
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    (async () => {
      const [heroRes, contentRes, statsRes] = await Promise.all([
        supabase.from("hero_content").select("*").order("updated_at", { ascending: false }).limit(1),
        supabase.from("pages_content").select("content").eq("page", "anasayfa").maybeSingle(),
        supabase.from("stats").select("*").order("order_index", { ascending: true }),
      ]);
      if (heroRes.data?.[0]) setHero(heroRes.data[0]);
      if (contentRes.data?.content) setContent(contentRes.data.content as AnasayfaContent);
      setStats(statsRes.data ?? []);
      setLoading(false);
    })();
  }, []);

  const saveHero = async () => {
    setSaving(true);
    const payload = { ...hero, updated_at: new Date().toISOString() };
    const { error } = hero.id
      ? await supabase.from("hero_content").update(payload).eq("id", hero.id)
      : await supabase.from("hero_content").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Hero kaydedildi"); await revalidateAll(); }
  };

  const saveWhyUs = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("pages_content")
      .upsert({ page: "anasayfa", content, updated_at: new Date().toISOString() }, { onConflict: "page" });
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Neden Biz kaydedildi"); await revalidateAll(); }
  };

  const saveStats = async () => {
    setSaving(true);
    // her satırı upsert
    const rows = stats.map((s) => ({
      id: s.id,
      label: s.label,
      value: s.value,
      order_index: s.order_index,
    }));
    const { error } = await supabase.from("stats").upsert(rows);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("İstatistikler kaydedildi"); await revalidateAll(); }
  };

  const tabs: { key: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { key: "hero", label: "Hero", Icon: Layers },
    { key: "neden-biz", label: "Neden Biz", Icon: ListChecks },
    { key: "istatistikler", label: "İstatistikler", Icon: BarChart3 },
  ];

  if (loading) {
    return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...</div>;
  }

  return (
    <>
      <Link href="/admin/sayfalar" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-4">
        <ArrowLeft size={13} /> Sayfalar
      </Link>

      <PageTitle title="ANA SAYFA" description="Hero, neden biz ve istatistikler bölümlerini düzenleyin." />

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-white/5">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase font-bold transition-colors border-b-2 -mb-px ${
                active
                  ? "border-[#E63946] text-[#E63946]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <t.Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="max-w-3xl">
        {/* HERO */}
        {tab === "hero" && (
          <form onSubmit={(e) => { e.preventDefault(); saveHero(); }} className="bg-[#111111] border border-white/5 p-6 space-y-5">
            <FormField label="Başlık" required>
              <textarea required rows={2} value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className={adminInput} />
            </FormField>
            <FormField label="Alt Başlık">
              <textarea rows={3} value={hero.subtitle ?? ""} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} className={adminInput} />
            </FormField>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField label="Buton 1 Metni">
                <input value={hero.button1_text ?? ""} onChange={(e) => setHero({ ...hero, button1_text: e.target.value })} className={adminInput} />
              </FormField>
              <FormField label="Buton 2 Metni">
                <input value={hero.button2_text ?? ""} onChange={(e) => setHero({ ...hero, button2_text: e.target.value })} className={adminInput} />
              </FormField>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <FormField label="Rozet 1"><input value={hero.badge1 ?? ""} onChange={(e) => setHero({ ...hero, badge1: e.target.value })} className={adminInput} /></FormField>
              <FormField label="Rozet 2"><input value={hero.badge2 ?? ""} onChange={(e) => setHero({ ...hero, badge2: e.target.value })} className={adminInput} /></FormField>
              <FormField label="Rozet 3"><input value={hero.badge3 ?? ""} onChange={(e) => setHero({ ...hero, badge3: e.target.value })} className={adminInput} /></FormField>
            </div>
            <SubmitButton saving={saving} />
          </form>
        )}

        {/* NEDEN BİZ */}
        {tab === "neden-biz" && (
          <form onSubmit={(e) => { e.preventDefault(); saveWhyUs(); }} className="bg-[#111111] border border-white/5 p-6 space-y-5">
            <FormField label="Bölüm Başlığı">
              <input
                value={content.whyus_title ?? ""}
                onChange={(e) => setContent({ ...content, whyus_title: e.target.value })}
                className={adminInput}
                placeholder="NEDEN CANBEY OTO?"
              />
            </FormField>
            <FormField label="Maddeler" hint="Her madde virgülle ayrılır. Örn: Sertifikalı Teknisyenler, Orijinal Parça, ...">
              <textarea
                rows={5}
                value={content.whyus_items ?? ""}
                onChange={(e) => setContent({ ...content, whyus_items: e.target.value })}
                className={adminInput}
                placeholder="Sertifikalı Teknisyenler, Orijinal Parça, ..."
              />
            </FormField>
            <SubmitButton saving={saving} />
          </form>
        )}

        {/* İSTATİSTİKLER */}
        {tab === "istatistikler" && (
          <div className="bg-[#111111] border border-white/5 p-6">
            <p className="text-xs text-gray-400 mb-4">
              Her satırı düzenleyip altta &ldquo;Kaydet&rdquo; butonuna basın.
              Yeni eklemek için <Link href="/admin/istatistikler" className="text-[#E63946] hover:underline">İstatistikler menüsüne</Link> gidin.
            </p>
            <div className="space-y-3">
              {stats.map((s, i) => (
                <div key={s.id} className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 sm:col-span-3">
                    <input
                      value={s.value}
                      onChange={(e) => {
                        const next = [...stats]; next[i] = { ...s, value: e.target.value }; setStats(next);
                      }}
                      placeholder="20+"
                      className={adminInput}
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-9">
                    <input
                      value={s.label}
                      onChange={(e) => {
                        const next = [...stats]; next[i] = { ...s, label: e.target.value }; setStats(next);
                      }}
                      placeholder="Yıl Tecrübe"
                      className={adminInput}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-5 mt-5 border-t border-white/5">
              <button
                onClick={saveStats}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-6 py-2.5 disabled:opacity-50 transition-colors text-sm"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? "Kaydediliyor..." : "Tümünü Kaydet"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SubmitButton({ saving }: { saving: boolean }) {
  return (
    <div className="pt-4 border-t border-white/5">
      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-6 py-2.5 disabled:opacity-50 transition-colors text-sm"
      >
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {saving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
