"use server";

import { redirect } from "next/navigation";
import { createBooking, createTripCode } from "@/lib/bookings";
import { getPackageDetail } from "@/data/packageDetails";
import { getWaSettings } from "@/lib/wa-settings";
import { sendFonnteMessage, buildBookingNotifMessage } from "@/lib/fonnte";
import { getTieredAdultPrice, getTieredChildPrice } from "@/lib/pricing";
import { waLink } from "@/lib/whatsapp";
import { createSnapToken } from "@/lib/midtrans";

type CheckoutState = { error?: string };
export type FinalizeState = { error?: string; waUrl?: string; bookingCode?: string };
export type MidtransState = { error?: string; snapToken?: string; orderId?: string };

function required(formData: FormData, key: string) {
  const value = String(formData.get(key) || "").trim();
  if (!value) throw new Error("Mohon lengkapi semua billing detail.");
  return value;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function validateBookingForm(formData: FormData) {
  const packageSlug = required(formData, "packageSlug");
  const startDate = required(formData, "startDate");
  const adultCount = Number(formData.get("adultCount") || 0);
  const childCount = Number(formData.get("childCount") || 0);
  const acceptedTerms = formData.get("acceptedTerms") === "on";

  const detail = getPackageDetail(packageSlug);
  if (!detail) throw new Error("Paket tidak ditemukan.");

  const minDate = toDateOnly(addDays(new Date(), 1));
  if (startDate < minDate) throw new Error("Tanggal booking minimal besok.");
  if (adultCount < 3) throw new Error("Minimum pemesanan adult adalah 3 orang.");
  if (childCount > 0 && adultCount < 1) throw new Error("Pemesanan child harus memiliki minimal 1 adult.");
  if (!acceptedTerms) throw new Error("Mohon setujui syarat, ketentuan, dan privacy policy.");

  const phoneRaw = required(formData, "phone");
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 12) {
    throw new Error("Nomor HP harus terdiri dari 10–12 digit.");
  }

  const nasiLiwetCount = Number(formData.get("nasiLiwetCount") || 0);
  const pickupCount = Number(formData.get("pickupCount") || 0);
  const fullName = required(formData, "fullName");
  const email = required(formData, "email");
  const city = required(formData, "city");

  const MAIN_SLUGS = ["curug-bidadari", "curug-cibingbin", "desa-cisadon", "bukit-daolong", "puncak-langit"];
  const totalCount = adultCount + childCount;
  const adultPrice = getTieredAdultPrice(detail.price, totalCount);
  const childPrice = getTieredChildPrice(detail.price, totalCount);
  const nasiLiwetPrice = nasiLiwetCount > 0 ? 50000 : 0;
  const pickupPrice = pickupCount > 0
    ? (MAIN_SLUGS.includes(packageSlug) ? 300000 : 400000)
    : 0;
  const totalAmount =
    adultCount * adultPrice +
    childCount * childPrice +
    nasiLiwetCount * nasiLiwetPrice +
    pickupCount * pickupPrice;

  return {
    packageSlug, startDate, adultCount, childCount, nasiLiwetCount, pickupCount,
    fullName, email, phoneRaw, city, detail,
    adultPrice, childPrice, nasiLiwetPrice, pickupPrice, totalAmount,
  };
}

// Bank transfer: validate only, redirect to pending payment page
export async function confirmBookingAction(_state: CheckoutState, formData: FormData): Promise<CheckoutState> {
  let pendingUrl = "";

  try {
    const { packageSlug, startDate, adultCount, childCount, nasiLiwetCount, pickupCount, fullName, email, phoneRaw, city } =
      validateBookingForm(formData);

    const query = new URLSearchParams({
      pending: "1",
      package: packageSlug,
      startDate,
      adult: String(adultCount),
      child: String(childCount),
      nasiLiwet: String(nasiLiwetCount),
      pickup: String(pickupCount),
      fullName,
      phone: phoneRaw,
      email,
      city,
    });
    pendingUrl = `/checkout?${query.toString()}`;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal memproses." };
  }

  redirect(pendingUrl);
}

