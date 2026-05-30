import type { Metadata } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PromoPopup from "@/components/PromoPopup";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#14141A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <PromoPopup />
      </body>
    </html>
  );
}
