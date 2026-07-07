"use client";

import { useEffect, useState } from "react";

export default function WaCountdown({ waUrl }: { waUrl: string }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      window.location.href = waUrl;
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, waUrl]);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#dcfce7",
          border: "3px solid #166534",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 900,
          color: "#166534",
          marginBottom: 12,
        }}
      >
        {count > 0 ? count : "↗"}
      </div>
      <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 12px" }}>
        {count > 0
          ? `Mengarahkan ke WhatsApp dalam ${count} detik...`
          : "Membuka WhatsApp..."}
      </p>
      <a
        href={waUrl}
        style={{ fontSize: 13, color: "#166534", fontWeight: 700, textDecoration: "none" }}
      >
        Langsung buka WhatsApp →
      </a>
    </div>
  );
}
