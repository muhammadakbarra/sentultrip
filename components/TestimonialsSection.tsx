const testimonials = [
  {
    name: "Tata",
    trip: "Curug Bidadari — Corporate",
    initials: "TA",
    text: "Kami pakai untuk team building 40 orang. Trekkingnya lebih menantang dari yang saya bayangkan, tapi guide-nya tahu persis kapan harus istirahat dan kapan bisa lanjut. Semua peserta selesai tanpa keluhan.",
  },
  {
    name: "Indah",
    trip: "Curug Cibingbin — Family Trip",
    initials: "IN",
    text: "Membawa anak usia 9 tahun, dan saya khawatir jalurnya terlalu berat. Ternyata guide sudah hafal rute mana yang aman untuk anak-anak. Sepanjang jalan anak saya tidak mau berhenti bertanya ke guide soal nama-nama pohon.",
  },
  {
    name: "Anita",
    trip: "Curug Bidadari — Solo",
    initials: "AN",
    text: "Baru pertama trekking, dan saya datang sendiri tanpa teman. Guide-nya pelan-pelan menjelaskan medan sebelum mulai, tidak ada yang dibuat merasa tertinggal. Saya sampai di curug tanpa drama.",
  },
  {
    name: "Ade Suryana",
    trip: "Leuwi Hejo",
    initials: "AS",
    text: "Jalurnya cukup panjang, sekitar 6 jam. Yang membuat berbeda adalah guide-nya tidak hanya membuka jalan — dia tahu titik mana yang layak berhenti lama dan mana yang sebaiknya dilewati cepat. Perjalanan terasa terencana.",
  },
  {
    name: "Nurul",
    trip: "Goa Garunggang",
    initials: "NU",
    text: "Destinasinya jauh dari jalur wisata biasa. Guide membawa kami ke tempat yang sebagian orang Sentul pun belum tentu tahu. Pemandangan di titik tertinggi worth every step.",
  },
  {
    name: "Mala",
    trip: "Curug Cibingbin — Corporate",
    initials: "MA",
    text: "Yang tidak saya duga: guide-nya juga membantu mengambil foto grup dengan komposisi yang baik tanpa diminta. Foto-foto itu akhirnya masuk deck presentasi internal perusahaan.",
  },
];

const cardThemes = [
  { bg: "#f0f7ee", border: "#c8e0c5", avatarBg: "#2a7a2a", avatarColor: "#ffffff" },
  { bg: "#fef9ee", border: "#e8d5a0", avatarBg: "#d4920a", avatarColor: "#ffffff" },
  { bg: "#eef3fa", border: "#c0d0e8", avatarBg: "#2c5282", avatarColor: "#ffffff" },
  { bg: "#f5f0fa", border: "#d0bce8", avatarBg: "#5b3a8a", avatarColor: "#ffffff" },
  { bg: "#f0f7ee", border: "#c8e0c5", avatarBg: "#1e5c1e", avatarColor: "#ffffff" },
  { bg: "#fff5f0", border: "#e8c8b8", avatarBg: "#b85c2a", avatarColor: "#ffffff" },
];

export default function TestimonialsSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-primary)",
        padding: "72px 0",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 24px" }}>
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
          Testimoni
        </p>

        <h2
          style={{ fontSize: "28px", fontWeight: 700, color: "#111111", marginBottom: "8px" }}
        >
          Cerita dari Wisatawan Kami
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#888888",
            marginBottom: "40px",
            lineHeight: 1.6,
          }}
        >
          Lebih dari 1.200 perjalanan selesai. Berikut beberapa yang diceritakan kembali.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {testimonials.map((t, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <div
                key={t.name}
                className="card-hover"
                style={{
                  backgroundColor: theme.bg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Stars */}
                <div style={{ color: "#d4920a", fontSize: "14px", letterSpacing: "2px" }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    lineHeight: 1.75,
                    flex: 1,
                  }}
                >
                  {t.text}
                </p>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: theme.avatarBg,
                      color: theme.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#111111" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666666" }}>{t.trip}</div>
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
