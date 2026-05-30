"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import Modal, { FormField, adminInput } from "@/components/admin/Modal";
import { Plus, Edit2, Trash2, Save, Loader2, Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type Member = {
  id?: string;
  name: string;
  title: string | null;
  specialty: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
};

const empty: Member = {
  name: "",
  title: "",
  specialty: "",
  image_url: "",
  order_index: 0,
  is_active: true,
};

export default function TeamAdminPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Member>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true });
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
      ? await supabase.from("team_members").update(payload).eq("id", editing.id)
      : await supabase.from("team_members").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Kaydedildi"); setOpen(false); await load(); await revalidateAll(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Bu ekip üyesini silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Silindi"); await load(); await revalidateAll(); }
  };

  const toggle = async (m: Member) => {
    const { error } = await supabase.from("team_members").update({ is_active: !m.is_active }).eq("id", m.id!);
    if (error) toast.error(error.message); else { await load(); await revalidateAll(); }
  };

  return (
    <>
      <PageTitle
        title="EKİP"
        description={`Toplam ${items.length} ekip üyesi`}
        action={
          <button onClick={() => { setEditing({ ...empty, order_index: items.length + 1 }); setOpen(true); }} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-4 py-2.5 transition-colors text-sm">
            <Plus size={14} /> Yeni Üye
          </button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 size={20} className="animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="bg-[#111111] border border-white/5 p-12 text-center text-gray-500">Henüz ekip üyesi yok.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m) => (
            <div key={m.id} className="bg-[#111111] border border-white/5">
              <div className="relative aspect-square bg-black overflow-hidden">
                {m.image_url ? (
                  <Image src={m.image_url} alt={m.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" unoptimized={m.image_url.startsWith("http")} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                    <User size={48} strokeWidth={1.2} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-sm text-white font-semibold">{m.name}</div>
                <div className="text-xs text-[#E63946] font-semibold mt-0.5">{m.title || "—"}</div>
                <div className="text-xs text-gray-400 mt-1">{m.specialty || "—"}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <button
                    onClick={() => toggle(m)}
                    className={`text-[10px] tracking-widest uppercase font-bold px-2 py-1 transition-colors ${
                      m.is_active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-gray-500/10 text-gray-500 border border-gray-500/30"
                    }`}
                  >
                    {m.is_active ? <Eye size={10} className="inline mr-1" /> : <EyeOff size={10} className="inline mr-1" />}
                    {m.is_active ? "Aktif" : "Pasif"}
                  </button>
                  <div className="flex">
                    <button onClick={() => { setEditing(m); setOpen(true); }} className="text-gray-400 hover:text-white p-1.5"><Edit2 size={13} /></button>
                    <button onClick={() => remove(m.id!)} className="text-gray-400 hover:text-red-400 p-1.5"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Üye Düzenle" : "Yeni Üye"}>
        <form onSubmit={save} className="space-y-4">
          <FormField label="İsim" required>
            <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Ünvan">
            <input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Uzmanlık">
            <input value={editing.specialty ?? ""} onChange={(e) => setEditing({ ...editing, specialty: e.target.value })} className={adminInput} />
          </FormField>
          <FormField label="Fotoğraf URL" hint="Boş bırakılırsa varsayılan ikon gösterilir">
            <input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className={adminInput} placeholder="/photos/uye.jpeg" />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Sıra">
              <input type="number" value={editing.order_index} onChange={(e) => setEditing({ ...editing, order_index: parseInt(e.target.value) || 0 })} className={adminInput} />
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
