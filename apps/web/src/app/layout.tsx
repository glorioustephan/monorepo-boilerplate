import { ThemeProvider, ThemeSwitcher } from "@monorepo-boilerplate/ui";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "monorepo-boilerplate",
  description: "Turborepo + pnpm boilerplate — Next.js 16, React 19, shared UI kit.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // suppressHydrationWarning: next-themes sets the appearance class on <html> before
  // hydration, so the server/client class attribute differs by design.
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
            <strong>monorepo-boilerplate</strong>
            <ThemeSwitcher />
          </header>
          <main className="px-6 pb-12">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
