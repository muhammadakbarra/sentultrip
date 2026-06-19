"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell,
  Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { logoutAction } from "@/app/admin/actions";

type MenuKey = "statistik" | "pesanan" | "data";

type AnalyticsSummary = {
  activeUsers: number;
  totalUsers: number;
  newUsers: number;
  screenPageViews: number;
  sessions: number;
  engagementRate: number;
  avgSessionDuration: number;
  topPages: Array<{ path: string; title: string; views: number }>;
  trafficSources: Array<{ source: string; sessions: number }>;
  dailyTrend: Array<{ date: string; pageViews: number; sessions: number }>;
  devices: Array<{ device: string; sessions: number }>;
  countries: Array<{ country: string; sessions: number }>;
  newVsReturning: Array<{ type: string; sessions: number }>;
  browsers: Array<{ browser: string; sessions: number }>;
  cities: Array<{ city: string; sessions: number }>;
  landingPages: Array<{ path: string; sessions: number }>;
};

const DEVICE_COLORS = ["#166534", "#22c55e", "#86efac"];
const NVR_COLORS = ["#166534", "#f59e0b"];
const CHART_TOOLTIP_STYLE = {
  borderRadius: 12,
  border: "1px solid #e2e8e5",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  fontSize: 13,
  fontWeight: 700,
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}d`;
  return `${m}m ${s.toString().padStart(2, "0")}d`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
  { key: "data", label: "Data", icon: "🔐", description: "Credential rahasia" },
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
  if (!value) return "-";

  const raw = String(value);
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const parsedDate = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(raw);

  if (Number.isNaN(parsedDate.getTime())) return raw;

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
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

  const stats = useMemo(() => {
    const s = analytics.summary;
    const loading = analytics.loading;
    const n = (v?: number) => (s ? formatNumber(v ?? 0) : loading ? "…" : "0");
    const pct = (v?: number) => (s ? `${((v ?? 0) * 100).toFixed(1)}%` : loading ? "…" : "0%");
    const dur = (v?: number) => (s ? formatDuration(v ?? 0) : loading ? "…" : "0d");
    return [
      ["Pengguna Aktif", n(s?.activeUsers), "Realtime saat ini"],
      ["Total Pengguna", n(s?.totalUsers), "30 hari terakhir"],
      ["Pengguna Baru", n(s?.newUsers), "30 hari terakhir"],
      ["Tampilan Halaman", n(s?.screenPageViews), "30 hari terakhir"],
      ["Sesi", n(s?.sessions), "30 hari terakhir"],
      ["Tingkat Engagement", pct(s?.engagementRate), "30 hari terakhir"],
      ["Rata-rata Durasi", dur(s?.avgSessionDuration), "30 hari terakhir"],
    ];
  }, [analytics]);

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
            {/* Stats cards */}
            <div className="admin-stat-grid">
              {stats.map(([label, value, caption]) => (
                <div key={label} className="admin-stat-card">
                  <p className="admin-stat-label">{label}</p>
                  <p className="admin-stat-value">{value}</p>
                  <p className="admin-stat-caption">{caption}</p>
                </div>
              ))}
            </div>

            {analytics.setupRequired || analytics.error ? (
              <div className="admin-content-card">
                <div className="admin-placeholder" style={{ minHeight: 180 }}>
                  <h3 className="admin-placeholder-title">
                    {analytics.setupRequired ? "Setup Analytics Belum Lengkap" : "Error Analytics"}
                  </h3>
                  <p className="admin-stat-caption" style={{ marginTop: 12 }}>{analytics.error}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Trend chart */}
                <div className="admin-chart-section">
                  <p className="admin-kicker">30 Hari Terakhir</p>
                  <h2 className="admin-chart-title">Tren Kunjungan</h2>
                  <p className="admin-chart-subtitle">Tampilan Halaman dan Sesi harian</p>
                  {analytics.loading ? (
                    <p className="admin-stat-caption" style={{ marginTop: 24 }}>Memuat data…</p>
                  ) : (analytics.summary?.dailyTrend?.length ?? 0) > 0 ? (
                    <div style={{ marginTop: 24 }}>
                      <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={analytics.summary!.dailyTrend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                          <defs>
                            <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#166534" stopOpacity={0.18} />
                              <stop offset="95%" stopColor="#166534" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="sesGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.18} />
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e5" vertical={false} />
                          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} interval={4} />
                          <YAxis tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), ""]} />
                          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, fontWeight: 700, paddingTop: 12 }} />
                          <Area type="monotone" dataKey="pageViews" name="Tampilan Halaman" stroke="#166534" fill="url(#pvGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                          <Area type="monotone" dataKey="sessions" name="Sesi" stroke="#22c55e" fill="url(#sesGrad)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <p className="admin-stat-caption" style={{ marginTop: 24 }}>Belum ada data tren.</p>
                  )}
                </div>

                {/* Traffic + Device */}
                <div className="admin-chart-grid">
                  <div className="admin-chart-panel">
                    <p className="admin-chart-title">Sumber Traffic</p>
                    <p className="admin-chart-subtitle">Sesi 30 hari terakhir</p>
                    {analytics.loading ? (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                    ) : (analytics.summary?.trafficSources?.length ?? 0) > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={analytics.summary!.trafficSources} margin={{ top: 12, right: 4, left: -24, bottom: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e5" vertical={false} />
                          <XAxis dataKey="source" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={60} />
                          <YAxis tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), "Sesi"]} />
                          <Bar dataKey="sessions" fill="#166534" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data traffic.</p>
                    )}
                  </div>

                  <div className="admin-chart-panel">
                    <p className="admin-chart-title">Perangkat</p>
                    <p className="admin-chart-subtitle">Distribusi sesi per perangkat</p>
                    {analytics.loading ? (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                    ) : (analytics.summary?.devices?.length ?? 0) > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={analytics.summary!.devices.map((d) => ({ name: capitalize(d.device), value: d.sessions }))}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="42%"
                            outerRadius="60%"
                            strokeWidth={2}
                            stroke="#ffffff"
                          >
                            {analytics.summary!.devices.map((_, i) => (
                              <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), "Sesi"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data perangkat.</p>
                    )}
                  </div>
                </div>

                {/* Countries + New vs Returning */}
                <div className="admin-chart-grid">
                  <div className="admin-chart-panel">
                    <p className="admin-chart-title">Top Negara</p>
                    <p className="admin-chart-subtitle">Asal pengunjung 30 hari terakhir</p>
                    {analytics.loading ? (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                    ) : (analytics.summary?.countries?.length ?? 0) > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart layout="vertical" data={analytics.summary!.countries} margin={{ top: 12, right: 16, left: 4, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e5" horizontal={false} />
                          <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                          <YAxis type="category" dataKey="country" width={80} tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), "Sesi"]} />
                          <Bar dataKey="sessions" fill="#166534" radius={[0, 6, 6, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data negara.</p>
                    )}
                  </div>

                  <div className="admin-chart-panel">
                    <p className="admin-chart-title">Pengguna Baru vs Kembali</p>
                    <p className="admin-chart-subtitle">Komposisi sesi 30 hari</p>
                    {analytics.loading ? (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                    ) : (analytics.summary?.newVsReturning?.length ?? 0) > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={analytics.summary!.newVsReturning.map((d) => ({
                              name: d.type === "new" ? "Baru" : "Kembali",
                              value: d.sessions,
                            }))}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="42%"
                            innerRadius="38%"
                            outerRadius="60%"
                            strokeWidth={2}
                            stroke="#ffffff"
                          >
                            {analytics.summary!.newVsReturning.map((_, i) => (
                              <Cell key={i} fill={NVR_COLORS[i % NVR_COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), "Sesi"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data pengguna.</p>
                    )}
                  </div>
                </div>

                {/* Browser + City */}
                <div className="admin-chart-grid">
                  <div className="admin-chart-panel">
                    <p className="admin-chart-title">Browser</p>
                    <p className="admin-chart-subtitle">Browser yang digunakan pengunjung</p>
                    {analytics.loading ? (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                    ) : (analytics.summary?.browsers?.length ?? 0) > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={analytics.summary!.browsers.map((b) => ({ name: b.browser, value: b.sessions }))}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="42%"
                            outerRadius="60%"
                            strokeWidth={2}
                            stroke="#ffffff"
                          >
                            {analytics.summary!.browsers.map((_, i) => (
                              <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend iconType="circle" iconSize={9} wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), "Sesi"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data browser.</p>
                    )}
                  </div>

                  <div className="admin-chart-panel">
                    <p className="admin-chart-title">Top Kota</p>
                    <p className="admin-chart-subtitle">Kota asal pengunjung 30 hari terakhir</p>
                    {analytics.loading ? (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                    ) : (analytics.summary?.cities?.length ?? 0) > 0 ? (
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart layout="vertical" data={analytics.summary!.cities} margin={{ top: 12, right: 16, left: 4, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e5" horizontal={false} />
                          <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                          <YAxis type="category" dataKey="city" width={80} tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatNumber(Number(v ?? 0)), "Sesi"]} />
                          <Bar dataKey="sessions" fill="#22c55e" radius={[0, 6, 6, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data kota.</p>
                    )}
                  </div>
                </div>

                {/* Top Pages */}
                <div className="admin-chart-section">
                  <p className="admin-kicker">Analytics</p>
                  <h2 className="admin-chart-title">Top Halaman</h2>
                  <p className="admin-chart-subtitle">Halaman paling banyak dikunjungi (30 hari)</p>
                  {analytics.loading ? (
                    <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                  ) : (analytics.summary?.topPages?.length ?? 0) > 0 ? (() => {
                    const maxViews = Math.max(...analytics.summary!.topPages.map((p) => p.views), 1);
                    return (
                      <div className="admin-top-pages-list">
                        {analytics.summary!.topPages.map((page) => (
                          <div className="admin-top-pages-row" key={`${page.path}-${page.title}`}>
                            <div className="admin-top-pages-info">
                              <p className="admin-analytics-row-title">{page.title}</p>
                              <p className="admin-analytics-row-subtitle">{page.path}</p>
                            </div>
                            <div className="admin-top-pages-bar-wrap">
                              <div
                                className="admin-top-pages-bar"
                                style={{ width: `${(page.views / maxViews) * 100}%` }}
                              />
                            </div>
                            <strong className="admin-top-pages-count">{formatNumber(page.views)}</strong>
                          </div>
                        ))}
                      </div>
                    );
                  })() : (
                    <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data halaman.</p>
                  )}
                </div>

                {/* Landing Pages */}
                <div className="admin-chart-section">
                  <p className="admin-kicker">SEO & Entry Point</p>
                  <h2 className="admin-chart-title">Halaman Masuk</h2>
                  <p className="admin-chart-subtitle">Halaman pertama yang dikunjungi per sesi (30 hari)</p>
                  {analytics.loading ? (
                    <p className="admin-stat-caption" style={{ marginTop: 16 }}>Memuat data…</p>
                  ) : (analytics.summary?.landingPages?.length ?? 0) > 0 ? (() => {
                    const maxSessions = Math.max(...analytics.summary!.landingPages.map((p) => p.sessions), 1);
                    return (
                      <div className="admin-top-pages-list">
                        {analytics.summary!.landingPages.map((page) => (
                          <div className="admin-top-pages-row" key={page.path}>
                            <div className="admin-top-pages-info">
                              <p className="admin-analytics-row-title">{page.path}</p>
                              <p className="admin-analytics-row-subtitle">Titik Masuk</p>
                            </div>
                            <div className="admin-top-pages-bar-wrap">
                              <div
                                className="admin-top-pages-bar"
                                style={{ width: `${(page.sessions / maxSessions) * 100}%`, background: "#22c55e" }}
                              />
                            </div>
                            <strong className="admin-top-pages-count">{formatNumber(page.sessions)}</strong>
                          </div>
                        ))}
                      </div>
                    );
                  })() : (
                    <p className="admin-stat-caption" style={{ marginTop: 16 }}>Belum ada data halaman masuk.</p>
                  )}
                </div>
              </>
            )}
          </>
        ) : activeMenu === "pesanan" ? (
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
                <h3 className="admin-placeholder-title">Error Pesanan</h3>
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
                      <div><span>Kode Trip</span><strong>{booking.tripCode}</strong></div>
                      <div><span>Peserta</span><strong>Dewasa {booking.adultCount}</strong></div>
                      <div><span>Harga Satuan</span><strong>{formatCurrency(booking.adultPrice)}</strong></div>
                      <div><span>Nomor HP</span><strong>{booking.phone || "-"}</strong></div>
                      <div><span>Kota</span><strong>{booking.city}, {booking.country}</strong></div>
                      <div><span>Pembayaran</span><strong>{booking.paymentMethod === "bank_transfer" ? "Transfer Bank" : booking.paymentMethod}</strong></div>
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
        ) : (
          <div className="admin-content-card">
            <div className="admin-content-header">
              <div>
                <p className="admin-kicker">Data Rahasia</p>
                <h2 className="admin-content-title">Data</h2>
              </div>
              <div className="admin-content-icon">🔐</div>
            </div>

            <div className="admin-data-section">
              <div>
                <p className="admin-kicker">Payment Credential</p>
                <h3 className="admin-data-title">Detail Rekening</h3>
                <p className="admin-data-text">
                  Data ini disiapkan untuk kebutuhan internal seperti instruksi pembayaran booking.
                </p>
              </div>
              <BankAccountCard
                state={bankAccountState}
                onEdit={() => setBankAccountState((current) => ({ ...current, editing: true }))}
                onCancel={() => setBankAccountState((current) => ({ ...current, editing: false }))}
                onSave={saveBankAccount}
              />
            </div>
          </div>
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
