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

TypeScript strict mode is on with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `erasableSyntaxOnly` enforced. Two tsconfig files: `tsconfig.app.json` (src code, ES2022 target) and `tsconfig.node.json` (build tooling, ES2023 target).

## Active Design System

The site is being rebuilt against a deliberate brand system (see plan at `C:\Users\omarh\.claude\plans\i-want-to-clean-tranquil-riddle.md`):

- **Surface**: Light canvas (`#FFFFFF` background, `#0A0A0A` foreground). The only dark surface is the footer gradient band (`#18181B → #0A0A0A`).
- **Palette**: Monochrome only — Neutral / Zinc scale, no chromatic accents. Photography supplies all colour.
- **Typography**: **Inter Tight** is the single typeface for the entire site (loaded via `@fontsource-variable/inter-tight`). Rhythm comes from scale + weight contrast (400 / 500 / 600). Italic accents drop to weight 400 and `var(--muted-foreground)`.
- **Geometry**: 10px base radius, 1px `var(--border)` hairlines, no drop shadows, no gradients except the footer.
- **Motion**: GSAP + Lenis. Restrained — one orchestrated hero reveal per route; gentle fades on scroll; no parallax on imagery.
- **Routing**: React Router v6+ with multi-page architecture: `/`, `/works`, `/works/:slug`, `/about`, `/contact`. Lazy-loaded routes.
- **i18n**: Bilingual RU/EN via `react-i18next` (`src/i18n/`). UI strings in `locales/{ru,en}.json`; per-project copy inline in `src/data/projects.ts` under `{ ru, en }`.

### Font policy
- **Inter Tight is the approved typeface** for this project — the brandbook specifies it explicitly. Plain `Inter`, Roboto, Arial, and Space Grotesk remain banned.
- Do not introduce a serif display, monospace, or secondary sans pairing without explicit approval.

### General creative principles
Still applies for any work outside the active brand system — avoid converging toward "on-distribution" outputs, cookie-cutter components, the purple-gradient-on-white cliché, and predictable layouts. The brand discipline is "chrome stays out of the way of the work."