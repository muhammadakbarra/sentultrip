import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageGallery from "@/components/PackageGallery";
import { getPackageDetail, getAllSlugs } from "@/data/packageDetails";
import BookingFlow from "@/components/BookingFlow";
import { PackageCard } from "@/components/PackagesSection";
import packages from "@/data/packages";
import { waLink } from "@/lib/whatsapp";
import {
  ClockIcon,
  RouteIcon,
  GaugeIcon,
  UsersIcon,
  UserCheckIcon,
  SunriseIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  BackpackIcon,
  AlertTriangleIcon,
  HelpCircleIcon,
  ChevronDownIcon,
  FlagIcon,
  InfoIcon,
  ClipboardCheckIcon,
  SparkleIcon,
  highlightIcons,
} from "@/components/icons/PackageIcons";

function difficultyLevel(d: string): number | null {
  const s = d.toLowerCase();
  if (s.includes("semua")) return null;
  if (s.includes("sulit") || s.includes("berat")) return 3;
  if (s.includes("menengah")) return 2;
  if (s.includes("ringan") && s.includes("sedang")) return 2;
  if (s.includes("sedang")) return 2;
  if (s.includes("ringan")) return 1;
  return null;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getPackageDetail(slug);
  if (!detail) return {};

  const title = `${detail.name} — SentulTrip`;
  const url = `https://sentultrip.id/paket/${detail.slug}`;
  const image = detail.photos[0];

  return {
    title,
    description: detail.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: detail.shortDescription,
      url,
      type: "website",
      images: image ? [{ url: image, alt: detail.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: detail.shortDescription,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getPackageDetail(slug);
  if (!detail) notFound();

  const price = formatPrice(detail.price);
  const marketPrice = detail.marketPrice ? formatPrice(detail.marketPrice) : null;

  const currentPkg = packages.find((p) => p.slug === detail.slug);
  const sameType = currentPkg
    ? packages.filter((p) => p.slug !== detail.slug && p.type === currentPkg.type)
    : [];
  const relatedPackages = (
    sameType.length >= 3
      ? sameType
      : [...sameType, ...packages.filter((p) => p.slug !== detail.slug && !sameType.includes(p))]
  ).slice(0, 3);

  type Spec = { icon: typeof ClockIcon; label: string; value: string; meter?: number | null };
  const specs: Spec[] = [
    { icon: ClockIcon, label: "Durasi Trip", value: detail.duration },
    ...(detail.distance ? [{ icon: RouteIcon, label: "Jarak Tempuh", value: detail.distance }] : []),
    { icon: GaugeIcon, label: "Tingkat Kesulitan", value: detail.difficulty, meter: difficultyLevel(detail.difficulty) },
    { icon: UserCheckIcon, label: "Min. Usia", value: detail.minAge },
    { icon: UsersIcon, label: "Kapasitas Grup", value: detail.capacity },
    { icon: SunriseIcon, label: "Waktu Mulai", value: detail.bestTime },
    { icon: MapPinIcon, label: "Lokasi Start", value: detail.locationArea },
  ];

  const waAskUrl = waLink(
    `Halo SentulTrip, saya tertarik dengan paket "${detail.name}". Bisa tanya ketersediaan jadwalnya?`
  );

  return (
    <>
      <link rel="preload" as="image" href={detail.photos[0]} fetchPriority="high" />
      <Navbar />

      <main className="pkg-detail-page">
        {/* Breadcrumb */}
        <div className="pkg-breadcrumb-wrap">
          <div className="pkg-container pkg-breadcrumb">
            <Link href="/">Beranda</Link>
            <span>›</span>
            <Link href="/#paket">Paket Wisata</Link>
            <span>›</span>
            <strong>{detail.name}</strong>
          </div>
        </div>

        <div className="pkg-container">
          {/* Header Title & Trust Bar */}
          <header className="pkg-header-top">
            <div className="pkg-header-meta">
              <span className="pkg-category-pill">
                {detail.slug.includes("offroad") ? "Offroad Jeep" : "Trekking Sentul"}
              </span>
              <span className="pkg-rating-tag">⭐ 4.9 (50+ Ulasan Terverifikasi)</span>
              <span className="pkg-location-tag">📍 Sentul, Bogor</span>
            </div>

            <h1 className="pkg-main-title">{detail.name}</h1>
            <p className="pkg-tagline-text">{detail.tagline}</p>
          </header>

          {/* Photo Showcase Gallery (Mosaic / No Crop) */}
          <PackageGallery photos={detail.photos} name={detail.name} />

          {/* 2-Column Content Layout (Left: Structured Details, Right: Sticky Booking) */}
          <div className="pkg-grid-layout">
            {/* Left Column: Details */}
            <div className="pkg-content-col">
              {/* Specs Strip */}
              <section className="pkg-specs-grid">
                {specs.map((item) => (
                  <div className="pkg-spec-card" key={item.label}>
                    <item.icon size={20} className="pkg-spec-icon" />
                    <div>
                      <span className="pkg-spec-label">{item.label}</span>
                      <strong className="pkg-spec-val">{item.value}</strong>
                      {item.meter != null && <DifficultyMeter level={item.meter} />}
                    </div>
                  </div>
                ))}
              </section>

              {/* Tentang Paket */}
              <Section title="Tentang Paket Perjalanan" icon={<InfoIcon size={18} />}>
                <div className="pkg-route-type-badge">
                  <RouteIcon size={15} />
                  <span>Karakter Jalur: {detail.routeType}</span>
                </div>
                {detail.description.map((p, i) => (
                  <p key={i} className="pkg-body-text">{p}</p>
                ))}
              </Section>

              {/* Daya Tarik Utama */}
              <Section title="Daya Tarik & Keunggulan Jalur" icon={<SparkleIcon size={18} />}>
                <div className="pkg-highlight-grid">
                  {detail.highlights.map((h, i) => {
                    const HIcon = highlightIcons[i % highlightIcons.length];
                    return (
                      <article className="pkg-highlight-card" key={h.title}>
                        <div className="pkg-highlight-icon-box">
                          <HIcon size={18} />
                        </div>
                        <h3>{h.title}</h3>
                        <p>{h.desc}</p>
                      </article>
                    );
                  })}
                </div>
              </Section>

              {/* Cocok Untuk */}
              <Section title="Cocok Untuk Peserta" icon={<UsersIcon size={18} />}>
                <div className="pkg-suitable-pills">
                  {detail.suitableFor.map((item) => (
                    <span key={item}>✓ {item}</span>
                  ))}
                </div>
              </Section>

              {/* Fasilitas Termasuk & Tidak Termasuk */}
              <Section title="Fasilitas & Ketentuan Layanan" icon={<ClipboardCheckIcon size={18} />}>
                <div className="pkg-inclusions-grid">
                  <InfoList title="Sudah Termasuk" type="yes" items={detail.includes} />
                  <InfoList title="Tidak Termasuk" type="no" items={detail.excludes} />
                </div>
              </Section>

              {/* Jadwal Perjalanan */}
              <Section title="Rundown & Jadwal Perjalanan" icon={<RouteIcon size={18} />}>
                <div className="pkg-timeline-box">
                  {detail.schedule.map((s, i) => {
                    const isFirst = i === 0;
                    const isLast = i === detail.schedule.length - 1;
                    return (
                      <div
                        className={`pkg-timeline-row ${isFirst ? "start" : ""} ${isLast ? "finish" : ""}`}
                        key={`${s.time}-${s.activity}`}
                      >
                        <span className="pkg-timeline-time">{s.time}</span>
                        <div className="pkg-timeline-body">
                          <span className="pkg-timeline-marker">
                            {isFirst ? <FlagIcon size={11} /> : isLast ? <MapPinIcon size={11} /> : <span className="pkg-dot-inner" />}
                          </span>
                          <p>{s.activity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              {/* Perlengkapan & Catatan Keamanan */}
              <Section title="Perlengkapan & Catatan Keamanan" icon={<BackpackIcon size={18} />}>
                <div className="pkg-advice-grid">
                  <div className="pkg-advice-card">
                    <h4>Yang Perlu Dibawa</h4>
                    <ul className="pkg-check-list">
                      {detail.whatToBring.map((item) => (
                        <li key={item}>
                          <CheckCircleIcon size={16} className="pkg-green-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pkg-advice-card warning">
                    <h4>Catatan Keamanan & Arahan</h4>
                    <ul className="pkg-check-list">
                      {detail.safetyNotes.map((item) => (
                        <li key={item}>
                          <AlertTriangleIcon size={16} className="pkg-warn-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Section>

              {/* FAQ */}
              <Section title="Pertanyaan yang Sering Diajukan" icon={<HelpCircleIcon size={18} />}>
                <div className="pkg-faq-accordion">
                  {detail.faq.map((faq) => (
                    <details key={faq.question}>
                      <summary>
                        <HelpCircleIcon size={16} className="pkg-faq-q-icon" />
                        <span>{faq.question}</span>
                        <ChevronDownIcon size={16} className="pkg-faq-chevron" />
                      </summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </Section>
            </div>

            {/* Right Column: Sticky Floating Booking Sidebar */}
            <aside className="pkg-sidebar-col">
              <div className="pkg-sticky-booking-card">
                {/* Price Header */}
                <div className="pkg-booking-price-header">
                  <span className="pkg-price-label">Biaya Perjalanan</span>
                  <div className="pkg-price-row">
                    {marketPrice && <s className="pkg-market-price">{marketPrice}</s>}
                    <strong className="pkg-actual-price">{price}</strong>
                    <span className="pkg-unit-label">/ orang</span>
                  </div>
                  {marketPrice && (
                    <span className="pkg-promo-tag">✓ Harga Promo Spesial Booking Online</span>
                  )}
                </div>

                {/* Quick Info summary */}
                <div className="pkg-booking-meta-list">
                  <div className="pkg-meta-item">
                    <span>⏱ Durasi</span>
                    <strong>{detail.duration}</strong>
                  </div>
                  <div className="pkg-meta-item">
                    <span>⛰️ Level</span>
                    <strong>{detail.difficulty}</strong>
                  </div>
                  <div className="pkg-meta-item">
                    <span>👥 Min. Usia</span>
                    <strong>{detail.minAge}</strong>
                  </div>
                  <div className="pkg-meta-item meeting">
                    <span>📍 Titik Kumpul</span>
                    <strong>{detail.meetingPoint}</strong>
                  </div>
                </div>

                {/* Main Action CTAs */}
                <div className="pkg-booking-actions">
                  <BookingFlow
                    packageSlug={detail.slug}
                    packageName={detail.name}
                    price={detail.price}
                    marketPrice={detail.marketPrice}
                  />

                  <a
                    href={waAskUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pkg-wa-ask-btn"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Tanya Dulu via WhatsApp</span>
                  </a>
                </div>

                {/* Trust Guarantees */}
                <div className="pkg-trust-guarantee-box">
                  <span>✓ Konfirmasi Jadwal Instan</span>
                  <span>✓ Dipandu Warga Asli Berlisensi</span>
                  <span>✓ P3K &amp; Asuransi Termasuk</span>
                  <span>✓ Bebas Konsultasi Kapan Saja</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Packages */}
          {relatedPackages.length > 0 && (
            <section className="pkg-related-section">
              <div className="pkg-related-header">
                <h2>Rekomendasi Paket Wisata Lainnya</h2>
                <Link href="/#paket">Lihat Semua Paket &rarr;</Link>
              </div>
              <div className="pkg-related-grid">
                {relatedPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Bottom Floating CTA */}
      <div className="pkg-mobile-bottom-bar">
        <div className="pkg-mobile-price-col">
          {marketPrice && <s className="pkg-mobile-market">{marketPrice}</s>}
          <div className="pkg-mobile-price">
            <strong>{price}</strong>
            <small>/orang</small>
          </div>
        </div>
        <div className="pkg-mobile-btn-wrap">
          <BookingFlow
            packageSlug={detail.slug}
            packageName={detail.name}
            price={detail.price}
            marketPrice={detail.marketPrice}
          />
        </div>
      </div>

      <Footer />

      <style>{`
        .pkg-detail-page {
          background-color: #ffffff;
          color: #111827;
          min-height: 100vh;
          padding-bottom: 48px;
        }
        .pkg-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .pkg-breadcrumb-wrap {
          background-color: #f9fafb;
          border-bottom: 1px solid var(--color-border);
        }
        .pkg-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 10px;
          padding-bottom: 10px;
          font-size: 13px;
          color: #6b7280;
          overflow-x: auto;
          white-space: nowrap;
        }
        .pkg-breadcrumb a {
          color: #6b7280;
          text-decoration: none;
        }
        .pkg-breadcrumb a:hover {
          color: var(--color-green-primary);
        }
        .pkg-breadcrumb strong {
          color: #111827;
          font-weight: 600;
        }

        /* Header top */
        .pkg-header-top {
          padding-top: 24px;
          padding-bottom: 18px;
        }
        .pkg-header-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .pkg-category-pill {
          display: inline-flex;
          align-items: center;
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .pkg-rating-tag {
          font-size: 12.5px;
          font-weight: 700;
          color: #854d0e;
          background: #fefce8;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #fef08a;
        }
        .pkg-location-tag {
          font-size: 12.5px;
          color: #6b7280;
        }
        .pkg-main-title {
          font-size: clamp(26px, 3.5vw, 36px);
          font-weight: 850;
          color: #111827;
          line-height: 1.15;
          letter-spacing: -0.6px;
          margin: 0 0 6px;
        }
        .pkg-tagline-text {
          font-size: 15px;
          line-height: 1.55;
          color: #4b5563;
          margin: 0;
          max-width: 800px;
        }

        /* 2-Column Grid */
        .pkg-grid-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 350px;
          gap: 36px;
          align-items: start;
          padding-top: 10px;
          padding-bottom: 40px;
        }
        .pkg-content-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Specs Strip */
        .pkg-specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
        }
        .pkg-spec-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px 14px;
        }
        .pkg-spec-icon {
          color: var(--color-green-primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pkg-spec-label {
          display: block;
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 2px;
        }
        .pkg-spec-val {
          display: block;
          font-size: 13.5px;
          font-weight: 750;
          color: #111827;
          line-height: 1.25;
        }

        /* Sections */
        .pkg-section-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .pkg-section-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #f0fdf4;
          color: var(--color-green-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pkg-section-heading {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin: 0;
          letter-spacing: -0.3px;
        }
        .pkg-body-text {
          font-size: 14.5px;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 10px;
        }
        .pkg-route-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 700;
          color: #166534;
          background: #f0fdf4;
          padding: 5px 12px;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        /* Highlights */
        .pkg-highlight-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }
        .pkg-highlight-card {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          padding: 16px;
        }
        .pkg-highlight-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #ffffff;
          color: #15803d;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .pkg-highlight-card h3 {
          font-size: 14.5px;
          font-weight: 750;
          color: #111827;
          margin: 0 0 4px;
        }
        .pkg-highlight-card p {
          font-size: 13px;
          line-height: 1.6;
          color: #4b5563;
          margin: 0;
        }

        /* Suitable pills */
        .pkg-suitable-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .pkg-suitable-pills span {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 99px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        /* Inclusions */
        .pkg-inclusions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .pkg-info-box {
          border-radius: 14px;
          padding: 16px 18px;
          border: 1px solid #e5e7eb;
        }
        .pkg-info-box.yes {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }
        .pkg-info-box.no {
          background: #fff7ed;
          border-color: #fed7aa;
        }
        .pkg-info-box h4 {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14.5px;
          font-weight: 750;
          margin: 0 0 10px;
        }
        .pkg-info-box.yes h4 { color: #166534; }
        .pkg-info-box.no h4 { color: #c2410c; }
        .pkg-info-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pkg-info-box li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: #374151;
        }
        .pkg-info-box.yes svg { color: #166534; flex-shrink: 0; margin-top: 1px; }
        .pkg-info-box.no svg { color: #ea580c; flex-shrink: 0; margin-top: 1px; }

        /* Timeline Rundown */
        .pkg-timeline-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pkg-timeline-row {
          display: grid;
          grid-template-columns: 60px minmax(0, 1fr);
          gap: 14px;
          align-items: flex-start;
        }
        .pkg-timeline-time {
          font-size: 13px;
          font-weight: 800;
          color: var(--color-green-primary);
          padding-top: 1px;
        }
        .pkg-timeline-body {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .pkg-timeline-marker {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #dcfce7;
          color: #166534;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pkg-dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #166534;
        }
        .pkg-timeline-body p {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: #1f2937;
        }

        /* Advice / Checklist */
        .pkg-advice-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .pkg-advice-card {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 16px 18px;
        }
        .pkg-advice-card.warning {
          background: #fffbeb;
          border-color: #fde68a;
        }
        .pkg-advice-card h4 {
          font-size: 14.5px;
          font-weight: 750;
          color: #111827;
          margin: 0 0 10px;
        }
        .pkg-check-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pkg-check-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: #374151;
        }
        .pkg-green-check { color: #16a34a; flex-shrink: 0; margin-top: 1px; }
        .pkg-warn-icon { color: #d97706; flex-shrink: 0; margin-top: 1px; }

        /* FAQ Accordion */
        .pkg-faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pkg-faq-accordion details {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 14px 16px;
        }
        .pkg-faq-accordion summary {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14.5px;
          font-weight: 750;
          color: #111827;
          cursor: pointer;
          list-style: none;
        }
        .pkg-faq-accordion summary::-webkit-details-marker { display: none; }
        .pkg-faq-q-icon { color: var(--color-green-primary); flex-shrink: 0; }
        .pkg-faq-accordion summary span { flex: 1; }
        .pkg-faq-chevron { color: #9ca3af; transition: transform 0.2s; }
        .pkg-faq-accordion details[open] .pkg-faq-chevron { transform: rotate(180deg); }
        .pkg-faq-accordion p {
          margin: 8px 0 0;
          padding-left: 26px;
          font-size: 13.5px;
          line-height: 1.65;
          color: #4b5563;
        }

        /* ── Sticky Sidebar Booking Card ── */
        .pkg-sidebar-col {
          position: sticky;
          top: 84px;
        }
        .pkg-sticky-booking-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pkg-booking-price-header {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f3f4f6;
        }
        .pkg-price-label {
          font-size: 12px;
          color: #6b7280;
        }
        .pkg-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .pkg-market-price {
          font-size: 13.5px;
          color: #9ca3af;
          text-decoration: line-through;
          font-weight: 600;
        }
        .pkg-actual-price {
          font-size: 26px;
          font-weight: 850;
          color: #166534;
          letter-spacing: -0.5px;
        }
        .pkg-unit-label {
          font-size: 12px;
          color: #6b7280;
        }
        .pkg-promo-tag {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 700;
          color: #15803d;
          background: #f0fdf4;
          padding: 3px 8px;
          border-radius: 6px;
          width: fit-content;
          margin-top: 4px;
        }
        .pkg-booking-meta-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 13px;
        }
        .pkg-meta-item {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: #4b5563;
        }
        .pkg-meta-item strong {
          color: #111827;
          text-align: right;
        }
        .pkg-meta-item.meeting {
          flex-direction: column;
          gap: 2px;
          padding-top: 6px;
          border-top: 1px dashed #e5e7eb;
        }
        .pkg-meta-item.meeting strong {
          text-align: left;
          font-size: 12.5px;
          line-height: 1.4;
        }
        .pkg-booking-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .pkg-wa-ask-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #1f2937;
          font-size: 13.5px;
          font-weight: 700;
          padding: 11px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .pkg-wa-ask-btn:hover {
          background: #e5e7eb;
          color: #111827;
        }
        .pkg-trust-guarantee-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #166534;
        }

        /* Related Section */
        .pkg-related-section {
          padding-top: 20px;
          border-top: 1px solid var(--color-border);
        }
        .pkg-related-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .pkg-related-header h2 {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }
        .pkg-related-header a {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-green-primary);
          text-decoration: none;
        }
        .pkg-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        /* Mobile bottom floating bar */
        .pkg-mobile-bottom-bar {
          display: none;
        }

        @media (max-width: 920px) {
          .pkg-detail-page {
            padding-bottom: 96px;
          }
          .pkg-grid-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .pkg-sidebar-col {
            display: none;
          }
          .pkg-related-grid {
            grid-template-columns: 1fr 1fr;
          }
          .pkg-mobile-bottom-bar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99990;
            background: #111827;
            color: #ffffff;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 16px 16px 0 0;
            padding: 12px 18px calc(12px + env(safe-area-inset-bottom, 0px));
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.22);
          }
          .pkg-mobile-price-col {
            display: flex;
            flex-direction: column;
            line-height: 1.15;
          }
          .pkg-mobile-market {
            font-size: 11px;
            color: #9ca3af;
          }
          .pkg-mobile-price {
            display: flex;
            align-items: baseline;
            gap: 4px;
          }
          .pkg-mobile-price strong {
            font-size: 18px;
            color: #4ade80;
            font-weight: 850;
          }
          .pkg-mobile-price small {
            font-size: 11px;
            color: #d1d5db;
          }
          .pkg-mobile-btn-wrap .availability-btn {
            padding: 10px 18px;
            font-size: 13.5px;
            background: #22c55e;
            color: #ffffff;
            border-radius: 8px;
            font-weight: 750;
          }
        }

        @media (max-width: 640px) {
          .pkg-container {
            padding: 0 16px;
          }
          .pkg-main-title {
            font-size: 24px;
          }
          .pkg-tagline-text {
            font-size: 13.5px;
          }
          .pkg-inclusions-grid,
          .pkg-advice-grid,
          .pkg-related-grid {
            grid-template-columns: 1fr;
          }
          .pkg-specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="pkg-section-title-row">
        {icon && <div className="pkg-section-icon-box">{icon}</div>}
        <h2 className="pkg-section-heading">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoList({
  title,
  items,
  type,
}: {
  title: string;
  items: string[];
  type: "yes" | "no";
}) {
  const Icon = type === "yes" ? CheckCircleIcon : XCircleIcon;
  return (
    <div className={`pkg-info-box ${type}`}>
      <h4>
        <Icon size={16} />
        <span>{title}</span>
      </h4>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Icon size={15} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DifficultyMeter({ level }: { level: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", marginTop: "4px" }} aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          style={{
            width: "14px",
            height: "4px",
            borderRadius: "2px",
            backgroundColor: i <= level ? "#16a34a" : "#e5e7eb",
          }}
        />
      ))}
    </div>
  );
}
