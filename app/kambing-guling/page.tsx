import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/whatsapp";
import KambingGulingPackages from "@/components/KambingGulingPackages";

export const metadata: Metadata = {
  title: "Paket Kambing Guling Sentul Bogor — Siap Bakar Live di Villa & Rumah",
  description:
    "Layanan catering kambing guling empuk, gurih & bebas bau prengus di Sentul Bogor. Daging kambing muda pilihan, live cooking di villa/acara, gratis lontong & sop kambing. Pesan sekarang!",
  keywords: [
    "kambing guling sentul",
    "kambing guling bogor",
    "paket kambing guling villa sentul",
    "catering kambing guling sentul",
    "kambing guling saung citra",
    "live cooking kambing guling sentul",
    "harga kambing guling sentul",
  ],
  alternates: {
    canonical: "https://sentultrip.id/kambing-guling",
  },
  openGraph: {
    title: "Paket Kambing Guling Sentul Bogor — Empuk, Gurih & Tanpa Bau Prengus",
    description:
      "Catering kambing guling live cooking di villa, resort, dan rumah area Sentul Bogor. Daging muda empuk, bumbu rempah meresap, gratis lontong & sop kambing.",
    url: "https://sentultrip.id/kambing-guling",
    type: "website",
    images: [{ url: "/food/exclusive.jpeg", alt: "Paket Kambing Guling Sentul Bogor" }],
  },
};

const foodPackages = [
  {
    id: "paket-a",
    name: "Paket A (8 Kg)",
    weight: "8 kg",
    price: 2500000,
    priceLabel: "Rp 2.500.000",
    portions: "20 – 25 Orang",
    image: "/food/paket a.jpeg",
    badge: "Hemat",
    badgeColor: "#16a34a",
    description:
      "Pilihan ideal untuk acara kumpul keluarga kecil, arisan, syukuran, atau santai bareng teman di villa Sentul.",
    features: [
      "1 Ekor Kambing Guling Muda (8 Kg)",
      "Porsi Pas untuk 20 – 25 Orang",
      "FREE Lontong 50 Pcs",
      "Bumbu Kecap Pedas Limau Khas",
      "Acar Segar & Sambal Pelengkap",
      "Peralatan Bakaran & Arang Disediakan",
      "Chef / Pramusaji Siap Bakar di Lokasi",
    ],
    waMessage:
      "Halo SentulTrip, saya ingin memesan Paket A Kambing Guling (8kg - Rp 2.500.000) untuk acara di Sentul. Bisa cek ketersediaan jadwal?",
  },
  {
    id: "paket-b",
    name: "Paket B (10 Kg)",
    weight: "10 kg",
    price: 3000000,
    priceLabel: "Rp 3.000.000",
    portions: "25 – 30 Orang",
    image: "/food/paket b.jpeg",
    badge: "Terpopuler",
    badgeColor: "#d97706",
    isPopular: true,
    description:
      "Paket favorit untuk family gathering, pesta ulang tahun, reuni, dan acara komunitas di villa kawasan Sentul.",
    features: [
      "1 Ekor Kambing Guling Muda (10 Kg)",
      "Porsi Puas untuk 25 – 30 Orang",
      "FREE Lontong 50 Pcs",
      "Bumbu Rempah Spesial Meresap",
      "Sambal Kecap Jeruk Limau & Acar",
      "Peralatan Bakaran & Arang Disediakan",
      "Chef / Pramusaji Siap Bakar di Lokasi",
    ],
    waMessage:
      "Halo SentulTrip, saya ingin memesan Paket B Kambing Guling (10kg - Rp 3.000.000) untuk acara di Sentul. Bisa cek ketersediaan jadwal?",
  },
  {
    id: "paket-exclusive",
    name: "Paket Exclusive (12 Kg)",
    weight: "12 kg",
    price: 3500000,
    priceLabel: "Rp 3.500.000",
    portions: "30 – 35 Orang",
    image: "/food/exclusive.jpeg",
    badge: "Paling Lengkap + Sop",
    badgeColor: "#7c3aed",
    isExclusive: true,
    description:
      "Paket terlengkap dengan bonus kuah Sop Kambing hangat berempah. Sangat diminati untuk corporate outing, wedding, dan pesta villa mewah.",
    features: [
      "1 Ekor Kambing Guling Super (12 Kg)",
      "Porsi Melimpah untuk 30 – 35 Orang",
      "FREE 1 Panci SOP KAMBING Hangat Gurih",
      "FREE Lontong 50 Pcs",
      "Bumbu Rempah Istimewa Khas Saung Citra",
      "Sambal Kecap Limau Pedas & Acar Segar",
      "Peralatan Panggangan & Full Live Cooking",
      "Chef Berpengalaman Melayani Tamu",
    ],
    waMessage:
      "Halo SentulTrip, saya ingin memesan Paket Exclusive Kambing Guling (12kg + Free Sop Kambing - Rp 3.500.000) untuk acara di Sentul. Bisa cek ketersediaan jadwal?",
  },
];

