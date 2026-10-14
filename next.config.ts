import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // I woff in assets/fonts servono alle route OG a runtime: senza questa
  // inclusione esplicita il file tracing di Vercel non li impacchetta.
  outputFileTracingIncludes: {
    "/api/og/frase/[slug]": ["./assets/fonts/*.woff"],
    "/api/og/quiz/[id]": ["./assets/fonts/*.woff"],
  },
};

export default nextConfig;
