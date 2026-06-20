"use client";

import dynamic from "next/dynamic";
import { profile, heroStats } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";
import RotatingWord from "@/components/ui/RotatingWord";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-32 md:pt-28">
      {/* Three.js galaxy */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <HeroScene />
      </div>
      {/* Depth overlays — work in both themes */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgb(var(--brand-rgb) / 0.12), transparent 70%), linear-gradient(180deg, transparent 55%, rgb(var(--bg-rgb)) 97%)",
        }}
      />

      {/* Main */}
      <div className="shell relative z-10 flex flex-1 items-center">
        <div className="w-full max-w-[60rem]">
          <div className="eyebrow mb-7">
            <span className="signal" />
            {profile.available}
          </div>

          <h1 className="t-display max-w-[22ch]">
            <TextReveal text={profile.uspLead} stagger={0.05} />{" "}
            <RotatingWord words={profile.uspRotate} className="gold-text" />{" "}
            <TextReveal text={profile.uspTail} delay={0.35} />
          </h1>

          <p className="muted mt-7 max-w-[44ch] leading-relaxed">
            Digital Transformation at <span className="text-ink">{profile.company}</span>. I turn slow, manual
            work into fast systems that ship.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {profile.keywords.map((k) => (
              <span key={k} className="chip">
                {k}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <MagneticButton href="#work" variant="primary">
              View the work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Stat strip — in normal flow so it never overlaps the hero on short screens */}
      <div className="shell relative z-10 mt-10 md:mt-14">
        <div className="hairline" />
        <div className="grid grid-cols-2 gap-y-5 pt-6 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="px-1 md:px-3">
              <div className="t-h3 gold-text font-semibold">{s.value}</div>
              <div className="mt-1 t-sm leading-snug muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
