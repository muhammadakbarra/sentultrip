import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPackageDetail } from "@/data/packageDetails";
import { createTripCode } from "@/lib/bookings";
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
    return (
      <>
        <Navbar />
        <main className="checkout-page success">
          <section className="checkout-success-card">
            <div className="checkout-success-icon">✓</div>
            <h1>Booking Berhasil Dibuat</h1>
            <p>Kode booking Bos:</p>
            <strong>{success}</strong>
            <Link href="/" className="confirm-booking-btn">Kembali ke Beranda</Link>
          </section>
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

  const minDate = dateOnly(addDays(new Date(), 3));
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
