import { NextRequest, NextResponse } from "next/server";
import { verifyMidtransSignature } from "@/lib/midtrans";
import { createBooking, updateBookingStatus } from "@/lib/bookings";
import { getPackageDetail } from "@/data/packageDetails";
import { getTieredAdultPrice, getTieredChildPrice } from "@/lib/pricing";
import { getWaSettings } from "@/lib/wa-settings";
import { sendFonnteMessage, buildBookingNotifMessage } from "@/lib/fonnte";

type MidtransNotification = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  fraud_status?: string;
  custom_field1?: string;
};

export async function POST(req: NextRequest) {
  let body: MidtransNotification;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status, custom_field1 } = body;

  // Verify signature
  const expected = verifyMidtransSignature(order_id, status_code, gross_amount);
  if (signature_key !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const isSuccess =
    (transaction_status === "capture" && fraud_status === "accept") ||
    transaction_status === "settlement";

  if (!isSuccess) {
    return NextResponse.json({ ok: true, status: transaction_status });
  }

  if (!custom_field1) {
    return NextResponse.json({ error: "Missing booking data" }, { status: 400 });
  }

  try {
    const d = JSON.parse(custom_field1) as {
      ps: string; sd: string;
      a: number; c: number; nl: number; pu: number;
      fn: string; ph: string; em: string; ci: string;
    };

    const detail = getPackageDetail(d.ps);
    if (!detail) return NextResponse.json({ error: "Package not found" }, { status: 400 });

    const MAIN_SLUGS = ["curug-bidadari", "curug-cibingbin", "desa-cisadon", "bukit-daolong", "puncak-langit"];
    const totalCount = d.a + d.c;
    const adultPrice = getTieredAdultPrice(detail.price, totalCount);
    const childPrice = getTieredChildPrice(detail.price, totalCount);
    const nasiLiwetPrice = d.nl > 0 ? 50000 : 0;
    const pickupPrice = d.pu > 0 ? (MAIN_SLUGS.includes(d.ps) ? 300000 : 400000) : 0;
    const totalAmount =
      d.a * adultPrice +
      d.c * childPrice +
      d.nl * nasiLiwetPrice +
      d.pu * pickupPrice;

    const booking = await createBooking({
      packageSlug: d.ps,
      packageName: detail.name,
      tripCode: order_id,
      startDate: d.sd,
      endDate: d.sd,
      adultCount: d.a,
      childCount: d.c,
      adultPrice,
      childPrice,
      nasiLiwetCount: d.nl,
      nasiLiwetPrice,
      pickupCount: d.pu,
      pickupPrice,
      totalAmount,
      firstName: d.fn,
      lastName: "",
      email: d.em,
      phone: d.ph,
      address: "",
      city: d.ci,
      country: "Indonesia",
      paymentMethod: "midtrans",
    });

    await updateBookingStatus(booking.id, "confirmed");

    try {
      const waSettings = await getWaSettings();
      if (waSettings?.autoNotify && waSettings.fonnteToken && waSettings.targetNumber) {
        await sendFonnteMessage(
          waSettings.fonnteToken,
          waSettings.targetNumber,
          buildBookingNotifMessage(booking),
        );
      }
    } catch {
      // Gagal notif tidak batalkan proses
    }
  } catch (err) {
    console.error("Midtrans webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
