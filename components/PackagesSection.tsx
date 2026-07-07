"use client";

import { useState } from "react";
import Image from "next/image";
import packages, { Package, PackageType } from "@/data/packages";

const filters: { label: string; value: "all" | PackageType }[] = [
  { label: "Semua", value: "all" },
  { label: "Trekking", value: "trekking" },
  { label: "Offroad", value: "offroad" },
  { label: "Korporat", value: "corporate" },
];

const typeTheme: Record<
  PackageType,
  {
    cardBg: string;
    cardBorder: string;
    imgBg: string;
    imgTextColor: string;
    badgeBg: string;
    badgeText: string;
    badgeLabel: string;
    priceColor: string;
    btnBg: string;
    btnHoverBg: string;
    placeholderText: string;
  }
> = {
  trekking: {
    cardBg: "#f0f7ee", cardBorder: "#c8e0c5", imgBg: "#daefd6", imgTextColor: "#2a7a2a",
    badgeBg: "#2a7a2a", badgeText: "#ffffff", badgeLabel: "Trekking",
    priceColor: "#1e5c1e", btnBg: "#2a7a2a", btnHoverBg: "#1e5c1e", placeholderText: "Curug & Trekking",
  },
  offroad: {
    cardBg: "#fef9ee", cardBorder: "#e8d5a0", imgBg: "#faefd0", imgTextColor: "#92680a",
    badgeBg: "#d4920a", badgeText: "#ffffff", badgeLabel: "Offroad",
    priceColor: "#92680a", btnBg: "#d4920a", btnHoverBg: "#b87d08", placeholderText: "Offroad Jeep",
  },
  corporate: {
    cardBg: "#eef3fa", cardBorder: "#c0d0e8", imgBg: "#d8e5f5", imgTextColor: "#2c5282",
    badgeBg: "#2c5282", badgeText: "#ffffff", badgeLabel: "Korporat",
    priceColor: "#2c5282", btnBg: "#2c5282", btnHoverBg: "#1e3a5f", placeholderText: "Corporate Outing",
  },
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}


function PackageCard({ pkg }: { pkg: Package }) {
  const t = typeTheme[pkg.type];
  const hasImages = pkg.images && pkg.images.length > 0;
  const multipleImages = pkg.images && pkg.images.length > 1;
  const [imgIdx, setImgIdx] = useState(0);

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pkg.images) setImgIdx((i) => (i + 1) % pkg.images!.length);
  };
  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (pkg.images) setImgIdx((i) => (i - 1 + pkg.images!.length) % pkg.images!.length);
  };

  return (
    <div
      className="card-hover"
      style={{
        backgroundColor: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image / Carousel area */}
      <div
        style={{
          position: "relative",
          height: "180px",
          backgroundColor: t.imgBg,
          borderBottom: `1px solid ${t.cardBorder}`,
          overflow: "hidden",
        }}
      >
        {hasImages ? (
          <>
            <Image
              src={pkg.images![imgIdx]}
              alt={
                pkg.type === "trekking"
                  ? `Trekking ${pkg.name} Sentul Bogor`
                  : pkg.type === "offroad"
                  ? `Offroad Jeep ${pkg.name} Sentul`
                  : `${pkg.name} Sentul Bogor`
              }
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            />

            {/* Prev / Next buttons — only when multiple images */}
            {multipleImages && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Foto sebelumnya"
                  style={{
                    position: "absolute", left: "8px", top: "50%",
                    transform: "translateY(-50%)",
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.45)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", zIndex: 2,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Foto berikutnya"
                  style={{
                    position: "absolute", right: "8px", top: "50%",
                    transform: "translateY(-50%)",
                    width: "28px", height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.45)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", zIndex: 2,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Dot indicators */}
                <div
                  style={{
                    position: "absolute", bottom: "8px", left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex", gap: "5px", zIndex: 2,
                  }}
                >
                  {pkg.images!.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIdx(i); }}
                      aria-label={`Foto ${i + 1}`}
                      style={{
                        width: i === imgIdx ? "18px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor: i === imgIdx ? "#ffffff" : "rgba(255,255,255,0.55)",
                        border: "none", cursor: "pointer", padding: 0,
                        transition: "width 0.2s, background-color 0.2s",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* No image — keep styled placeholder */
          <div
            style={{
              height: "100%", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "13px", color: t.imgTextColor, fontWeight: 600 }}>
              {t.placeholderText}
            </span>
          </div>
        )}

        {/* Type badge */}
        <span
          style={{
            position: "absolute", top: "12px", left: "12px",
            backgroundColor: t.badgeBg, color: t.badgeText,
            fontSize: "11px", fontWeight: 600,
            padding: "3px 10px", borderRadius: "20px",
            letterSpacing: "0.03em", zIndex: 3,
          }}
        >
          {t.badgeLabel}
        </span>

        {/* POPULER badge */}
        {pkg.badge && (
          <span
            style={{
              position: "absolute", top: "12px", right: "12px",
              backgroundColor: "var(--color-gold)", color: "#ffffff",
              fontSize: "10px", fontWeight: 700,
              padding: "3px 10px", borderRadius: "20px",
              letterSpacing: "0.05em", textTransform: "uppercase", zIndex: 3,
            }}
          >
            {pkg.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111111", lineHeight: 1.3 }}>
          {pkg.name}
        </h3>
        <div style={{ fontSize: "13px", color: "#888888" }}>
          <span>{pkg.duration}</span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: "auto", paddingTop: "14px",
            borderTop: `1px solid ${t.cardBorder}`,
          }}
        >
          <div>
            {pkg.marketPrice && (
              <div style={{ fontSize: "12px", color: "#b0b0b0", textDecoration: "line-through", fontWeight: 600, lineHeight: 1.2 }}>
                {formatRupiah(pkg.marketPrice)}
              </div>
            )}
            <div style={{ fontSize: "18px", fontWeight: 700, color: t.priceColor, lineHeight: 1.2 }}>
              {formatRupiah(pkg.price)}
            </div>
            <div style={{ fontSize: "11px", color: "#aaa" }}>/{pkg.priceUnit}</div>
          </div>
          <a
            href={`/paket/${pkg.slug}`}
            style={{
              backgroundColor: t.btnBg, color: "#ffffff",
              fontSize: "13px", fontWeight: 600,
              padding: "7px 16px", borderRadius: "7px",
              whiteSpace: "nowrap", transition: "background-color 0.15s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = t.btnHoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = t.btnBg)}
          >
            Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PackagesSection() {
  const [active, setActive] = useState<"all" | PackageType>("all");
  const filtered = active === "all" ? packages : packages.filter((p) => p.type === active);

  return (
    <section id="paket" style={{ backgroundColor: "var(--color-bg-primary)", padding: "72px 0" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        <p
          style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--color-green-primary)", marginBottom: "12px",
          }}
        >
          Paket Wisata
        </p>

        <div
          style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "16px", flexWrap: "wrap", marginBottom: "28px",
          }}
        >
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#111111" }}>
            Pilih Paket yang Sesuai
          </h2>
          <a href="#paket" className="hover-green"
            style={{ fontSize: "13px", fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>
            Lihat semua &rarr;
          </a>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", marginBottom: "32px", overflowX: "auto" }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              style={{
                padding: "10px 20px", fontSize: "14px",
                fontWeight: active === f.value ? 600 : 400,
                color: active === f.value ? "#2a7a2a" : "#888",
                background: "none", border: "none",
                borderBottom: active === f.value ? "2px solid #2a7a2a" : "2px solid transparent",
                cursor: "pointer", transition: "color 0.15s",
                whiteSpace: "nowrap", marginBottom: "-1px",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
