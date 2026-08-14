const trustPillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Guide Asli Sentul & Berlisensi",
    desc: "Lahir & besar di Sentul. Sangat menguasai kondisi medan curug, debit air, dan jalur teraman.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "Harga Pasti Tanpa Biaya Tersembunyi",
    desc: "Tiket masuk, parkir, dan perizinan lokal sudah termasuk. Tidak ada pungutan liar di rute.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Standar Keselamatan & Asuransi",
    desc: "Setiap trip dilengkapi briefing keselamatan, perlengkapan P3K, dan jaminan asuransi peserta.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "Gratis Dokumentasi Foto HD",
    desc: "Guide membantu mengabadikan momen terbaik di setiap spot foto ikonik selama perjalanan.",
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="tentang"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        padding: "44px 0",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "var(--color-green-primary)",
              marginBottom: "4px",
            }}
          >
            Standar SentulTrip
          </p>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.4px",
            }}
          >
            Kenapa 1.200+ Wisatawan Memilih Kami?
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {trustPillars.map((p) => (
            <div
              key={p.title}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                padding: "20px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#f0fdf4",
                  color: "#166534",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "4px",
                }}
              >
                {p.icon}
              </div>
              <h3 style={{ fontSize: "14.5px", fontWeight: 750, color: "#111827", lineHeight: 1.3 }}>
                {p.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
