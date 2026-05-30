import { NextResponse } from "next/server";
import { supabaseServer, isServerConfigured } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      car_brand,
      service_type,
      appointment_date,
      message,
    } = body ?? {};

    if (!name && !phone && !email) {
      return NextResponse.json(
        { error: "İsim, telefon veya e-posta gerekli." },
        { status: 400 }
      );
    }

    if (!isServerConfigured) {
      return NextResponse.json(
        { error: "Supabase yapılandırılmadı (.env.local eksik)." },
        { status: 503 }
      );
    }

    const { data, error } = await supabaseServer
      .from("contact_submissions")
      .insert({
        name: name ?? null,
        phone: phone ?? null,
        email: email ?? null,
        car_brand: car_brand ?? null,
        service_type: service_type ?? null,
        appointment_date: appointment_date || null,
        message: message ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
