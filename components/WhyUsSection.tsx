const cards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Guide berlisensi",
    desc: "Setiap guide memegang sertifikat pemandu wisata alam dan pertolongan pertama. Peralatan keselamatan dan asuransi perjalanan sudah termasuk dalam paket.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Warga asli Sentul",
    desc: "Kami lahir dan besar di sini. Kami tahu jalur mana yang banjir di musim hujan, spot mana yang masih sepi, dan warung mana yang masakannya paling enak.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "Harga tetap, tanpa kejutan",
    desc: "Harga yang tercantum adalah harga yang dibayar. Tidak ada biaya tambahan di lapangan, tidak ada upgrade berbayar yang dipaksakan.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: "Program bisa dikustomisasi",
    desc: "Durasi, tingkat kesulitan, jumlah peserta, dan menu makan siang — semuanya bisa disesuaikan. Kami pernah menangani grup 3 orang hingga 200 orang.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Respon dalam 1 jam",
    desc: "Pertanyaan via WhatsApp biasanya kami jawab dalam satu jam, termasuk akhir pekan. Tidak ada formulir pendaftaran yang panjang.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    title: "Dokumentasi di setiap perjalanan",
    desc: "Guide kami paham sudut dan waktu terbaik untuk memotret. Pulang dengan foto yang layak disimpan, bukan sekadar bukti kehadiran.",
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="tentang"
      style={{
        backgroundColor: "var(--color-bg-tertiary)",
        padding: "72px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "64px",
          alignItems: "start",
        }}
        className="whyus-grid"
      >
        {/* Left — text */}
        <div style={{ paddingTop: "4px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-green-primary)",
              marginBottom: "16px",
            }}
          >
            Mengapa SentulTrip
          </p>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111111",
              lineHeight: 1.25,
              marginBottom: "20px",
            }}
          >
            Kenapa ribuan wisatawan memilih kami?
          </h2>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#444444",
            }}
          >
            Kami bukan agen perjalanan dari luar. Kami lahir dan besar di Sentul
            — dan itu bedanya.
          </p>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#666666",
              marginTop: "12px",
            }}
          >
            Pengetahuan medan yang kami miliki tidak bisa dibeli dari buku
            panduan. Setiap curug, setiap jalur, setiap musim — kami sudah
            melewatinya ratusan kali.
          </p>
        </div>

        {/* Right — Desktop: 2x3 card grid */}
        <div className="whyus-cards">
          {cards.map((c) => (
            <div
              key={c.title}
              className="card-hover"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid #2a7a2a",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <div style={{ color: "var(--color-green-primary)", marginBottom: "10px" }}>
                {c.icon}
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111111", marginBottom: "6px" }}>
                {c.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#666666", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: compact checklist */}
        <div className="whyus-list">
          {cards.map((c) => (
            <div key={c.title} className="whyus-list-item">
              <span style={{ color: "var(--color-green-primary)", display: "flex", flexShrink: 0 }}>{c.icon}</span>
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#111111" }}>{c.title}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .whyus-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .whyus-list { display: none; }

        @media (max-width: 768px) {
          .whyus-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .whyus-cards { display: none; }
          .whyus-list {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .whyus-list-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 0;
            border-bottom: 1px solid var(--color-border);
          }
          .whyus-list-item:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
