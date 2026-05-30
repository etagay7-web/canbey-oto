import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://canbey-oto-tamiri.vercel.app";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hizmetler`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/galeri`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
