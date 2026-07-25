import { createHash, createHmac, randomUUID, timingSafeEqual } from "crypto";

const isProd = process.env.DOKU_IS_PRODUCTION === "true";
const DOKU_BASE = isProd ? "https://api.doku.com" : "https://api-sandbox.doku.com";
const PAYMENT_PATH = "/checkout/v1/payment";

type DokuLineItem = { name: string; price: number; quantity: number };
type DokuCustomer = { name: string; email: string; phone?: string; country?: string };

type CreateDokuPaymentParams = {
  invoiceNumber: string;
  amount: number;
  lineItems: DokuLineItem[];
  customer: DokuCustomer;
  callbackUrl: string;
  callbackUrlCancel: string;
};

type CreateDokuPaymentResult = {
  paymentUrl: string;
  tokenId: string;
  invoiceNumber: string;
  sessionId: string;
  expiredDate: string;
};

function isoTimestamp(): string {
  return new Date().toISOString().split(".")[0] + "Z";
}

function digest(rawBody: string): string {
  return createHash("sha256").update(rawBody).digest("base64");
}

function buildSignature(opts: {
  clientId: string;
  requestId: string;
  timestamp: string;
  requestTarget: string;
  digestB64: string;
  secretKey: string;
}): string {
  const stringToSign = [
    `Client-Id:${opts.clientId}`,
    `Request-Id:${opts.requestId}`,
    `Request-Timestamp:${opts.timestamp}`,
    `Request-Target:${opts.requestTarget}`,
    `Digest:${opts.digestB64}`,
  ].join("\n");

  const mac = createHmac("sha256", opts.secretKey).update(stringToSign).digest("base64");
  return `HMACSHA256=${mac}`;
}

export async function createDokuPayment(
  params: CreateDokuPaymentParams,
): Promise<CreateDokuPaymentResult> {
  const clientId = process.env.DOKU_CLIENT_ID;
  const secretKey = process.env.DOKU_SECRET_KEY;
  if (!clientId || !secretKey) throw new Error("DOKU_CLIENT_ID/DOKU_SECRET_KEY belum diset.");

  const body = {
    order: {
      amount: params.amount,
      invoice_number: params.invoiceNumber,
      callback_url: params.callbackUrl,
      callback_url_cancel: params.callbackUrlCancel,
      auto_redirect: true,
      line_items: params.lineItems,
    },
    payment: { payment_due_date: 60 },
    customer: params.customer,
  };
  const rawBody = JSON.stringify(body);

  const requestId = randomUUID();
  const timestamp = isoTimestamp();
  const signature = buildSignature({
    clientId,
    requestId,
    timestamp,
    requestTarget: PAYMENT_PATH,
    digestB64: digest(rawBody),
    secretKey,
  });

  const res = await fetch(`${DOKU_BASE}${PAYMENT_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": clientId,
      "Request-Id": requestId,
      "Request-Timestamp": timestamp,
      "Signature": signature,
    },
    body: rawBody,
  });

  const json = await res.json().catch(() => ({})) as {
    error_messages?: string[];
    response?: {
      order?: { invoice_number?: string; session_id?: string };
      payment?: { url?: string; token_id?: string; expired_date?: string };
    };
  };

  if (!res.ok || !json.response?.payment?.url) {
    throw new Error(json.error_messages?.[0] ?? "Gagal membuat transaksi DOKU.");
  }

  return {
    paymentUrl: json.response.payment.url,
    tokenId: json.response.payment.token_id ?? "",
    invoiceNumber: json.response.order?.invoice_number ?? params.invoiceNumber,
    sessionId: json.response.order?.session_id ?? "",
    expiredDate: json.response.payment.expired_date ?? "",
  };
}

export function verifyDokuNotificationSignature(opts: {
  rawBody: string;
  requestId: string;
  timestamp: string;
  notificationPath: string;
  receivedSignature: string;
}): boolean {
  const clientId = process.env.DOKU_CLIENT_ID;
  const secretKey = process.env.DOKU_SECRET_KEY;
  if (!clientId || !secretKey) return false;
  if (!opts.requestId || !opts.timestamp || !opts.receivedSignature) return false;

  const expected = buildSignature({
    clientId,
    requestId: opts.requestId,
    timestamp: opts.timestamp,
    requestTarget: opts.notificationPath,
    digestB64: digest(opts.rawBody),
    secretKey,
  });

  const a = Buffer.from(expected);
  const b = Buffer.from(opts.receivedSignature);
  return a.length === b.length && timingSafeEqual(a, b);
}
