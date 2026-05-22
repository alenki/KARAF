# Hero Noise Field — Design

**Date:** 2026-05-22
**Status:** Approved (design); pending implementation plan
**Scope:** Home route hero (`src/components/home/Hero.tsx`)

## Context

The original brief asked for a premium Active-Theory-tier WebGL hero: dark gradient mesh, warm/cool sepia and steel-blue accents, floating device mockups with mouse parallax, bloom + vignette + grain postprocessing, dynamic-imported R3F scene.

The repo's active brand system (`CLAUDE.md`) is the opposite of all of that:

- Light canvas (`#FFFFFF` background); the only dark surface is the footer.
- Monochrome only — Neutral / Zinc scale, no chromatic accents.
- No drop shadows, no gradients except the footer.
- Restrained motion; no parallax on imagery.

The user picked the "keep the brandbook, adapt the brief to fit it" option. This spec defines a brand-faithful WebGL primitive that preserves the *spirit* of the brief (real WebGL behind the hero type, with discipline) and explicitly rejects everything that would violate the brand system.

## Goal

Introduce one subtle, slow-drifting monochrome noise field behind the hero type. It should feel like the paper itself is faintly alive — not like imagery, not like an effect, not like a thing you point at. "Chrome stays out of the way of the work."

## Non-goals (explicit)

To prevent scope drift, the following from the original brief are **out**:

- ❌ Dark hero background — background stays `var(--background)` (`#FFFFFF`).
- ❌ Warm/cool palette accents — output is pure black alpha on white.
- ❌ Floating device mockups — no `<Float>`, no `useTexture`, no `/public/screens/`.
- ❌ Mouse parallax of any kind.
- ❌ Postprocessing chain (Bloom, Noise pass, Vignette).
- ❌ New dependencies — no `three`, no `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `@paper-design/shaders-react`, `react-intersection-observer`, `@types/three`.
- ❌ Stack pivot — repo stays Vite + React 19 + React Router v7 + CSS Modules. No Next.js, no Tailwind.

## Component & file layout

A reusable primitive under the existing taxonomy:

- `src/components/shared/NoiseField/NoiseField.tsx` — React component owning the canvas element, WebGL context, RAF loop, observers, and dispose.
- `src/components/shared/NoiseField/NoiseField.module.css` — absolute fill, `pointer-events: none`, `z-index: 0`.
- `src/components/home/Hero.tsx` — modified to render `<NoiseField />` as the first child of `<section className={styles.hero}>`.
- `src/components/home/Hero.module.css` — modified to add `position: relative` (it already is) and ensure `.inner` sits at `z-index: 1` above the canvas.

Shader source lives as template literals inside `NoiseField.tsx`. No separate `.glsl` files — the strings are short and there's exactly one set.

## Shader contract

**Vertex shader.** Fullscreen triangle via `gl_VertexID` (WebGL 2 path) with a minimal attribute-buffer fallback for WebGL 1. No transforms.

**Fragment shader.** Outputs alpha-only black:

```
gl_FragColor = vec4(0.0, 0.0, 0.0, n * u_intensity);
```

This way the primitive composites cleanly over *any* background — the shader does not need to know the surface colour.

**Noise.** 2-octave fBm built from a cheap hash-based value noise (no textures, no derivatives, runs on integrated GPUs and WebGL 1):

- High-frequency layer: `valueNoise(uv * 320.0 + offset)` — the grain itself.
- Low-frequency modulator: `valueNoise(uv * 1.5 + u_time * 0.015)` — slowly varies the local density, so the overall feel breathes between roughly 3% and 5% peak contrast over tens of seconds rather than being uniform.
- Final intensity: `n = mix(highFreq * 0.7, highFreq * lowFreq, 0.6)` (exact mix tuned in implementation).

**Uniforms.**

| Uniform | Type | Notes |
|---|---|---|
| `u_time` | `float` | seconds since mount, advanced from the RAF tick |
| `u_resolution` | `vec2` | physical canvas pixels (DPR-adjusted) |
| `u_intensity` | `float` | default `0.045` (~4.5% peak black-on-white) |

No colour uniforms, no second pass, no bloom, no vignette. One draw call per frame.

## Lifecycle, performance, accessibility

**Context creation.** `canvas.getContext('webgl2') ?? canvas.getContext('webgl')`. If neither resolves, the component returns silently — hero looks like clean white paper with no degradation.

**Device pixel ratio.**

- Desktop: `Math.min(window.devicePixelRatio, 1.5)`.
- Mobile (`matchMedia('(max-width: 767px)').matches`): clamped to 1.

**Frame loop.** `requestAnimationFrame` with a time-delta gate:

- Desktop: render every frame.
- Mobile: render only when `dt >= 41ms` (≈24fps cap).

**Resize.** `ResizeObserver` on the canvas resets the GL viewport and updates `u_resolution`. No manual debounce — the observer already coalesces.

**Visibility.** `IntersectionObserver` on the canvas:

- `isIntersecting === false` → `cancelAnimationFrame`, set a paused flag.
- Re-enter → reset the RAF timestamp baseline so `u_time` resumes from where it would have been (no visible jump).

**Reduced motion.** `matchMedia('(prefers-reduced-motion: reduce)')` — render exactly one frame at mount, never start the loop. The grain is present, it just doesn't drift. If the media query *becomes* true mid-session, we cancel the loop on the next change event.

**Cleanup.** On unmount:

1. `cancelAnimationFrame` on the pending handle.
2. `gl.deleteProgram`, `gl.deleteShader` on both shaders, `gl.deleteBuffer` if any was allocated.
3. Disconnect both observers and the media-query listeners.

## Integration with Hero

```tsx
// src/components/home/Hero.tsx (sketch — final form decided in implementation)
<section className={styles.hero}>
  <NoiseField />
  <div className={`wrap ${styles.inner}`}>
    {/* existing eyebrow / headline / lede / scroll cue, unchanged */}
  </div>
