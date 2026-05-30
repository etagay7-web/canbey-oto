"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import { FormField, adminInput } from "@/components/admin/Modal";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Stat = {
  id?: string;
  label: string;
  value: string;
  order_index: number;
};

export default function StatsAdminPage() {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newStat, setNewStat] = useState<Stat>({ label: "", value: "", order_index: 0 });
  const [adding, setAdding] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveRow = async (s: Stat) => {
    setSavingId(s.id!);
    const { error } = await supabase
      .from("stats")
      .update({ label: s.label, value: s.value, order_index: s.order_index })
      .eq("id", s.id!);
    setSavingId(null);
    if (error) toast.error(error.message);
    else { toast.success("Güncellendi"); await revalidateAll(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Bu istatistiği silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("stats").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Silindi"); await load(); await revalidateAll(); }
  };

  const addNew = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const { error } = await supabase
      .from("stats")
      .insert({ ...newStat, order_index: items.length + 1 });
    setAdding(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Eklendi");
      setNewStat({ label: "", value: "", order_index: 0 });
      await load();
      await revalidateAll();
    }
  };

  const updateField = (id: string, patch: Partial<Stat>) => {
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  return (
    <>
      <PageTitle title="İSTATİSTİKLER" description={`Toplam ${items.length} istatistik`} />

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin" /></div>
      ) : (
        <div className="space-y-3 mb-8">
          {items.map((s) => (
            <div key={s.id} className="bg-[#111111] border border-white/5 p-4 grid grid-cols-12 gap-3 items-end">
              <div className="col-span-12 sm:col-span-2">
                <FormField label="Sıra">
                  <input
                    type="number"
                    value={s.order_index}
                    onChange={(e) => updateField(s.id!, { order_index: parseInt(e.target.value) || 0 })}
                    className={adminInput}
                  />
                </FormField>
              </div>
              <div className="col-span-12 sm:col-span-3">
                <FormField label="Değer" hint="Örn. 20+, %98">
                  <input
                    value={s.value}
                    onChange={(e) => updateField(s.id!, { value: e.target.value })}
                    className={adminInput}
                  />
                </FormField>
              </div>
              <div className="col-span-12 sm:col-span-5">
                <FormField label="Etiket">
                  <input
                    value={s.label}
                    onChange={(e) => updateField(s.id!, { label: e.target.value })}
                    className={adminInput}
                  />
                </FormField>
              </div>
              <div className="col-span-12 sm:col-span-2 flex gap-2">
                <button
                  onClick={() => saveRow(s)}
                  disabled={savingId === s.id}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-3 py-2.5 disabled:opacity-50 transition-colors text-xs"
                >
                  {savingId === s.id ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  Kaydet
                </button>
                <button
                  onClick={() => remove(s.id!)}
                  className="bg-white/[0.03] hover:bg-red-500/20 hover:text-red-400 text-gray-400 px-3 py-2.5 border border-white/5 hover:border-red-500/40 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new */}
      <div className="bg-[#111111] border border-white/5 border-l-4 border-l-[#E63946] p-5">
        <h3 className="font-display text-lg tracking-wider text-white mb-4">YENİ İSTATİSTİK</h3>
        <form onSubmit={addNew} className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-12 sm:col-span-4">
            <FormField label="Değer" required>
              <input
                required
                value={newStat.value}
                onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                className={adminInput}
                placeholder="20+"
              />
            </FormField>
          </div>
          <div className="col-span-12 sm:col-span-6">
            <FormField label="Etiket" required>
              <input
                required
                value={newStat.label}
                onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                className={adminInput}
                placeholder="Yıl Tecrübe"
              />
            </FormField>
          </div>
          <div className="col-span-12 sm:col-span-2">
            <button type="submit" disabled={adding} className="w-full inline-flex items-center justify-center gap-1.5 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-3 py-2.5 disabled:opacity-50 transition-colors text-xs">
              {adding ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
              Ekle
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
