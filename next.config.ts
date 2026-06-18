import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["clerical-snowdrop-flagstick.ngrok-free.dev"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
