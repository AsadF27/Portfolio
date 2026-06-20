"use client";

import { profile, proofPoints, skillGroups, experience, education } from "@/lib/content";
import PhotoMorph from "@/components/PhotoMorph";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const aboutHighlights = [
  { value: "100+", label: "colleagues using my tools daily" },
  { value: "5", label: "platforms shipped to production" },
  { value: "98%", label: "fewer data errors via automation" },
];

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="glow" style={{ right: "-6%", top: "8%", width: "30rem", height: "30rem", background: "rgb(var(--brand-rgb) / 0.12)" }} />

      <div className="shell relative">
        <SectionHeading eyebrow="About" title="I engineer outcomes, not just features." kicker={profile.bio} />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left — photo */}
          <Reveal>
            <PhotoMorph />
          </Reveal>

          {/* Right — narrative + highlights + compact toolkit + recognition */}
          <div>
            <Reveal>
              <p className="leading-relaxed">{profile.bio2}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {aboutHighlights.map((h) => (
                  <div key={h.label} className="rounded-2xl border border-line bg-surface/40 p-4">
                    <div className="t-h2 gold-text font-semibold">{h.value}</div>
                    <div className="mt-1.5 t-sm leading-snug muted">{h.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Toolkit — compact */}
            <Reveal delay={0.08}>
              <div className="mt-8">
                <div className="t-label muted mb-4">Toolkit</div>
                <div className="space-y-2.5">
                  {skillGroups.map((g) => (
                    <div key={g.group} className="grid gap-2 sm:grid-cols-[84px_1fr] sm:items-start">
                      <div className="pt-1 t-sm text-ink-2">{g.group}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {g.items.map((s) => (
                          <span key={s} className="chip !px-2.5 !py-1">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Recognition — tucked compactly under the toolkit */}
            <Reveal delay={0.1}>
              <div className="mt-6 rounded-2xl border border-line bg-surface/30 p-5">
                <div className="t-label text-accent2 mb-3">Recognition</div>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {proofPoints.map((p) => (
                    <li key={p} className="flex gap-2.5 t-sm leading-snug">
                      <svg className="mt-0.5 shrink-0 text-accent2" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M12 2l2.6 6.3L21 9l-4.8 4.3L17.5 20 12 16.6 6.5 20l1.3-6.7L3 9l6.4-.7L12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                      <span className="muted">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="mt-20">
          <Reveal>
            <div className="t-label muted mb-8">Experience</div>
          </Reveal>
          <div className="relative">
            {/* timeline rail — glows at the present, fades into the past */}
            <span
              aria-hidden
              className="absolute left-[11px] top-2 bottom-2 w-px"
              style={{ background: "linear-gradient(180deg, var(--accent2) 0%, var(--brand) 32%, var(--line) 100%)" }}
            />
            <div className="space-y-14">
              {experience.map((e, i) => (
                <Reveal key={e.role} delay={i * 0.05}>
                  <div className="relative pl-9">
                    <span aria-hidden className="absolute left-0 top-1.5 grid w-[22px] place-items-center">
                      {i === 0 ? (
                        <span className="signal" />
                      ) : (
                        <span className="h-3 w-3 rounded-full border-2 border-ink-3 bg-bg" />
                      )}
                    </span>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="t-h3 font-medium">
                        {e.role} <span className="muted">· {e.company}</span>
                      </h3>
                      <span className="t-sm muted">{e.period}</span>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-3 leading-relaxed muted">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand/70" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/30 px-6 py-5">
              <div>
                <div className="font-medium">{education.degree}</div>
                <div className="t-sm muted">{education.school}</div>
              </div>
              <div className="t-sm muted">{education.period}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
