"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  overflow: "hidden",
  borderRadius: "1.85rem",
};

export default function PhotoMorph() {
  const inner = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const flip = (state: boolean) => {
    setFlipped(state);
    if (!inner.current) return;
    if (prefersReducedMotion()) {
      inner.current.style.transform = `rotateY(${state ? 180 : 0}deg)`;
      return;
    }
    gsap.to(inner.current, {
      rotationY: state ? 180 : 0,
      duration: 0.95,
      ease: "power3.inOut",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip(!flipped);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <div
        className="glow"
        style={{
          inset: "-8% -10% -4% -10%",
          background: "radial-gradient(55% 60% at 50% 40%, rgba(244,182,60,0.4), transparent 72%)",
        }}
      />
      <div
        className="relative cursor-pointer outline-none"
        style={{ perspective: "1500px", aspectRatio: "3 / 3.7" }}
        onMouseEnter={() => flip(true)}
        onMouseLeave={() => flip(false)}
        onClick={() => flip(!flipped)}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label="Photo of Asad Faridi — activate to flip between the professional and candid shot"
        data-cursor="hover"
      >
        <div
          ref={inner}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          {/* Front — professional */}
          <div className="card" style={faceBase}>
            <img src="/pro.jpg" alt="" aria-hidden className="h-full w-full object-cover" style={{ objectPosition: "50% 16%" }} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 55%, rgba(7,7,10,0.88) 100%)" }}
            />
            <div className="absolute inset-x-5 bottom-5">
              <div className="t-label text-brand">On the clock</div>
              <div className="mt-1.5">Building enterprise systems</div>
            </div>
          </div>

          {/* Back — candid */}
          <div className="card" style={{ ...faceBase, transform: "rotateY(180deg)" }}>
            <img src="/casual.jpg" alt="" aria-hidden className="h-full w-full object-cover" style={{ objectPosition: "50% 28%" }} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 52%, rgba(7,7,10,0.88) 100%)" }}
            />
            <div className="absolute inset-x-5 bottom-5">
              <div className="t-label text-brand-soft">Off the clock</div>
              <div className="mt-1.5">Competitive programmer at heart</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 t-sm muted">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M16 3l5 5-5 5M21 8H9a5 5 0 00-5 5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Tap or hover to flip
      </div>
    </div>
  );
}
