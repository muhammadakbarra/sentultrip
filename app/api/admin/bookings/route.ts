import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { listBookings } from "@/lib/bookings";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
