# Mach II Labs brand mark

**Official logo:** ascent chevron over horizon bar — no container squircle.

Hand-traced from concept 3 via `scripts/trace-logo-mark.html`, then locked as SVG.

## Primary asset

[`/logo-mark.svg`](/logo-mark.svg) — official mark

Also: [`/favicon.svg`](/favicon.svg), [`/logo.svg`](/logo.svg) (horizontal lockup), [`/logo-stacked.svg`](/logo-stacked.svg)

Brand sheet (SVG): [`/brand/machii-brand-layout.svg`](/brand/machii-brand-layout.svg)

Site chrome: [`MachiiLogo`](../../src/components/machii-logo.tsx) → `/logo-mark.svg`

## Colors

| Token | Hex | Role |
|-------|-----|------|
| Afterburn | `#e8a045` | Chevron fill |
| Snow | `#eef2f7` | Primary wordmark (“Mach II”) on dark |
| Fog | `#9aa8bd` | Secondary wordmark (“LABS”); horizon bar start |
| Horizon | `#3d6f9a` | Horizon bar (gradient end) |
| Ink | `#070b12` | Page / chrome ground |

## Clear space / min size

- Clear space: about ¼ of mark width
- Mark: prefer **24×24+** px

## Do / don’t

- **Do** use `/logo-mark.svg` as the company mark
- **Don’t** put the mark back in a squircle / app-icon frame for the company logo
- **Don’t** use concept PNGs or `logo-mark.png` as production logos (reference only)

## Tracer (geometry source)

```bash
scripts/open-logo-mark-tracer.sh
```

Trace JSON: `scripts/references/logo-mark-trace.json`
