"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function PackageGallery({
  photos,
  name,
}: {
  photos: string[];
  name: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  const openLightbox = (index: number) => {
    setCurrent(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, photos.length]);

  // Mobile swipe handler
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const mainPhoto = photos[0] || "/og-image.png";
  const photo2 = photos[1] || mainPhoto;
  const photo3 = photos[2] || photos[0] || mainPhoto;

  return (
    <div className="pkg-gallery-container">
      {/* ── Desktop Mosaic Grid (3-Grid Showcase) ── */}
      <div className="pkg-gallery-desktop">
        {/* Main large photo */}
        <div
          className="pkg-mosaic-main"
          onClick={() => openLightbox(0)}
          role="button"
          tabIndex={0}
          aria-label={`Buka foto utama ${name}`}
        >
          <Image
            src={mainPhoto}
            alt={`${name} - Foto 1`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1140px) 60vw, 680px"
            priority
            quality={85}
          />
          <div className="pkg-img-overlay" />
        </div>

        {/* 2 stacked secondary photos */}
        <div className="pkg-mosaic-side">
          <div
            className="pkg-mosaic-sub"
            onClick={() => openLightbox(1)}
            role="button"
            tabIndex={0}
            aria-label={`Buka foto 2 ${name}`}
          >
            <Image
              src={photo2}
              alt={`${name} - Foto 2`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1140px) 40vw, 440px"
              quality={85}
            />
            <div className="pkg-img-overlay" />
          </div>

          <div
            className="pkg-mosaic-sub"
            onClick={() => openLightbox(photos.length > 2 ? 2 : 0)}
            role="button"
            tabIndex={0}
            aria-label={`Buka foto 3 ${name}`}
          >
            <Image
              src={photo3}
              alt={`${name} - Foto 3`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1140px) 40vw, 440px"
              quality={85}
            />
            <div className="pkg-img-overlay" />

            {/* View All Photos Badge Button */}
            <button
              type="button"
              className="pkg-view-all-btn"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(0);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Lihat Semua ({photos.length} Foto)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Swipeable Carousel ── */}
      <div
        className="pkg-gallery-mobile"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="pkg-mobile-frame" onClick={() => openLightbox(current)}>
          <Image
            src={photos[current] || mainPhoto}
            alt={`${name} - Foto ${current + 1}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority={current === 0}
            quality={85}
          />
          <div className="pkg-img-overlay" />

          {/* Photo count indicator */}
          <div className="pkg-mobile-counter">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>{current + 1} / {photos.length}</span>
          </div>

          {/* Prev / Next mobile arrows */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="pkg-mobile-nav prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Foto sebelumnya"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="pkg-mobile-nav next"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Foto berikutnya"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dot indicators for mobile */}
        {photos.length > 1 && (
          <div className="pkg-mobile-dots">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`pkg-dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Small Hint Below Gallery */}
      <div className="pkg-gallery-hint">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        <span>Klik foto untuk melihat ukuran penuh</span>
      </div>

      {/* ── Interactive Fullscreen Lightbox Modal ── */}
      {isLightboxOpen && (
        <div className="pkg-lightbox-modal" onClick={closeLightbox}>
          <div className="pkg-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              type="button"
              className="pkg-lightbox-close"
              onClick={closeLightbox}
              aria-label="Tutup foto"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Photo Title & Counter */}
            <div className="pkg-lightbox-header">
              <h3>{name}</h3>
              <span>{current + 1} dari {photos.length} Foto</span>
            </div>

            {/* Main Lightbox Photo (contain mode: absolutely no crop!) */}
            <div className="pkg-lightbox-viewport">
              <Image
                src={photos[current]}
                alt={`${name} - Foto ${current + 1}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
                quality={85}
                priority
              />

              {/* Prev / Next lightbox arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="pkg-lightbox-arrow prev"
                    onClick={prev}
                    aria-label="Foto sebelumnya"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="pkg-lightbox-arrow next"
                    onClick={next}
                    aria-label="Foto berikutnya"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail selector inside lightbox */}
            <div className="pkg-lightbox-thumbs">
              {photos.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pkg-lightbox-thumb-btn ${i === current ? "active" : ""}`}
                  onClick={() => setCurrent(i)}
                >
                  <Image src={src} alt="" fill style={{ objectFit: "cover" }} sizes="64px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pkg-gallery-container {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
        }

        .pkg-gallery-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
          margin-top: 8px;
          padding-left: 2px;
          user-select: none;
        }

        .pkg-gallery-hint svg {
          color: var(--color-green-primary);
          flex-shrink: 0;
        }

        /* ── Desktop Bento / Mosaic ── */
        .pkg-gallery-desktop {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 12px;
          height: 380px;
          border-radius: 18px;
          overflow: hidden;
        }

        .pkg-mosaic-main {
          position: relative;
          height: 100%;
          background-color: #f3f4f6;
          cursor: pointer;
          overflow: hidden;
        }

        .pkg-mosaic-main :global(img) {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pkg-mosaic-main:hover :global(img) {
          transform: scale(1.03);
        }

        .pkg-mosaic-side {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          height: 100%;
        }

        .pkg-mosaic-sub {
          position: relative;
          height: 100%;
          background-color: #f3f4f6;
          cursor: pointer;
          overflow: hidden;
        }

        .pkg-mosaic-sub :global(img) {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pkg-mosaic-sub:hover :global(img) {
          transform: scale(1.04);
        }

        .pkg-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, transparent 40%);
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .pkg-view-all-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          color: #111827;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 12.5px;
          font-weight: 750;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: background 0.15s, transform 0.15s;
          z-index: 4;
        }

        .pkg-view-all-btn:hover {
          background: #ffffff;
          transform: translateY(-1px);
        }

        /* ── Mobile Layout ── */
        .pkg-gallery-mobile {
          display: none;
        }

        .pkg-mobile-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          overflow: hidden;
          background-color: #f3f4f6;
        }

        .pkg-mobile-counter {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(17, 24, 39, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
          z-index: 3;
        }

        .pkg-mobile-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          border: none;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 4;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .pkg-mobile-nav.prev {
          left: 10px;
        }

        .pkg-mobile-nav.next {
          right: 10px;
        }

        .pkg-mobile-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
        }

        .pkg-dot {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background: #d1d5db;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pkg-dot.active {
          width: 18px;
          background: var(--color-green-primary);
        }

        /* ── Lightbox Modal ── */
        .pkg-lightbox-modal {
          position: fixed;
          inset: 0;
          background: rgba(10, 15, 20, 0.94);
          backdrop-filter: blur(12px);
          z-index: 100000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .pkg-lightbox-content {
          position: relative;
          width: 100%;
          max-width: 1000px;
          height: 88vh;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pkg-lightbox-close {
          position: absolute;
          top: -10px;
          right: 0;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10;
        }

        .pkg-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .pkg-lightbox-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ffffff;
          padding-right: 50px;
        }

        .pkg-lightbox-header h3 {
          font-size: 17px;
          font-weight: 750;
          margin: 0;
        }

        .pkg-lightbox-header span {
          font-size: 13px;
          color: #9ca3af;
        }

        .pkg-lightbox-viewport {
          position: relative;
          flex: 1;
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: #000000;
        }

        .pkg-lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          z-index: 5;
        }

        .pkg-lightbox-arrow:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .pkg-lightbox-arrow.prev {
          left: 16px;
        }

        .pkg-lightbox-arrow.next {
          right: 16px;
        }

        .pkg-lightbox-thumbs {
          display: flex;
          justify-content: center;
          gap: 8px;
          overflow-x: auto;
          padding: 6px 0;
        }

        .pkg-lightbox-thumb-btn {
          position: relative;
          width: 64px;
          height: 46px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          background: #374151;
          opacity: 0.55;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .pkg-lightbox-thumb-btn.active {
          border-color: #22c55e;
          opacity: 1;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .pkg-gallery-desktop {
            display: none;
          }
          .pkg-gallery-mobile {
            display: block;
          }
          .pkg-lightbox-content {
            height: 80vh;
          }
          .pkg-lightbox-arrow {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
