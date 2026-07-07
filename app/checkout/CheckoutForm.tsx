"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmBookingAction, createMidtransAction } from "./actions";

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
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "midtrans">("bank_transfer");
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

  const isMidtrans = paymentMethod === "midtrans";
  const currentAction = isMidtrans ? midtransAction : bankAction;
  const pending = isMidtrans ? midtransPending : bankPending;
  const error = isMidtrans ? midtransState.error : bankState.error;

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
            <strong>Bayar Sekarang</strong>
            <small>QRIS, kartu kredit/debit, e-wallet, VA bank (via Midtrans).</small>
          </span>
        </label>
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
          ? isMidtrans ? "Memuat pembayaran..." : "Memproses..."
          : isMidtrans ? "Bayar Sekarang" : "Pesan Sekarang"}
      </button>
    </form>
  );
}
