"use client";

import { useState } from "react";
import { featured, type Featured } from "@/lib/content";
import ProjectMockup from "@/components/ProjectMockup";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function CaseStudy({ project, index }: { project: Featured; index: number }) {
  const reverse = index % 2 === 1;
  const accent = project.accent;
  const [open, setOpen] = useState(false);

  return (
    <div id={project.id} className="shell relative scroll-mt-24">
      {/* ghosted dossier numeral */}
      <span className="ghost-numeral" aria-hidden style={{ top: "-2.6rem", [reverse ? "right" : "left"]: "-0.5rem" }}>
        {project.index}
      </span>

      {/* micro-header */}
      <Reveal>
        <div className="relative z-10 mb-8 flex items-center gap-2 t-label faint">
          <span className="tnum" style={{ color: accent }}>
            {project.index}
          </span>
          <span>/ {project.name}</span>
          <span className="hidden sm:inline">· {project.status}</span>
        </div>
      </Reveal>

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <ProjectMockup project={project} reverse={reverse} />
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <Reveal>
            <h3 className="t-h1">{project.name}</h3>
          </Reveal>

          {/* the delta — the centrepiece */}
          <Reveal delay={0.05}>
            <p className="t-h3 mt-4 leading-snug">
              <span className="text-ink-2">{project.delta.before}</span>
              <span className="mx-2 font-semibold" style={{ color: accent }}>
                →
              </span>
              <span className="text-ink">{project.delta.after}</span>
            </p>
          </Reveal>

          {/* hero stat */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2">
              <div className="t-h1 gold-text tnum font-semibold leading-none">{project.heroStat.value}</div>
              <div className="mb-1 max-w-[24ch] t-sm leading-snug muted">{project.heroStat.label}</div>
            </div>
          </Reveal>

          {/* significant points — outcome hangs in the margin */}
          <Reveal delay={0.12}>
            <ul className="mt-7 space-y-3">
              {project.significant.map((s) => (
                <li key={s.text} className="grid grid-cols-[4.5rem_1fr] gap-x-4 leading-relaxed">
                  <span className="tnum text-right font-semibold text-brand">{s.value}</span>
                  <span className="muted">{s.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* detail on demand */}
          <Reveal delay={0.14}>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex items-center gap-2 t-sm text-ink-2 transition-colors hover:text-brand"
              >
                <span>{open ? "Hide details" : "How it works"}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.4s var(--ease)" }}>
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.5s var(--ease)" }}>
                <div className="overflow-hidden">
                  <ul className="space-y-2.5 pt-5">
                    {project.seeMore.map((d) => (
                      <li key={d} className="grid grid-cols-[4.5rem_1fr] gap-x-4 t-sm leading-relaxed">
                        <span aria-hidden className="flex justify-end pt-2">
                          <span className="h-1 w-3 rounded-full" style={{ background: accent }} />
                        </span>
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
          eyebrow="Featured Work · 01–03"
          title="Three platforms, live in production."
          kicker="Each one replaced a slow, manual process with a fast, auditable system."
        />
      </div>

      <div className="mt-16 space-y-28 md:mt-24 md:space-y-40">
        {featured.map((p, i) => (
          <CaseStudy key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
