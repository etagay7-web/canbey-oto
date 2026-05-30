"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import Modal, { FormField, adminInput } from "@/components/admin/Modal";
import { Plus, Edit2, Trash2, Save, Loader2, Eye, EyeOff, Star } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Testimonial = {
  id?: string;
  name: string;
  title: string | null;
  content: string;
  rating: number;
  is_active: boolean;
};

const empty: Testimonial = {
  name: "",
  title: "",
  content: "",
  rating: 5,
  is_active: true,
};

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...editing };
    const { error } = editing.id
      ? await supabase.from("testimonials").update(payload).eq("id", editing.id)
      : await supabase.from("testimonials").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Kaydedildi");
      setOpen(false);
      await load();
      await revalidateAll();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Silindi"); await load(); await revalidateAll(); }
  };

  const toggle = async (t: Testimonial) => {
    const { error } = await supabase.from("testimonials").update({ is_active: !t.is_active }).eq("id", t.id!);
    if (error) toast.error(error.message); else { await load(); await revalidateAll(); }
  };

  return (
    <>
      <PageTitle
        title="YORUMLAR"
        description={`Toplam ${items.length} müşteri yorumu`}
        action={
          <button onClick={() => { setEditing(empty); setOpen(true); }} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-4 py-2.5 transition-colors text-sm">
            <Plus size={14} /> Yeni Yorum
          </button>
        }
      />

      <div className="bg-[#111111] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">İsim</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Ünvan</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">İçerik</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Yıldız</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Durum</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-widest uppercase font-bold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500"><Loader2 size={18} className="inline animate-spin" /></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">Henüz yorum yok.</td></tr>
              ) : (
                items.map((t) => (
                  <tr key={t.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-semibold">{t.name}</td>
                    <td className="px-4 py-3 text-gray-300 text-xs">{t.title || "—"}</td>
                    <td className="px-4 py-3 text-gray-300 text-xs max-w-md truncate">{t.content}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={11} className="fill-[#F4A400] text-[#F4A400]" />)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggle(t)}
                        className={`text-[10px] tracking-widest uppercase font-bold px-2 py-1 transition-colors ${
                          t.is_active
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-gray-500/10 text-gray-500 border border-gray-500/30"
                        }`}
                      >
                        {t.is_active ? <Eye size={10} className="inline mr-1" /> : <EyeOff size={10} className="inline mr-1" />}
                        {t.is_active ? "Aktif" : "Pasif"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => { setEditing(t); setOpen(true); }} className="text-gray-400 hover:text-white p-1.5"><Edit2 size={14} /></button>
                      <button onClick={() => remove(t.id!)} className="text-gray-400 hover:text-red-400 p-1.5 ml-1"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Yorum Düzenle" : "Yeni Yorum"}>
        <form onSubmit={save} className="space-y-4">
          <FormField label="İsim" required>
            <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Ünvan / Açıklama" hint="Örn. BMW 320d Sürücüsü">
            <input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="İçerik" required>
            <textarea required rows={5} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className={adminInput} />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Yıldız (1-5)">
              <select value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) })} className={adminInput}>
                {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} yıldız</option>)}
              </select>
            </FormField>
            <FormField label="Durum">
              <label className="flex items-center gap-2 mt-2.5 cursor-pointer">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="accent-[#E63946]" />
                <span className="text-sm text-gray-300">Aktif</span>
              </label>
            </FormField>
          </div>
          <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border border-white/5 transition-colors">İptal</button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-5 py-2.5 disabled:opacity-50 transition-colors text-sm">
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
