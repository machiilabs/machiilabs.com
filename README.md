# Mach II Labs

Studio site for **Mach II Labs** — `https://machiilabs.com`

Standalone Next.js app on its own GitHub repo and Vercel project. Not related to other personal or product repositories.

## Company principles

- **No subscriptions — ever.** Mach II Labs does not use subscription billing, recurring plans, or SaaS-style lock-in.
- **15CE Flasher** — free forever (first official product).
- **Skagway** — free forever.
- **Ketchikan** (SafeHaven) — trial + one-time purchase.
- **No app telemetry by default.** Products must not phone home with usage analytics or silent diagnostics; bug reports are user-initiated only. (Studio support-process metrics are fine.)

## Products on this site

| Path | Product |
|------|---------|
| `/` | Studio home (features 15CE Flasher) |
| `/flasher` | 15CE Flasher product page |
| `/flasher/guide` | Short online users guide |

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

## Admin (`/admin`)

Secured studio dashboard (portal links and future internal tools). Public marketing routes stay open.

- **Auth:** Supabase Auth (dedicated `machii-labs` project — not shared with kleimeyer)
- **Gate:** magic-link login + `ADMIN_EMAILS` allowlist (middleware/proxy and server checks)
- **Signup:** disabled on the Supabase project; only invite/create users in the dashboard

### Local / Vercel env

Copy [`.env.example`](.env.example) and set:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; mailing-list writes (never expose to the browser) |
| `ADMIN_EMAILS` | Comma-separated allowlist (e.g. `you@example.com`) |

Also set the same vars in the Vercel project. Auth redirect allow-list already includes localhost, `machiilabs.com`, and the Vercel alias.

### Hardening checklist

1. Supabase → Authentication → Providers: keep email enabled; leave social providers off unless you need them.
2. Supabase → Authentication → Providers / settings: **disable public sign-ups** (already set for this project).
3. Create only the admin user(s) under Authentication → Users.
4. Optional but recommended: enable **MFA (TOTP)** for the admin user in Authentication → Users (or after first login via account MFA enroll).
5. Never put vendor API tokens in the admin UI — links only for v1.
6. Keep `/admin` out of marketing nav and sitemaps (`robots: noindex` on admin pages).

Dashboard: `https://supabase.com/dashboard/project/rddzasjcgrdlugeducsu`

## Stack

- Next.js (App Router)
- Tailwind CSS
- TypeScript
- Supabase Auth (`@supabase/ssr`) for `/admin`