// Midtrans: validate, create Snap transaction, return token to client
export async function createMidtransAction(_state: MidtransState, formData: FormData): Promise<MidtransState> {
  try {
    const { packageSlug, startDate, adultCount, childCount, nasiLiwetCount, pickupCount, fullName, email, phoneRaw, city, detail, adultPrice, childPrice, nasiLiwetPrice, pickupPrice, totalAmount } =
      validateBookingForm(formData);

    const orderId = `MT-${packageSlug.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

    const itemDetails = [
      { id: "ADULT", price: adultPrice, quantity: adultCount, name: `Dewasa – ${detail.name}` },
      ...(childCount > 0 ? [{ id: "CHILD", price: childPrice, quantity: childCount, name: `Anak – ${detail.name}` }] : []),
      ...(nasiLiwetCount > 0 ? [{ id: "NASI_LIWET", price: 50000, quantity: nasiLiwetCount, name: "Nasi Liwet Komplit" }] : []),
      ...(pickupCount > 0 ? [{ id: "PICKUP", price: pickupPrice, quantity: pickupCount, name: "Mobil Pick-up (PP)" }] : []),
    ];

    // Store booking data in custom_field1 for webhook to use later
    const bookingPayload = JSON.stringify({
      ps: packageSlug, sd: startDate,
      a: adultCount, c: childCount, nl: nasiLiwetCount, pu: pickupCount,
      fn: fullName, ph: phoneRaw, em: email, ci: city,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sentultrip.com";
    const result = await createSnapToken({
      transaction_details: { order_id: orderId, gross_amount: totalAmount },
      customer_details: { first_name: fullName, email, phone: phoneRaw },
      item_details: itemDetails,
      custom_field1: bookingPayload,
      callbacks: { finish: `${appUrl}/checkout/midtrans-finish` },
    });

    return { snapToken: result.token, orderId };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal membuat transaksi." };
  }
}

// Bank transfer step 2: save to DB + send Fonnte, return WA URL for client to open
export async function finalizeBookingAction(_state: FinalizeState, formData: FormData): Promise<FinalizeState> {
  try {
    const packageSlug = required(formData, "packageSlug");
    const startDate = required(formData, "startDate");
    const adultCount = Number(formData.get("adultCount") || 0);
    const childCount = Number(formData.get("childCount") || 0);
    const nasiLiwetCount = Number(formData.get("nasiLiwetCount") || 0);
    const pickupCount = Number(formData.get("pickupCount") || 0);
    const fullName = required(formData, "fullName");
    const phone = required(formData, "phone");
    const email = required(formData, "email");
    const city = required(formData, "city");

    const detail = getPackageDetail(packageSlug);
    if (!detail) throw new Error("Paket tidak ditemukan.");
    if (adultCount < 3) throw new Error("Minimum pemesanan adult adalah 3 orang.");

    const MAIN_SLUGS = ["curug-bidadari", "curug-cibingbin", "desa-cisadon", "bukit-daolong", "puncak-langit"];
    const totalCount = adultCount + childCount;
    const adultPrice = getTieredAdultPrice(detail.price, totalCount);
    const childPrice = getTieredChildPrice(detail.price, totalCount);
    const nasiLiwetPrice = nasiLiwetCount > 0 ? 50000 : 0;
    const pickupPrice = pickupCount > 0 ? (MAIN_SLUGS.includes(packageSlug) ? 300000 : 400000) : 0;
    const totalAmount =
      adultCount * adultPrice +
      childCount * childPrice +
      nasiLiwetCount * nasiLiwetPrice +
      pickupCount * pickupPrice;

    const booking = await createBooking({
      packageSlug,
      packageName: detail.name,
      tripCode: createTripCode(packageSlug),
      startDate,
      endDate: startDate,
      adultCount,
      childCount,
      adultPrice,
      childPrice,
      nasiLiwetCount,
      nasiLiwetPrice,
      pickupCount,
      pickupPrice,
      totalAmount,
      firstName: fullName,
      lastName: "",
      email,
      phone,
      address: "",
      city,
      country: "Indonesia",
      paymentMethod: "bank_transfer",
    });

    try {
      const waSettings = await getWaSettings();
      if (waSettings?.autoNotify && waSettings.fonnteToken && waSettings.targetNumber) {
        const message = buildBookingNotifMessage(booking);
        await sendFonnteMessage(waSettings.fonnteToken, waSettings.targetNumber, message);
      }
    } catch {
      // Gagal notif WA tidak boleh batalkan booking
    }

    const waMessage = `Halo, saya ${fullName} ingin konfirmasi pembayaran untuk kode pemesanan ${booking.bookingCode}. Terlampir bukti pembayaran saya.`;
    return { waUrl: waLink(waMessage), bookingCode: booking.bookingCode };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal membuat booking." };
  }
}
