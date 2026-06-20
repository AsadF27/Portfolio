"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { pipeline, type Pipeline } from "@/lib/content";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

function PipelineCard({ p }: { p: Pipeline }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 15 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-500 hover:border-brand/40"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
        <div
          className="h-full w-full animate-shimmer"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent2), var(--brand), transparent)", backgroundSize: "200% 100%" }}
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="t-h3 font-medium">{p.name}</h3>
        <span className="chip shrink-0 !border-accent2/30 !text-accent2">
          <span className="signal" />
          In UAT
        </span>
      </div>

      <p className="muted mt-3 t-sm leading-relaxed">{p.tagline}</p>

      <p className="mt-3 t-sm faint leading-snug">
        <span className="text-accent2">Status · </span>
        {p.statusDetail}
      </p>

      <div className="mt-5 flex items-baseline gap-2.5">
        <span className="t-h2 gold-text font-semibold leading-none">{p.heroStat.value}</span>
        <span className="t-sm muted leading-snug">{p.heroStat.label}</span>
      </div>

      {/* Details on demand — the whole card is the click target */}
      <div className="mt-5 flex items-center gap-2 t-sm text-ink-2 transition-colors group-hover:text-brand">
        <span>{open ? "Hide details" : "What's inside"}</span>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.4s var(--ease)" }}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.45s var(--ease)" }}>
        <div className="overflow-hidden">
          <ul className="space-y-2 pt-4">
            {p.details.map((d) => (
              <li key={d} className="flex gap-2.5 t-sm leading-snug">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent2" />
                <span className="muted">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded-md border border-line px-2 py-1 t-sm faint">
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function ActivePipeline() {
  const marqueeItems = pipeline.map((p) => (
    <span key={p.id} className="flex items-center gap-5 px-5">
      <span className="t-h2 font-medium text-ink-2">{p.name}</span>
      <span className="text-accent2">✦</span>
    </span>
  ));

  return (
    <section id="pipeline" className="relative overflow-hidden border-y border-line bg-bg-soft py-24 md:py-32">
      <div className="glow" style={{ left: "-8%", bottom: "-10%", width: "32rem", height: "32rem", background: "rgb(var(--accent2-rgb) / 0.12)" }} />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Active Pipeline · In UAT"
          title="Enterprise platforms I'm building right now."
          kicker="Heavier systems currently in user-acceptance testing — proof of ongoing capacity to design, build and ship."
        />
      </div>

      <div className="my-12 border-y border-line py-5 md:my-16">
        <Marquee items={marqueeItems} speed="slow" />
      </div>

      <div className="shell relative">
        <div className="grid items-start gap-4 sm:grid-cols-2">
          {pipeline.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <PipelineCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
