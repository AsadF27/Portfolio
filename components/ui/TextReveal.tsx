"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  start?: string;
  duration?: number;
};

/** Splits text into words and reveals each from behind a mask. */
export default function TextReveal({
  text,
  className = "",
  stagger = 0.06,
  delay = 0,
  start = "top 88%",
  duration = 0.95,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const words = ref.current.querySelectorAll<HTMLElement>(".tr-w");
      gsap.set(words, { yPercent: 120 });
      gsap.to(words, {
        yPercent: 0,
        duration,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
        >
          <span className="tr-w" style={{ display: "inline-block" }}>
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
