"use client";

import { useState } from "react";
import { waLink } from "@/lib/whatsapp";

const faqs = [
  {
    q: "Apakah paket trekking cocok untuk pemula?",
    a: "Ya. Sebagian besar rute trekking kami seperti Curug Bidadari dan Leuwi Asih memiliki tingkat kesulitan rendah hingga sedang. Guide akan menyesuaikan tempo dengan kondisi peserta. Kami juga menerima anak-anak di atas 3 tahun.",
  },
  {
    q: "Berapa jumlah minimal peserta untuk booking?",
    a: "Untuk trekking, minimal 2 orang per booking. Untuk offroad jeep, 1 jeep kapasitas 4-5 orang. Paket corporate dan outbound bisa untuk grup 10 hingga ratusan peserta.",
  },
  {
    q: "Apa saja yang sudah termasuk dalam harga paket?",
    a: "Sudah termasuk: jasa guide, tiket masuk destinasi, air minum selama perjalanan, dan dokumentasi foto dasar. Transportasi dari luar Sentul dan perlengkapan pribadi tidak termasuk.",
  },
  {
    q: "Bagaimana cara booking dan pembayaran?",
    a: "Booking via WhatsApp — konfirmasi jadwal, lalu transfer DP 50% untuk mengunci tanggal. Pelunasan dilakukan H-1 atau di lokasi. Kami tidak menggunakan platform booking pihak ketiga.",
  },
  {
    q: "Apakah bisa custom rute atau jadwal?",
    a: "Bisa. Untuk grup corporate, sekolah, atau acara khusus, kami menerima permintaan custom rute, durasi, dan fasilitas tambahan. Konsultasi gratis via WhatsApp sebelum booking.",
  },
  {
    q: "Seberapa jauh Sentul dari Jakarta?",
    a: "Sentul berjarak sekitar 45-60 km dari Jakarta, atau 1 hingga 1,5 jam perjalanan via Tol Jagorawi. Titik kumpul kami di Kp. Cibingbin, Desa Bojong Koneng, Babakan Madang, Bogor.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        flexShrink: 0,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        color: "#888888",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
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
          Tanya Jawab
        </p>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "40px",
          }}
        >
          Pertanyaan yang Sering Ditanyakan
        </h2>

        <div style={{ maxWidth: "760px" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid #e5e5e0",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    padding: "18px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: isOpen ? 600 : 500,
                      color: isOpen ? "#111111" : "#333333",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>

                {isOpen && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#555555",
                      lineHeight: 1.75,
                      paddingBottom: "18px",
                      maxWidth: "640px",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: "36px", fontSize: "14px", color: "#666666" }}>
          Masih ada pertanyaan?{" "}
          <a
            href={waLink("Halo SentulTrip, saya punya pertanyaan sebelum booking. Bisa bantu?")}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-green-primary)", fontWeight: 600 }}
          >
            Chat WhatsApp &rarr;
          </a>
        </p>
      </div>
    </section>
  );
}
