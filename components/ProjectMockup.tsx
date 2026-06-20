"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import type { Featured } from "@/lib/content";

function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const PANEL = "#0e1320"; // mockup inner background

function Chrome({ url, accent, children }: { url: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-line" style={{ background: "linear-gradient(180deg, #131a2b, #0c111d)" }}>
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

/* ---------- ESG: dashboard — sidebar + register table + donut + bar ---------- */
function DashboardBody({ accent }: { accent: string }) {
  const modules = ["Observations", "Incidents", "Permit-to-Work", "Good Observation", "Walkdowns"];
  const rows = [
    { id: "OBS-241", tag: "High", c: "#f59e0b" },
    { id: "INC-118", tag: "Closed", c: "#34d399" },
    { id: "PTW-330", tag: "Review", c: accent },
    { id: "OBS-242", tag: "Open", c: "#60a5fa" },
  ];
  const bars = [44, 72, 54, 90, 66];
  return (
    <div className="flex h-full gap-2.5 text-[0.6rem]">
      <div className="hidden w-[22%] flex-col gap-1 sm:flex">
        {modules.map((m, i) => (
          <div
            key={m}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5"
            style={{
              background: i === 0 ? rgba(accent, 0.16) : "rgba(255,255,255,0.03)",
              color: i === 0 ? accent : "var(--ink-2)",
              border: `1px solid ${i === 0 ? rgba(accent, 0.4) : "var(--line)"}`,
            }}
          >
            <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: i === 0 ? accent : "var(--ink-3)" }} />
            <span className="truncate">{m}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-[1.6] flex-col gap-1.5">
        <div className="uppercase tracking-wide text-ink-3">Observation register</div>
        <div className="flex flex-col rounded-lg border border-line bg-black/25">
          {rows.map((r, i) => (
            <div key={r.id} className="flex items-center justify-between px-2.5 py-[0.45rem]" style={{ borderTop: i ? "1px solid var(--line)" : "none" }}>
              <span className="text-ink-2">{r.id}</span>
              <span className="rounded px-1.5 py-0.5 font-medium" style={{ background: rgba(r.c, 0.18), color: r.c }}>
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden w-[27%] flex-col gap-2 md:flex">
        <div className="grid flex-1 place-items-center rounded-lg border border-line bg-black/25">
          <div className="relative h-12 w-12 rounded-full" style={{ background: `conic-gradient(${accent} 0 45%, #f59e0b 45% 72%, #34d399 72% 100%)` }}>
            <div className="absolute inset-[28%] rounded-full" style={{ background: PANEL }} />
          </div>
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-lg border border-line bg-black/25 p-2">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${b}%`, background: i % 2 ? accent : rgba(accent, 0.45) }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- App Directory: colourful app grid ---------- */
function GridBody({ accent }: { accent: string }) {
  const hues = ["#60a5fa", "#34d399", "#f59e0b", "#c084fc", "#22d3ee", "#f472b6", accent, "#818cf8"];
  const pinned = [accent, "#34d399", "#f59e0b", "#60a5fa"];
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="flex h-7 items-center rounded-lg border border-line bg-black/25 px-3 text-[0.62rem] text-ink-3">
        <span style={{ color: accent }}>⌕</span>
        <span className="ml-2">Search 40+ apps…</span>
      </div>
      <div className="text-[0.55rem] uppercase tracking-widest text-ink-3">Pinned</div>
      <div className="grid grid-cols-4 gap-2">
        {pinned.map((c, i) => (
          <div key={i} className="aspect-square rounded-lg border" style={{ borderColor: rgba(c, 0.45), background: rgba(c, 0.14) }}>
            <div className="m-2 h-3 w-3 rounded" style={{ background: c }} />
          </div>
        ))}
      </div>
      <div className="text-[0.55rem] uppercase tracking-widest text-ink-3">All apps</div>
      <div className="grid flex-1 grid-cols-4 gap-2">
        {hues.map((c, i) => (
          <div key={i} className="rounded-lg border border-line" style={{ background: rgba(c, 0.1) }}>
            <div className="m-2 h-2.5 w-2.5 rounded" style={{ background: rgba(c, 0.85) }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- PhotoBooth: face match grid ---------- */
function FacesBody({ accent }: { accent: string }) {
  const matches = [98, 96, 94, 91, 88, 85];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full border-2" style={{ borderColor: accent }}>
          <div className="h-5 w-5 rounded-full" style={{ background: rgba(accent, 0.55) }} />
        </div>
        <div className="flex h-7 flex-1 items-center rounded-lg border border-line bg-black/25 px-3 text-[0.62rem]" style={{ color: accent }}>
          Selfie matched · 93k faces
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {matches.map((m, i) => (
          <div key={i} className="relative overflow-hidden rounded-lg border border-line" style={{ background: `linear-gradient(135deg, ${rgba(accent, 0.28)}, ${rgba("#60a5fa", 0.12)})` }}>
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
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      tl.fromTo(frame.current, { rotateY: reverse ? 13 : -13, y: 44 }, { rotateY: reverse ? -7 : 7, y: -44, ease: "none" }, 0)
        .fromTo(floatA.current, { y: 85 }, { y: -85, ease: "none" }, 0)
        .fromTo(floatB.current, { y: 120 }, { y: -120, ease: "none" }, 0);
    },
    { scope: wrap }
  );

  const url = `${project.id}.fourthpartner.co`;

  return (
    <div ref={wrap} className="relative" style={{ perspective: "1600px" }}>
      <div className="glow" style={{ inset: "6% 4% 6% 4%", background: `radial-gradient(50% 50% at 50% 50%, ${rgba(project.accent, 0.32)}, transparent 70%)` }} />
      <div ref={frame} className="relative mx-auto aspect-[4/3.1] w-full max-w-[560px]" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        <Chrome url={url} accent={project.accent}>
          {project.mockup === "dashboard" && <DashboardBody accent={project.accent} />}
          {project.mockup === "grid" && <GridBody accent={project.accent} />}
          {project.mockup === "faces" && <FacesBody accent={project.accent} />}
        </Chrome>

        <div ref={floatA} className="absolute -right-4 top-8 hidden rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 sm:block" style={{ transform: "translateZ(60px)" }}>
          <div className="text-[0.95rem] font-semibold" style={{ color: project.accent }}>
            {project.heroStat.value}
          </div>
          <div className="max-w-[120px] text-[0.62rem] leading-snug faint">{project.heroStat.label}</div>
        </div>
        <div ref={floatB} className="absolute -left-5 bottom-10 hidden items-center gap-2 rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 sm:flex" style={{ transform: "translateZ(90px)" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
          <span className="text-[0.66rem]">{project.status}</span>
        </div>
      </div>
    </div>
  );
}
