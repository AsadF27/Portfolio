"use client";

import { featured, type Featured } from "@/lib/content";
import ProjectMockup from "@/components/ProjectMockup";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function Showcase({ project, index }: { project: Featured; index: number }) {
  const reverse = index % 2 === 1;
  const accent = project.accent;

  return (
    <div className="shell">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Mockup */}
        <div className={reverse ? "lg:order-2" : ""}>
          <ProjectMockup project={project} reverse={reverse} />
        </div>

        {/* Copy */}
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

          <Reveal delay={0.08}>
            <p className="muted mt-5 max-w-[48ch] leading-relaxed">{project.value}</p>
          </Reveal>

          {/* Big stat + metrics */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-2">
              <div className="t-h1 gold-text font-semibold leading-none">{project.bigStat.value}</div>
              <div className="mb-1 max-w-[20ch] t-sm leading-snug muted">{project.bigStat.label}</div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-6 divide-y divide-line border-y border-line">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex items-baseline gap-4 py-2.5">
                  <span className="w-[5.5rem] shrink-0 text-right font-semibold text-brand">{m.value}</span>
                  <span className="t-sm muted">{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Features */}
          <Reveal delay={0.14}>
            <ul className="mt-7 space-y-2.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3 leading-relaxed">
                  <svg className="mt-1.5 shrink-0 text-brand" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="muted">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Stack */}
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
          kicker="Each one replaced a slow, manual process with a fast, auditable system. Here is what shipped — and the numbers behind it."
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
