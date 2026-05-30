"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { adminInput } from "@/components/admin/Modal";
import {
  BarChart3, Tag, Search, Target, Save, Loader2, ExternalLink, CheckCircle2, Circle,
} from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Settings = Record<string, string>;

const KEYS = ["ga4_id", "gtm_id", "gsc_verification", "gads_id", "gads_label"];

export default function IntegrationsPage() {
  const [values, setValues] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", KEYS);
    if (error) toast.error(error.message);
    else {
      const obj: Settings = {};
      KEYS.forEach((k) => (obj[k] = ""));
      (data ?? []).forEach((r) => (obj[r.key] = r.value ?? ""));
      setValues(obj);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const saveKeys = async (keys: string[], tag: string) => {
    setSaving(tag);
    const rows = keys.map((k) => ({
      key: k,
      value: values[k] ?? "",
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });
    setSaving(null);
    if (error) toast.error(error.message);
    else {
      toast.success("Kaydedildi");
      await revalidateAll();
    }
  };

  const update = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <Loader2 size={20} className="animate-spin mr-2" /> Yükleniyor...
      </div>
    );
  }

  return (
    <>
      <PageTitle
        title="ENTEGRASYONLAR"
        description="Google servisleri ve takip kodları. Her bir değişiklik anında sitede yayına alınır."
      />

      <div className="space-y-5 max-w-4xl">
        {/* GA4 */}
        <IntegrationCard
          Icon={BarChart3}
          title="Google Analytics 4"
          description="Ziyaretçi istatistikleri, sayfa görüntüleme ve kullanıcı davranışlarını takip edin."
          active={!!values.ga4_id}
          helpLabel="Nasıl Alınır?"
          helpLink="https://analytics.google.com"
          saving={saving === "ga4"}
          onSave={() => saveKeys(["ga4_id"], "ga4")}
        >
          <input
            value={values.ga4_id || ""}
            onChange={(e) => update("ga4_id", e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className={adminInput}
          />
        </IntegrationCard>

        {/* GTM */}
        <IntegrationCard
          Icon={Tag}
          title="Google Tag Manager"
          description="Tüm marketing tagleri tek yerden yönetin. GA4, Ads ve diğer tüm tagleri GTM üzerinden ekleyin."
          active={!!values.gtm_id}
          helpLabel="Nasıl Alınır?"
          helpLink="https://tagmanager.google.com"
          saving={saving === "gtm"}
          onSave={() => saveKeys(["gtm_id"], "gtm")}
        >
          <input
            value={values.gtm_id || ""}
            onChange={(e) => update("gtm_id", e.target.value)}
            placeholder="GTM-XXXXXXX"
            className={adminInput}
          />
        </IntegrationCard>

        {/* GSC */}
        <IntegrationCard
          Icon={Search}
          title="Google Search Console"
          description="Site doğrulaması için meta tag content değerini girin."
          active={!!values.gsc_verification}
          helpLabel="Search Console Aç"
          helpLink="https://search.google.com/search-console"
          saving={saving === "gsc"}
          onSave={() => saveKeys(["gsc_verification"], "gsc")}
        >
          <input
            value={values.gsc_verification || ""}
            onChange={(e) => update("gsc_verification", e.target.value)}
            placeholder="verification_token_buraya"
            className={adminInput}
          />
          <div className="mt-3 bg-[#0A0A0A] border border-white/10 px-3 py-2 text-xs text-gray-400 font-mono break-all">
            &lt;meta name=&quot;google-site-verification&quot; content=&quot;
            <span className="text-emerald-400">{values.gsc_verification || "..."}</span>
            &quot; /&gt;
          </div>
        </IntegrationCard>

        {/* Google Ads */}
        <IntegrationCard
          Icon={Target}
          title="Google Ads Dönüşüm Takibi"
          description="Telefon aramaları ve dönüşümleri takip edin."
          active={!!values.gads_id}
          helpLabel="Nasıl Alınır?"
          helpLink="https://ads.google.com"
          saving={saving === "gads"}
          onSave={() => saveKeys(["gads_id", "gads_label"], "gads")}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-bold mb-1.5">
                Conversion ID
              </div>
              <input
                value={values.gads_id || ""}
                onChange={(e) => update("gads_id", e.target.value)}
                placeholder="AW-XXXXXXXXX"
                className={adminInput}
              />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-gray-500 font-bold mb-1.5">
                Conversion Label
              </div>
              <input
                value={values.gads_label || ""}
                onChange={(e) => update("gads_label", e.target.value)}
                placeholder="abcDEFghi123"
                className={adminInput}
              />
            </div>
          </div>
        </IntegrationCard>
      </div>
    </>
  );
}

function IntegrationCard({
  Icon, title, description, active, helpLabel, helpLink, saving, onSave, children,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  description: string;
  active: boolean;
  helpLabel: string;
  helpLink: string;
  saving: boolean;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#111111] border border-white/5 p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] flex items-center justify-center shrink-0">
            <Icon size={20} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl tracking-wider text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
          </div>
        </div>
        <StatusBadge active={active} />
      </div>

      <div className="mb-4">{children}</div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
        <a
          href={helpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#E63946] transition-colors"
        >
          <ExternalLink size={12} /> {helpLabel}
        </a>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-5 py-2 disabled:opacity-50 transition-colors text-sm"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 shrink-0">
        <CheckCircle2 size={11} strokeWidth={2.5} /> Aktif
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-bold bg-gray-500/10 text-gray-500 border border-gray-500/30 px-2.5 py-1 shrink-0">
      <Circle size={11} strokeWidth={2.5} /> Pasif
    </span>
  );
}
