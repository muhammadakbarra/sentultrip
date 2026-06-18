"use client";

import { useEffect, useMemo, useState } from "react";
import { logoutAction } from "@/app/admin/actions";

type MenuKey = "statistik" | "pesanan";

type AnalyticsSummary = {
  activeUsers: number;
  totalUsers: number;
  screenPageViews: number;
  sessions: number;
  topPages: Array<{ path: string; title: string; views: number }>;
  trafficSources: Array<{ source: string; sessions: number }>;
};

type AnalyticsState = {
  loading: boolean;
  setupRequired: boolean;
  error?: string;
  summary?: AnalyticsSummary;
};

type Booking = {
  id: number;
  bookingCode: string;
  packageName: string;
  tripCode: string;
  startDate: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  totalAmount: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

type BookingsState = {
  loading: boolean;
  error?: string;
  bookings: Booking[];
};

type BankAccount = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  updatedAt?: string;
};

type BankAccountState = {
  loading: boolean;
  saving: boolean;
  editing: boolean;
  error?: string;
  bankAccount?: BankAccount | null;
};

const menuItems: Array<{ key: MenuKey; label: string; icon: string; description: string }> = [
  { key: "statistik", label: "Statistik", icon: "📊", description: "Google Analytics" },
  { key: "pesanan", label: "Pesanan", icon: "🧾", description: "Booking pelanggan" },
];

function formatNumber(value?: number) {
  return new Intl.NumberFormat("id-ID").format(value || 0);
}

