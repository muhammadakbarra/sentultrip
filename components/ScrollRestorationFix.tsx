"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorationFix() {
  const pathname = usePathname();

  useEffect(() => {
    // If the URL does not contain an anchor hash, instantly scroll to top on route change
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
