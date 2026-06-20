"use client";

export default function Marquee({
  items,
  speed = "normal",
}: {
  items: React.ReactNode[];
  speed?: "normal" | "slow";
}) {
  // Repeat enough that one animated half always exceeds the viewport, so the
  // -50% loop is seamless (no gap / jump even with only a few unique items).
  const seq = [...items, ...items, ...items, ...items];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className={`flex w-max ${speed === "slow" ? "animate-marquee-slow" : "animate-marquee"}`}>
        {seq.map((it, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {it}
          </div>
        ))}
      </div>
    </div>
  );
}
