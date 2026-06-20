"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function RotatingWord({
  words,
  hold = 1.9,
  className = "",
}: {
  words: string[];
  hold?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const els = ref.current?.querySelectorAll<HTMLElement>(".rw");
      if (!els || !els.length) return;

      // Reduced motion: show only the first word, hide the rest (they share a grid cell).
      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 0, yPercent: 0 });
        gsap.set(els[0], { opacity: 1 });
        return;
      }

      gsap.set(els, { yPercent: 110, opacity: 0 });
      gsap.set(els[0], { yPercent: 0, opacity: 1 });
      const tl = gsap.timeline({ repeat: -1, delay: 1.1 });
      els.forEach((el, i) => {
        const next = els[(i + 1) % els.length];
        tl.to(el, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power3.in" }, `+=${hold}`).fromTo(
          next,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "<0.05"
        );
      });
    },
    { scope: ref }
  );

  return (
    <>
      {/* Canonical phrase for assistive tech (the visual cycle is decorative). */}
      <span className="sr-only">{words[0]}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className={className}
        style={{
          display: "inline-grid",
          overflow: "hidden",
          verticalAlign: "bottom",
          paddingBottom: "0.14em",
          marginBottom: "-0.14em",
        }}
      >
        {words.map((w, i) => (
          <span key={i} className="rw" style={{ gridArea: "1 / 1", whiteSpace: "nowrap" }}>
            {w}
          </span>
        ))}
      </span>
    </>
  );
}
