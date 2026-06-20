"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { systems } from "@/lib/content";

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (typeof window !== "undefined" && window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function ActiveDossierRail() {
  const [active, setActive] = useState(systems[0]?.id ?? "");

  useEffect(() => {
    const els = systems
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    // A section is "active" while it crosses the vertical centre band of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Systems index"
      className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3.5 xl:flex"
    >
      {systems.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            aria-label={`${s.name}${s.live ? " (live)" : " (in UAT)"}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center"
          >
            {isActive && (
              <motion.span
                layoutId="dossier-tick"
                className="absolute -left-3 h-4 w-[2px] rounded-full"
                style={{ background: "var(--accent2)" }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <span
              className={`tnum text-[0.78rem] tracking-wider transition-colors duration-300 ${
                isActive ? "text-brand" : "text-ink-3 group-hover:text-ink-2"
              }`}
            >
              {s.index}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
