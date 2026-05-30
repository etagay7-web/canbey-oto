import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/");
  revalidatePath("/hizmetler");
  revalidatePath("/galeri");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
