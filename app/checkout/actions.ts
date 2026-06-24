"use server";

import { redirect } from "next/navigation";
import { createBooking, createTripCode } from "@/lib/bookings";
import { getPackageDetail } from "@/data/packageDetails";

type CheckoutState = { error?: string };

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

export async function confirmBookingAction(_state: CheckoutState, formData: FormData): Promise<CheckoutState> {
  let successUrl = "";

  try {
    const packageSlug = required(formData, "packageSlug");
    const startDate = required(formData, "startDate");
    const adultCount = Number(formData.get("adultCount") || 0);
    const childCount = Number(formData.get("childCount") || 0);
    const acceptedTerms = formData.get("acceptedTerms") === "on";

    const detail = getPackageDetail(packageSlug);
    if (!detail) throw new Error("Paket tidak ditemukan.");

    const minDate = toDateOnly(addDays(new Date(), 3));
    if (startDate < minDate) {
      throw new Error("Tanggal booking minimal hari ketiga dari hari ini.");
    }

    if (adultCount < 3) {
      throw new Error("Minimum pemesanan adult adalah 3 orang.");
    }

    if (childCount > 0 && adultCount < 1) {
      throw new Error("Pemesanan child harus memiliki minimal 1 adult.");
    }

    if (!acceptedTerms) {
      throw new Error("Mohon setujui syarat, ketentuan, dan privacy policy.");
    }

    const nasiLiwetCount = Number(formData.get("nasiLiwetCount") || 0);
    const pickupCount = Number(formData.get("pickupCount") || 0);

    const adultPrice = detail.price;
    const childPrice = detail.price - 20000;
    const nasiLiwetPrice = nasiLiwetCount > 0 ? 50000 : 0;
    const pickupPrice = pickupCount > 0
      ? (["curug-bidadari", "curug-cibingbin"].includes(packageSlug) ? 300000 : 400000)
      : 0;

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
      firstName: required(formData, "fullName"),
      lastName: "",
      email: required(formData, "email"),
      phone: required(formData, "phone"),
      address: required(formData, "address"),
      city: "",
      country: "Indonesia",
      paymentMethod: "bank_transfer",
    });

    successUrl = `/checkout?success=${booking.bookingCode}`;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Gagal membuat booking." };
  }

  redirect(successUrl);
}
