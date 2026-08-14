"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import packages, { Package, PackageType } from "@/data/packages";

const filters: { label: string; value: "all" | PackageType; icon?: string }[] = [
  { label: "Semua Paket", value: "all" },
  { label: "Trekking Curug", value: "trekking" },
  { label: "Offroad Jeep", value: "offroad" },
  { label: "Corporate & Outing", value: "corporate" },
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
    cardBg: "#ffffff", cardBorder: "#c8e0c5", imgBg: "#daefd6", imgTextColor: "#2a7a2a",
    badgeBg: "#2a7a2a", badgeText: "#ffffff", badgeLabel: "Trekking",
    priceColor: "#1e5c1e", btnBg: "#2a7a2a", btnHoverBg: "#1e5c1e", placeholderText: "Curug & Trekking",
  },
  offroad: {
    cardBg: "#ffffff", cardBorder: "#e8d5a0", imgBg: "#faefd0", imgTextColor: "#92680a",
    badgeBg: "#d4920a", badgeText: "#ffffff", badgeLabel: "Offroad",
    priceColor: "#92680a", btnBg: "#d4920a", btnHoverBg: "#b87d08", placeholderText: "Offroad Jeep",
  },
  corporate: {
    cardBg: "#ffffff", cardBorder: "#c0d0e8", imgBg: "#d8e5f5", imgTextColor: "#2c5282",
    badgeBg: "#2c5282", badgeText: "#ffffff", badgeLabel: "Korporat",
    priceColor: "#2c5282", btnBg: "#2c5282", btnHoverBg: "#1e3a5f", placeholderText: "Corporate Outing",
  },
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
}

export function PackageCard({ pkg }: { pkg: Package }) {
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
      className="package-card-item"
      style={{
        backgroundColor: "#ffffff",
        border: `1px solid var(--color-border)`,
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
      }}
    >
      {/* Image / Carousel area */}
      <div
        style={{
          position: "relative",
          height: "170px",
          backgroundColor: t.imgBg,
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
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
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
                    width: "26px", height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", zIndex: 2,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Foto berikutnya"
                  style={{
                    position: "absolute", right: "8px", top: "50%",
                    transform: "translateY(-50%)",
                    width: "26px", height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", zIndex: 2,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Dot indicators */}
                <div
                  style={{
                    position: "absolute", bottom: "8px", left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex", gap: "4px", zIndex: 2,
                  }}
                >
                  {pkg.images!.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIdx(i); }}
                      aria-label={`Foto ${i + 1}`}
                      style={{
                        width: i === imgIdx ? "16px" : "5px",
                        height: "5px",
                        borderRadius: "3px",
                        backgroundColor: i === imgIdx ? "#ffffff" : "rgba(255,255,255,0.6)",
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
            position: "absolute", top: "10px", left: "10px",
            backgroundColor: t.badgeBg, color: t.badgeText,
            fontSize: "11px", fontWeight: 700,
            padding: "3px 9px", borderRadius: "6px",
            letterSpacing: "0.02em", zIndex: 3,
          }}
        >
          {t.badgeLabel}
        </span>

        {/* POPULER badge */}
        {pkg.badge && (
          <span
            style={{
              position: "absolute", top: "10px", right: "10px",
              backgroundColor: "var(--color-gold)", color: "#ffffff",
              fontSize: "10px", fontWeight: 800,
              padding: "3px 9px", borderRadius: "6px",
              letterSpacing: "0.04em", textTransform: "uppercase", zIndex: 3,
            }}
          >
            {pkg.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 750, color: "#111827", lineHeight: 1.35 }}>
          {pkg.name}
        </h3>
        <div style={{ fontSize: "12.5px", color: "#6b7280", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>⏱ {pkg.duration}</span>
          <span>·</span>
          <span>⭐ {pkg.rating}</span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: "auto", paddingTop: "12px",
            borderTop: `1px solid var(--color-border)`,
          }}
        >
          <div>
            {pkg.marketPrice && (
              <div style={{ fontSize: "11px", color: "#9ca3af", textDecoration: "line-through", fontWeight: 600 }}>
                {formatRupiah(pkg.marketPrice)}
              </div>
            )}
            <div style={{ fontSize: "17px", fontWeight: 800, color: t.priceColor, lineHeight: 1.15 }}>
              {formatRupiah(pkg.price)}
            </div>
            <div style={{ fontSize: "10.5px", color: "#888" }}>/{pkg.priceUnit}</div>
          </div>
          <Link
            href={`/paket/${pkg.slug}`}
            style={{
              backgroundColor: t.btnBg, color: "#ffffff",
              fontSize: "12.5px", fontWeight: 700,
              padding: "8px 16px", borderRadius: "8px",
              whiteSpace: "nowrap", transition: "background-color 0.15s, transform 0.15s",
              textDecoration: "none",
            }}
          >
            Detail Paket
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PackagesSection() {
  const [active, setActive] = useState<"all" | PackageType>("all");
  const filtered = active === "all" ? packages : packages.filter((p) => p.type === active);

  return (
    <section id="paket" style={{ backgroundColor: "#ffffff", padding: "40px 0" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "16px", flexWrap: "wrap", marginBottom: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px",
                textTransform: "uppercase", color: "var(--color-green-primary)", marginBottom: "4px",
              }}
            >
              Pilihan Wisata
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", letterSpacing: "-0.4px" }}>
              Paket Wisata Sentul Populer
            </h2>
          </div>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            {filtered.length} paket siap dipesan
          </span>
        </div>

        {/* Filter pills */}
        <div
          style={{
            display: "flex", gap: "8px", marginBottom: "24px",
            overflowX: "auto", paddingBottom: "4px",
          }}
        >
          {filters.map((f) => {
            const isSelected = active === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                style={{
                  padding: "7px 16px", fontSize: "13px",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#ffffff" : "#374151",
                  backgroundColor: isSelected ? "var(--color-green-primary)" : "#f3f4f6",
                  border: isSelected ? "1px solid var(--color-green-primary)" : "1px solid #e5e7eb",
                  borderRadius: "99px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Package Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "18px",
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
