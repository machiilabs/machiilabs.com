# Mach II Labs brand mark

**Official logo:** ascent chevron over horizon bar — no container squircle.

Hand-traced from concept 3 via `scripts/trace-logo-mark.html`, then locked as SVG.

## Primary asset

[`/logo-mark.svg`](/logo-mark.svg) — official mark

Also: [`/favicon.svg`](/favicon.svg), [`/logo.svg`](/logo.svg) (horizontal lockup), [`/logo-stacked.svg`](/logo-stacked.svg) (primary stacked lockup)

Brand sheet (SVG): [`/brand/machii-brand-layout.svg`](/brand/machii-brand-layout.svg)

Site chrome: [`MachiiLogo`](../../src/components/machii-logo.tsx) → `/logo-mark.svg`  
Home hero uses `wordmarkLayout="stacked"`.

## Primary lockup (stacked)

1. **Mach II** (Snow, Inter Extra Bold) — baseline on the **chevron foot** (just above the bar)
2. **LABS** (Horizon `#3d6f9a`, Inter Bold Italic, tracked caps) — starts flush at the **original bar’s right edge**, left-aligned with Mach II; same color as the bar extension
3. **Bar extension** — solid **Horizon** `#3d6f9a` continues after LABS to Mach II’s right edge
4. Tip of the chevron rises above Mach II; no extra gap between mark bar and wordmark

## Colors

| Token | Hex | Role |
|-------|-----|------|
| Afterburn | `#e8a045` | Chevron fill |
| Snow | `#eef2f7` | Primary wordmark (“Mach II”) on dark |
| Fog | `#9aa8bd` | Horizon bar gradient start; UI secondary text |
| Horizon | `#3d6f9a` | Horizon bar gradient end; LABS; solid lockup bar extension |
| Ink | `#070b12` | Page / chrome ground |

## Clear space / min size

- Clear space: about ¼ of mark width
- Mark: prefer **24×24+** px
- Stacked lockup: prefer **≥ 140px** wide

## Do / don’t

- **Do** use `/logo-mark.svg` as the company mark
- **Do** keep LABS in Horizon (same as bar extension), not Snow or Fog
- **Do** use solid Horizon for any bar extension past the mark
- **Don’t** put the mark back in a squircle / app-icon frame for the company logo
- **Don’t** use concept PNGs or `logo-mark.png` as production logos (reference only)

## Tracer (geometry source)

```bash
scripts/open-logo-mark-tracer.sh
```

Trace JSON: `scripts/references/logo-mark-trace.json`
