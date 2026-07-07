import { createHash } from "crypto";

const isProd = process.env.MIDTRANS_IS_PRODUCTION === "true";
const SNAP_BASE = isProd
  ? "https://app.midtrans.com"
  : "https://app.sandbox.midtrans.com";

type SnapItemDetail = { id: string; price: number; quantity: number; name: string };

type SnapParams = {
  transaction_details: { order_id: string; gross_amount: number };
  customer_details?: { first_name?: string; email?: string; phone?: string };
  item_details?: SnapItemDetail[];
  custom_field1?: string;
  callbacks?: { finish?: string };
};

export async function createSnapToken(
  params: SnapParams,
): Promise<{ token: string; redirect_url: string }> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) throw new Error("MIDTRANS_SERVER_KEY belum diset.");

  const auth = Buffer.from(`${serverKey}:`).toString("base64");
  const res = await fetch(`${SNAP_BASE}/snap/v1/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error_messages?: string[] };
    throw new Error(err.error_messages?.[0] ?? "Gagal membuat transaksi Midtrans.");
  }

  return res.json();
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
): string {
  const serverKey = process.env.MIDTRANS_SERVER_KEY!;
  return createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest("hex");
}
