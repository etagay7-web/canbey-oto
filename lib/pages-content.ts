import { supabase } from "@/lib/supabase";

export type PageContent = Record<string, string>;

export async function loadPage(page: string): Promise<PageContent> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {};
  }
  try {
    const { data } = await supabase
      .from("pages_content")
      .select("content")
      .eq("page", page)
      .maybeSingle();
    return (data?.content as PageContent) ?? {};
  } catch {
    return {};
  }
}

export async function loadSettings(): Promise<Record<string, string>> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {};
  }
  try {
    const { data } = await supabase.from("site_settings").select("key, value");
    const obj: Record<string, string> = {};
    (data ?? []).forEach((r) => (obj[r.key] = r.value ?? ""));
    return obj;
  } catch {
    return {};
  }
}

export async function loadList<T = Record<string, unknown>>(
  table: string,
  options: { activeOnly?: boolean; orderBy?: string; ascending?: boolean } = {}
): Promise<T[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }
  try {
    let q = supabase.from(table).select("*");
    if (options.activeOnly) q = q.eq("is_active", true);
    if (options.orderBy) q = q.order(options.orderBy, { ascending: options.ascending ?? true });
    const { data } = await q;
    return (data as T[]) ?? [];
  } catch {
    return [];
  }
}
