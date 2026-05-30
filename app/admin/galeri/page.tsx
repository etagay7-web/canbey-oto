"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import Modal, { FormField, adminInput } from "@/components/admin/Modal";
import { Plus, Trash2, Save, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { revalidateAll } from "@/lib/revalidate";

type GalleryItem = {
  id?: string;
  title: string | null;
  category: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
};

const CATEGORIES = ["Atölye", "Servis", "Motor", "Kaporta", "Lastik"];

const empty: GalleryItem = {
  title: "",
  category: "Atölye",
  image_url: "",
  order_index: 0,
  is_active: true,
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("gallery")
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

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...editing };
    const { error } = editing.id
      ? await supabase.from("gallery").update(payload).eq("id", editing.id)
      : await supabase.from("gallery").insert(payload);
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
    if (!confirm("Bu görseli silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Silindi");
      await load();
      await revalidateAll();
    }
  };

  const toggle = async (g: GalleryItem) => {
    const { error } = await supabase
      .from("gallery")
      .update({ is_active: !g.is_active })
      .eq("id", g.id!);
    if (error) toast.error(error.message);
    else {
      await load();
      await revalidateAll();
    }
  };

  return (
    <>
      <PageTitle
        title="GALERİ"
        description={`Toplam ${items.length} görsel`}
        action={
          <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#C82A38] text-white font-semibold px-4 py-2.5 transition-colors text-sm">
            <Plus size={14} /> Görsel Ekle
          </button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#111111] border border-white/5 p-12 text-center text-gray-500">
          Henüz görsel yok. &ldquo;Görsel Ekle&rdquo; ile başlayın.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((g) => (
            <div key={g.id} className="bg-[#111111] border border-white/5 group">
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                {g.image_url ? (
                  <Image
                    src={g.image_url}
                    alt={g.title || ""}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                    unoptimized={g.image_url.startsWith("http")}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs">
                    Görsel yok
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm text-white font-semibold truncate">{g.title || "—"}</div>
                <div className="text-[10px] tracking-widest uppercase text-gray-500 font-bold mt-0.5">{g.category}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <button
                    onClick={() => toggle(g)}
                    className={`text-[10px] tracking-widest uppercase font-bold px-2 py-1 transition-colors ${
                      g.is_active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-gray-500/10 text-gray-500 border border-gray-500/30"
                    }`}
                  >
                    {g.is_active ? <Eye size={10} className="inline mr-1" /> : <EyeOff size={10} className="inline mr-1" />}
                    {g.is_active ? "Aktif" : "Pasif"}
                  </button>
                  <button
                    onClick={() => { setEditing(g); setOpen(true); }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Düzenle
                  </button>
                  <button onClick={() => remove(g.id!)} className="text-gray-400 hover:text-red-400" aria-label="Sil">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing.id ? "Görsel Düzenle" : "Yeni Görsel"}>
        <form onSubmit={save} className="space-y-4">
          <FormField label="Görsel URL" required hint="Local: /photos/canbey-01.jpeg veya tam URL (Supabase Storage / harici)">
            <input
              required
              value={editing.image_url}
              onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className={adminInput}
              placeholder="/photos/example.jpeg"
            />
          </FormField>
          {editing.image_url && (
            <div className="relative aspect-[16/9] bg-black border border-white/10 overflow-hidden">
              <Image
                src={editing.image_url}
                alt="Önizleme"
                fill
                sizes="500px"
                className="object-contain"
                unoptimized={editing.image_url.startsWith("http")}
              />
            </div>
          )}
          <FormField label="Başlık">
            <input
              value={editing.title ?? ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className={adminInput}
            />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label="Kategori">
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className={adminInput}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Sıra">
              <input
                type="number"
                value={editing.order_index}
                onChange={(e) => setEditing({ ...editing, order_index: parseInt(e.target.value) || 0 })}
                className={adminInput}
              />
            </FormField>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={editing.is_active}
              onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              className="accent-[#E63946]"
            />
            <span className="text-sm text-gray-300">Aktif (sitede görünür)</span>
          </label>
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
