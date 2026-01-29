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

## Frontend Design Guidelines

Avoid generic "AI slop" aesthetics. Key principles:
- **Typography**: Use distinctive, beautiful fonts — avoid Inter, Roboto, Arial, Space Grotesk, and other overused defaults
- **Color**: Commit to a cohesive theme with dominant colors and sharp accents. Use CSS variables. Draw from IDE themes and cultural aesthetics
- **Motion**: Prefer CSS-only animations. Use Motion library for React when available. Focus on high-impact moments like orchestrated page loads with staggered reveals
- **Backgrounds**: Create depth with layered gradients, geometric patterns, or contextual effects — not flat solid colors
- **Avoid**: purple-gradient-on-white clichés, predictable layouts, cookie-cutter components. Vary between light/dark themes and make unexpected creative choices
