"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PageTitle from "@/components/admin/PageTitle";
import Modal from "@/components/admin/Modal";
import { Trash2, Loader2, Mail, MailOpen, Phone, Calendar, User, Car, Wrench, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

type Submission = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  car_brand: string | null;
  service_type: string | null;
  appointment_date: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
};

export default function MessagesAdminPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string, isRead: boolean) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: isRead })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      setItems((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: isRead } : m)));
      if (selected?.id === id) setSelected({ ...selected, is_read: isRead });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Silindi");
      setItems((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  const openDetail = (m: Submission) => {
    setSelected(m);
    if (!m.is_read) markRead(m.id, true);
  };

  const unreadCount = items.filter((m) => !m.is_read).length;

  return (
    <>
      <PageTitle
        title="MESAJLAR"
        description={`Toplam ${items.length} mesaj${unreadCount > 0 ? ` · ${unreadCount} okunmamış` : ""}`}
      />

      <div className="bg-[#111111] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold w-10"></th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">İsim</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Telefon</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Hizmet</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-widest uppercase font-bold">Tarih</th>
                <th className="px-4 py-3 text-right text-[10px] tracking-widest uppercase font-bold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500"><Loader2 size={18} className="inline animate-spin" /></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">Henüz mesaj yok.</td></tr>
              ) : (
                items.map((m) => (
                  <tr
                    key={m.id}
                    className={`border-t border-white/5 hover:bg-white/[0.02] cursor-pointer ${!m.is_read ? "bg-[#E63946]/[0.04]" : ""}`}
                    onClick={() => openDetail(m)}
                  >
                    <td className="px-4 py-3">
                      {m.is_read ? <MailOpen size={14} className="text-gray-500" /> : <Mail size={14} className="text-[#E63946]" />}
                    </td>
                    <td className={`px-4 py-3 ${!m.is_read ? "text-white font-bold" : "text-gray-300"}`}>{m.name || "—"}</td>
                    <td className="px-4 py-3 text-gray-300">{m.phone || "—"}</td>
                    <td className="px-4 py-3 text-gray-300 text-xs">{m.service_type || "—"}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(m.created_at).toLocaleString("tr-TR")}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      {m.is_read && (
                        <button
                          onClick={() => markRead(m.id, false)}
                          className="text-gray-400 hover:text-[#E63946] p-1.5"
                          title="Okunmadı işaretle"
                        >
                          <Mail size={13} />
                        </button>
                      )}
                      <button onClick={() => remove(m.id)} className="text-gray-400 hover:text-red-400 p-1.5 ml-1" title="Sil">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Mesaj Detayı" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field Icon={User} label="İsim" value={selected.name} />
              <Field Icon={Phone} label="Telefon" value={selected.phone} link={selected.phone ? `tel:${selected.phone}` : undefined} />
              <Field Icon={Mail} label="E-posta" value={selected.email} link={selected.email ? `mailto:${selected.email}` : undefined} />
              <Field Icon={Car} label="Araç" value={selected.car_brand} />
              <Field Icon={Wrench} label="Hizmet" value={selected.service_type} />
              <Field Icon={Calendar} label="Tarih" value={selected.appointment_date} />
            </div>

            {selected.message && (
              <div>
                <div className="text-xs tracking-[0.18em] uppercase font-bold text-gray-400 mb-2 flex items-center gap-2">
                  <MessageSquare size={12} /> Mesaj
                </div>
                <div className="bg-[#0A0A0A] border border-white/10 p-4 text-sm text-gray-200 whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 pt-3 border-t border-white/5">
              Gönderim: {new Date(selected.created_at).toLocaleString("tr-TR")}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
              <button
                onClick={() => markRead(selected.id, !selected.is_read)}
                className="px-4 py-2.5 text-sm bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 border border-white/5 transition-colors"
              >
                {selected.is_read ? "Okunmadı işaretle" : "Okundu işaretle"}
              </button>
              <button
                onClick={() => remove(selected.id)}
                className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-semibold px-4 py-2.5 transition-colors text-sm border border-red-500/40"
              >
                <Trash2 size={13} /> Sil
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function Field({
  Icon, label, value, link,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | null;
  link?: string;
}) {
  return (
    <div className="bg-[#0A0A0A] border border-white/10 p-3">
      <div className="text-[10px] tracking-[0.18em] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1.5">
        <Icon size={11} /> {label}
      </div>
      {link && value ? (
        <a href={link} className="text-sm text-white hover:text-[#E63946] font-medium break-all">{value}</a>
      ) : (
        <div className="text-sm text-white font-medium break-all">{value || "—"}</div>
      )}
    </div>
  );
}
