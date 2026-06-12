import { waLink } from "@/lib/whatsapp";

const activities = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l4-8 4 4 3-6 4 10" />
        <path d="M2 20h20" />
      </svg>
    ),
    name: "Trekking Curug",
    desc: "Jelajahi curug tersembunyi di Sentul Bogor bersama guide berpengalaman. Rute tersedia untuk pemula hingga peserta berpengalaman.",
    link: waLink("Halo SentulTrip, saya ingin tanya paket trekking curug di Sentul. Ada jadwal tersedia minggu ini?"),
    external: true,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="10" width="22" height="8" rx="2" />
        <path d="M5 10V8a2 2 0 012-2h10a2 2 0 012 2v2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
    name: "Offroad Jeep",
    desc: "Paket offroad jeep Sentul melewati jalur tanah merah dan sungai berbatu di sekitar Babakan Madang, Bogor.",
    link: waLink("Halo SentulTrip, saya tertarik paket offroad jeep di Sentul. Untuk berapa orang per jeep dan harganya?"),
    external: true,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    name: "Corporate & Outbound",
    desc: "Paket outbound dan team building di Sentul untuk perusahaan, sekolah, dan komunitas. Kapasitas grup besar tersedia.",
    link: waLink("Halo SentulTrip, kami dari [nama perusahaan] ingin tanya paket corporate outing atau outbound di Sentul untuk sekitar [jumlah] peserta."),
    external: true,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    name: "Live-in Desa",
    desc: "Menginap di desa wisata Sentul selama 2 hari 1 malam. Cocok untuk edukasi, retreat, dan liburan keluarga.",
    link: waLink("Halo SentulTrip, saya ingin informasi paket live-in desa di Sentul — durasi, fasilitas, dan harga per orangnya."),
    external: true,
  },
];

export default function ActivitiesSection() {
  return (
    <section
      id="aktivitas"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        padding: "72px 0",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        {/* Label */}
        <p
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--color-green-primary)",
            marginBottom: "12px",
          }}
        >
          Aktivitas
        </p>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "8px",
          }}
        >
          Aktivitas yang Kami Tawarkan
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#888888",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          Setiap aktivitas dipandu oleh warga asli Sentul dengan pengalaman lapangan lebih dari satu dekade.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {activities.map((act) => (
            <div
              key={act.name}
              className="hover-lift"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ color: "var(--color-green-primary)" }}>{act.icon}</div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111111" }}>{act.name}</h3>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.65, flex: 1 }}>{act.desc}</p>
              <a
                href={act.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-activity-link"
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--color-green-primary)",
                }}
              >
                Tanya via WhatsApp &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
