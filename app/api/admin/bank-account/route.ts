import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getBankAccount, upsertBankAccount } from "@/lib/bank-account";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const bankAccount = await getBankAccount();
    return NextResponse.json({ bankAccount });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal memuat detail rekening." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const bankName = String(body.bankName || "").trim();
    const accountNumber = String(body.accountNumber || "").trim();
    const accountHolder = String(body.accountHolder || "").trim();

    if (!bankName || !accountNumber || !accountHolder) {
      return NextResponse.json({ error: "Nama bank, nomor rekening, dan atas nama wajib diisi." }, { status: 400 });
    }

    const bankAccount = await upsertBankAccount({ bankName, accountNumber, accountHolder });
    return NextResponse.json({ bankAccount });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal menyimpan detail rekening." },
      { status: 500 },
    );
  }
}
