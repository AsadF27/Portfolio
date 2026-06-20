import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function SectionHeading({
  eyebrow,
  title,
  kicker,
  id,
}: {
  eyebrow: string;
  title: string;
  kicker?: string;
  id?: string;
}) {
  return (
    <div id={id}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <h2 className="t-h1 mt-5 max-w-[22ch]">
        <TextReveal text={title} stagger={0.045} />
      </h2>
      {kicker ? (
        <Reveal delay={0.1}>
          <p className="muted mt-6 max-w-[54ch] leading-relaxed">{kicker}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
