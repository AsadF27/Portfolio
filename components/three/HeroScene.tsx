"use client";

import { useMemo, useRef, useEffect } from "react";
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

    // Swirl: angular speed falls off with distance from the core.
    float distanceToCenter = length(p.xz);
    float angle = atan(p.x, p.z);
    angle += (1.0 / (distanceToCenter + 0.4)) * uTime * 0.22;
    p.x = cos(angle) * distanceToCenter;
    p.z = sin(angle) * distanceToCenter;

    // Gentle vertical drift for organic depth.
    p.y += sin(uTime * 0.4 + distanceToCenter * 1.6) * 0.07;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // R3F's Canvas dpr already scales the drawing buffer — don't multiply again.
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

function Galaxy({ count }: { count: number }) {
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

    const inside = new THREE.Color("#ffd27a"); // warm solar core
    const mid = new THREE.Color("#f4b63c"); // brand gold
    const outside = new THREE.Color("#5a6bff"); // cool indigo rim

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

      const rx = rand();
      const ry = rand() * 0.45;
      const rz = rand();

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rx;
      positions[i3 + 1] = ry;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;

      const t = radius / radiusMax;
      const c = inside.clone();
      if (t < 0.5) c.lerpColors(inside, mid, t / 0.5);
      else c.lerpColors(mid, outside, (t - 0.5) / 0.5);
      // slight brightness scatter
      const b = 0.7 + Math.random() * 0.5;
      colors[i3] = c.r * b;
      colors[i3 + 1] = c.g * b;
      colors[i3 + 2] = c.b * b;

      scales[i] = 0.4 + Math.random() * Math.random() * 2.4;
    }
    return { positions, colors, scales };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 34 },
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
    if (matRef.current) matRef.current.uniforms.uTime.value += delta;
    const g = groupRef.current;
    if (!g) return;
    const s = scroll.current;
    // base tilt + mouse parallax + scroll recede
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
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  // Lighter particle budget on small screens.
  const count = useMemo(() => {
    if (typeof window === "undefined") return 6500;
    return window.innerWidth < 768 ? 3200 : 6800;
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.5, 6.5], fov: 56 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Galaxy count={count} />
    </Canvas>
  );
}
