const testimonials = [
  {
    name: "Muhamad Burdah",
    trip: "Verified Google Review",
    initials: "MB",
    text: "Trekking bareng SentulTrip benar-benar seru dan berkesan. Rutenya enak, pemandangannya cakep banget. Guide-nya sabar, informatif, dan selalu memperhatikan keselamatan peserta.",
  },
  {
    name: "Citranick",
    trip: "Trekking Curug Cibingbin",
    initials: "CI",
    text: "Tur guidenya, Aa Apis keren banget. Sangat membantu, bisa jadi fotografer juga dan baik banget. Servis turnya juga bagus, harga terjangkau dan sudah disediakan jas hujan dan air minum.",
  },
  {
    name: "Tata",
    trip: "Corporate Outing 40 Orang",
    initials: "TA",
    text: "Kami pakai untuk team building 40 orang. Trekkingnya menantang, tapi guide tahu persis kapan harus istirahat dan lanjut. Semua peserta selesai dengan senang dan tanpa keluhan.",
  },
  {
    name: "Indah",
    trip: "Family Trip (Anak 9 Th)",
    initials: "IN",
    text: "Membawa anak usia 9 tahun dan guide sudah hafal rute mana yang paling aman untuk anak. Sepanjang jalan anak saya enjoy banget dan tidak kecapekan.",
  },
  {
    name: "Wildan Sakher",
    trip: "Verified Google Review",
    initials: "WS",
    text: "Alhamdulillah berkat SentulTrip bisa wisata sambil olahraga. Poin pentingnya pelayanannya beneran memuaskan, guide gokil, harga paling jujur dan terjangkau.",
  },
  {
    name: "Ade Suryana",
    trip: "Trekking Leuwi Hejo",
    initials: "AS",
    text: "Guide sangat profesional dan tahu titik-titik spot foto terbagus dan waktu istirahat yang pas. Pengalaman trekking di Sentul jadi terasa terencana dan aman.",
  },
];

const cardThemes = [
  { bg: "#f0fdf4", border: "#bbf7d0", avatarBg: "#166534", avatarColor: "#ffffff" },
  { bg: "#fefce8", border: "#fef08a", avatarBg: "#ca8a04", avatarColor: "#ffffff" },
  { bg: "#eff6ff", border: "#bfdbfe", avatarBg: "#1d4ed8", avatarColor: "#ffffff" },
  { bg: "#f0fdf4", border: "#bbf7d0", avatarBg: "#15803d", avatarColor: "#ffffff" },
  { bg: "#faf5ff", border: "#e9d5ff", avatarBg: "#7e22ce", avatarColor: "#ffffff" },
  { bg: "#fff7ed", border: "#fed7aa", avatarBg: "#c2410c", avatarColor: "#ffffff" },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      style={{
        backgroundColor: "#ffffff",
        padding: "44px 0",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header with Google Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          <div>
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
              Testimoni Wisatawan
            </p>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#111827",
                letterSpacing: "-0.4px",
              }}
            >
              Ulasan Asli Pengalaman Wisatawan
            </h2>
          </div>

          {/* Rating Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fefce8",
              border: "1px solid #fef08a",
              padding: "6px 14px",
              borderRadius: "99px",
            }}
          >
            <span style={{ color: "#d97706", fontSize: "13px" }}>★★★★★</span>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#854d0e" }}>
              5.0 / 5.0 (1.200+ Trip)
            </span>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {testimonials.map((t, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <div
                key={t.name}
                style={{
                  backgroundColor: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                }}
              >
                {/* Stars */}
                <div style={{ color: "#d97706", fontSize: "13px", letterSpacing: "2px" }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: "13.5px",
                    color: "#374151",
                    lineHeight: 1.65,
                    flex: 1,
                    margin: 0,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      backgroundColor: theme.avatarBg,
                      color: theme.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 750,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: "13.5px", fontWeight: 750, color: "#111827" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "11.5px", color: "#6b7280" }}>{t.trip}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
