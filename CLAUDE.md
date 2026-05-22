# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KARAF is a website for a Russian IT agency focused on web/mobile apps, AI, and Telegram bots. Built with React 19, TypeScript, and Vite 7.

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Type-check (`tsc -b`) then build for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

No test framework is configured yet.

## Architecture

Standard Vite + React SPA. Entry point is `index.html` → `src/main.tsx` → `src/App.tsx`. React 19 with StrictMode enabled. Uses `@vitejs/plugin-react` (Babel) for Fast Refresh.

TypeScript strict mode is on with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `erasableSyntaxOnly` enforced. Two tsconfig files: `tsconfig.app.json` (src code, ES2022 target) and `tsconfig.node.json` (build tooling, ES2023 target). Adding source files outside `src/` requires updating the node config. ESLint runs `eslint-plugin-react-hooks` + `react-refresh` only (no type-aware lint).

### Route shell & code-splitting

`src/App.tsx` is the chrome shell, in order: `Preloader` (one-time on first mount) → `CustomCursor` → `Header` → `<Suspense>` lazy routes inside `RouteTransition` → `Footer`. All five routes (`Home`, `Works`, `WorkDetail`, `About`, `Contact`, plus `NotFound`) are `React.lazy`. A `ScrollToTop` component resets scroll via the Lenis instance on each pathname change.

### Runtime chrome & scroll

Lenis is a **singleton** exposed by `src/hooks/useLenis.ts` (`getLenis()`). Don't call `window.scrollTo` directly; route to Lenis when available so GSAP ScrollTriggers and the preloader gate stay in sync. `useLenis(isLoading)` pauses Lenis until the preloader finishes.

Custom hooks worth referencing before reinventing: `useGSAP`, `useSplitText`, `useLenis`, `usePreloader`, `useMediaQuery`.

### Component taxonomy

Directories carry meaning. CSS Modules are colocated as `*.module.css` next to each component.

- `components/chrome/` — site-wide overlays (Preloader, CustomCursor)
- `components/layout/` — Header, Footer, Section, RouteTransition, LanguageToggle
- `components/home/`, `components/works/`, `components/detail/` — route-scoped sections
- `components/shared/` — reusable primitives (Button, Eyebrow, ScrollReveal, TechMarquee, RichText)

### Content sources of truth

- `src/data/projects.ts` — projects (per-project copy inline as `{ ru, en }`)
- `src/data/services.ts`, `src/data/technologies.ts` — service / tech lists
- `src/i18n/locales/{ru,en}.json` — all other UI strings, read via `useTranslation()`. Language is persisted in localStorage under the `karaf-lang` key.

## Active Design System

The site is being rebuilt against a deliberate brand system (see plan at `C:\Users\omarh\.claude\plans\i-want-to-clean-tranquil-riddle.md`):

- **Surface**: Light canvas (`#FFFFFF` background, `#0A0A0A` foreground). The only dark surface is the footer gradient band (`#18181B → #0A0A0A`).
- **Palette**: Monochrome only — Neutral / Zinc scale, no chromatic accents. Photography supplies all colour.
- **Typography**: **Inter Tight** is the single typeface for the entire site (loaded via `@fontsource-variable/inter-tight`). Rhythm comes from scale + weight contrast (400 / 500 / 600). Italic accents drop to weight 400 and `var(--muted-foreground)`.
- **Geometry**: 10px base radius, 1px `var(--border)` hairlines, no drop shadows, no gradients except the footer.
- **Motion**: GSAP + Lenis. Restrained — one orchestrated hero reveal per route; gentle fades on scroll; no parallax on imagery. Use the motion tokens (`--ease-out`, `--ease-in-out`, `--dur-fast` / `--dur` / `--dur-slow`) instead of inlining cubic-bezier strings or ms values.
- **Routing**: React Router **v7** with multi-page architecture: `/`, `/works`, `/works/:slug`, `/about`, `/contact`. Lazy-loaded routes.
- **i18n**: Bilingual RU/EN via `react-i18next` (`src/i18n/`). UI strings in `locales/{ru,en}.json`; per-project copy inline in `src/data/projects.ts` under `{ ru, en }`.

### Design tokens

`src/styles/tokens.css` is the single source of truth — prefer tokens over raw values:

- **Fluid spacing**: `--vw` (`clamp(0.5rem, 0.8vw, 1rem)`) with derived multipliers (`--vw-0_5`, `--vw-3`, `--vw-4`). Use these for fluid spacing, not raw `vw`.
- **Layout rhythm**: `--section-pad-y`, `--section-pad-x`, `--content-width`, `--content-narrow`, `--header-h`.
- **Geometry**: `--radius` (10px), `--radius-soft`, `--radius-pill-sm`, `--radius-pill`, `--border-w` (1px).
- **Surface scale**: Neutral/Zinc CSS variables (`--zinc-200` … `--zinc-950`) plus the semantic `--background` / `--foreground` / `--muted` / `--border` set.

### Font policy
- **Inter Tight is the approved typeface** for this project — the brandbook specifies it explicitly. Plain `Inter`, Roboto, Arial, and Space Grotesk remain banned.
- Do not introduce a serif display, monospace, or secondary sans pairing without explicit approval.

### General creative principles
Still applies for any work outside the active brand system — avoid converging toward "on-distribution" outputs, cookie-cutter components, the purple-gradient-on-white cliché, and predictable layouts. The brand discipline is "chrome stays out of the way of the work."