# Project status & handoff

_Last updated: 2026-07-17_

Quick-orientation doc for whoever (human or AI) picks this up next. For how the
code is organized and the Windows dev gotchas, read `CLAUDE.md` first.

## What this is

A new static website for **The Groom Room**, a dog grooming business in Elkhart,
Indiana (owner/groomer: **Virginia Hays**, (574) 361-0301, 23567 Linden Dr,
Elkhart, IN 46516). It replaces an old WordPress site that runs on a Raspberry
Pi on the local network at `thegroomroomelkhart.com`. Goals: maintenance-free,
cheap (free hosting), and easy for an AI to edit.

Stack: **Astro 7 + Tailwind v4**, static, deployed to **GitHub Pages** (free).

## Done

- Homepage: hero (Airedale photo of Jesse), services, live Instagram gallery
  (with fallback), about w/ auto-calculated years of experience, hours, contact.
- All business content centralized in `src/config/site.ts`.
- Live Instagram feed component (Behold.so JSON, client-side) — coded, shows a
  placeholder until a feed URL is set.
- Live Google hours integration — coded; `scripts/fetch-hours.mjs` + twice-daily
  scheduled rebuild in `.github/workflows/deploy.yml`. Falls back to `site.ts`.
- Design decisions: kept the warm caramel palette (matches Jesse's photo) over
  the old site's default pink. Self-hosted font. No em dashes in copy (see
  CLAUDE.md content rules).
- Git repo initialized; work committed locally. **Not yet pushed to GitHub.**

## Pending / blocked (all waiting on the owner)

1. **GitHub account** — Virginia is creating one. Needed to push the repo and
   turn on GitHub Pages. Nothing is deployed until this exists.
2. **Instagram account** — being created (owner's mother). Once it exists and is
   a Business/Creator account, connect it at behold.so, then paste the JSON feed
   URL into `site.instagram.beholdFeedUrl` (+ `profileUrl`, `handle`).
3. **Google hours key** — owner OK'd this. Follow `docs/google-hours-setup.md`
   to create the API key + Place ID and add them as GitHub Actions secrets
   (`GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACE_ID`). Effectively free; a hard daily
   quota cap is part of the setup.

## Go-live checklist (in order)

1. Create GitHub account + repo; push this project.
2. Repo Settings → Pages → Source: **GitHub Actions**. First deploy runs.
3. Preview at the free `*.github.io` URL and confirm it looks right.
4. (Optional now, or later) Add the Google hours secrets; add the Behold feed URL.
5. DNS: when ready to use the real domain, re-add `public/CNAME` containing
   `thegroomroomelkhart.com` (it was removed so the github.io preview wouldn't
   redirect to the still-on-Pi domain). Then point the domain's DNS at GitHub
   Pages (4 A records + a `www` CNAME) and retire the Raspberry Pi.

## Notes to remember

- The dog in the hero is **Jesse**, Virginia's own Airedale, who passed away
  **March 21, 2010**. The date is recorded here and in `site.ts` but is
  intentionally NOT shown on the site (owner's call). Caption is editable via
  `site.heroPhotoCaption`.
- Services in `site.ts` are sensible **placeholders** with no prices — Virginia
  needs to confirm the real list. Google cannot supply services (only hours).
- Start year for experience is `site.experienceSince` (2002) — confirm with
  Virginia if exact.
