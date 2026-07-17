# The Groom Room — project notes

Marketing site for The Groom Room, a dog grooming business (owner: Virginia Hays)
in Elkhart, Indiana. Static Astro + Tailwind v4 site, deployed to GitHub Pages.

## Content style rules

- **Never use em dashes (—) in any user-visible website copy.** Use a comma,
  colon, period, or middot (·) instead. This applies to page text, headings,
  button labels, meta titles/descriptions, alt text, and config strings that get
  rendered. En dashes (–) in numeric/day ranges (e.g. "8:00am – 5:00pm",
  "Tuesday–Saturday") are fine and not covered by this rule.

## Where things live

- **`src/config/site.ts`** — ALL business content (name, services, hours,
  contact, bio, Instagram feed URL). This is the single source of truth; edit
  here for any everyday content change. Prefer this over editing components.
- **`src/components/`** — one component per homepage section (Hero, Services,
  InstagramFeed, About, Contact, Header, Footer).
- **`src/pages/index.astro`** — assembles the single homepage.
- **`src/layouts/Layout.astro`** — `<head>`, fonts (self-hosted Poppins via
  `@fontsource`), SEO tags, and LocalBusiness structured data.
- **`src/styles/global.css`** — theme colors/fonts as Tailwind v4 `@theme` tokens
  (e.g. `bg-cream`, `text-brand`).

## Instagram feed

`src/components/InstagramFeed.astro` fetches a Behold.so JSON feed **client-side**
(so newest posts always show without a rebuild). It reads
`site.instagram.beholdFeedUrl`. When that's empty it renders a friendly
"coming soon" placeholder grid. See the setup steps in `site.ts` and README.

## Hours (Google Business Profile integration)

Hours can come live from Google. `scripts/fetch-hours.mjs` runs before each build
(needs `GOOGLE_MAPS_API_KEY` + `GOOGLE_PLACE_ID` env/secrets), calls the Places
API, and writes `src/data/hours.json`. `src/config/getHours.ts` returns those
live hours if present, else falls back to `site.hours` from `site.ts`. Components
read hours via `getHours()`, never `site.hours` directly. If the key is missing
or Google errors, the build still succeeds on the fallback. Setup steps:
`docs/google-hours-setup.md`. Services are NOT available from Google — they stay
in `site.ts`.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and
publishes to GitHub Pages. Custom domain in `public/CNAME`. The workflow also
runs on a twice-daily `schedule` (cron) to refresh Google hours. No server to
manage.

## Environment & workflow (Windows) — read this first

This project is developed on Windows via the Claude Code PowerShell/Bash tools.
These are the non-obvious gotchas that will otherwise waste your time:

- **Node/npm are NOT on PATH.** They were installed with winget to
  `C:\Program Files\nodejs`, but spawned shells don't see them. Prepend PATH at
  the start of every command that needs node/npm/npx:
  `$env:Path = "C:\Program Files\nodejs;" + $env:Path`
  The GitHub CLI is likewise at `C:\Program Files\GitHub CLI` (add it too when
  using `git`/`gh`).
- **Dev server:** run `npm run dev` (with PATH prepended). Astro's dev server
  **daemonizes** — the foreground command returns after printing the URL, and
  the server keeps running. Manage it with `astro dev stop|status|logs`.
  - `preview_start` from `.claude/launch.json` does NOT work here: it spawns npm
    without the node PATH, so astro can't find node. Use `npm run dev` instead.
  - Do NOT invoke `node node_modules\astro\astro.js` — that path doesn't exist.
    Go through `npm run dev` (or `npx astro`).
  - To view on a phone / other LAN device: `npm run dev -- --host`, then browse
    to `http://<machine-LAN-IP>:4321`. Windows Firewall on a "Public" network
    profile blocks this; the user must add an inbound rule for TCP 4321 (an
    admin action — don't do it for them).
- **`git commit`:** PowerShell here-strings (`@'...'@`) break `git commit -m`
  (the message gets split into bogus pathspecs). Write the message to a temp
  file and use `git commit -F <file>` instead. This works reliably.
- **Build "exit code 255" is a false alarm.** PowerShell wraps Node's stderr
  progress output as a NativeCommandError and reports 255 even when the build
  succeeded. Trust the `[build] Complete!` line, not the exit code.
- **LF→CRLF git warnings** on commit are harmless; ignore them.
- **Preview screenshots hang on external network requests** in the sandboxed
  browser (no outbound internet). This is why the font is self-hosted rather
  than loaded from Google Fonts — keep runtime assets local.

## Reference docs

- Full Astro docs: https://docs.astro.build
- Styling / Tailwind: https://docs.astro.build/en/guides/styling/
- Astro components: https://docs.astro.build/en/basics/astro-components/

## Current status & handoff

**Live at https://thegroomroomelkhart.github.io/** (repo:
`thegroomroomelkhart/thegroomroomelkhart.github.io`, public). `gh` is
authenticated on this machine; pushing to `main` auto-deploys via Actions.
See **`docs/STATUS.md`** for what's pending (Instagram/Behold, Google hours key,
custom-domain DNS) and the go-live checklist.
