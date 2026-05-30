import type { Metadata } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import { supabase } from "@/lib/supabase";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Canbey Oto Tamir | İstanbul'da Profesyonel Oto Servis & Bakım",
    template: "%s | Canbey Oto Tamir",
  },
  description:
    "İstanbul'da 20 yılı aşkın tecrübeyle motor revizyonu, şanzıman, fren, elektrik, kaporta ve periyodik bakım hizmetleri. Orijinal parça ve garantili işçilik.",
  keywords: [
    "oto tamir",
    "İstanbul oto servis",
    "motor revizyonu",
    "şanzıman tamiri",
    "kaporta boya",
    "periyodik bakım",
    "lpg montajı",
    "canbey oto",
  ],
  authors: [{ name: "Canbey Oto Tamir" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Canbey Oto Tamir",
    title: "Canbey Oto Tamir | İstanbul Profesyonel Oto Servis",
    description:
      "20 yılı aşkın tecrübeyle profesyonel oto tamir, bakım ve yedek parça hizmetleri.",
  },
};

type Row = { key: string; value: string | null };

async function loadIntegrations() {
  // Env yoksa Supabase çağırma — sessizce boş döndür
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { ga4Id: "", gtmId: "", gscVerification: "", gadsId: "" };
  }

  try {
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["ga4_id", "gtm_id", "gsc_verification", "gads_id"]);

    const rows: Row[] = data ?? [];
    const get = (k: string) => rows.find((r) => r.key === k)?.value || "";

    return {
      ga4Id: get("ga4_id"),
      gtmId: get("gtm_id"),
      gscVerification: get("gsc_verification"),
      gadsId: get("gads_id"),
    };
  } catch {
    return { ga4Id: "", gtmId: "", gscVerification: "", gadsId: "" };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ga4Id, gtmId, gscVerification, gadsId } = await loadIntegrations();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Canbey Oto Tamir",
    image: "https://canbeyoto.com/logo.png",
    "@id": "https://canbeyoto.com",
    url: "https://canbeyoto.com",
    telephone: "+90 552 291 3713",
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fatih Mehmet Akif Bulvarı No:317",
      addressLocality: "Bağcılar, İstanbul",
      addressRegion: "Tavukçu Deresi",
      postalCode: "34204",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0392,
      longitude: 28.8567,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://facebook.com/canbeyoto",
      "https://instagram.com/canbeyoto",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "327",
    },
  };

  return (
    <html
      lang="tr"
      className={`${inter.variable} ${bebas.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <head>
        {gscVerification && (
          <meta name="google-site-verification" content={gscVerification} />
        )}

        {/* GTM head */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}

        {/* GA4 (yalnızca GTM yoksa — GTM içinden de yönetilebilir) */}
        {ga4Id && !gtmId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga4Id}');`,
              }}
            />
          </>
        )}

        {/* Google Ads */}
        {gadsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gadsId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gadsId}');`,
              }}
            />
          </>
        )}

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#14141A]">
        {/* GTM noscript */}
        {gtmId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
