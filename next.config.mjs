/** @type {import('next').NextConfig} */
const nextConfig = {
  // Heavy WebGL + GSAP timelines double-init awkwardly under StrictMode's
  // dev double-invoke; disable to keep the canvas and ScrollTriggers stable.
  reactStrictMode: false,
};

export default nextConfig;
