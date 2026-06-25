import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { listBookings, updateBookingStatus, type BookingStatus } from "@/lib/bookings";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memuat pesanan." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = String(body.status) as BookingStatus;
    if (!id || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
    }
    await updateBookingStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal mengupdate status." },
      { status: 500 },
    );
  }
}
