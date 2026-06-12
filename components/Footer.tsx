import Link from "next/link";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#111111",
        borderTop: "none",
        padding: "56px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "48px",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "22px", fontWeight: 700 }}>
              <span style={{ color: "var(--color-green-primary)" }}>sentul</span>
              <span style={{ color: "var(--color-gold)" }}>trip</span>
            </span>
          </div>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "16px",
            }}
          >
            Explore · Trekking · Offroad
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              maxWidth: "240px",
            }}
          >
            Jasa wisata adventure di Sentul, Bogor. Dipandu guide lokal dengan pengalaman lebih dari 10 tahun.
          </p>
          {/* Social */}
          <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
            {["Instagram", "TikTok", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="hover-social"
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "4px 10px",
                  borderRadius: "5px",
                }}
              >
                {s}
              </a>
            ))}
            <a
              href={waLink("Halo SentulTrip, saya ingin informasi lebih lanjut tentang paket wisata Sentul.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-social"
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "4px 10px",
                borderRadius: "5px",
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Paket */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "16px",
            }}
          >
            Paket
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Trekking Curug", "Offroad Jeep", "Corporate Outing", "Live-in Desa", "Sekolah & Kampus"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#paket"
                    className="hover-text-primary"
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "16px",
            }}
          >
            Info
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Tentang Kami", href: "#tentang" },
              { label: "Galeri", href: "#gallery" },
              { label: "Testimoni", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Kontak", href: "#kontak" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover-text-primary"
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          &copy; {year} SentulTrip. All rights reserved.
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          Sentul, Bogor, Jawa Barat
        </p>
      </div>
    </footer>
  );
}