const whyUsPoints = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "100% Halal & Daging Muda Pilihan",
    desc: "Menggunakan kambing muda sehat berkualitas. Daging sangat empuk, juicy, dan tidak alot saat dikunyah.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Bumbu Meresap & Bebas Bau Prengus",
    desc: "Dimarinasi dengan resep rempah alami khas Nusantara selama berjam-jam, menjamin cita rasa gurih tanpa bau prengus.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Live Cooking & Full Service Chef",
    desc: "Chef kami tiba di villa/rumah Anda membawa alat pemanggang arang dan melayani pemotongan daging langsung hangat.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Siap Antar ke Seluruh Villa Sentul",
    desc: "Menjangkau seluruh villa dan resort di Bojong Koneng, Babakan Madang, Cijayanti, Sentul City, hingga kawasan Bogor.",
  },
];

const faqs = [
  {
    q: "Apakah chef membawa sendiri peralatan panggangan dan arang?",
    a: "Ya, betul! Tim kami membawa lengkap seluruh peralatan panggangan arang khusus, meja potong, pisau, dan arang. Anda cukup menyediakan tempat untuk kami memasak.",
  },
  {
    q: "Berapa jam sebelum acara tim akan tiba di lokasi?",
    a: "Chef kami akan tiba 1 hingga 2 jam sebelum jam makan yang Anda tentukan untuk mempersiapkan panggangan dan memastikan kambing guling disajikan hangat sempurna saat tamu siap menyantap.",
  },
  {
    q: "Apakah sudah termasuk lontong dan bumbu?",
    a: "Semua paket sudah FREE 50 pcs lontong, bumbu kecap pedas jeruk limau, dan acar segar. Untuk Paket Exclusive (12 Kg), Anda juga mendapatkan FREE 1 panci kuah Sop Kambing hangat berempah.",
  },
  {
    q: "Bagaimana cara pesan dan pembayarannya?",
    a: "Pemesanan sangat mudah melalui WhatsApp. Anda cukup tentukan pilihan paket, tanggal acara, dan alamat villa/rumah. Pembayaran DP ditransfer sebagai tanda jadi, dan pelunasan dapat dilakukan di lokasi saat acara.",
  },
  {
    q: "Apakah bisa dipadukan dengan paket trekking / outbound SentulTrip?",
    a: "Sangat bisa! Banyak tamu kami yang selesai trekking curug atau offroad jeep di siang hari, lalu menikmati santapan kambing guling hangat di villa pada sore/malam harinya.",
  },
];

