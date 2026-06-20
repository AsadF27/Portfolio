"use client";

import { useState } from "react";
import { featured, type Featured } from "@/lib/content";
import ProjectMockup from "@/components/ProjectMockup";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function Showcase({ project, index }: { project: Featured; index: number }) {
  const reverse = index % 2 === 1;
  const accent = project.accent;
  const [open, setOpen] = useState(false);

  return (
    <div className="shell">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <ProjectMockup project={project} reverse={reverse} />
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="t-h2 font-semibold text-brand">{project.index}</span>
              <span className="chip" style={{ borderColor: `${accent}55`, color: accent }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {project.status}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h3 className="t-h1 mt-4">{project.name}</h3>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="t-h3 mt-3 text-ink-2">{project.tagline}</p>
          </Reveal>

          {/* Hero stat */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2">
              <div className="t-h1 gold-text font-semibold leading-none">{project.heroStat.value}</div>
              <div className="mb-1 max-w-[24ch] t-sm leading-snug muted">{project.heroStat.label}</div>
            </div>
          </Reveal>

          {/* Impact — plain, outcome-first */}
          <Reveal delay={0.12}>
            <ul className="mt-7 space-y-3.5">
              {project.significant.map((p) => (
                <li key={p.text} className="flex gap-3.5">
                  <span
                    className="mt-2 h-[3px] w-5 shrink-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--brand), var(--accent2))" }}
                  />
                  <span className="leading-relaxed">
                    {p.value ? <span className="font-semibold text-brand">{p.value} </span> : null}
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Detail on demand */}
          <Reveal delay={0.14}>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex items-center gap-2 t-sm text-ink-2 transition-colors hover:text-brand"
              >
                <span>{open ? "Hide details" : "How it works"}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.4s var(--ease)" }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.5s var(--ease)" }}>
                <div className="overflow-hidden">
                  <ul className="space-y-2.5 pt-5">
                    {project.seeMore.map((d) => (
                      <li key={d} className="flex gap-3 t-sm leading-relaxed">
                        <svg className="mt-1 shrink-0 text-brand" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="muted">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="section relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured Work"
          title="Three platforms, live in production."
          kicker="Each one replaced a slow, manual process with a fast, auditable system."
        />
      </div>

      <div className="mt-16 space-y-28 md:mt-24 md:space-y-40">
        {featured.map((p, i) => (
          <Showcase key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
