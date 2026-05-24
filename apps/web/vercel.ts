import type { VercelConfig } from "@vercel/config/v1";

/**
 * Typed Vercel project config (replaces vercel.json). Set this app's directory
 * as the Vercel project "Root Directory" (apps/web). Extend with redirects,
 * rewrites, crons, or function settings as needed.
 */
const config: VercelConfig = {
  framework: "nextjs",
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};

export default config;
