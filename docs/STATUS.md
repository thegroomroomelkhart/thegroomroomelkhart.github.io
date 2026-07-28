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

## LIVE

- **URL:** https://thegroomroomelkhart.com (custom domain live w/ HTTPS as of
  2026-07-27; also reachable at https://thegroomroomelkhart.github.io/, which
  redirects). `www` 301-redirects to the apex.
- **Repo:** `thegroomroomelkhart/thegroomroomelkhart.github.io` (public user site).
- **Deploy:** push to `main` → GitHub Actions builds + deploys automatically
  (~1 min). `gh` is already authenticated on this dev machine (device flow).
- CI uses **Node 22** (Astro 7 needs >=22.12; the workflow was fixed from an
  initial Node 20 default).

## Done

- Homepage: hero (Airedale photo of Jesse), services, live Instagram gallery
  (with fallback), about w/ auto-calculated years of experience, hours, contact.
- All business content centralized in `src/config/site.ts`.
- Live Instagram feed component (Behold.so JSON, client-side) — coded, shows a
  placeholder until a feed URL is set.
- Live Google hours integration — coded; `scripts/fetch-hours.mjs` + twice-daily
  scheduled rebuild in `.github/workflows/deploy.yml`. Falls back to `site.ts`.
- Design: warm caramel palette (matches Jesse's photo), self-hosted font, no em
  dashes in copy (see CLAUDE.md content rules).
- GitHub account created, repo pushed, GitHub Pages live and auto-deploying.

## Pending (all waiting on the owner; any order, no rush)

1. **Google hours** — owner OK'd this. Follow `docs/google-hours-setup.md` to
   create the API key + Place ID and add them as repo **Actions secrets**
   (`GOOGLE_MAPS_API_KEY`, `GOOGLE_PLACE_ID`). Effectively free; a hard daily
   quota cap is part of the setup.
2. **Retire the Pi** — the old WordPress site on the Raspberry Pi no longer
   serves the domain (DNS now points at GitHub Pages). Safe to power down.

## Done since handoff (2026-07-27)

- **Instagram feed** — CONNECTED. `@thegroomroomelkhart` linked via behold.so;
  feed URL set in `site.instagram.beholdFeedUrl`. Also added the IG profile to
  `sameAs` structured data.
- **Custom domain** — LIVE. `public/CNAME` re-added; GoDaddy DNS repointed (4 A
  records to GitHub's 185.199.108-111.153 + `www` CNAME to
  `thegroomroomelkhart.github.io`). Custom domain set in repo Settings > Pages
  (the API PUT for cname fails first-time with "certificate does not exist yet";
  use the web UI). SSL cert auto-issued, Enforce HTTPS on.

## Notes to remember

- The dog in the hero is **Jesse**, Virginia's own Airedale, who passed away
  **March 21, 2010**. Recorded here and in `site.ts` but intentionally NOT shown
  on the site (owner's call). Caption editable via `site.heroPhotoCaption`.
- Services in `site.ts` are sensible **placeholders** with no prices — Virginia
  needs to confirm the real list. Google cannot supply services (only hours).
- Start year for experience is `site.experienceSince` (2002) — confirm exact.
