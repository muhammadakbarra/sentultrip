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
    <main className="min-h-screen bg-[#f4f7f5] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 p-6 lg:block">
          <div className="flex h-full flex-col rounded-[32px] bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.20)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-xl font-black text-slate-950">
                ST
              </div>
              <div>
                <div className="text-xl font-black tracking-[-0.03em]">SentulTrip</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin</div>
              </div>
            </div>

            <nav className="mt-12 space-y-3">
              {menuItems.map((item) => {
                const isActive = item.key === activeMenu;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveMenu(item.key)}
                    className={`w-full rounded-3xl p-4 text-left transition ${
                      isActive
                        ? "bg-green-500 text-slate-950 shadow-[0_14px_32px_rgba(34,197,94,0.22)]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl">
                        {item.icon}
                      </span>
                      <div>
                        <div className="text-base font-black">{item.label}</div>
                        <div className={`mt-1 text-xs font-medium ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Login</p>
              <p className="mt-2 text-lg font-black text-white">{username}</p>
              <form action={logoutAction} className="mt-5">
                <button className="h-11 w-full rounded-2xl border border-white/10 text-sm font-black text-slate-200 transition hover:bg-white/10">
                  Keluar
                </button>
              </form>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-6 lg:px-8">
          <header className="rounded-[32px] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-green-700">Dashboard</p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-950 lg:text-4xl">
                  {active.label}
                </h1>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-black text-slate-700">
                Online
              </div>
            </div>

            <div className="mt-6 flex gap-3 overflow-x-auto lg:hidden">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveMenu(item.key)}
                  className={`h-12 shrink-0 rounded-2xl px-5 text-sm font-black transition ${
                    item.key === activeMenu ? "bg-green-700 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Total Booking", "0", "Belum ada data"],
              ["Pendapatan", "Rp0", "Menunggu transaksi"],
              ["Paket Aktif", "0", "Belum terhubung"],
            ].map(([label, value, caption]) => (
              <div key={label} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <p className="mt-5 text-4xl font-black tracking-[-0.05em] text-slate-950">{value}</p>
                <p className="mt-3 text-sm font-medium text-slate-500">{caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[36px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-10">
            <div className="flex items-center justify-between gap-6 border-b border-slate-100 pb-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-green-700">Main Content</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-slate-950">
                  {active.label}
                </h2>
              </div>
              <div className="hidden h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-3xl md:flex">
                {active.icon}
              </div>
            </div>

            <div className="mt-8 min-h-[560px] rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8">
              <h3 className="text-3xl font-black tracking-[-0.04em] text-slate-900">{active.label}</h3>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
