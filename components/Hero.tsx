"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { profile, heroStats } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";
import RotatingWord from "@/components/ui/RotatingWord";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function Hero() {
  const photo = useRef<HTMLDivElement>(null);

  const onTilt = (e: React.MouseEvent) => {
    const el = photo.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateZ(0)`;
  };
  const resetTilt = () => {
    if (photo.current) photo.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-32 md:pt-28">
      {/* Three.js galaxy */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <HeroScene />
      </div>
      {/* Depth overlays */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(244,182,60,0.08), transparent 70%), linear-gradient(180deg, transparent 55%, var(--bg) 97%)",
        }}
      />

      {/* Main */}
      <div className="shell relative z-10 flex flex-1 items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
          {/* Left: copy */}
          <div>
            <div className="eyebrow mb-7">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {profile.available}
            </div>

            <h1 className="t-display max-w-[18ch]">
              <TextReveal text={profile.uspLead} stagger={0.05} />{" "}
              <span className="gold-text">
                <RotatingWord words={profile.uspRotate} />
              </span>{" "}
              <TextReveal text={profile.uspTail} delay={0.35} />
            </h1>

            <p className="muted mt-7 max-w-[46ch] leading-relaxed">
              {profile.title.split("&")[0].trim()} at <span className="text-ink">{profile.company}</span>. I turn
              fragmented, manual enterprise workflows into fast, auditable systems — RAG, computer vision and
              microservices, shipped to production.
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

          {/* Right: prominent pro photo */}
          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
            <div
              className="glow"
              style={{
                inset: "-12% -8% 0% -8%",
                background: "radial-gradient(50% 60% at 60% 35%, rgba(244,182,60,0.45), transparent 70%)",
              }}
            />
            <div
              ref={photo}
              onMouseMove={onTilt}
              onMouseLeave={resetTilt}
              className="relative animate-floaty transition-transform duration-300 ease-out will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="card relative overflow-hidden rounded-[1.85rem]" style={{ aspectRatio: "3 / 3.7" }}>
                <img
                  src="/pro.jpg"
                  alt="Asad Faridi, Digital Transformation engineer at Fourth Partner Energy"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "50% 18%" }}
                  loading="eager"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 50%, rgba(7,7,10,0.85) 100%)" }}
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium tracking-tight">{profile.name}</div>
                    <div className="t-sm muted">{profile.location}</div>
                  </div>
                  <span className="chip !border-brand/40 !text-brand-soft">Available</span>
                </div>
              </div>

              <div
                className="absolute -left-5 top-10 hidden rounded-2xl border border-line bg-bg-soft/80 px-4 py-3 backdrop-blur-md md:block"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="t-label text-brand">Shipped</div>
                <div className="mt-1 t-sm">100+ colleagues, daily</div>
              </div>
            </div>
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
