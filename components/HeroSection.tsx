import Image from "next/image";
import { waLink } from "@/lib/whatsapp";

const highlights = [
  "Trekking Curug",
  "Offroad Jeep",
  "Corporate & Outing",
];

const stats = [
  { value: "1.200+", label: "Wisatawan" },
  { value: "14", label: "Destinasi" },
  { value: "5.0", label: "Rating Google" },
  { value: "10+", label: "Tahun Berpengalaman" },
];

const activityThumbs = [
  { src: "/produk/CURUG-CIBINGBIN.webp",  alt: "Trekking Curug Cibingbin Sentul Bogor" },
  { src: "/produk/curug-bidadari.webp",   alt: "Trekking Curug Bidadari Sentul Bogor" },
  { src: "/produk/leuwi-hejo.webp",       alt: "Trekking Leuwi Hejo Sentul Bogor" },
  { src: "/produk/ofroad-sentul.webp",    alt: "Offroad Jeep Sentul Bogor" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{ backgroundColor: "#ffffff", paddingTop: "72px" }}
    >
      {/* 2-column layout */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
          paddingBottom: "72px",
        }}
        className="hero-grid"
      >
        {/* Left — text */}
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-green-primary)",
              marginBottom: "20px",
            }}
          >
            Sentul, Bogor, Jawa Barat
          </p>

          <h1
            style={{
              fontSize: "clamp(30px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
              marginBottom: "20px",
              color: "#111111",
            }}
          >
            Wisata Trekking dan Offroad di{" "}
            <span style={{ color: "var(--color-green-primary)" }}>Sentul Bogor</span>
            {" "}— Dipandu Guide Lokal
          </h1>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#444444",
              marginBottom: "32px",
              maxWidth: "480px",
            }}
          >
            SentulTrip menawarkan paket trekking curug, offroad jeep, dan
            corporate outing di kawasan Sentul, Bogor. Kami warga asli Sentul
            dengan pengalaman lebih dari 10 tahun memandu wisatawan dari Jakarta
            dan sekitarnya.
          </p>

          {/* Highlights */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "36px",
            }}
          >
            {highlights.map((h) => (
              <span
                key={h}
                className="hero-highlight"
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#333",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#paket"
              className="hover-opacity"
              style={{
                backgroundColor: "var(--color-green-primary)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "14px",
                padding: "13px 28px",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              Lihat Paket Wisata
            </a>
            <a
              href={waLink("Halo SentulTrip, saya tertarik dengan wisata di Sentul. Bisa ceritakan paket yang cocok untuk saya?")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-green"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#444",
              }}
            >
              Hubungi Kami via WhatsApp &rarr;
            </a>
          </div>
        </div>

        {/* Right — logo + activity thumbnails */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Logo image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "300px",
            }}
          >
            <Image
              src="/logo-sentuiltrip.JPG"
              alt="Logo SentulTrip — Wisata Trekking dan Offroad Sentul Bogor"
              fill
              sizes="(max-width: 768px) 92vw, 540px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* 4 activity thumbnails */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {activityThumbs.map((thumb) => (
              <div
                key={thumb.src}
                style={{
                  position: "relative",
                  height: "72px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 25vw, 130px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "20px 16px",
                borderRight: i < stats.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  fontWeight: 700,
                  color: "#111111",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "#888888" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
