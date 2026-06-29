"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function PackageGallery({
  photos,
  name,
}: {
  photos: string[];
  name: string;
}) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="package-gallery" style={{ position: "relative", width: "100%", userSelect: "none" }}>
      {/* Main display */}
      <div
        className="package-gallery-main"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#111",
        }}
      >
        <div className="gallery-photo-frame">
          <Image
            src={photos[current]}
            alt={`${name} foto`}
            fill
            style={{ objectFit: "cover", pointerEvents: "none" }}
            sizes="(max-width: 768px) 100vw, 1080px"
            priority
            loading="eager"
          />
        </div>

        {/* Gradient overlay bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
          pointerEvents: "none",
        }} />

        {/* Slide counter */}
        <div style={{
          position: "absolute", bottom: "16px", left: "20px",
          color: "#fff", fontSize: "13px", fontWeight: 600,
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          zIndex: 3,
        }}>
          {current + 1} / {photos.length}
        </div>

        {/* Prev button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Foto sebelumnya"
            style={{
              position: "absolute", left: "12px", top: "50%",
              transform: "translateY(-50%)",
              width: "40px", height: "40px", borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 5, pointerEvents: "auto",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Foto berikutnya"
            style={{
              position: "absolute", right: "12px", top: "50%",
              transform: "translateY(-50%)",
              width: "40px", height: "40px", borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 5, pointerEvents: "auto",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div style={{
          display: "flex", justifyContent: "center", gap: "6px",
          marginTop: "12px",
        }}>
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? "20px" : "7px",
                height: "7px",
                borderRadius: "4px",
                backgroundColor: i === current ? "#2a7a2a" : "#d0d0c8",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.2s, background-color 0.2s",
              }}
            />
          ))}
        </div>
      )}

      <p className="gallery-hint">Geser foto untuk melihat suasana jalur dan curug.</p>

      {/* Thumbnail strip */}
      <div className="gallery-thumbnails" style={{
        display: "flex", gap: "6px", marginTop: "10px",
        overflowX: "auto", paddingBottom: "4px",
      }}>
        {photos.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            style={{
              flexShrink: 0, position: "relative",
              width: "72px", height: "52px",
              borderRadius: "6px", overflow: "hidden",
              border: i === current ? "2px solid #2a7a2a" : "2px solid transparent",
              cursor: "pointer", padding: 0, background: "#f0efe9",
              transition: "border-color 0.15s",
            }}
            aria-label={`Pilih foto ${i + 1}`}
          >
            <Image src={src} alt="" fill style={{ objectFit: "cover", pointerEvents: "none" }} sizes="72px" />
          </button>
        ))}
      </div>

      <style>{`
        .gallery-photo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
        }
        .gallery-hint { margin-top: 10px; text-align: center; color: #777; font-size: 14px; }
        @media (max-width: 640px) {
          .gallery-photo-frame { aspect-ratio: 3/4; }
          .package-gallery-main { border-radius: 14px !important; }
          .gallery-thumbnails { display: none !important; }
          .gallery-hint { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
