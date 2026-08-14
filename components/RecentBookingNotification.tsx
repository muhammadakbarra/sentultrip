"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import packages from "@/data/packages";

interface NotificationItem {
  id: number;
  name: string;
  action: string;
  packageName: string;
  slug: string;
  avatarColor: { head: string; body: string; bg: string };
  timeAgo: string;
}

const BUYER_NAMES = [
  { name: "Akbar Pratama", head: "#8d5b36", body: "#0d9488", bg: "#e6f4ea" },
  { name: "Michelle Karman", head: "#a16b47", body: "#059669", bg: "#ecfdf5" },
  { name: "Rizky Maulana", head: "#784b28", body: "#2563eb", bg: "#eff6ff" },
  { name: "Amanda Putri", head: "#b47c54", body: "#db2777", bg: "#fdf2f8" },
  { name: "Dimas Setiawan", head: "#6b4324", body: "#16a34a", bg: "#f0fdf4" },
  { name: "Jessica Tan", head: "#a3704c", body: "#7c3aed", bg: "#f5f3ff" },
  { name: "Fajar Ramadhan", head: "#825330", body: "#ea580c", bg: "#fff7ed" },
  { name: "Citra Lestari", head: "#9c6843", body: "#0891b2", bg: "#ecfeff" },
  { name: "Bayu Nugroho", head: "#7a4e2d", body: "#0284c7", bg: "#f0f9ff" },
  { name: "Sarah Agustina", head: "#ad744e", body: "#e11d48", bg: "#fff1f2" },
  { name: "Budi Santoso", head: "#6e4425", body: "#15803d", bg: "#dcfce7" },
  { name: "Clarissa Wijaya", head: "#966542", body: "#9333ea", bg: "#faf5ff" },
  { name: "Kevin Sanjaya", head: "#80512f", body: "#0369a1", bg: "#e0f2fe" },
  { name: "Nadia Rahma", head: "#a8714b", body: "#d97706", bg: "#fef3c7" },
  { name: "Andi Saputra", head: "#744828", body: "#4f46e5", bg: "#eef2ff" },
  { name: "Devi Anggraini", head: "#936340", body: "#16a34a", bg: "#dcfce7" },
  { name: "Fikri Haikal", head: "#885834", body: "#0d9488", bg: "#ccfbf1" },
  { name: "Stephanie Hartono", head: "#b07a56", body: "#be185d", bg: "#fce7f3" },
  { name: "Gilang Purnama", head: "#7b4f2c", body: "#2563eb", bg: "#dbeafe" },
  { name: "Tiara Maharani", head: "#9f6a46", body: "#059669", bg: "#d1fae5" },
];

export default function RecentBookingNotification() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<NotificationItem | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const cycleIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateNotificationQueue = (): NotificationItem[] => {
    const list: NotificationItem[] = [];
    const shuffledBuyers = [...BUYER_NAMES].sort(() => Math.random() - 0.5);
    const shuffledPkgs = [...packages].sort(() => Math.random() - 0.5);

    const count = Math.max(shuffledBuyers.length, shuffledPkgs.length);
    for (let i = 0; i < count; i++) {
      const buyer = shuffledBuyers[i % shuffledBuyers.length];
      const pkg = shuffledPkgs[i % shuffledPkgs.length];
      const minutes = Math.floor(Math.random() * 9) + 1;

      list.push({
        id: i + 1,
        name: buyer.name,
        action: "Telah mendaftar",
        packageName: pkg.name,
        slug: pkg.slug,
        avatarColor: { head: buyer.head, body: buyer.body, bg: buyer.bg },
        timeAgo: `${minutes} menit lalu`,
      });
    }
    return list;
  };

  const queueRef = useRef<NotificationItem[]>([]);

  useEffect(() => {
    setMounted(true);
    queueRef.current = generateNotificationQueue();
  }, []);

  useEffect(() => {
    if (!mounted || isDismissed || pathname?.startsWith("/admin")) return;

    const nextNotification = () => {
      if (queueRef.current.length === 0) {
        queueRef.current = generateNotificationQueue();
      }
      const item = queueRef.current[cycleIndexRef.current % queueRef.current.length];
      cycleIndexRef.current += 1;
      return item;
    };

    // Muncul pertama kali setelah 3 detik
    const startInitialTimer = setTimeout(() => {
      const firstItem = nextNotification();
      setCurrent(firstItem);
      setVisible(true);

      const runLoop = () => {
        // Tampil selama 4.5 detik
        timerRef.current = setTimeout(() => {
          setVisible(false);

          // Jeda 3 detik dalam keadaan hilang, lalu munculkan yang berikutnya
          timerRef.current = setTimeout(() => {
            if (!isDismissed) {
              const nextItem = nextNotification();
              setCurrent(nextItem);
              setVisible(true);
              runLoop();
            }
          }, 3000);
        }, 4500);
      };

      runLoop();
    }, 3000);

    return () => {
      clearTimeout(startInitialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mounted, isDismissed, pathname]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
    setIsDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Jangan render di halaman admin
  if (!mounted || pathname?.startsWith("/admin") || !current) {
    return null;
  }

  const isOnPackagePage = pathname?.startsWith("/paket/");

  return (
    <div
      className={`recent-booking-wrap ${visible ? "is-visible" : "is-hidden"} ${isOnPackagePage ? "on-package-page" : ""}`}
      aria-live="polite"
      style={{
        zIndex: 99998,
      }}
    >
      <Link
        href={`/paket/${current.slug}`}
        className="recent-booking-card"
        style={{
          backgroundColor: "#ffffff",
          background: "#ffffff",
          opacity: 1,
        }}
      >
        {/* Avatar SVG */}
        <div
          className="recent-booking-avatar"
          style={{ backgroundColor: current.avatarColor.bg }}
        >
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill={current.avatarColor.bg} />
            {/* Kepala */}
            <circle cx="24" cy="18" r="8" fill={current.avatarColor.head} />
            {/* Tubuh */}
            <path
              d="M12 40C12 33.3726 17.3726 28 24 28C30.6274 28 36 33.3726 36 40V44H12V40Z"
              fill={current.avatarColor.body}
            />
          </svg>
        </div>

        {/* Info Pemesan & Paket */}
        <div className="recent-booking-info">
          <p className="recent-booking-header">
            <strong>{current.name}</strong> <span>{current.action}</span>
          </p>
          <p className="recent-booking-pkg-name">{current.packageName}</p>
        </div>

        {/* Tombol Tutup Silang */}
        <button
          type="button"
          onClick={handleClose}
          className="recent-booking-close"
          aria-label="Tutup notifikasi"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
