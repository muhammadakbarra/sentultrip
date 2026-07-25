import { NextRequest, NextResponse } from "next/server";
import { verifyDokuNotificationSignature } from "@/lib/doku";
import { getBookingByTripCode, updateBookingStatus } from "@/lib/bookings";
import { getWaSettings } from "@/lib/wa-settings";
import { sendFonnteMessage, buildBookingNotifMessage } from "@/lib/fonnte";

const NOTIFICATION_PATH = "/api/doku/notification";

type DokuNotification = {
  transaction?: { status?: string };
  order?: { invoice_number?: string; amount?: number | string };
};

export async function POST(req: NextRequest) {
  // Must read as text first — Digest is computed over the exact raw bytes DOKU sent.
  const rawBody = await req.text();
  const requestId = req.headers.get("Request-Id") ?? "";
  const timestamp = req.headers.get("Request-Timestamp") ?? "";
  const signature = req.headers.get("Signature") ?? "";

  const valid = verifyDokuNotificationSignature({
    rawBody,
    requestId,
    timestamp,
    notificationPath: NOTIFICATION_PATH,
    receivedSignature: signature,
  });

  // Return 200 either way — DOKU should never see this endpoint as broken/retry it forever.
  if (!valid) {
    return NextResponse.json({ ok: true, skipped: "invalid_signature" });
  }

  let body: DokuNotification;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const status = body.transaction?.status;
  const invoiceNumber = body.order?.invoice_number;

  // Docs: "for Checkout implementations, ignore FAILED statuses" — only act on SUCCESS.
  if (status !== "SUCCESS") {
    return NextResponse.json({ ok: true, status });
  }

  if (!invoiceNumber) {
    return NextResponse.json({ error: "Missing invoice_number" }, { status: 400 });
  }

  try {
    const booking = await getBookingByTripCode(invoiceNumber);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 400 });
    }

    // Idempotency: skip if already confirmed (DOKU may redeliver notifications)
    if (booking.status === "confirmed") {
      return NextResponse.json({ ok: true, skipped: "already_processed" });
    }

    const notifiedAmount = Number(body.order?.amount);
    if (Number.isFinite(notifiedAmount) && notifiedAmount !== booking.totalAmount) {
      console.error("DOKU webhook amount mismatch:", { invoiceNumber, notifiedAmount, expected: booking.totalAmount });
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    await updateBookingStatus(booking.id, "confirmed");

    try {
      const waSettings = await getWaSettings();
      if (waSettings?.autoNotify && waSettings.fonnteToken && waSettings.targetNumber) {
        await sendFonnteMessage(waSettings.fonnteToken, waSettings.targetNumber, buildBookingNotifMessage(booking));
      }
    } catch {
      // Gagal notif WA tidak boleh batalkan proses
    }
  } catch (err) {
    console.error("DOKU webhook error:", err);
    // Return 200 so DOKU does not retry (idempotency check above handles duplicates)
    return NextResponse.json({ ok: false, error: "internal_error" });
  }

  return NextResponse.json({ ok: true });
}
