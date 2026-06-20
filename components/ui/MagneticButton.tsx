"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  strength?: number;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  href = "#",
  className = "",
  variant = "ghost",
  size = "md",
  strength = 0.45,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.7, ease: "power3.out" });
      yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.7, ease: "power3.out" });
    },
    { scope: ref }
  );

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xTo.current?.((e.clientX - (r.left + r.width / 2)) * strength);
    yTo.current?.((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`btn btn-${variant} ${size === "lg" ? "btn-lg" : ""} ${className}`}
    >
      <span className="pointer-events-none inline-flex items-center gap-[0.6rem]">{children}</span>
    </a>
  );
}
