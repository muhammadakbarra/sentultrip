"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type Orientation = "portrait" | "landscape";

// Group photos into slides: consecutive portraits → pair, landscape → single
function buildSlides(photos: string[], orientations: Orientation[]): string[][] {
  const slides: string[][] = [];
  let i = 0;
  while (i < photos.length) {
    if (orientations[i] === "portrait" && i + 1 < photos.length && orientations[i + 1] === "portrait") {
      slides.push([photos[i], photos[i + 1]]);
      i += 2;
    } else {
      slides.push([photos[i]]);
      i += 1;
    }
  }
  return slides;
}

export default function PackageGallery({
  photos,
  orientations,
  name,
}: {
  photos: string[];
  orientations: Orientation[];
  name: string;
}) {
  const slides = buildSlides(photos, orientations);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slide = slides[current];
  const isPair = slide.length === 2;

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
        {isPair ? (
          /* Two portrait photos side by side */
          <div className="gallery-pair-slide" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", aspectRatio: "3/2" }}>
            {slide.map((src) => (
              <div key={src} style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src={src}
                  alt={name}
                  fill
                  style={{ objectFit: "cover", pointerEvents: "none" }}
                  sizes="(max-width: 768px) 50vw, 540px"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Single landscape / square photo */
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            <Image
              src={slide[0]}
              alt={`${name} foto`}
              fill
              style={{ objectFit: "cover", pointerEvents: "none" }}
              sizes="(max-width: 768px) 100vw, 1080px"
              priority={current === 0}
            />
          </div>
        )}

        {/* Gradient overlay bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
          pointerEvents: "none",
        }} />

        {/* Slide counter (bottom-left) */}
        <div style={{
          position: "absolute", bottom: "16px", left: "20px",
          color: "#fff", fontSize: "13px", fontWeight: 600,
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          zIndex: 3,
        }}>
          {current + 1} / {slides.length}
        </div>

        {/* Prev button */}
        {slides.length > 1 && (
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
        {slides.length > 1 && (
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
      {slides.length > 1 && (
        <div style={{
          display: "flex", justifyContent: "center", gap: "6px",
          marginTop: "12px",
        }}>
          {slides.map((_, i) => (
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
                position: "relative", zIndex: 4,
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
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            style={{
              flexShrink: 0, position: "relative",
              width: s.length === 2 ? "100px" : "72px",
              height: "52px",
              borderRadius: "6px", overflow: "hidden",
              border: i === current ? "2px solid #2a7a2a" : "2px solid transparent",
              cursor: "pointer", padding: 0, background: "#f0efe9",
              transition: "border-color 0.15s",
              zIndex: 4,
            }}
            aria-label={`Pilih slide ${i + 1}`}
          >
            {s.length === 2 ? (
              <div style={{ display: "flex", height: "100%" }}>
                {s.map((src) => (
                  <div key={src} style={{ position: "relative", flex: 1 }}>
                    <Image src={src} alt="" fill style={{ objectFit: "cover", pointerEvents: "none" }} sizes="50px" />
                  </div>
                ))}
              </div>
            ) : (
              <Image src={s[0]} alt="" fill style={{ objectFit: "cover", pointerEvents: "none" }} sizes="72px" />
            )}
          </button>
        ))}
      </div>

      <style>{`
        .gallery-hint { margin-top: 10px; text-align: center; color: #777; font-size: 14px; }
        @media (max-width: 640px) {
          .package-gallery-main { border-radius: 14px !important; }
          .gallery-pair-slide { aspect-ratio: 4 / 3 !important; }
          .gallery-thumbnails { display: none !important; }
          .gallery-hint { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
