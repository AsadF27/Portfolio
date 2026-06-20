"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let running = false;

    // Self-terminating loop: settles and stops when the cursor is idle,
    // so it isn't burning a RAF + composite every frame for the whole session.
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (Math.hypot(mx - rx, my - ry) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      const interactive = !!target.closest("a, button, [role='button'], [data-cursor='hover']");
      if (ring.current) ring.current.dataset.active = interactive ? "true" : "false";
      start();
    };

    window.addEventListener("mousemove", onMove);
    start();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      running = false;
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
