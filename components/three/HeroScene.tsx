"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;

  attribute float aScale;
  attribute vec3 aColor;

  varying vec3 vColor;

  void main() {
    vec3 p = position;

    float distanceToCenter = length(p.xz);
    float angle = atan(p.x, p.z);
    angle += (1.0 / (distanceToCenter + 0.4)) * uTime * 0.22;
    p.x = cos(angle) * distanceToCenter;
    p.z = sin(angle) * distanceToCenter;

    p.y += sin(uTime * 0.4 + distanceToCenter * 1.6) * 0.07;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / max(-mvPosition.z, 0.1));
    gl_PointSize = clamp(gl_PointSize, 0.0, uSize * 3.0);

    vColor = aColor;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float strength = 1.0 - smoothstep(0.0, 0.5, d);
    strength = pow(strength, 2.4);
    gl_FragColor = vec4(vColor, strength);
  }
`;

function Galaxy({ count, dark }: { count: number; dark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const branches = 4;
    const radiusMax = 7.5;
    const spin = 0.85;
    const randomness = 0.55;
    const randomnessPower = 2.7;

    // Dark = glowing constellation (additive, bright). Light = ink schematic (normal blend, deep blue).
    const inside = new THREE.Color(dark ? "#dce8ff" : "#2456d6");
    const mid = new THREE.Color(dark ? "#4d7cff" : "#1e40af");
    const outside = new THREE.Color(dark ? "#34d3ee" : "#0e7490");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.5) * radiusMax;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * spin;

      const rand = () =>
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rand();
      positions[i3 + 1] = rand() * 0.45;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rand();

      const t = radius / radiusMax;
      const c = inside.clone();
      if (t < 0.5) c.lerpColors(inside, mid, t / 0.5);
      else c.lerpColors(mid, outside, (t - 0.5) / 0.5);
      const b = 0.7 + Math.random() * 0.5;
      colors[i3] = c.r * b;
      colors[i3 + 1] = c.g * b;
      colors[i3 + 2] = c.b * b;

      scales[i] = 0.4 + Math.random() * Math.random() * 2.4;
    }
    return { positions, colors, scales };
  }, [count, dark]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 28 },
    }),
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += Math.min(delta, 0.05);
    const g = groupRef.current;
    if (!g) return;
    const s = scroll.current;
    const targetX = 0.32 + mouse.current.y * 0.18 + s * 0.5;
    const targetZ = mouse.current.x * 0.12;
    g.rotation.x += (targetX - g.rotation.x) * 0.05;
    g.rotation.z += (targetZ - g.rotation.z) * 0.05;
    g.rotation.y += delta * 0.035;
    g.position.y += (s * -1.4 - g.position.y) * 0.06;
  });

  return (
    <group ref={groupRef} rotation={[0.32, 0, 0]}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [dark, setDark] = useState(true);

  const count = useMemo(() => {
    if (typeof window === "undefined") return 4800;
    return window.innerWidth < 768 ? 2000 : 4800;
  }, []);

  // Pause the render loop when the hero scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Track theme — galaxy is a dark-mode effect; pause + hide it in light mode.
  useEffect(() => {
    const read = () => setDark(document.documentElement.getAttribute("data-theme") !== "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  // Render in both themes (galaxy is theme-aware); just pause when offscreen.
  const active = inView;

  return (
    <div ref={wrapRef} className="hero-canvas" style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0.5, 6.5], fov: 56 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Galaxy key={dark ? "dark" : "light"} count={count} dark={dark} />
      </Canvas>
    </div>
  );
}
