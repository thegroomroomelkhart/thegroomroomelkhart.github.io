# Setting up live Google hours

The website can pull its business hours straight from The Groom Room's **Google
Business Profile**, so hours (including holiday closures) only ever have to be
updated in one place — Google. The site rebuilds twice a day and picks up any
changes automatically.

This is a **one-time setup**. Until it's done, the site simply shows the hours
typed into `src/config/site.ts`, so nothing is broken in the meantime.

**Cost:** effectively free. The site makes ~60 hour-lookups a month; Google's
free allowance is 10,000. We also set a hard daily cap so a surprise bill is
impossible (Step 5).

You'll end up with two values to hand off: a **Place ID** and an **API key**.

---

## Step 1 — Get the Place ID (2 min)

The Place ID is Google's permanent identifier for the business.

1. Open the **Place ID Finder**:
   https://developers.google.com/maps/documentation/places/web-service/place-id
2. In the map's search box, type **The Groom Room Elkhart** and select it.
3. A bubble shows the **Place ID** (a long string like `ChIJ...`). Copy it.

> Keep this handy — it goes into GitHub as `GOOGLE_PLACE_ID` in Step 6.

---

## Step 2 — Create a Google Cloud project (3 min)

1. Go to https://console.cloud.google.com and sign in with **Virginia's Google
   account** (the same one that owns the Business Profile).
2. Top bar → project dropdown → **New Project**.
3. Name it something like `groom-room-website` → **Create**.
4. Make sure that new project is selected in the top bar.

---

## Step 3 — Turn on billing (5 min)

Google requires a card on file to use the API, even though we'll stay in the
free tier.

1. Left menu → **Billing** → **Link a billing account** → **Create billing
   account**.
2. Enter Virginia's card details and confirm.

> This does **not** charge anything on its own. Step 5 caps usage so it stays
> free.

---

## Step 4 — Enable the Places API (2 min)

1. Left menu → **APIs & Services** → **Library**.
2. Search for **Places API (New)** — pick the one that says **(New)**.
3. Click it → **Enable**.

---

## Step 5 — Cap usage so it's always free (3 min) — *important*

This makes an unexpected bill impossible.

1. Left menu → **APIs & Services** → **Places API (New)** → **Quotas & System
   Limits** tab.
2. Find the **Requests per day** (or per-minute) quota.
3. Click the edit (pencil) icon and set the daily limit to **50**.
   - We only need ~2/day, so 50 is generous headroom and still far below any
     chargeable amount.
4. Save.

Then add a safety-net email alert:

5. Left menu → **Billing** → **Budgets & alerts** → **Create budget**.
6. Set the amount to **$1**, keep the default alert thresholds → **Finish**.
   - If anything ever went sideways, Virginia gets an email long before any real
     charge.

---

## Step 6 — Create and restrict the API key (3 min)

1. Left menu → **APIs & Services** → **Credentials** → **Create credentials** →
   **API key**.
2. Copy the key that appears.
3. Click **Edit API key** (or the key's name) to lock it down:
   - Under **API restrictions** → **Restrict key** → check **Places API (New)**
     only.
   - Save.

> This key goes into GitHub as `GOOGLE_MAPS_API_KEY` in the next step. Treat it
> like a password — don't paste it into emails or commit it to the code.

---

## Step 7 — Add both values to GitHub (2 min)

These live as encrypted **secrets** in the website's GitHub repository — never in
the code itself.

1. Go to the website's repo on GitHub → **Settings** → **Secrets and variables**
   → **Actions**.
2. **New repository secret**, add each of these:

   | Name                  | Value                          |
   | :-------------------- | :----------------------------- |
   | `GOOGLE_PLACE_ID`     | the Place ID from Step 1       |
   | `GOOGLE_MAPS_API_KEY` | the API key from Step 6        |

3. That's it. On the next build (push, the twice-daily schedule, or a manual run
   from the **Actions** tab), the site starts showing live Google hours.

---

## How it works (for reference)

- `scripts/fetch-hours.mjs` calls Google before each build and writes
  `src/data/hours.json`.
- If the secrets are missing or Google is unreachable, it silently keeps the
  fallback hours from `src/config/site.ts` — the build never fails over hours.
- The twice-daily schedule lives in `.github/workflows/deploy.yml`
  (`cron: "0 11,23 * * *"` — about 7am & 7pm Eastern). Change those numbers to
  adjust timing, or add more entries to refresh more often.