</section>
```

`Hero.module.css` keeps `position: relative` on `.hero` and assigns `position: relative; z-index: 1` to `.inner` so the existing GSAP/CSS hero-in animations are unaffected and the canvas sits visually behind the type.

The existing `.hero { padding-top/bottom: clamp(...); min-height: ... }` rules remain untouched. The background colour token (`var(--background)`) remains the surface — the canvas only adds alpha grain on top.

## Brand-token alignment

- Surface: `var(--background)` — unchanged.
- Foreground: `var(--foreground)` — unchanged.
- Motion: noise drift is controlled inside the shader, but any DOM-side fade-in for the canvas mount (if added during implementation) uses `var(--dur-slow)` and `var(--ease-out)`.
- Geometry: no border, no radius, no shadow — the canvas is invisible chrome.

## Failure modes

| Failure | Behaviour |
|---|---|
| WebGL context creation fails | Component renders an empty `<canvas>` and returns. Hero looks normal. |
| Shader compile/link fails | Same as above — `console.warn` once in dev, silent in prod. |
| `ResizeObserver` unavailable (very old browser) | Single resize at mount; layout shifts are not handled but the page still renders. |
| `IntersectionObserver` unavailable | Loop runs continuously while mounted — acceptable degradation. |
| `matchMedia` unavailable | Default to desktop full-speed, no reduced-motion handling. Acceptable. |

## Out-of-scope follow-ups (deliberate)

These are *not* in this spec and should be raised as separate work if wanted later:

- Reusing `NoiseField` on other routes (About, Works) — primitive supports it, but each surface needs its own visual call.
- A GSAP-driven intro fade for the canvas itself.
- Configurable `intensity` / `scale` props beyond defaults.
- Visual-regression snapshot tests (no test framework configured in repo today).

## Acceptance criteria

1. Hero renders with the canvas behind the type; type animations and layout are visually unchanged.
2. No new entries in `package.json` dependencies or devDependencies.
3. `npm run build` passes (TypeScript + Vite).
4. `npm run lint` passes.
5. On desktop, scrolling the hero out of view stops the RAF loop (verifiable via `performance.now` logging in dev).
6. `prefers-reduced-motion: reduce` results in a static single frame.
7. Manual check on a viewport at 375×667 (mobile sim): grain visible, frame-time gate active.
8. Unmounting the route (e.g., navigating away) does not leave a leaked RAF handle or observer.