export default function KambingGulingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Paket Kambing Guling Sentul Bogor",
    image: "https://sentultrip.id/food/exclusive.jpeg",
    description:
      "Layanan catering kambing guling live cooking di villa Sentul Bogor. Daging empuk, gurih, bebas bau prengus, gratis lontong & sop kambing.",
    brand: {
      "@type": "Brand",
      name: "Saung Citra & SentulTrip",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: "2500000",
      highPrice: "3500000",
      offerCount: "3",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "120",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="kg-page">
        {/* Breadcrumb */}
        <div className="kg-breadcrumb-wrap">
          <div className="kg-container kg-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>›</span>
            <strong>Paket Kambing Guling Sentul</strong>
          </div>
        </div>

        {/* Hero Section */}
        <section className="kg-hero-section">
          <div className="kg-container kg-hero-grid">
            {/* Left Copy */}
            <div className="kg-hero-copy">
              <div className="kg-hero-badge">
                <span className="kg-fire-icon">🔥</span>
                <span>CATERING &amp; LIVE COOKING VILLA SENTUL</span>
              </div>

              <h1 className="kg-hero-title">
                Paket Kambing Guling di{" "}
                <span className="kg-title-highlight">Sentul Bogor</span> — Empuk, Gurih &amp; Tanpa Bau Prengus
              </h1>

              <p className="kg-hero-desc">
                Pilihan hidangan istimewa untuk pesta villa, gathering kantor, reuni, arisan, dan syukuran keluarga di Sentul.
                Daging kambing muda pilihan dipanggang langsung di tempat (*live cooking*) oleh chef berpengalaman.
              </p>

              {/* Trust badges row */}
              <div className="kg-hero-trust-row">
                <span className="kg-trust-chip">✓ 100% Halal &amp; Higienis</span>
                <span className="kg-trust-chip">✓ Daging Muda Pilihan</span>
                <span className="kg-trust-chip">✓ Gratis Chef Live Cooking</span>
                <span className="kg-trust-chip">✓ Free Lontong 50 Pcs</span>
              </div>

              {/* CTAs */}
              <div className="kg-hero-actions">
                <a href="#paket-kambing" className="kg-btn-primary hover-opacity">
                  Pilih Paket &amp; Harga &rarr;
                </a>
                <a
                  href={waLink("Halo SentulTrip, saya mau tanya paket kambing guling untuk acara di Sentul. Bisa kirim pricelist dan info tanggal?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kg-btn-secondary"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Konsultasi WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card (Uncropped 4:5 Aspect Ratio) */}
            <div className="kg-hero-card-preview">
              <div className="kg-hero-img-wrap">
                <Image
                  src="/food/exclusive.jpeg"
                  alt="Brosur Paket Exclusive Kambing Guling Sentul"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="kg-hero-img-badge">
                  <span>⭐ Rating 5.0 · Saung Citra</span>
                </div>
              </div>
              <div className="kg-hero-img-caption">
                <strong>Live Cooking di Villa Sentul</strong>
                <span>Panggangan arang khusus, dipotong &amp; disajikan hangat</span>
              </div>
            </div>
          </div>
        </section>

        {/* Package Comparison Section (With 100% Uncropped Flyers & Lightbox) */}
        <section id="paket-kambing" className="kg-packages-section">
          <div className="kg-container">
            <div className="kg-section-header">
              <p className="kg-section-eyebrow">Pilihan Paket &amp; Harga</p>
              <h2 className="kg-section-title">Pilih Paket Kambing Guling Sesuai Kebutuhan</h2>
              <p className="kg-section-subtitle">
                Seluruh paket sudah termasuk live cooking oleh chef, peralatan panggangan lengkap, lontong 50 pcs, sambal kecap pedas limau, dan acar.
              </p>
            </div>

            <KambingGulingPackages packages={foodPackages} />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="kg-why-us-section">
          <div className="kg-container">
            <div className="kg-section-header">
              <p className="kg-section-eyebrow">Keunggulan Rasa &amp; Layanan</p>
              <h2 className="kg-section-title">Kenapa Memilih Kambing Guling Kami?</h2>
            </div>

            <div className="kg-why-grid">
              {whyUsPoints.map((item, idx) => (
                <div key={idx} className="kg-why-card">
                  <div className="kg-why-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Order Steps */}
        <section className="kg-steps-section">
          <div className="kg-container">
            <div className="kg-section-header">
              <p className="kg-section-eyebrow">Pemesanan Praktis</p>
              <h2 className="kg-section-title">3 Langkah Mudah Menikmati Kambing Guling</h2>
            </div>

            <div className="kg-steps-grid">
              <div className="kg-step-card">
                <span className="kg-step-num">1</span>
                <h3>Pilih Paket &amp; Tentukan Tanggal</h3>
                <p>Pilih Paket A, B, atau Exclusive sesuai jumlah tamu dan beri tahu kami alamat villa/rumah di Sentul.</p>
              </div>

              <div className="kg-step-card">
                <span className="kg-step-num">2</span>
                <h3>Konfirmasi &amp; DP via WhatsApp</h3>
                <p>Hubungi admin kami untuk mengunci jadwal pemanggangan dan lakukan transfer DP tanda jadi.</p>
              </div>

              <div className="kg-step-card">
                <span className="kg-step-num">3</span>
                <h3>Chef Tiba &amp; Siap Live Cooking</h3>
                <p>Tim tiba 1–2 jam sebelum acara, memanggang langsung dengan arang, dan menyajikan hidangan hangat untuk Anda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="kg-faq-section">
          <div className="kg-container">
            <div className="kg-section-header">
              <p className="kg-section-eyebrow">Tanya Jawab</p>
              <h2 className="kg-section-title">Pertanyaan Seputar Layanan Kambing Guling</h2>
            </div>

            <div className="kg-faq-list">
              {faqs.map((f, i) => (
                <details key={i} className="kg-faq-item">
                  <summary>
                    <span>{f.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="kg-cta-section">
          <div className="kg-container kg-cta-inner">
            <div>
              <h2>Bikin Acara di Villa Sentul Lebih Berkesan &amp; Lezat</h2>
              <p>Jadwal weekend cepat penuh. Amankan tanggal pemesanan kambing guling Anda sekarang.</p>
            </div>
            <a
              href={waLink("Halo SentulTrip, saya ingin booking kambing guling untuk acara di Villa Sentul. Bisa info jadwal yang tersedia?")}
              target="_blank"
              rel="noopener noreferrer"
              className="kg-cta-wa-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Pesan via WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .kg-page {
          background-color: #ffffff;
          color: #111827;
          min-height: 100vh;
        }
        .kg-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .kg-breadcrumb-wrap {
          background-color: #f9fafb;
          border-bottom: 1px solid var(--color-border);
        }
        .kg-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 10px;
          padding-bottom: 10px;
          font-size: 13px;
          color: #6b7280;
        }
        .kg-breadcrumb a {
          color: #6b7280;
          text-decoration: none;
        }
        .kg-breadcrumb a:hover {
          color: var(--color-green-primary);
        }
        .kg-breadcrumb strong {
          color: #111827;
          font-weight: 600;
        }

        /* Hero */
        .kg-hero-section {
          padding: 36px 0 44px;
          background: linear-gradient(180deg, #fefce8 0%, #ffffff 100%);
          border-bottom: 1px solid var(--color-border);
        }
        .kg-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 36px;
          align-items: center;
        }
        .kg-hero-copy {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .kg-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef08a;
          color: #854d0e;
          border: 1px solid #fde047;
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 750;
          width: fit-content;
          letter-spacing: 0.04em;
        }
        .kg-hero-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 850;
          color: #111827;
          line-height: 1.16;
          letter-spacing: -0.6px;
          margin: 0;
        }
        .kg-title-highlight {
          color: #b45309;
        }
        .kg-hero-desc {
          font-size: 15px;
          line-height: 1.65;
          color: #4b5563;
          margin: 0;
          max-width: 560px;
        }
        .kg-hero-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 12px;
          padding: 4px 0;
        }
        .kg-trust-chip {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          font-size: 12.5px;
          font-weight: 650;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .kg-hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .kg-btn-primary {
          background-color: #b45309;
          color: #ffffff;
          font-weight: 750;
          font-size: 14px;
          padding: 12px 22px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: background-color 0.15s, transform 0.15s;
        }
        .kg-btn-primary:hover {
          background-color: #92400e;
          transform: translateY(-1px);
        }
        .kg-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #1f2937;
          font-weight: 650;
          font-size: 13.5px;
          padding: 11px 18px;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.15s;
        }
        .kg-btn-secondary:hover {
          background: #e5e7eb;
        }

        /* Hero Image Card (Uncropped 4:5 Poster) */
        .kg-hero-card-preview {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          max-width: 380px;
          margin: 0 auto;
        }
        .kg-hero-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #2b1704;
        }
        .kg-hero-img-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 750;
          padding: 4px 10px;
          border-radius: 99px;
          z-index: 2;
        }
        .kg-hero-img-caption {
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: #ffffff;
        }
        .kg-hero-img-caption strong {
          font-size: 14px;
          color: #111827;
        }
        .kg-hero-img-caption span {
          font-size: 12px;
          color: #6b7280;
        }

        /* Section headers */
        .kg-packages-section, .kg-why-us-section, .kg-steps-section, .kg-faq-section {
          padding: 44px 0;
        }
        .kg-why-us-section {
          background-color: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .kg-steps-section {
          background-color: #ffffff;
        }
        .kg-faq-section {
          background-color: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
        }
        .kg-section-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .kg-section-eyebrow {
          font-size: 11.5px;
          font-weight: 750;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #b45309;
          margin: 0 0 4px;
        }
        .kg-section-title {
          font-size: 26px;
          font-weight: 850;
          color: #111827;
          letter-spacing: -0.4px;
          margin: 0 0 8px;
        }
        .kg-section-subtitle {
          font-size: 14px;
          color: #6b7280;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Why Us */
        .kg-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
        }
        .kg-why-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .kg-why-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #fefce8;
          color: #b45309;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .kg-why-card h3 {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        .kg-why-card p {
          font-size: 13px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        /* Steps */
        .kg-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .kg-step-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        }
        .kg-step-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #b45309;
          color: #ffffff;
          font-size: 16px;
          font-weight: 850;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kg-step-card h3 {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        .kg-step-card p {
          font-size: 13px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        /* FAQ */
        .kg-faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .kg-faq-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px 20px;
        }
        .kg-faq-item summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14.5px;
          font-weight: 750;
          color: #111827;
          cursor: pointer;
          list-style: none;
        }
        .kg-faq-item summary::-webkit-details-marker { display: none; }
        .kg-faq-item summary svg {
          color: #9ca3af;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .kg-faq-item[open] summary svg {
          transform: rotate(180deg);
        }
        .kg-faq-item p {
          margin: 10px 0 0;
          font-size: 13.5px;
          line-height: 1.65;
          color: #4b5563;
        }

        /* CTA Section */
        .kg-cta-section {
          background: #b45309;
          padding: 48px 0;
          color: #ffffff;
        }
        .kg-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          flex-wrap: wrap;
        }
        .kg-cta-inner h2 {
          font-size: 24px;
          font-weight: 850;
          margin: 0 0 6px;
        }
        .kg-cta-inner p {
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          max-width: 500px;
        }
        .kg-cta-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          color: #b45309;
          font-weight: 800;
          font-size: 14px;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
        }
        .kg-cta-wa-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        /* Responsive */
        @media (max-width: 920px) {
          .kg-hero-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .kg-steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
