"use client";

import React, { useState } from "react";
import Image from "next/image";
import { waLink } from "@/lib/whatsapp";

export interface FoodPackage {
  id: string;
  name: string;
  weight: string;
  price: number;
  priceLabel: string;
  portions: string;
  image: string;
  badge: string;
  badgeColor: string;
  isPopular?: boolean;
  isExclusive?: boolean;
  description: string;
  features: string[];
  waMessage: string;
}

export default function KambingGulingPackages({
  packages,
}: {
  packages: FoodPackage[];
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  return (
    <>
      <div className="kg-cards-grid">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`kg-package-card ${pkg.isPopular ? "popular" : ""} ${pkg.isExclusive ? "exclusive" : ""}`}
          >
            {/* Top Tag Badge */}
            <div className="kg-card-top-tag" style={{ backgroundColor: pkg.badgeColor }}>
              {pkg.badge}
            </div>

            {/* Poster Image Wrap (100% Full & Uncropped) */}
            <div
              className="kg-card-img-wrap"
              onClick={() => {
                setSelectedPhoto(pkg.image);
                setSelectedTitle(pkg.name);
              }}
              role="button"
              tabIndex={0}
              aria-label={`Buka brosur ${pkg.name}`}
            >
              <Image
                src={pkg.image}
                alt={`Brosur ${pkg.name} Kambing Guling Sentul`}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 640px) 100vw, 360px"
                priority
              />
              <span className="kg-weight-badge">{pkg.weight}</span>
              <span className="kg-zoom-hint">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Perbesar Brosur
              </span>
            </div>

            {/* Content Body */}
            <div className="kg-card-body">
              <h3 className="kg-card-title">{pkg.name}</h3>
              <p className="kg-card-desc">{pkg.description}</p>

              <div className="kg-card-price-box">
                <span className="kg-card-price">{pkg.priceLabel}</span>
                <span className="kg-card-porsi">Porsi {pkg.portions}</span>
              </div>

              {/* Features checklist */}
              <div className="kg-card-features">
                <strong className="kg-features-label">Fasilitas Termasuk:</strong>
                <ul>
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Button */}
              <a
                href={waLink(pkg.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="kg-order-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Pesan {pkg.name}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Full Brochure Inspection */}
      {selectedPhoto && (
        <div className="kg-modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="kg-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="kg-modal-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Tutup brosur"
            >
              ✕
            </button>
            <div className="kg-modal-header">
              <h3>Brosur {selectedTitle}</h3>
              <p>Foto asli produk &amp; paket kambing guling Saung Citra Sentul</p>
            </div>
            <div className="kg-modal-img-wrap">
              <Image
                src={selectedPhoto}
                alt={selectedTitle}
                fill
                style={{ objectFit: "contain" }}
                sizes="90vw"
                priority
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .kg-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        .kg-package-card {
          position: relative;
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .kg-package-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.09);
        }
        .kg-package-card.popular {
          border-color: #f59e0b;
        }
        .kg-package-card.exclusive {
          border-color: #8b5cf6;
        }
        .kg-card-top-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          color: #ffffff;
          font-size: 10.5px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          z-index: 3;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        }
        /* ── Image Poster Wrap: Exact 4:5 ratio so zero cropping occurs! ── */
        .kg-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          background: #2b1704;
          cursor: pointer;
          overflow: hidden;
        }
        .kg-card-img-wrap :global(img) {
          transition: transform 0.3s ease;
        }
        .kg-card-img-wrap:hover :global(img) {
          transform: scale(1.02);
        }
        .kg-weight-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 750;
          padding: 3px 9px;
          border-radius: 6px;
          z-index: 2;
        }
        .kg-zoom-hint {
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 10.5px;
          font-weight: 650;
          padding: 4px 8px;
          border-radius: 6px;
          z-index: 2;
        }
        .kg-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 12px;
        }
        .kg-card-title {
          font-size: 18px;
          font-weight: 850;
          color: #111827;
          margin: 0;
        }
        .kg-card-desc {
          font-size: 13px;
          line-height: 1.55;
          color: #4b5563;
          margin: 0;
        }
        .kg-card-price-box {
          background: #fefce8;
          border: 1px solid #fef08a;
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .kg-card-price {
          font-size: 20px;
          font-weight: 850;
          color: #854d0e;
        }
        .kg-card-porsi {
          font-size: 12px;
          color: #713f12;
          font-weight: 600;
        }
        .kg-card-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
          flex: 1;
        }
        .kg-features-label {
          font-size: 12px;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .kg-card-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .kg-card-features li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12.5px;
          line-height: 1.45;
          color: #4b5563;
        }
        .kg-card-features svg {
          color: #16a34a;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .kg-order-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: var(--color-green-primary);
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 750;
          padding: 11px;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.15s;
          margin-top: 12px;
        }
        .kg-order-btn:hover {
          background-color: var(--color-green-dark);
        }

        /* ── Modal Lightbox ── */
        .kg-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 20, 0.92);
          backdrop-filter: blur(8px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .kg-modal-content {
          position: relative;
          width: 100%;
          max-width: 680px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .kg-modal-close {
          position: absolute;
          top: -10px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          z-index: 10;
        }
        .kg-modal-header h3 {
          color: #ffffff;
          font-size: 16px;
          margin: 0;
        }
        .kg-modal-header p {
          color: #9ca3af;
          font-size: 12.5px;
          margin: 2px 0 0;
        }
        .kg-modal-img-wrap {
          position: relative;
          flex: 1;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #000000;
        }

        @media (max-width: 920px) {
          .kg-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
