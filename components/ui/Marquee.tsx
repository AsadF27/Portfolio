"use client";

export default function Marquee({
  items,
  speed = "normal",
}: {
  items: React.ReactNode[];
  speed?: "normal" | "slow";
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className={`marquee-track ${speed === "slow" ? "animate-marquee-slow" : "animate-marquee"}`}>
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
