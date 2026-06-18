"use client";

import { useActionState } from "react";
import { confirmBookingAction } from "./actions";

type CheckoutFormProps = {
  packageSlug: string;
  startDate: string;
  adultCount: number;
};

export default function CheckoutForm({ packageSlug, startDate, adultCount }: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(confirmBookingAction, {});

  return (
    <form action={formAction} className="checkout-form">
      <input type="hidden" name="packageSlug" value={packageSlug} />
      <input type="hidden" name="startDate" value={startDate} />
      <input type="hidden" name="adultCount" value={adultCount} />
      <input type="hidden" name="childCount" value={0} />

      {state.error ? <div className="checkout-error">{state.error}</div> : null}

      <section className="checkout-card">
        <h2>Billing Detail</h2>
        <div className="checkout-grid two">
          <label>
            First Name
            <input name="firstName" required />
          </label>
          <label>
            Last Name
            <input name="lastName" />
          </label>
        </div>
        <div className="checkout-grid two">
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Nomor HP
            <input name="phone" type="tel" required />
          </label>
        </div>
        <label>
          Address
          <textarea name="address" rows={4} required />
        </label>
        <div className="checkout-grid two">
          <label>
            City
            <input name="city" required />
          </label>
          <label>
            Country
            <input name="country" defaultValue="Indonesia" required />
          </label>
        </div>
      </section>

      <section className="checkout-card">
        <h2>Payment</h2>
        <label className="payment-option">
          <input type="radio" name="paymentMethod" value="bank_transfer" defaultChecked />
          <span>
            <strong>Bank Transfer</strong>
            <small>Instruksi pembayaran akan dikonfirmasi oleh admin SentulTrip.</small>
          </span>
        </label>
      </section>

      <label className="terms-check">
        <input type="checkbox" name="acceptedTerms" required />
        <span>
          Saya mengonfirmasi bahwa saya telah membaca dan menyetujui syarat dan ketentuan kami,
          terms and conditions and privacy policy.
        </span>
      </label>

      <button type="submit" className="confirm-booking-btn" disabled={pending}>
        {pending ? "Memproses..." : "Confirm Booking"}
      </button>
    </form>
  );
}
