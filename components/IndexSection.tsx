"use client";

import { systems } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (typeof window !== "undefined" && window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function IndexSection() {
  return (
    <section className="border-y border-line bg-bg-soft/40">
      <div className="shell py-12 md:py-16">
        <Reveal>
          <div className="mb-7 flex items-baseline justify-between">
            <span className="eyebrow">Index</span>
            <span className="t-sm faint tnum">7 systems · 03 live · 04 in UAT</span>
          </div>
        </Reveal>

        <ul className="divide-y divide-line border-t border-line">
          {systems.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.03}>
              <li>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(s.id);
                  }}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4 transition-colors duration-300 md:gap-6"
                >
                  <span className="tnum t-h3 font-semibold text-brand">{s.index}</span>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="font-medium tracking-tight transition-colors group-hover:text-brand">{s.name}</span>
                    <span className="t-sm muted">{s.outcome}</span>
                  </span>
                  <span
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 t-sm"
                    style={
                      s.live
                        ? { borderColor: "rgb(var(--brand-rgb) / 0.35)", color: "rgb(var(--brand-rgb))" }
                        : { borderColor: "rgb(var(--accent2-rgb) / 0.35)", color: "rgb(var(--accent2-rgb))" }
                    }
                  >
                    {s.live ? <span className="h-1.5 w-1.5 rounded-full bg-brand" /> : <span className="signal" />}
                    {s.live ? "Live" : "In UAT"}
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
