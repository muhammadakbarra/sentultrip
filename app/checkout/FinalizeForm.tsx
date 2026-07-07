"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { finalizeBookingAction } from "./actions";

type Props = {
  packageSlug: string;
  startDate: string;
  adultCount: number;
  childCount: number;
  nasiLiwetCount: number;
  pickupCount: number;
  fullName: string;
  phone: string;
  email: string;
  city: string;
};

export default function FinalizeForm(props: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(finalizeBookingAction, {});

  useEffect(() => {
    if (state.waUrl && state.bookingCode) {
      window.open(state.waUrl, "_blank");
      router.push(`/checkout?success=${state.bookingCode}`);
    }
  }, [state.waUrl, state.bookingCode, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="packageSlug" value={props.packageSlug} />
      <input type="hidden" name="startDate" value={props.startDate} />
      <input type="hidden" name="adultCount" value={props.adultCount} />
      <input type="hidden" name="childCount" value={props.childCount} />
      <input type="hidden" name="nasiLiwetCount" value={props.nasiLiwetCount} />
      <input type="hidden" name="pickupCount" value={props.pickupCount} />
      <input type="hidden" name="fullName" value={props.fullName} />
      <input type="hidden" name="phone" value={props.phone} />
      <input type="hidden" name="email" value={props.email} />
      <input type="hidden" name="city" value={props.city} />

      {state.error && (
        <div className="checkout-error" style={{ marginBottom: 12 }}>
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          display: "block",
          width: "100%",
          padding: "14px",
          borderRadius: 14,
          background: pending ? "#94a3b8" : "#166534",
          color: "#fff",
          fontSize: 15,
          fontWeight: 800,
          textAlign: "center",
          border: "none",
          cursor: pending ? "default" : "pointer",
        }}
      >
        {pending ? "Menyimpan pesanan..." : "Konfirmasi Pembayaran via WhatsApp"}
      </button>
    </form>
  );
}
