"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import type { Featured } from "@/lib/content";

function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ---------- Browser chrome ---------- */
function Chrome({ url, accent, children }: { url: string; accent: string; children: React.ReactNode }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border border-line"
      style={{ background: "linear-gradient(180deg, #14151c, #0e0f15)" }}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        <div className="ml-3 flex-1">
          <div className="flex h-6 items-center rounded-md border border-line bg-black/30 px-3 text-[0.62rem] text-ink-3">
            <span style={{ color: accent }}>●</span>
            <span className="ml-2 truncate">{url}</span>
          </div>
        </div>
      </div>
      <div className="relative h-[calc(100%-45px)] p-4">{children}</div>
    </div>
  );
}

/* ---------- ESG: dashboard ---------- */
function DashboardBody({ accent }: { accent: string }) {
  const modules = ["Observations", "Incidents", "Permit-to-Work", "Best Practice", "Walkdowns"];
  const bars = [42, 68, 35, 88, 56, 74, 48];
  return (
    <div className="flex h-full gap-3">
      <div className="hidden w-[34%] flex-col gap-2 sm:flex">
        {modules.map((m, i) => (
          <div
            key={m}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.62rem]"
            style={{
              background: i === 3 ? rgba(accent, 0.14) : "rgba(255,255,255,0.03)",
              color: i === 3 ? accent : "var(--ink-2)",
              border: `1px solid ${i === 3 ? rgba(accent, 0.4) : "var(--line)"}`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 3 ? accent : "var(--ink-3)" }} />
            {m}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {["Risk 12", "SLA 24h", "Open 7"].map((k) => (
            <div key={k} className="rounded-lg border border-line bg-black/20 px-2 py-2.5 text-[0.6rem] text-ink-2">
              <div className="text-[0.95rem] font-semibold text-ink">{k.split(" ")[1]}</div>
              {k.split(" ")[0]}
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-line bg-black/20 p-3">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${b}%`, background: i % 2 ? rgba(accent, 0.85) : rgba(accent, 0.4) }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- App Directory: grid ---------- */
function GridBody({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex h-7 items-center rounded-lg border border-line bg-black/25 px-3 text-[0.62rem] text-ink-3">
        <span style={{ color: accent }}>⌕</span>
        <span className="ml-2">Search 40+ apps…</span>
      </div>
      <div className="text-[0.58rem] uppercase tracking-widest text-ink-3">Pinned</div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg border" style={{ borderColor: rgba(accent, 0.4), background: rgba(accent, 0.1) }}>
            <div className="m-2 h-3 w-3 rounded" style={{ background: rgba(accent, 0.8) }} />
          </div>
        ))}
      </div>
      <div className="text-[0.58rem] uppercase tracking-widest text-ink-3">All apps</div>
      <div className="grid flex-1 grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-line bg-white/[0.03]">
            <div className="m-2 h-2.5 w-2.5 rounded" style={{ background: "var(--ink-3)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- PhotoBooth: faces ---------- */
function FacesBody({ accent }: { accent: string }) {
  const matches = [98, 96, 94, 91, 88, 85];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full border-2" style={{ borderColor: accent }}>
          <div className="h-5 w-5 rounded-full" style={{ background: rgba(accent, 0.55) }} />
        </div>
        <div className="flex h-7 flex-1 items-center rounded-lg border border-line bg-black/25 px-3 text-[0.62rem]" style={{ color: accent }}>
          Selfie matched · 90,000+ scanned
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {matches.map((m, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg border border-line" style={{ background: `linear-gradient(135deg, ${rgba(accent, 0.22)}, rgba(255,255,255,0.03))` }}>
            <span className="absolute bottom-1 right-1 rounded px-1 py-0.5 text-[0.6rem] font-semibold" style={{ background: rgba(accent, 0.95), color: "#0a0a0a" }}>
              {m}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectMockup({ project, reverse }: { project: Featured; reverse: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const floatA = useRef<HTMLDivElement>(null);
  const floatB = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !wrap.current) return;
      const st = { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: 1 };
      gsap.fromTo(
        frame.current,
        { rotateY: reverse ? 13 : -13, y: 44 },
        { rotateY: reverse ? -7 : 7, y: -44, ease: "none", scrollTrigger: st }
      );
      gsap.fromTo(floatA.current, { y: 70 }, { y: -70, ease: "none", scrollTrigger: { ...st, scrub: 1.6 } });
      gsap.fromTo(floatB.current, { y: 100 }, { y: -100, ease: "none", scrollTrigger: { ...st, scrub: 2.1 } });
    },
    { scope: wrap }
  );

  const url = `${project.id}.fourthpartner.co`;

  return (
    <div ref={wrap} className="relative" style={{ perspective: "1600px" }}>
      <div
        className="glow"
        style={{ inset: "6% 4% 6% 4%", background: `radial-gradient(50% 50% at 50% 50%, ${rgba(project.accent, 0.32)}, transparent 70%)` }}
      />
      <div
        ref={frame}
        className="relative mx-auto aspect-[4/3.1] w-full max-w-[560px]"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <Chrome url={url} accent={project.accent}>
          {project.mockup === "dashboard" && <DashboardBody accent={project.accent} />}
          {project.mockup === "grid" && <GridBody accent={project.accent} />}
          {project.mockup === "faces" && <FacesBody accent={project.accent} />}
        </Chrome>

        {/* Floating depth cards */}
        <div
          ref={floatA}
          className="absolute -right-4 top-8 hidden rounded-xl border border-line bg-bg-soft/90 px-3.5 py-2.5 backdrop-blur-md sm:block"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="text-[0.95rem] font-semibold" style={{ color: project.accent }}>
            {project.bigStat.value}
          </div>
          <div className="max-w-[120px] text-[0.62rem] leading-snug faint">{project.bigStat.label}</div>
        </div>
        <div
          ref={floatB}
          className="absolute -left-5 bottom-10 hidden items-center gap-2 rounded-xl border border-line bg-bg-soft/90 px-3.5 py-2.5 backdrop-blur-md sm:flex"
          style={{ transform: "translateZ(90px)" }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
          <span className="text-[0.66rem]">{project.status}</span>
        </div>
      </div>
    </div>
  );
}