function formatCurrency(value?: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDisplayDate(value: string) {
  const dateOnly = value.slice(0, 10);
  const [year, month, day] = dateOnly.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function AdminDashboard({ username }: { username: string }) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("statistik");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsState>({
    loading: true,
    setupRequired: false,
  });
  const [bookingsState, setBookingsState] = useState<BookingsState>({
    loading: true,
    bookings: [],
  });
  const [bankAccountState, setBankAccountState] = useState<BankAccountState>({
    loading: true,
    saving: false,
    editing: false,
    bankAccount: null,
  });
  const active = useMemo(() => menuItems.find((item) => item.key === activeMenu)!, [activeMenu]);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      setAnalytics((current) => ({ ...current, loading: true }));

      try {
        const response = await fetch("/api/admin/analytics", { cache: "no-store" });
        const data = await response.json();

        if (cancelled) return;

        setAnalytics({
          loading: false,
          setupRequired: Boolean(data.setupRequired),
          error: data.error,
          summary: data.summary,
        });
      } catch {
        if (cancelled) return;
        setAnalytics({
          loading: false,
          setupRequired: false,
          error: "Gagal memuat data Google Analytics.",
        });
      }
    }

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadBankAccount() {
      setBankAccountState((current) => ({ ...current, loading: true }));

      try {
        const response = await fetch("/api/admin/bank-account", { cache: "no-store" });
        const data = await response.json();

        if (cancelled) return;

        setBankAccountState({
          loading: false,
          saving: false,
          editing: !data.bankAccount,
          error: data.error,
          bankAccount: data.bankAccount,
        });
      } catch {
        if (cancelled) return;
        setBankAccountState({
          loading: false,
          saving: false,
          editing: true,
          error: "Gagal memuat detail rekening.",
          bankAccount: null,
        });
      }
    }

    loadBankAccount();

    return () => {
      cancelled = true;
    };
  }, []);

  async function saveBankAccount(formData: FormData) {
    setBankAccountState((current) => ({ ...current, saving: true, error: undefined }));

    try {
      const response = await fetch("/api/admin/bank-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName: String(formData.get("bankName") || ""),
          accountNumber: String(formData.get("accountNumber") || ""),
          accountHolder: String(formData.get("accountHolder") || ""),
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Gagal menyimpan detail rekening.");

      setBankAccountState({
        loading: false,
        saving: false,
        editing: false,
        bankAccount: data.bankAccount,
      });
    } catch (error) {
      setBankAccountState((current) => ({
        ...current,
        saving: false,
        error: error instanceof Error ? error.message : "Gagal menyimpan detail rekening.",
      }));
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function loadBookings() {
      setBookingsState((current) => ({ ...current, loading: true }));

      try {
        const response = await fetch("/api/admin/bookings", { cache: "no-store" });
        const data = await response.json();

        if (cancelled) return;

        setBookingsState({
          loading: false,
          error: data.error,
          bookings: data.bookings || [],
        });
      } catch {
        if (cancelled) return;
        setBookingsState({
          loading: false,
          error: "Gagal memuat data pesanan.",
          bookings: [],
        });
      }
    }

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = analytics.summary
    ? [
        ["Active Users", formatNumber(analytics.summary.activeUsers), "Realtime saat ini"],
        ["Total Users", formatNumber(analytics.summary.totalUsers), "30 hari terakhir"],
        ["Page Views", formatNumber(analytics.summary.screenPageViews), "30 hari terakhir"],
      ]
    : [
        ["Active Users", analytics.loading ? "..." : "0", "Realtime saat ini"],
        ["Total Users", analytics.loading ? "..." : "0", "30 hari terakhir"],
        ["Page Views", analytics.loading ? "..." : "0", "30 hari terakhir"],
      ];

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-panel">
          <div className="admin-sidebar-brand">
            <div className="admin-sidebar-logo">ST</div>
            <div>
              <div className="admin-sidebar-title">SentulTrip</div>
              <div className="admin-sidebar-subtitle">Admin</div>
            </div>
          </div>

          <nav className="admin-nav">
            {menuItems.map((item) => {
              const isActive = item.key === activeMenu;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveMenu(item.key)}
                  className={`admin-nav-button${isActive ? " active" : ""}`}
                >
                  <div className="admin-nav-row">
                    <span className="admin-nav-icon">{item.icon}</span>
                    <span>
                      <span className="admin-nav-label">{item.label}</span>
                      <span className="admin-nav-desc">{item.description}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="admin-sidebar-footer">
            <p className="admin-sidebar-footer-label">Login sebagai</p>
            <p className="admin-sidebar-user">{username}</p>
            <button
              type="button"
              className="admin-logout-button"
              onClick={() => setShowLogoutConfirm(true)}
            >
              Keluar
            </button>
          </div>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-row">
            <div>
              <p className="admin-kicker">Dashboard</p>
              <h1 className="admin-page-title">{active.label}</h1>
            </div>
            <div className="admin-status-pill">Online</div>
          </div>

          <div className="admin-mobile-nav">
            {menuItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveMenu(item.key)}
                className={`admin-mobile-nav-button${item.key === activeMenu ? " active" : ""}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </header>

        {activeMenu === "statistik" ? (
          <>
            <div className="admin-stat-grid">
              {stats.map(([label, value, caption]) => (
                <div key={label} className="admin-stat-card">
                  <p className="admin-stat-label">{label}</p>
                  <p className="admin-stat-value">{value}</p>
                  <p className="admin-stat-caption">{caption}</p>
                </div>
              ))}
            </div>

            <div className="admin-content-card">
              <div className="admin-content-header">
                <div>
                  <p className="admin-kicker">Google Analytics</p>
                  <h2 className="admin-content-title">Statistik Website</h2>
                </div>
                <div className="admin-content-icon">📈</div>
              </div>

              {analytics.setupRequired || analytics.error ? (
                <div className="admin-placeholder">
                  <h3 className="admin-placeholder-title">
                    {analytics.setupRequired ? "Setup Analytics Belum Lengkap" : "Analytics Error"}
                  </h3>
                  <p className="admin-stat-caption" style={{ marginTop: 12 }}>
                    {analytics.error}
                  </p>
                </div>
              ) : (
                <div className="admin-analytics-grid">
                  <section className="admin-analytics-panel">
                    <h3 className="admin-analytics-title">Top Halaman</h3>
                    <div className="admin-analytics-list">
                      {analytics.loading ? (
                        <p className="admin-stat-caption">Memuat data...</p>
                      ) : analytics.summary?.topPages.length ? (
                        analytics.summary.topPages.map((page) => (
                          <div className="admin-analytics-row" key={`${page.path}-${page.title}`}>
                            <div>
                              <p className="admin-analytics-row-title">{page.title}</p>
                              <p className="admin-analytics-row-subtitle">{page.path}</p>
                            </div>
                            <strong>{formatNumber(page.views)}</strong>
                          </div>
                        ))
                      ) : (
                        <p className="admin-stat-caption">Belum ada data halaman.</p>
                      )}
                    </div>
                  </section>

                  <section className="admin-analytics-panel">
                    <h3 className="admin-analytics-title">Sumber Traffic</h3>
                    <div className="admin-analytics-list">
                      {analytics.loading ? (
                        <p className="admin-stat-caption">Memuat data...</p>
                      ) : analytics.summary?.trafficSources.length ? (
                        analytics.summary.trafficSources.map((source) => (
                          <div className="admin-analytics-row" key={source.source}>
                            <div>
                              <p className="admin-analytics-row-title">{source.source}</p>
                              <p className="admin-analytics-row-subtitle">Sessions</p>
                            </div>
                            <strong>{formatNumber(source.sessions)}</strong>
                          </div>
                        ))
                      ) : (
                        <p className="admin-stat-caption">Belum ada data traffic.</p>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="admin-content-card">
              <div className="admin-content-header">
                <div>
                  <p className="admin-kicker">Payment Setting</p>
                  <h2 className="admin-content-title">Detail Rekening</h2>
                </div>
                <div className="admin-content-icon">🏦</div>
              </div>

              <BankAccountCard
                state={bankAccountState}
                onEdit={() => setBankAccountState((current) => ({ ...current, editing: true }))}
                onCancel={() => setBankAccountState((current) => ({ ...current, editing: false }))}
                onSave={saveBankAccount}
              />
            </div>

            <div className="admin-content-card">
              <div className="admin-content-header">
                <div>
                  <p className="admin-kicker">Booking</p>
                  <h2 className="admin-content-title">Pesanan</h2>
                </div>
                <div className="admin-content-icon">🧾</div>
              </div>

              {bookingsState.loading ? (
                <div className="admin-placeholder">
                  <h3 className="admin-placeholder-title">Memuat pesanan...</h3>
                </div>
              ) : bookingsState.error ? (
                <div className="admin-placeholder">
                  <h3 className="admin-placeholder-title">Pesanan Error</h3>
                  <p className="admin-stat-caption" style={{ marginTop: 12 }}>
                    {bookingsState.error}
                  </p>
                </div>
              ) : bookingsState.bookings.length ? (
                <div className="admin-booking-list">
                  {bookingsState.bookings.map((booking) => (
                    <article className="admin-booking-card" key={booking.id}>
                      <div>
                        <p className="admin-booking-code">{booking.bookingCode}</p>
                        <h3>{booking.packageName}</h3>
                        <p className="admin-booking-customer">
                          {[booking.firstName, booking.lastName].filter(Boolean).join(" ")} · {booking.email}
                        </p>
                      </div>
                      <div className="admin-booking-meta">
                        <span>{formatDisplayDate(booking.startDate)}</span>
                        <strong>{formatCurrency(booking.totalAmount)}</strong>
                      </div>
                      <div className="admin-booking-detail-grid">
                        <div><span>Trip Code</span><strong>{booking.tripCode}</strong></div>
                        <div><span>Traveller</span><strong>Adult {booking.adultCount}</strong></div>
                        <div><span>Harga Satuan</span><strong>{formatCurrency(booking.adultPrice)}</strong></div>
                        <div><span>Nomor HP</span><strong>{booking.phone || "-"}</strong></div>
                        <div><span>Kota</span><strong>{booking.city}, {booking.country}</strong></div>
                        <div><span>Payment</span><strong>{booking.paymentMethod === "bank_transfer" ? "Bank Transfer" : booking.paymentMethod}</strong></div>
                        <div><span>Status</span><strong>{booking.status}</strong></div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="admin-placeholder">
                  <h3 className="admin-placeholder-title">Belum ada pesanan</h3>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {showLogoutConfirm ? (
        <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className="admin-modal-card">
            <div className="admin-modal-icon">↪</div>
            <h2 id="logout-title" className="admin-modal-title">
              Keluar dari dashboard?
            </h2>
            <p className="admin-modal-text">
              Sesi admin akan diakhiri dan Bos perlu login kembali untuk membuka dashboard.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-modal-button secondary"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Batal
              </button>
              <form action={logoutAction}>
                <button className="admin-modal-button danger">Ya, Keluar</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function BankAccountCard({
  state,
  onEdit,
  onCancel,
  onSave,
}: {
  state: BankAccountState;
  onEdit: () => void;
  onCancel: () => void;
  onSave: (formData: FormData) => void;
}) {
  if (state.loading) {
    return (
      <div className="admin-bank-card">
        <p className="admin-stat-caption">Memuat detail rekening...</p>
      </div>
    );
  }

  if (!state.editing && state.bankAccount) {
    return (
      <div className="admin-bank-card">
        <div className="admin-bank-detail-grid">
          <div>
            <span>Nama Bank</span>
            <strong>{state.bankAccount.bankName}</strong>
          </div>
          <div>
            <span>Nomor Rekening</span>
            <strong>{state.bankAccount.accountNumber}</strong>
          </div>
          <div>
            <span>Atas Nama</span>
            <strong>{state.bankAccount.accountHolder}</strong>
          </div>
        </div>
        <button type="button" className="admin-bank-edit-btn" onClick={onEdit}>
          Edit Detail Rekening
        </button>
      </div>
    );
  }

  return (
    <form action={onSave} className="admin-bank-form">
      {state.error ? <div className="admin-bank-error">{state.error}</div> : null}
      <div className="admin-bank-form-grid">
        <label>
          Nama Bank
          <input name="bankName" defaultValue={state.bankAccount?.bankName || ""} required />
        </label>
        <label>
          Nomor Rekening
          <input name="accountNumber" defaultValue={state.bankAccount?.accountNumber || ""} required />
        </label>
        <label>
          Atas Nama
          <input name="accountHolder" defaultValue={state.bankAccount?.accountHolder || ""} required />
        </label>
      </div>
      <div className="admin-bank-actions">
        {state.bankAccount ? (
          <button type="button" className="admin-bank-cancel-btn" onClick={onCancel}>
            Batal
          </button>
        ) : null}
        <button className="admin-bank-save-btn" disabled={state.saving}>
          {state.saving ? "Menyimpan..." : "Simpan Detail Rekening"}
        </button>
      </div>
    </form>
  );
}
