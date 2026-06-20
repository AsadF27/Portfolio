"use client";

import { profile, socials } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";

export default function Contact() {
  const mailto = `mailto:${profile.email}?subject=Let%27s%20build%20something`;
  const year = new Date().getFullYear();

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="section relative overflow-hidden pb-12">
      <div
        className="glow"
        style={{ left: "50%", top: "10%", width: "44rem", height: "30rem", transform: "translateX(-50%)", background: "rgb(var(--brand-rgb) / 0.18)" }}
      />

      <div className="shell relative">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">Contact</span>
          </Reveal>

          <h2 className="t-display mt-6 max-w-[16ch]">
            <TextReveal text="Let's turn your manual work" stagger={0.04} />{" "}
            <span className="gold-text">
              <TextReveal text="into seconds." delay={0.2} stagger={0.04} />
            </span>
          </h2>

          <Reveal delay={0.1}>
            <p className="muted mt-7 max-w-[48ch] leading-relaxed">
              Building an enterprise platform, an AI workflow, or something that needs to scale and
              actually ship? I&rsquo;d love to hear about it.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={mailto} variant="primary" size="lg">
                Start a conversation
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <MagneticButton href={socials[0].url} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                Connect on LinkedIn
              </MagneticButton>
            </div>
          </Reveal>

          {/* Direct email */}
          <Reveal delay={0.2}>
            <a href={mailto} className="t-h2 mt-12 inline-block font-medium tracking-tight transition-colors hover:text-brand">
              {profile.email}
            </a>
          </Reveal>

          {/* Facts */}
          <Reveal delay={0.24}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 t-sm muted">
              <span>{profile.phone}</span>
              <span className="hidden h-1 w-1 rounded-full bg-ink-3 sm:block" />
              <span>{profile.location}</span>
              <span className="hidden h-1 w-1 rounded-full bg-ink-3 sm:block" />
              <span>{profile.title}</span>
            </div>
          </Reveal>
        </div>

        <div className="hairline mt-20" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line t-sm font-semibold text-brand">
              {profile.initials}
            </span>
            <span className="t-sm muted">
              © {year} {profile.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3 py-2 t-sm text-ink-2 transition-colors hover:text-brand"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden t-sm faint sm:block">Built with Next.js · GSAP · Three.js</span>
            <a href="#top" onClick={toTop} className="flex items-center gap-2 t-sm text-ink-2 transition-colors hover:text-brand">
              Back to top
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 13V3M8 3L3 8M8 3l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
