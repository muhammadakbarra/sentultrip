"use client";

import { useActionState } from "react";
import { confirmBookingAction } from "./actions";

type CheckoutFormProps = {
  packageSlug: string;
  startDate: string;
  adultCount: number;
  childCount: number;
  nasiLiwetCount: number;
  pickupCount: number;
};

export default function CheckoutForm({ packageSlug, startDate, adultCount, childCount, nasiLiwetCount, pickupCount }: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(confirmBookingAction, {});

  return (
    <form action={formAction} className="checkout-form">
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
            <input name="phone" type="tel" placeholder="08xxxxxxxxxx" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
        </div>
        <label>
          Alamat
          <textarea name="address" rows={4} required />
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
