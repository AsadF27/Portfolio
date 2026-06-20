"use client";

import { pipeline } from "@/lib/content";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ActivePipeline() {
  const marqueeItems = pipeline.map((p) => (
    <span key={p.id} className="flex items-center gap-5 px-5">
      <span className="t-h2 font-medium text-ink-2">{p.name}</span>
      <span className="text-brand">✦</span>
    </span>
  ));

  return (
    <section id="pipeline" className="relative overflow-hidden border-y border-line bg-bg-soft py-24 md:py-32">
      <div className="glow" style={{ left: "-8%", bottom: "-10%", width: "32rem", height: "32rem", background: "rgba(244,182,60,0.1)" }} />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Active Pipeline · In UAT"
          title="Enterprise platforms I'm building right now."
          kicker="Heavier-lifting systems currently in user acceptance testing — proof of ongoing capacity to design, build and ship across the stack."
        />
      </div>

      {/* Ticker band */}
      <div className="my-12 border-y border-line py-5 md:my-16">
        <Marquee items={marqueeItems} speed="slow" />
      </div>

      <div className="shell relative">
        <div className="grid gap-4 sm:grid-cols-2">
          {pipeline.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface/30 p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-brand/40">
                {/* progress shimmer bar */}
                <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
                  <div
                    className="h-full w-1/2 animate-shimmer"
                    style={{
                      background: "linear-gradient(90deg, transparent, var(--brand), transparent)",
                      backgroundSize: "200% 100%",
                      width: "100%",
                    }}
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h3 className="t-h3 font-medium">{p.name}</h3>
                  <span className="chip shrink-0 !border-brand/30 !text-brand-soft">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                    </span>
                    In UAT
                  </span>
                </div>

                <p className="muted mt-3 t-sm leading-relaxed">{p.tagline}</p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line bg-black/20 px-3 py-1.5 t-sm text-ink-2">
                  <span className="text-brand">›</span>
                  {p.stat}
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-line px-2 py-1 t-sm faint">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
