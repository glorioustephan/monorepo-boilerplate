import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler 1.0 — automatic memoization (Next applies it only to relevant
  // files via SWC; babel-plugin-react-compiler must be installed as a devDep).
  reactCompiler: true,
  // Internal packages are consumed from TypeScript source, so Next transpiles
  // them on the fly. This is what enables HMR across package boundaries.
  transpilePackages: ["@monorepo-boilerplate/ui"],
};

export default nextConfig;
