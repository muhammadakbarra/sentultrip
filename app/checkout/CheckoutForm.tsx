"use client";

import { useActionState, useState } from "react";
import { confirmBookingAction } from "./actions";

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
  const [state, formAction, pending] = useActionState(confirmBookingAction, {});
  const [phoneMsg, setPhoneMsg] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailVal, setEmailVal] = useState("");

  function handlePhoneKey(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
    if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
      setPhoneMsg("Nomor HP tidak bisa menggunakan huruf.");
      setTimeout(() => setPhoneMsg(""), 2500);
    }
  }

  function handleEmailBlur() {
    if (emailVal && !isValidEmail(emailVal)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!isValidEmail(emailVal)) {
      e.preventDefault();
      setEmailError(true);
    }
  }

  return (
    <form action={formAction} className="checkout-form" onSubmit={handleSubmit}>
      <input type="hidden" name="packageSlug" value={packageSlug} />
      <input type="hidden" name="startDate" value={startDate} />
      <input type="hidden" name="adultCount" value={adultCount} />
      <input type="hidden" name="childCount" value={childCount} />
      <input type="hidden" name="nasiLiwetCount" value={nasiLiwetCount} />
      <input type="hidden" name="pickupCount" value={pickupCount} />

      {state.error ? <div className="checkout-error">{state.error}</div> : null}

      <section className="checkout-card">
        <h2>Detail Pemesan</h2>
        <label>
          Nama Lengkap
          <input name="fullName" required />
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
          <input name="city" type="text" required placeholder="Contoh: Jakarta, Bogor, Bekasi..." />
        </label>
      </section>

      <section className="checkout-card">
        <h2>Pembayaran</h2>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="bank_transfer" defaultChecked />
          <span>
            <strong>Transfer Bank</strong>
            <small>Instruksi pembayaran akan dikonfirmasi oleh admin SentulTrip.</small>
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
        {pending ? "Memproses..." : "Pesan Sekarang"}
      </button>
    </form>
  );
}
