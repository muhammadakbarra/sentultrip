"use client";

import { useMemo, useState } from "react";
import { logoutAction } from "@/app/admin/actions";

type MenuKey = "statistik" | "pesanan";

const menuItems: Array<{ key: MenuKey; label: string; icon: string; description: string }> = [
  { key: "statistik", label: "Statistik", icon: "📊", description: "Ringkasan performa" },
  { key: "pesanan", label: "Pesanan", icon: "🧾", description: "Booking pelanggan" },
];

export default function AdminDashboard({ username }: { username: string }) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("statistik");
  const active = useMemo(() => menuItems.find((item) => item.key === activeMenu)!, [activeMenu]);

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
            <form action={logoutAction}>
              <button className="admin-logout-button">Keluar</button>
            </form>
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

        <div className="admin-stat-grid">
          {[
            ["Total Booking", "0", "Belum ada data"],
            ["Pendapatan", "Rp0", "Menunggu transaksi"],
            ["Paket Aktif", "0", "Belum terhubung"],
          ].map(([label, value, caption]) => (
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
              <p className="admin-kicker">Main Content</p>
              <h2 className="admin-content-title">{active.label}</h2>
            </div>
            <div className="admin-content-icon">{active.icon}</div>
          </div>

          <div className="admin-placeholder">
            <h3 className="admin-placeholder-title">{active.label}</h3>
          </div>
        </div>
      </section>
    </main>
  );
}
