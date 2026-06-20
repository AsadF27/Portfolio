"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { prefersReducedMotion } from "@/lib/gsap";

export default function RotatingWord({
  words,
  hold = 3000,
  className = "",
}: {
  words: string[];
  hold?: number; // ms each word stays before rotating
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % words.length), hold);
    return () => clearInterval(t);
  }, [words.length, hold]);

  return (
    <>
      {/* canonical phrase for assistive tech */}
      <span className="sr-only">{words[0]}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-grid",
          overflow: "hidden",
          verticalAlign: "bottom",
          paddingBottom: "0.16em",
          marginBottom: "-0.16em",
        }}
      >
        {/* mode="wait" → the current word slides fully OUT before the next slides IN:
            never two words at once, never a blank gap. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            className={className}
            style={{ gridArea: "1 / 1", whiteSpace: "nowrap" }}
            initial={{ y: "115%" }}
            animate={{ y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 } }}
            exit={{ y: "-115%", transition: { duration: 0.5, ease: [0.55, 0, 0.78, 0.2] } }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}
