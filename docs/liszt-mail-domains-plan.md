# lisztmail.com and lisztmail.app — plan

**Why:** the owner registered both domains for Liszt Mail. Until the app has a site of its own, they should land on its page here, `/lisztmail`.

**What:**
- Vercel (owner): `lisztmail.com`, `www.lisztmail.com`, `lisztmail.app`, `www.lisztmail.app` added to this project, connected to Production (no apex-to-www redirect, so a visit takes one hop); DNS records at the registrar as Vercel lists them.
- `next.config.ts`: a host-matched redirect, any path on those four hosts → `https://machiilabs.com/lisztmail`, temporary (307) so browsers don't cache it if the app gets its own site.

**Steps:** branch `liszt-mail-domains` from `origin/main`; type-check, lint, build; commit; on the owner's word, push and open a PR; check the Vercel build; the owner merges. Then `curl -I https://lisztmail.com` should answer 307 to the page.
