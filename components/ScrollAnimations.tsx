"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Avoids the "useLayoutEffect does nothing on the server" warning during SSR.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScrollAnimations() {
  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>(".reveal");

        // Hide everything up front (before scroll) so elements never render
        // fully visible right before a trigger snaps them hidden — that snap
        // is what caused the flash/blink.
        gsap.set(targets, { opacity: 0, y: 28 });

        ScrollTrigger.batch(targets, {
          start: "top 88%",
          interval: 0.15,
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      });

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return null;
}
