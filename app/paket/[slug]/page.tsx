import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageGallery from "@/components/PackageGallery";
import { getPackageDetail, getAllSlugs } from "@/data/packageDetails";
import { waLink } from "@/lib/whatsapp";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getPackageDetail(slug);
  if (!detail) return {};
  return {
    title: `${detail.name} — SentulTrip`,
    description: detail.description[0],
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getPackageDetail(slug);
  if (!detail) notFound();

  const bookMsg = waLink(
    `Halo SentulTrip 👋\n\nSaya ingin booking paket *${detail.name}*.\n\nMohon info ketersediaan jadwal dan cara pembayarannya. Terima kasih.`
  );

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>

        {/* Breadcrumb */}
        <div style={{ backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)" }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "12px 24px", fontSize: "13px", color: "#888" }}>
            <Link href="/" style={{ color: "#888" }}>Beranda</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/#paket" style={{ color: "#888" }}>Paket</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "#111" }}>{detail.name}</span>
          </div>
        </div>

        <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Title block */}
          <div style={{ marginBottom: "28px" }}>
            <span style={{
              display: "inline-block",
              backgroundColor: "#2a7a2a", color: "#fff",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
              padding: "3px 12px", borderRadius: "20px", marginBottom: "12px",
              textTransform: "uppercase",
            }}>
              Trekking
            </span>
            <h1 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#111", lineHeight: 1.15, marginBottom: "8px" }}>
              {detail.name}
            </h1>
            <p style={{ fontSize: "15px", color: "#666", fontStyle: "italic" }}>{detail.tagline}</p>
          </div>

          {/* Gallery */}
          <div style={{ marginBottom: "48px" }}>
            <PackageGallery photos={detail.photos} orientations={detail.photoOrientations} name={detail.name} />
          </div>

          {/* 2-col layout */}
          <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "48px", alignItems: "start" }}>

            {/* LEFT — main content */}
            <div>

              {/* Description */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Tentang Paket Ini</h2>
                {detail.description.map((p, i) => (
                  <p key={i} style={{ fontSize: "15px", color: "#444", lineHeight: 1.8, marginBottom: "14px" }}>{p}</p>
                ))}
              </section>

              {/* Highlights */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Keunggulan Paket</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                  {detail.highlights.map((h, i) => (
                    <div key={i} style={{
                      backgroundColor: "#f0f7ee", border: "1px solid #c8e0c5",
                      borderRadius: "10px", padding: "20px",
                    }}>
                      <div style={{ width: "32px", height: "3px", backgroundColor: "#2a7a2a", borderRadius: "2px", marginBottom: "10px" }} />
                      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>{h.title}</h3>
                      <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65 }}>{h.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Schedule */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Jadwal Perjalanan</h2>
                <div style={{ position: "relative", paddingLeft: "24px" }}>
                  <div style={{
                    position: "absolute", left: "7px", top: "6px", bottom: "6px",
                    width: "2px", backgroundColor: "#e5e5e0",
                  }} />
                  {detail.schedule.map((s, i) => (
                    <div key={i} style={{ position: "relative", marginBottom: "18px", display: "flex", gap: "16px" }}>
                      <div style={{
                        position: "absolute", left: "-21px", top: "4px",
                        width: "10px", height: "10px", borderRadius: "50%",
                        backgroundColor: "#2a7a2a", border: "2px solid #fff",
                        boxShadow: "0 0 0 2px #2a7a2a",
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#2a7a2a", whiteSpace: "nowrap", minWidth: "44px" }}>
                        {s.time}
                      </span>
                      <span style={{ fontSize: "14px", color: "#444", lineHeight: 1.5 }}>{s.activity}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Includes / Excludes */}
              <section style={{ marginBottom: "40px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Fasilitas & Ketentuan</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="inc-grid">
                  <div style={{ backgroundColor: "#f0f7ee", border: "1px solid #c8e0c5", borderRadius: "10px", padding: "20px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1e5c1e", marginBottom: "12px" }}>✓ Sudah Termasuk</h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {detail.includes.map((item, i) => (
                        <li key={i} style={{ fontSize: "14px", color: "#333", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ color: "#2a7a2a", fontWeight: 700, flexShrink: 0 }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ backgroundColor: "#fff8f5", border: "1px solid #f0d0c0", borderRadius: "10px", padding: "20px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#9a4a20", marginBottom: "12px" }}>✗ Tidak Termasuk</h3>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {detail.excludes.map((item, i) => (
                        <li key={i} style={{ fontSize: "14px", color: "#333", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <span style={{ color: "#c0602a", fontWeight: 700, flexShrink: 0 }}>✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Tips */}
              <section>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Tips Persiapan</h2>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {detail.tips.map((tip, i) => (
                    <li key={i} style={{
                      fontSize: "14px", color: "#444", lineHeight: 1.6,
                      padding: "12px 16px", borderRadius: "8px",
                      backgroundColor: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                      display: "flex", gap: "10px", alignItems: "flex-start",
                    }}>
                      <span style={{ color: "#d4920a", fontWeight: 700, flexShrink: 0 }}>→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>

            </div>

            {/* RIGHT — sticky booking card */}
            <div style={{ position: "sticky", top: "84px" }}>
              <div style={{
                backgroundColor: "#fff", border: "1px solid #e5e5e0",
                borderRadius: "14px", padding: "28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}>
                {/* Price */}
                <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #f0f0eb" }}>
                  <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Harga mulai dari</div>
                  <div style={{ fontSize: "32px", fontWeight: 800, color: "#2a7a2a", lineHeight: 1 }}>
                    Rp 150.000
                  </div>
                  <div style={{ fontSize: "13px", color: "#aaa" }}>per orang</div>
                </div>

                {/* Info rows */}
                {[
                  { label: "Durasi", value: detail.schedule[detail.schedule.length - 1].time + " selesai" },
                  { label: "Kapasitas", value: detail.capacity },
                  { label: "Kesulitan", value: detail.difficulty },
                  { label: "Min. Usia", value: detail.minAge },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "10px 0", borderBottom: "1px solid #f0f0eb",
                    fontSize: "14px",
                  }}>
                    <span style={{ color: "#888" }}>{label}</span>
                    <span style={{ color: "#111", fontWeight: 600 }}>{value}</span>
                  </div>
                ))}

                {/* Meeting point */}
                <div style={{ padding: "12px 0", borderBottom: "1px solid #f0f0eb" }}>
                  <div style={{ fontSize: "13px", color: "#888", marginBottom: "4px" }}>Meeting Point</div>
                  <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.5 }}>{detail.meetingPoint}</div>
                </div>

                {/* CTA */}
                <a
                  href={bookMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-book-btn"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", marginTop: "20px", padding: "14px",
                    backgroundColor: "#2a7a2a", color: "#fff",
                    borderRadius: "8px", fontWeight: 700, fontSize: "15px",
                    textDecoration: "none", boxSizing: "border-box",
                    transition: "background-color 0.15s",
                  }}
                >
                  <WaIcon />
                  Book via WhatsApp
                </a>
                <p style={{ fontSize: "12px", color: "#aaa", textAlign: "center", marginTop: "10px" }}>
                  Respon dalam &lt; 1 jam · Tidak ada biaya booking
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .detail-book-btn:hover { background-color: #1e5c1e !important; }
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .inc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
