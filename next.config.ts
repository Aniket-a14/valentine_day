import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "canvas-confetti"],
  }
};

export default nextConfig;
