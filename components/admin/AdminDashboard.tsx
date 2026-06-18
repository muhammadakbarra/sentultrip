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

const menuItems: Array<{ key: MenuKey; label: string; icon: string; description: string }> = [
  { key: "statistik", label: "Statistik", icon: "📊", description: "Google Analytics" },
  { key: "pesanan", label: "Pesanan", icon: "🧾", description: "Booking pelanggan" },
];

function formatNumber(value?: number) {
  return new Intl.NumberFormat("id-ID").format(value || 0);
}

export default function AdminDashboard({ username }: { username: string }) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("statistik");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsState>({
    loading: true,
    setupRequired: false,
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
          <div className="admin-content-card">
            <div className="admin-content-header">
              <div>
                <p className="admin-kicker">Main Content</p>
                <h2 className="admin-content-title">Pesanan</h2>
              </div>
              <div className="admin-content-icon">🧾</div>
            </div>

            <div className="admin-placeholder">
              <h3 className="admin-placeholder-title">Pesanan</h3>
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
