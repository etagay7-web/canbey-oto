"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import Modal, { FormField, adminInput } from "@/components/admin/Modal";
import { Plus, Edit2, Trash2, Save, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Service = {
  id?: string;
  title: string;
  description: string | null;
  icon: string | null;
  detail_content: string | null;
  price_range: string | null;
  order_index: number;
  is_active: boolean;
};

const empty: Service = {
  title: "",
  description: "",
  icon: "Wrench",
  detail_content: "",
  price_range: "",
  order_index: 0,
  is_active: true,
};

export default function ServicesAdminPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setEditing({ ...empty, order_index: items.length + 1 });
    setOpen(true);
  };
  const openEdit = (s: Service) => {
    setEditing(s);
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...editing };
    const { error } = editing.id
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Kaydedildi");
      setOpen(false);
      await load();
      await revalidateAll();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Silindi");
      await load();
      await revalidateAll();
    }
  };

  const toggle = async (s: Service) => {
    const { error } = await supabase
      .from("services")
      .update({ is_active: !s.is_active })
      .eq("id", s.id!);
    if (error) toast.error(error.message);
    else {
      await load();
      await revalidateAll();
    }
  };

  return (
    <>
      <PageTitle
        title="HİZMETLER"
        description={`Toplam ${items.length} hizmet`}
        action={
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-4 py-2.5 transition-colors text-sm">
            <Plus size={14} /> Yeni Hizmet
          </button>
        }
      />

      <div className="bg-[#111111] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold w-16">Sıra</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Başlık</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">İkon</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Fiyat</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Durum</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-widest uppercase font-bold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500"><Loader2 size={18} className="inline animate-spin" /></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">Henüz hizmet yok.</td></tr>
              ) : (
                items.map((s) => (
                  <tr key={s.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-gray-400">{s.order_index}</td>
                    <td className="px-4 py-3 text-white font-semibold">{s.title}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{s.icon}</td>
                    <td className="px-4 py-3 text-gray-300 text-xs">{s.price_range || "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggle(s)}
                        className={`text-[10px] tracking-widest uppercase font-bold px-2 py-1 transition-colors ${
                          s.is_active
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-gray-500/10 text-gray-500 border border-gray-500/30 hover:bg-gray-500/20"
                        }`}
                      >
                        {s.is_active ? <><Eye size={10} className="inline mr-1" /> Aktif</> : <><EyeOff size={10} className="inline mr-1" /> Pasif</>}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(s)} className="text-gray-400 hover:text-white p-1.5" aria-label="Düzenle">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => remove(s.id!)} className="text-gray-400 hover:text-red-400 p-1.5 ml-1" aria-label="Sil">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Hizmet Düzenle" : "Yeni Hizmet"} size="lg">
        <form onSubmit={save} className="space-y-4">
          <FormField label="Başlık" required>
            <input
              required
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <FormField label="Kısa Açıklama" required>
            <textarea
              required
              rows={2}
              value={editing.description ?? ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="İkon Adı" hint="Lucide ikon adı (Wrench, Cog, Settings, Zap, vb.)">
              <input
                value={editing.icon ?? ""}
                onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                className={adminInput}
              />
            </FormField>
            <FormField label="Fiyat Aralığı" hint="Boş bırakılırsa gösterilmez">
              <input
                value={editing.price_range ?? ""}
                onChange={(e) => setEditing({ ...editing, price_range: e.target.value })}
                className={adminInput}
              />
            </FormField>
          </div>
          <FormField label="Detay İçerik">
            <textarea
              rows={5}
              value={editing.detail_content ?? ""}
              onChange={(e) => setEditing({ ...editing, detail_content: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Sıra">
              <input
                type="number"
                value={editing.order_index}
                onChange={(e) => setEditing({ ...editing, order_index: parseInt(e.target.value) || 0 })}
                className={adminInput}
              />
            </FormField>
            <FormField label="Durum">
              <label className="flex items-center gap-2 mt-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.is_active}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  className="accent-[#E63946]"
                />
                <span className="text-sm text-gray-300">Aktif (sitede görünür)</span>
              </label>
            </FormField>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border border-white/5 transition-colors">
              İptal
            </button>
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
