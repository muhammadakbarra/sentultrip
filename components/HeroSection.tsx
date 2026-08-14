import Image from "next/image";
import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import packages from "@/data/packages";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

const trekkingPrices = packages.filter((p) => p.type === "trekking").map((p) => p.price);
const startingPrice = Math.min(...trekkingPrices);

const featuredDestinations = [
  { name: "Curug Cibingbin", price: "Rp 150rb", duration: "5 Jam", img: "/produk/CURUG-CIBINGBIN.webp", badge: "Terpopuler", slug: "curug-cibingbin" },
  { name: "Curug Bidadari", price: "Rp 150rb", duration: "4 Jam", img: "/produk/curug-bidadari.webp", badge: "Favorit", slug: "curug-bidadari" },
  { name: "Offroad Jeep Sentul", price: "Rp 1.25jt", duration: "3–4 Jam", img: "/produk/ofroad-sentul.webp", badge: "Offroad", slug: "offroad-curug-bidadari" },
  { name: "Desa Cisadon", price: "Rp 200rb", duration: "5–6 Jam", img: "/produk/desa-cisadon/1.webp", badge: "Ikonik", slug: "desa-cisadon" },
];

const stats = [
  { value: "1.200+", label: "Wisatawan" },
  { value: "14", label: "Destinasi Curug & Trek" },
  { value: "5.0 ★", label: "Rating Google" },
  { value: "10+", label: "Tahun Pengalaman" },
];

export default function HeroSection() {
  return (
    <section id="hero" className="hero-compact-section">
      <div className="hero-compact-container">
        {/* Left column — Copy, Trust, and Quick Action */}
        <div className="hero-copy-col">
          {/* Trust rating badge */}
          <div className="hero-trust-badge">
            <span className="hero-stars">★★★★★</span>
            <span className="hero-trust-text">
              <strong>5.0 di Google Reviews</strong> · 1.200+ Wisatawan
            </span>
          </div>

          <h1 className="hero-title">
            Wisata Trekking Curug &amp; Offroad di{" "}
            <span className="hero-highlight-word">Sentul Bogor</span>
          </h1>

          <p className="hero-desc">
            Dipandu warga asli Sentul berpengalaman 10+ tahun. Rute trekking ramah pemula,
            keluarga, hingga korporat dengan harga transparan mulai{" "}
            <strong style={{ color: "#1e5c1e" }}>{formatRupiah(startingPrice)}/orang</strong>.
          </p>

          {/* Quick value props / guarantees */}
          <div className="hero-guarantees">
            <span>✓ Guide Asli Berlisensi</span>
            <span>✓ Free Dokumentasi Foto</span>
            <span>✓ P3K &amp; Asuransi</span>
          </div>

          {/* CTAs */}
          <div className="hero-actions-row">
            <a href="#paket" className="hero-btn-primary hover-opacity">
              Pilih Paket Wisata &rarr;
            </a>
            <a
              href={waLink("Halo SentulTrip, saya tertarik ingin tanya paket wisata di Sentul. Bisa rekomendasi yang cocok?")}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Konsultasi WhatsApp
            </a>
          </div>
        </div>

        {/* Right column — Compact visual showcase card */}
        <div className="hero-showcase-col">
          <div className="hero-card-grid">
            {featuredDestinations.map((item) => (
              <Link
                key={item.name}
                href={`/paket/${item.slug}`}
                className="hero-dest-card"
              >
                <div className="hero-dest-img-wrap">
                  <Image
                    src={item.img}
                    alt={`Wisata ${item.name} Sentul`}
                    fill
                    sizes="(max-width: 640px) 45vw, 200px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <span className="hero-dest-badge">{item.badge}</span>
                </div>
                <div className="hero-dest-info">
                  <span className="hero-dest-name">{item.name}</span>
                  <div className="hero-dest-sub">
                    <span className="hero-dest-price">{item.price}</span>
                    <span className="hero-dest-dur">{item.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Social Proof floating note */}
          <div className="hero-proof-bar">
            <span className="hero-proof-dot" />
            <span>Tersedia jadwal setiap hari · Booking mudah tanpa ribet</span>
          </div>
        </div>
      </div>

      {/* Embedded Stats row */}
      <div className="hero-stats-row">
        <div className="hero-stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="hero-stat-item">
              <span className="hero-stat-val">{s.value}</span>
              <span className="hero-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-compact-section {
          background-color: #ffffff;
          padding-top: 28px;
          border-bottom: 1px solid var(--color-border);
        }
        .hero-compact-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px 28px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 36px;
          align-items: center;
        }
        .hero-copy-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 5px 12px;
          border-radius: 99px;
          width: fit-content;
        }
        .hero-stars {
          color: #d97706;
          font-size: 13px;
          letter-spacing: 1px;
        }
        .hero-trust-text {
          font-size: 12px;
          color: #166534;
        }
        .hero-title {
          font-size: clamp(26px, 3.2vw, 36px);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -0.6px;
          color: #111827;
          margin: 0;
        }
        .hero-highlight-word {
          color: var(--color-green-primary);
        }
        .hero-desc {
          font-size: 14.5px;
          line-height: 1.65;
          color: #4b5563;
          margin: 0;
          max-width: 520px;
        }
        .hero-guarantees {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
          font-size: 12.5px;
          font-weight: 600;
          color: #15803d;
          padding: 4px 0;
        }
        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .hero-btn-primary {
          background-color: var(--color-green-primary);
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          padding: 11px 22px;
          border-radius: 8px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: background-color 0.15s, transform 0.15s;
        }
        .hero-btn-primary:hover {
          background-color: var(--color-green-dark);
          transform: translateY(-1px);
        }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #1f2937;
          font-weight: 600;
          font-size: 13.5px;
          padding: 10px 18px;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.15s, color 0.15s;
        }
        .hero-btn-secondary:hover {
          background-color: #e5e7eb;
          color: #111827;
        }
        .hero-showcase-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .hero-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .hero-dest-card {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          display: flex;
          flex-direction: column;
        }
        .hero-dest-card:hover {
          transform: translateY(-2px);
          border-color: var(--color-green-primary);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }
        .hero-dest-img-wrap {
          position: relative;
          height: 105px;
          width: 100%;
          background: #f3f4f6;
        }
        .hero-dest-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          background: rgba(17, 24, 39, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .hero-dest-info {
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hero-dest-name {
          font-size: 13px;
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-dest-sub {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11.5px;
        }
        .hero-dest-price {
          color: #166534;
          font-weight: 750;
        }
        .hero-dest-dur {
          color: #6b7280;
        }
        .hero-proof-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px dashed #e5e7eb;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 11.5px;
          color: #4b5563;
        }
        .hero-proof-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }
        .hero-stats-row {
          background-color: var(--color-bg-secondary);
          border-top: 1px solid var(--color-border);
        }
        .hero-stats-inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .hero-stat-item {
          text-align: center;
          padding: 10px 8px;
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .hero-stat-item:last-child {
          border-right: none;
        }
        .hero-stat-val {
          font-size: 18px;
          font-weight: 800;
          color: #111827;
          line-height: 1.1;
        }
        .hero-stat-lbl {
          font-size: 11px;
          color: #6b7280;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hero-compact-container {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-bottom: 20px;
          }
          .hero-stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-stat-item:nth-child(2) {
            border-right: none;
          }
          .hero-stat-item:nth-child(1), .hero-stat-item:nth-child(2) {
            border-bottom: 1px solid var(--color-border);
          }
          .hero-dest-img-wrap {
            height: 90px;
          }
        }
      `}</style>
    </section>
  );
}
