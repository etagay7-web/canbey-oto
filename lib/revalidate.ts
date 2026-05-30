export async function revalidateAll() {
  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch (e) {
    console.error("Revalidate failed", e);
  }
}
