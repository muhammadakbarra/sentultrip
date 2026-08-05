import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const font = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://sentultrip.id'),
    title: 'SentulTrip — Wisata Trekking & Offroad di Sentul Bogor',
    description:
        'Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor. Guide lokal berpengalaman, harga transparan mulai Rp 150.000. Buka setiap hari.',
    keywords: [
        'wisata sentul',
        'trekking sentul bogor',
        'offroad sentul',
        'paket wisata sentul',
        'curug sentul',
        'guide trekking sentul',
        'outbound sentul',
        'corporate outing sentul',
        'liburan sentul bogor',
        'curug cibingbin sentul',
        'leuwi hejo sentul',
        'offroad jeep sentul',
    ],
    openGraph: {
        title: 'SentulTrip — Wisata Trekking & Offroad di Sentul Bogor',
        description:
            'Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor. Guide lokal berpengalaman, harga transparan mulai Rp 150.000.',
        url: 'https://sentultrip.id',
        siteName: 'SentulTrip',
        locale: 'id_ID',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'SentulTrip — Wisata Trekking & Offroad di Sentul Bogor',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SentulTrip — Wisata Trekking & Offroad di Sentul Bogor',
        description:
            'Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor. Guide lokal berpengalaman, harga transparan mulai Rp 150.000.',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://sentultrip.id',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#2a7a2a',
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SentulTrip',
    description:
        'Paket wisata trekking curug, offroad jeep, dan corporate outing di Sentul Bogor',
    url: 'https://sentultrip.id',
    telephone: '+62 857-7577-7430',
    address: {
        '@type': 'PostalAddress',
        streetAddress:
            'Kp. Cibingbin RT 001 RW 006, Desa Bojong Koneng, Kec. Babakan Madang',
        addressLocality: 'Kabupaten Bogor',
        addressRegion: 'Jawa Barat',
        postalCode: '16810',
        addressCountry: 'ID',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: -6.6050785,
        longitude: 106.9051429,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        opens: '06:00',
        closes: '18:00',
    },
    priceRange: 'Rp 150.000 - Rp 1.500.000',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '8',
    },
    sameAs: [
        'https://www.instagram.com/sentultrip.id',
        'https://www.tiktok.com/@sentultrip.id',
        'https://www.facebook.com/share/18n3ETrDAF/',
        'https://wa.me/6285775777430',
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='id' className={`${font.variable} h-full`}>
            <head>
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className='min-h-full flex flex-col antialiased'
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
                <a href='#main-content' className='skip-link'>
                    Lewati ke konten
                </a>
                <div id='main-content'>{children}</div>
                {gaMeasurementId ? (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                            strategy='afterInteractive'
                        />
                        <Script
                            id='google-analytics'
                            strategy='afterInteractive'
                        >
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
