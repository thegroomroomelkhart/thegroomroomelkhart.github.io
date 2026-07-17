# The Groom Room — project notes

Marketing site for The Groom Room, a dog grooming business (owner: Virginia Hays)
in Elkhart, Indiana. Static Astro + Tailwind v4 site, deployed to GitHub Pages.

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

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and
publishes to GitHub Pages. Custom domain in `public/CNAME`. No server to manage.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
