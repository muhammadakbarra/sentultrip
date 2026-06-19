"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type BookingFlowProps = {
  packageSlug: string;
  packageName: string;
  price: number;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function dateOnly(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function monthLabel(date: Date) {
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(date);
}

function formatDisplayDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

const dayLabels = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function BookingFlow({ packageSlug, packageName, price }: BookingFlowProps) {
  const router = useRouter();
  const minDate = useMemo(() => dateOnly(addDays(new Date(), 3)), []);
  const minDateObject = useMemo(() => startOfDay(addDays(new Date(), 3)), []);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const date = addDays(new Date(), 3);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"date" | "travellers">("date");
  const [startDate, setStartDate] = useState(minDate);
  const [adultCount, setAdultCount] = useState(0);

  const total = adultCount * price;
  const calendarDays = useMemo(() => {
    const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
    const cells: Array<{ key: string; label: string; value?: string; disabled?: boolean }> = [];

    for (let i = 0; i < startOffset; i += 1) {
      cells.push({ key: `empty-${i}`, label: "" });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
      const value = dateOnly(date);
      cells.push({
        key: value,
        label: String(day),
        value,
        disabled: startOfDay(date) < minDateObject,
      });
    }

    return cells;
  }, [minDateObject, visibleMonth]);

  const canGoPrevMonth =
    visibleMonth.getFullYear() > minDateObject.getFullYear() ||
    visibleMonth.getMonth() > minDateObject.getMonth();

  const increaseAdult = () => {
    setAdultCount((count) => (count < 3 ? 3 : count + 1));
  };

  const decreaseAdult = () => {
    setAdultCount((count) => {
      if (count <= 3) return 0;
      return count - 1;
    });
  };

  const goCheckout = () => {
    if (adultCount < 3) return;
    const query = new URLSearchParams({
      package: packageSlug,
      startDate,
      adult: String(adultCount),
    });
    router.push(`/checkout?${query.toString()}`);
  };

  return (
    <>
      <button type="button" className="primary-cta availability-btn" onClick={() => setOpen(true)}>
        Cek Ketersediaan
      </button>

      {open ? (
        <div className="booking-modal-backdrop" role="dialog" aria-modal="true">
          <div className="booking-modal-card">
            <button
              type="button"
              className="booking-modal-close"
              aria-label="Tutup modal"
              onClick={() => {
                setOpen(false);
                setStep("date");
              }}
            >
              ×
            </button>

            {step === "date" ? (
              <div>
                <p className="booking-modal-kicker">Cek Ketersediaan</p>
                <h2 className="booking-modal-title">Pilih tanggal perjalanan</h2>

                <div className="booking-calendar">
                  <div className="booking-calendar-head">
                    <button
                      type="button"
                      onClick={() => setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
                      disabled={!canGoPrevMonth}
                    >
                      ‹
                    </button>
                    <strong>{monthLabel(visibleMonth)}</strong>
                    <button
                      type="button"
                      onClick={() => setVisibleMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
                    >
                      ›
                    </button>
                  </div>
                  <div className="booking-calendar-weekdays">
                    {dayLabels.map((day) => <span key={day}>{day}</span>)}
                  </div>
                  <div className="booking-calendar-grid">
                    {calendarDays.map((day) =>
                      day.value ? (
                        <button
                          key={day.key}
                          type="button"
                          disabled={day.disabled}
                          className={day.value === startDate ? "selected" : ""}
                          onClick={() => setStartDate(day.value!)}
                        >
                          {day.label}
                        </button>
                      ) : (
                        <span key={day.key} />
                      ),
                    )}
                  </div>
                </div>

                <button type="button" className="booking-modal-primary" onClick={() => setStep("travellers")}>
                  Lanjutkan
                </button>
              </div>
            ) : (
              <div>
                <p className="booking-modal-kicker">Tipe Paket</p>
                <h2 className="booking-modal-title">Pilih jumlah traveller</h2>

                <div className="package-type-card">
                  <div>
                    <h3>Dewasa</h3>
                    <p>{formatPrice(price)} / orang</p>
                    <small>Minimum pemesanan 3 orang</small>
                  </div>
                  <div className="traveller-counter">
                    <button type="button" onClick={decreaseAdult}>−</button>
                    <strong>{adultCount}</strong>
                    <button type="button" onClick={increaseAdult}>+</button>
                  </div>
                </div>

                <div className="booking-summary-box">
                  <h3>Ringkasan Pemesanan</h3>
                  <div><span>Nama Paket</span><strong>{packageName}</strong></div>
                  <div><span>Tanggal Mulai</span><strong>{formatDisplayDate(startDate)}</strong></div>
                  <div><span>Total</span><strong>{formatPrice(total)}</strong></div>
                </div>

                <button
                  type="button"
                  className="booking-modal-primary"
                  disabled={adultCount < 3}
                  onClick={goCheckout}
                >
                  Proses
                </button>
                {adultCount < 3 ? <p className="booking-help">Pilih minimal 3 adult untuk melanjutkan.</p> : null}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
