"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { waLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Paket", href: "#paket" },
  { label: "Aktivitas", href: "#aktivitas" },
  { label: "Galeri", href: "#gallery" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

const bookUrl = waLink("Halo SentulTrip, saya ingin tanya informasi paket wisata yang tersedia. Bisa bantu?");

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const nav = document.getElementById("main-navbar");
      if (nav && !nav.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      id="main-navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e0",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      <nav
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", flexDirection: "column", gap: "2px", textDecoration: "none" }}>
          <span style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1 }}>
            <span style={{ color: "var(--color-green-dark)" }}>sentul</span>
            <span style={{ color: "var(--color-gold)" }}>trip</span>
          </span>
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#aaa",
              fontWeight: 500,
            }}
          >
            Explore · Trekking · Offroad
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul
          className="nav-links-desktop"
          style={{ gap: "1.75rem", listStyle: "none", alignItems: "center", margin: 0, padding: 0 }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta-desktop hover-opacity"
          style={{
            alignItems: "center",
            gap: "6px",
            backgroundColor: "var(--color-green-primary)",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "13px",
            padding: "8px 18px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          <WaIcon />
          Book Sekarang
        </a>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          className="nav-hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#111111",
              transition: "all 0.25s ease",
              transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#111111",
              transition: "all 0.25s ease",
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#111111",
              transition: "all 0.25s ease",
              transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className="nav-drawer"
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e5e5e0",
          borderBottom: "1px solid #e5e5e0",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
          maxHeight: isOpen ? "400px" : "0",
          transition: "max-height 0.3s ease",
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#333333",
                padding: "12px 0",
                borderBottom: i < navLinks.length - 1 ? "1px solid #f0f0eb" : "none",
                textDecoration: "none",
                display: "block",
              }}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              marginTop: "12px",
              backgroundColor: "#2a7a2a",
              color: "#ffffff",
              width: "100%",
              padding: "13px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              textAlign: "center",
              textDecoration: "none",
              display: "block",
              boxSizing: "border-box",
            }}
          >
            Book Sekarang
          </a>
        </div>
      </div>
    </header>
  );
}

function WaIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
