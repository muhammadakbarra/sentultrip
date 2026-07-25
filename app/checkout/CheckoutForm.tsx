"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmBookingAction, createMidtransAction, createDokuAction } from "./actions";

declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
    };
    loadJokulCheckout?: (url: string) => void;
  }
}

type CheckoutFormProps = {
  packageSlug: string;
  startDate: string;
  adultCount: number;
  childCount: number;
  nasiLiwetCount: number;
  pickupCount: number;
};

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function CheckoutForm({ packageSlug, startDate, adultCount, childCount, nasiLiwetCount, pickupCount }: CheckoutFormProps) {
  const router = useRouter();
  const [bankState, bankAction, bankPending] = useActionState(confirmBookingAction, {});
  const [midtransState, midtransAction, midtransPending] = useActionState(createMidtransAction, {});
  const [dokuState, dokuAction, dokuPending] = useActionState(createDokuAction, {});
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "midtrans" | "doku">("bank_transfer");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailVal, setEmailVal] = useState("");

  // Load Midtrans Snap.js
  useEffect(() => {
    const snapUrl = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL;
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    if (!snapUrl || !clientKey) return;
    if (document.querySelector(`script[src="${snapUrl}"]`)) return;

    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Load DOKU jokul-checkout-js (no client key needed — it only takes a payment URL)
  useEffect(() => {
    const checkoutJsUrl = process.env.NEXT_PUBLIC_DOKU_CHECKOUT_JS_URL;
    if (!checkoutJsUrl) return;
    if (document.querySelector(`script[src="${checkoutJsUrl}"]`)) return;

    const script = document.createElement("script");
    script.src = checkoutJsUrl;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // Open Snap popup when snapToken is returned
  useEffect(() => {
    if (!midtransState.snapToken || !midtransState.orderId) return;
    const orderId = midtransState.orderId;
    const token = midtransState.snapToken;

    const tryPay = () => {
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: () => router.push(`/checkout?success=${orderId}&payment=midtrans`),
          onPending: () => router.push(`/checkout?success=${orderId}&payment=midtrans`),
          onError: () => {},
          onClose: () => {},
        });
      } else {
        setTimeout(tryPay, 250);
      }
    };
    tryPay();
  }, [midtransState.snapToken, midtransState.orderId, router]);

  // Open DOKU Checkout popup when paymentUrl is returned. The popup's own success/close
  // behavior is NOT trusted here (unconfirmed callback support) — the real confirmation
  // always comes from /checkout/doku-finish (DOKU's callback_url redirect) + the webhook.
  useEffect(() => {
    if (!dokuState.paymentUrl) return;
    const paymentUrl = dokuState.paymentUrl;

    const tryOpen = (attempt = 0) => {
      if (window.loadJokulCheckout) {
        window.loadJokulCheckout(paymentUrl);
      } else if (attempt >= 20) {
        // Script never loaded — fall back to a plain full-page redirect.
        window.location.href = paymentUrl;
      } else {
        setTimeout(() => tryOpen(attempt + 1), 250);
      }
    };
    tryOpen();
  }, [dokuState.paymentUrl]);

  const isMidtrans = paymentMethod === "midtrans";
  const isDoku = paymentMethod === "doku";
  const currentAction = isMidtrans ? midtransAction : isDoku ? dokuAction : bankAction;
  const pending = isMidtrans ? midtransPending : isDoku ? dokuPending : bankPending;
  const error = isMidtrans ? midtransState.error : isDoku ? dokuState.error : bankState.error;

  function handlePhoneKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
    if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
      setPhoneMsg("Nomor HP tidak bisa menggunakan huruf.");
      setTimeout(() => setPhoneMsg(""), 2500);
    }
  }

  function handleEmailBlur() {
    if (emailVal && !isValidEmail(emailVal)) setEmailError(true);
    else setEmailError(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!isValidEmail(emailVal)) {
      e.preventDefault();
      setEmailError(true);
    }
  }

  return (
    <form action={currentAction} className="checkout-form" onSubmit={handleSubmit}>
      <input type="hidden" name="packageSlug" value={packageSlug} />
      <input type="hidden" name="startDate" value={startDate} />
      <input type="hidden" name="adultCount" value={adultCount} />
      <input type="hidden" name="childCount" value={childCount} />
      <input type="hidden" name="nasiLiwetCount" value={nasiLiwetCount} />
      <input type="hidden" name="pickupCount" value={pickupCount} />

      {error ? <div className="checkout-error">{error}</div> : null}

      <section className="checkout-card">
        <h2>Detail Pemesan</h2>
        <label>
          Nama Lengkap
          <input name="fullName" required autoComplete="name" />
        </label>
        <div className="checkout-grid two">
          <label>
            Nomor HP
            <input
              name="phone"
              type="tel"
              placeholder="08xxxxxxxxxx"
              required
              minLength={10}
              maxLength={12}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="tel"
              onKeyDown={handlePhoneKey}
            />
            {phoneMsg && (
              <span style={{ fontSize: "12px", color: "#dc2626", fontWeight: 600, marginTop: "4px", display: "block" }}>
                {phoneMsg}
              </span>
            )}
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              value={emailVal}
              onChange={(e) => { setEmailVal(e.target.value); setEmailError(false); }}
              onBlur={handleEmailBlur}
              style={emailError ? { borderColor: "#dc2626", background: "#fff5f5" } : {}}
            />
            {emailError && (
              <span style={{ fontSize: "12px", color: "#dc2626", fontWeight: 600, marginTop: "4px", display: "block" }}>
                Format email tidak valid. Contoh: nama@email.com
              </span>
            )}
          </label>
        </div>
        <label>
          Kota
          <input name="city" type="text" required autoComplete="address-level2" placeholder="Contoh: Jakarta, Bogor, Bekasi…" />
        </label>
      </section>

      <section className="checkout-card">
        <h2>Metode Pembayaran</h2>
        <label
          className="payment-option"
          style={paymentMethod === "bank_transfer" ? { borderColor: "#2a7a2a", background: "#f0f7ee" } : {}}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="bank_transfer"
            checked={paymentMethod === "bank_transfer"}
            onChange={() => setPaymentMethod("bank_transfer")}
          />
          <span>
            <strong>Transfer Bank</strong>
            <small>Konfirmasi manual oleh admin via WhatsApp.</small>
          </span>
        </label>
        {/* DOKU & Midtrans belum diverifikasi merchant — nonaktifkan dulu, sisakan Transfer Bank manual.
        <label
          className="payment-option"
          style={paymentMethod === "doku" ? { borderColor: "#2a7a2a", background: "#f0f7ee", marginTop: 8 } : { marginTop: 8 }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="doku"
            checked={paymentMethod === "doku"}
            onChange={() => setPaymentMethod("doku")}
          />
          <span>
            <strong>Bayar Sekarang</strong>
            <small>QRIS, kartu kredit/debit, e-wallet, VA bank (via DOKU).</small>
          </span>
        </label>
        <label
          className="payment-option"
          style={paymentMethod === "midtrans" ? { borderColor: "#2a7a2a", background: "#f0f7ee", marginTop: 8 } : { marginTop: 8 }}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="midtrans"
            checked={paymentMethod === "midtrans"}
            onChange={() => setPaymentMethod("midtrans")}
          />
          <span>
            <strong>Bayar Sekarang (Midtrans, sementara)</strong>
            <small>Jalur lama — akan dihapus setelah DOKU teruji.</small>
          </span>
        </label>
        */}
      </section>

      <label className="terms-check">
        <input type="checkbox" name="acceptedTerms" required />
        <span>
          Saya mengonfirmasi bahwa saya telah membaca dan menyetujui syarat dan ketentuan kami,
          syarat & ketentuan dan kebijakan privasi.
        </span>
      </label>

      <button type="submit" className="confirm-booking-btn" disabled={pending}>
        {pending
          ? (isMidtrans || isDoku) ? "Memuat pembayaran..." : "Memproses..."
          : (isMidtrans || isDoku) ? "Bayar Sekarang" : "Pesan Sekarang"}
      </button>
    </form>
  );
}
