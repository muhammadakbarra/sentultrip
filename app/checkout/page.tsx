import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPackageDetail } from "@/data/packageDetails";
import { createTripCode, getBookingByCode } from "@/lib/bookings";
import { getBankAccount } from "@/lib/bank-account";
import CheckoutForm from "./CheckoutForm";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function dateOnly(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const success = typeof params.success === "string" ? params.success : "";

  if (success) {
    const [booking, bankAccount] = await Promise.all([
      getBookingByCode(success),
      getBankAccount(),
    ]);

    const waMessage = encodeURIComponent(
      `Halo, saya ingin konfirmasi pembayaran untuk kode pemesanan ${success}. Terlampir bukti pembayaran saya.`
    );
    const waLink = `https://wa.me/6285775777430?text=${waMessage}`;

    const s: Record<string, React.CSSProperties> = {
      wrap: { width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 16 },
      card: { background: "#fff", border: "1px solid #e2e8e5", borderRadius: 24, boxShadow: "0 8px 30px rgba(15,23,42,0.07)", padding: "24px 28px" },
      header: { textAlign: "center" as const },
      icon: { width: 64, height: 64, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 20, background: "#dcfce7", color: "#166534", fontSize: 30, fontWeight: 900, marginBottom: 16 },
      h1: { fontSize: 22, fontWeight: 900, color: "#111827", letterSpacing: "-0.03em", marginTop: 0 },
      subtext: { marginTop: 8, color: "#64748b", fontSize: 14 },
      badge: { display: "inline-block", marginTop: 10, padding: "4px 14px", borderRadius: 99, background: "#f0f7ee", color: "#166534", fontSize: 13, fontWeight: 700 },
      label: { fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6 },
      desc: { fontSize: 14, color: "#64748b", marginBottom: 16, lineHeight: 1.6 },
      bankBox: { background: "#f8faf9", border: "1px solid #e2e8e5", borderRadius: 16, overflow: "hidden", marginBottom: 16 },
      bankRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #e2e8e5" },
      bankRowLast: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 16px" },
      bankLabel: { fontSize: 13, color: "#64748b", fontWeight: 600 },
      bankValue: { fontSize: 14, fontWeight: 800, color: "#111827", textAlign: "right" as const },
      bankNumber: { fontSize: 20, fontWeight: 900, color: "#166534", letterSpacing: "0.06em", textAlign: "right" as const },
      totalBox: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 16px", background: "#0f172a", borderRadius: 14 },
      totalLabel: { fontSize: 13, color: "#94a3b8", fontWeight: 700 },
      totalValue: { fontSize: 22, fontWeight: 900, color: "#4ade80", letterSpacing: "-0.03em" },
      waBtn: { display: "block", width: "100%", padding: "14px", borderRadius: 14, background: "#166534", color: "#fff", fontSize: 15, fontWeight: 800, textAlign: "center" as const, textDecoration: "none" },
      backLink: { textAlign: "center" as const, fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 600, paddingBlock: 8 },
    };

    return (
      <>
        <Navbar />
        <main className="checkout-page success">
          <div style={s.wrap}>

            {/* Header */}
            <div style={{ ...s.card, ...s.header }}>
              <div style={s.icon}>✓</div>
              <h1 style={s.h1}>Pesanan Berhasil Dibuat!</h1>
              <p style={s.subtext}>Kode Pemesanan: <strong style={{ color: "#111827", fontWeight: 900 }}>{success}</strong></p>
              {booking && <p style={s.badge}>{booking.packageName}</p>}
            </div>

            {/* Instruksi Pembayaran */}
            <div style={s.card}>
              <p style={s.label}>Instruksi Pembayaran</p>
              <p style={s.desc}>Silakan selesaikan pembayaran dengan transfer ke rekening berikut:</p>

              {bankAccount ? (
                <div style={s.bankBox}>
                  <div style={s.bankRow}>
                    <span style={s.bankLabel}>Bank</span>
                    <strong style={s.bankValue}>{bankAccount.bankName}</strong>
                  </div>
                  <div style={s.bankRow}>
                    <span style={s.bankLabel}>No. Rekening</span>
                    <strong style={s.bankNumber}>{bankAccount.accountNumber}</strong>
                  </div>
                  <div style={s.bankRowLast}>
                    <span style={s.bankLabel}>Atas Nama</span>
                    <strong style={s.bankValue}>{bankAccount.accountHolder}</strong>
                  </div>
                </div>
              ) : (
                <div style={{ ...s.bankBox, padding: 16, color: "#64748b", fontSize: 14 }}>
                  Info rekening belum tersedia. Hubungi admin SentulTrip.
                </div>
              )}

              {booking && (
                <div style={s.totalBox}>
                  <span style={s.totalLabel}>Total yang harus dibayar</span>
                  <strong style={s.totalValue}>{formatPrice(booking.totalAmount)}</strong>
                </div>
              )}
            </div>

            {/* Konfirmasi Pembayaran */}
            <div style={s.card}>
              <p style={s.label}>Konfirmasi Pembayaran</p>
              <p style={s.desc}>Setelah transfer, kirimkan foto bukti pembayaran ke WhatsApp kami agar pesanan segera dikonfirmasi.</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={s.waBtn}>
                Konfirmasi Pembayaran via WhatsApp
              </a>
            </div>

            <Link href="/" style={s.backLink}>← Kembali ke Beranda</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const packageSlug = typeof params.package === "string" ? params.package : "";
  const startDate = typeof params.startDate === "string" ? params.startDate : "";
  const adultCount = Number(params.adult || 0);
  const childCount = Number(params.child || 0);
  const nasiLiwetCount = Number(params.nasiLiwet || 0);
  const pickupCount = Number(params.pickup || 0);
  const detail = getPackageDetail(packageSlug);

  if (!detail || !startDate || adultCount < 3) redirect("/");

  const minDate = dateOnly(addDays(new Date(), 1));
  if (startDate < minDate) redirect(`/paket/${detail.slug}`);

  const childPrice = detail.price - 20000;
  const nasiLiwetPrice = 50000;
  const pickupPrice = ["curug-bidadari", "curug-cibingbin"].includes(packageSlug) ? 300000 : 400000;
  const total =
    adultCount * detail.price +
    childCount * childPrice +
    nasiLiwetCount * nasiLiwetPrice +
    pickupCount * pickupPrice;
  const tripCode = createTripCode(detail.slug);
  const displayStartDate = formatDisplayDate(startDate);

  return (
    <>
      <Navbar />
      <main className="checkout-page">
        <div className="checkout-header">
          <p className="checkout-kicker">Pemesanan</p>
          <h1>Lengkapi Data Booking</h1>
        </div>
        <div className="checkout-container">
          <section className="checkout-form-section">
            <CheckoutForm packageSlug={detail.slug} startDate={startDate} adultCount={adultCount} childCount={childCount} nasiLiwetCount={nasiLiwetCount} pickupCount={pickupCount} />
          </section>

          <aside className="tour-details-card">
            <p className="checkout-kicker">Detail Perjalanan</p>
            <h2>{detail.name}</h2>
            <DetailRow label="Kode Trip" value={tripCode} />
            <DetailRow label="Tanggal Mulai" value={displayStartDate} />
            <DetailRow label="Tanggal Selesai" value={displayStartDate} />
            <DetailRow label="Dewasa" value={`${adultCount} orang`} />
            {childCount > 0 && <DetailRow label="Anak" value={`${childCount} orang`} />}

            <div className="tour-price-line">
              <span>Dewasa × {adultCount}</span>
              <strong>{formatPrice(adultCount * detail.price)}</strong>
            </div>
            {childCount > 0 && (
              <div className="tour-price-line">
                <span>Anak × {childCount}</span>
                <strong>{formatPrice(childCount * childPrice)}</strong>
              </div>
            )}
            {nasiLiwetCount > 0 && (
              <div className="tour-price-line">
                <span>Nasi Liwet × {nasiLiwetCount}</span>
                <strong>{formatPrice(nasiLiwetCount * nasiLiwetPrice)}</strong>
              </div>
            )}
            {pickupCount > 0 && (
              <div className="tour-price-line">
                <span>Mobil Pick-up × {pickupCount}</span>
                <strong>{formatPrice(pickupCount * pickupPrice)}</strong>
              </div>
            )}
            <div className="tour-total-line">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="tour-detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
