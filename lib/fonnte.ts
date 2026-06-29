export type FonnteDeviceStatus = {
  name: string;
  device: string;
  status: string;
  expired: string;
};

export async function sendFonnteMessage(
  token: string,
  target: string,
  message: string,
): Promise<{ status: boolean; detail?: string; reason?: string }> {
  const body = new URLSearchParams();
  body.set("target", target);
  body.set("message", message);
  body.set("countryCode", "62");

  const res = await fetch("https://api.fonnte.com/send", {
    method: "POST",
    headers: { Authorization: token },
    body,
  });

  return res.json();
}

export async function getFonnteDevices(
  token: string,
): Promise<{ status: boolean; data?: FonnteDeviceStatus[]; reason?: string }> {
  const res = await fetch("https://api.fonnte.com/get-devices", {
    method: "POST",
    headers: { Authorization: token },
  });
  return res.json();
}

export function buildBookingNotifMessage(booking: {
  bookingCode: string;
  packageName: string;
  startDate: string;
  adultCount: number;
  childCount: number;
  nasiLiwetCount: number;
  pickupCount: number;
  totalAmount: number;
  firstName: string;
  email: string;
  phone: string;
}): string {
  const formatRp = (n: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

  const peserta = [
    `${booking.adultCount} Dewasa`,
    booking.childCount > 0 ? `${booking.childCount} Anak` : "",
  ].filter(Boolean).join(", ");

  const tambahan = [
    booking.nasiLiwetCount > 0 ? `Nasi Liwet ×${booking.nasiLiwetCount}` : "",
    booking.pickupCount > 0 ? `Pick-up ×${booking.pickupCount}` : "",
  ].filter(Boolean).join(", ");

  return [
    `🎉 *PESANAN BARU - SentulTrip.id*`,
    ``,
    `📋 Kode: ${booking.bookingCode}`,
    `👤 Nama: ${booking.firstName}`,
    `📦 Paket: ${booking.packageName}`,
    `📅 Tgl Trip: ${booking.startDate}`,
    `👥 Peserta: ${peserta}`,
    tambahan ? `➕ Tambahan: ${tambahan}` : "",
    `💰 Total: ${formatRp(booking.totalAmount)}`,
    `📱 No HP: ${booking.phone || "-"}`,
    `📧 Email: ${booking.email}`,
    ``,
    `_Segera konfirmasi pembayaran customer._`,
  ].filter((line) => line !== "").join("\n");
}
