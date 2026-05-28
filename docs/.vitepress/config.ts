import { defineConfig } from 'vitepress';

// Update this to your GitHub org/repo when you fork this template (also update README
// badges and `.github/`). External links are not dead-link checked, so it never fails the build.
const REPO_URL = 'https://github.com/glorioustephan/monorepo-boilerplate';

export default defineConfig({
  title: '@monorepo-boilerplate',
  description:
    'Turborepo + pnpm monorepo boilerplate docs — Next.js 16, React 19, MCP, oxlint/oxfmt.',
  // Base path for the deployed site. Local dev and root-domain hosting use '/'; GitHub Pages
  // *project* sites serve under '/<repo>/', injected as DOCS_BASE by the Deploy Docs workflow
  // (derived from the repo name, so forks work without editing this).
  base: process.env.DOCS_BASE || '/',
  // Content `.md` files live at the docs/ root (this directory); `.vitepress/`
  // holds config + build output. Keep both explicit.
  srcDir: '.',
  outDir: '.vitepress/dist',
  // Hard-fail on dead internal links — this is the docs quality gate (runs in CI
  // via `pnpm build`). Never set to `true`; it would silently disable the check.
  ignoreDeadLinks: false,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Conventions', link: '/conventions' },
      { text: 'Deployment', link: '/deployment' },
      { text: 'Roadmap', link: '/roadmap' },
      {
        text: 'Project Status',
        items: [
          { text: 'UI Kit Catalog', link: '/phases/ui-kit-catalog' },
          { text: 'TODO Digest', link: '/todo' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Conventions', link: '/conventions' },
          { text: 'Deployment', link: '/deployment' },
        ],
      },
      {
        text: 'Design & Architecture',
        items: [
          { text: 'Roadmap', link: '/roadmap' },
          { text: 'UI Kit Catalog', link: '/phases/ui-kit-catalog' },
        ],
      },
      {
        text: 'Project Status',
        items: [{ text: 'TODO Digest', link: '/todo' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: REPO_URL }],
    editLink: {
      pattern: `${REPO_URL}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
  },
});
