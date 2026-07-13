# Mach II Labs

Studio site for **Mach II Labs** — `https://machiilabs.com`

Standalone Next.js app on its own GitHub repo and Vercel project. Not related to other personal or product repositories.

## Company principles

- **No subscriptions — ever.** Mach II Labs does not use subscription billing, recurring plans, or SaaS-style lock-in.
- **Skagway** — free forever.
- **Ketchikan** (SafeHaven) — trial + one-time purchase.
- **No app telemetry by default.** Products must not phone home with usage analytics or silent diagnostics; bug reports are user-initiated only. (Studio support-process metrics are fine.)

## Local development

```bash
npm install
npm run dev
```

## Deploy

- GitHub: `https://github.com/pkleim10/machii-labs` (`main`)
- Vercel project: `machii-labs`
- Production alias: `https://machii-labs.vercel.app`

### Cloudflare DNS (keep Cloudflare nameservers)

In Cloudflare DNS for `machiilabs.com`, create records with **Proxy status = DNS only** (grey cloud):

| Type  | Name | Target |
|-------|------|--------|
| CNAME | `@`  | `cdb2f9b723d7ee61.vercel-dns-017.com` |
| CNAME | `www`| `cdb2f9b723d7ee61.vercel-dns-017.com` |

(Cloudflare flattens the apex CNAME. Alternative apex: A → `76.76.21.21`.)

Vercel Domain Connect one-click (optional):

- Apex: open from Vercel Domains settings for `machiilabs.com`
- www: same for `www.machiilabs.com`

After DNS propagates: `npx vercel domains verify machiilabs.com`

Optional: in the Vercel project UI, connect the GitHub repo so pushes to `main` auto-deploy (needs the Vercel GitHub app authorized for this private repo).

## Stack

- Next.js (App Router)
- Tailwind CSS
- TypeScript
