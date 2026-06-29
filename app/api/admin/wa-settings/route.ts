import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getWaSettings, upsertWaSettings } from "@/lib/wa-settings";
import { sendFonnteMessage, getFonnteDevices } from "@/lib/fonnte";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  try {
    const settings = await getWaSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memuat pengaturan WA." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });

  try {
    const body = await request.json();
    const action = body.action as string | undefined;

    // Test connection — cek status device di Fonnte
    if (action === "test-connection") {
      const token = String(body.fonnteToken || "").trim();
      if (!token) return NextResponse.json({ error: "Token belum diisi." }, { status: 400 });
      const result = await getFonnteDevices(token);
      return NextResponse.json({ result });
    }

    // Test kirim pesan
    if (action === "test-send") {
      const token = String(body.fonnteToken || "").trim();
      const target = String(body.targetNumber || "").trim();
      if (!token || !target) return NextResponse.json({ error: "Token dan nomor tujuan wajib diisi." }, { status: 400 });
      const result = await sendFonnteMessage(token, target, "✅ *Test dari SentulTrip.id*\n\nKoneksi Fonnte berhasil! Notifikasi pesanan akan dikirim ke nomor ini.");
      return NextResponse.json({ result });
    }

    // Simpan pengaturan
    const fonnteToken = String(body.fonnteToken || "").trim();
    const targetNumber = String(body.targetNumber || "").trim();
    const autoNotify = body.autoNotify !== false;

    if (!fonnteToken || !targetNumber) {
      return NextResponse.json({ error: "Token Fonnte dan nomor tujuan wajib diisi." }, { status: 400 });
    }

    const settings = await upsertWaSettings({ fonnteToken, targetNumber, autoNotify });
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal menyimpan pengaturan WA." },
      { status: 500 },
    );
  }
}
