import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    qualities: [60, 75, 85],
  },
  allowedDevOrigins: ["clerical-snowdrop-flagstick.ngrok-free.dev"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
