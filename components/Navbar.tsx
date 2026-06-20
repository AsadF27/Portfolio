"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/content";

function smoothTo(href: string) {
  const el = document.querySelector(href) as HTMLElement | null;
  if (!el) return;
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.3 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > last && !menuOpen);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (window.__lenis) menuOpen ? window.__lenis.stop() : window.__lenis.start();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigate = (href: string) => {
    setMenuOpen(false);
    // allow the overlay to start closing before scrolling
    setTimeout(() => smoothTo(href), 10);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo"
        style={{ transform: hidden ? "translateY(-120%)" : "translateY(0)" }}
      >
        <div
          className="mx-auto mt-3 flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ease-out-expo md:mt-4"
          style={{
            width: "min(100% - 1.5rem, var(--shell))",
            background: scrolled || menuOpen ? "rgba(12,12,18,0.72)" : "transparent",
            backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
            border: scrolled || menuOpen ? "1px solid var(--line)" : "1px solid transparent",
          }}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              navigate("#top");
            }}
            className="group flex items-center gap-2.5 pl-2"
            aria-label="Asad Faridi — home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line t-sm font-semibold tracking-tight text-brand transition-colors group-hover:border-brand/60">
              {profile.initials}
            </span>
            <span className="hidden font-medium tracking-tight sm:block">
              {profile.firstName}
              <span className="muted"> Faridi</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(l.href);
                }}
                className="rounded-full px-4 py-2 t-sm text-ink-2 transition-colors duration-300 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigate("#contact");
              }}
              className="btn btn-primary !px-5 !py-2.5"
              style={{ fontSize: "var(--fs-small)" }}
            >
              Let&rsquo;s talk
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className="absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300"
                  style={{ top: menuOpen ? "5px" : "0", transform: menuOpen ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute left-0 top-[5px] block h-[1.5px] w-4 bg-current transition-opacity duration-200"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <span
                  className="absolute left-0 block h-[1.5px] w-4 bg-current transition-all duration-300"
                  style={{ top: menuOpen ? "5px" : "10px", transform: menuOpen ? "rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-[45] flex flex-col items-center justify-center gap-2 transition-all duration-500 ease-out-expo md:hidden"
        style={{
          background: "rgba(7,7,10,0.96)",
          backdropFilter: "blur(20px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {navLinks.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => {
              e.preventDefault();
              navigate(l.href);
            }}
            className="t-h1 font-medium tracking-tight text-ink transition-all duration-500"
            style={{
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transitionDelay: `${menuOpen ? 120 + i * 60 : 0}ms`,
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
