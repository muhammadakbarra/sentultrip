import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "SentulTrip — Wisata Trekking & Offroad di Sentul Bogor",
  description:
    "Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor. Guide lokal berpengalaman, harga transparan mulai Rp 150.000. Buka setiap hari.",
  keywords: [
    "wisata sentul",
    "trekking sentul bogor",
    "offroad sentul",
    "paket wisata sentul",
    "curug sentul",
    "guide trekking sentul",
    "outbound sentul",
    "corporate outing sentul",
    "liburan sentul bogor",
    "curug cibingbin sentul",
    "leuwi hejo sentul",
    "offroad jeep sentul",
  ],
  openGraph: {
    title: "SentulTrip — Wisata Trekking & Offroad di Sentul Bogor",
    description:
      "Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor. Guide lokal berpengalaman, harga transparan mulai Rp 150.000.",
    url: "https://sentultrip.com",
    siteName: "SentulTrip",
    locale: "id_ID",
    type: "website",
  },
  alternates: {
    canonical: "https://sentultrip.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a7a2a",
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SentulTrip",
  description:
    "Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor",
  url: "https://sentultrip.com",
  telephone: "+6281XXXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kp. Cibingbin RT 001 RW 006, Desa Bojong Koneng",
    addressLocality: "Babakan Madang",
    addressRegion: "Bogor",
    postalCode: "16810",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.5833,
    longitude: 106.9167,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "06:00",
    closes: "18:00",
  },
  priceRange: "Rp 150.000 - Rp 1.500.000",
  sameAs: [
    "https://www.instagram.com/sentultrip",
    "https://wa.me/6281XXXXXXXX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${font.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col antialiased"
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
      >
        <a href="#main-content" className="skip-link">Lewati ke konten</a>
        <div id="main-content">{children}</div>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
