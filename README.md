# The Groom Room — Website

The website for **The Groom Room**, a dog grooming business in Elkhart, Indiana.

It's a fast, low-maintenance static site (no server to keep patched, no database
to get hacked). It's built with [Astro](https://astro.build) + Tailwind CSS and
hosted **free** on GitHub Pages. Most changes are made by editing one plain-text
file, and Claude can do the technical work for you.

---

## ✏️ Changing the content (the easy stuff)

Almost everything you'd want to change — services, prices, hours, phone number,
the "about" blurb — lives in **one file**:

```
src/config/site.ts
```

Open it, edit the text between the quote marks, and save. That's it. The whole
site updates from there. Or just tell Claude "change X to Y" and it'll do it.

Once a change is pushed to GitHub, the site rebuilds and goes live on its own in
about a minute.

---

## 📸 Turning on the live Instagram feed

The homepage has a gallery that automatically shows the newest Instagram posts.
It's off until the Instagram account is connected. To turn it on:

1. Make sure the grooming Instagram is a **Business or Creator** account
   (free to switch inside the Instagram app: Settings → Account type).
2. Go to **[behold.so](https://behold.so)** and create a free account.
3. Connect the grooming Instagram account.
4. Copy the **JSON feed URL** Behold gives you
   (it looks like `https://feeds.behold.so/XXXXXXXX`).
5. Paste it into `src/config/site.ts` here:

   ```ts
   instagram: {
     beholdFeedUrl: "https://feeds.behold.so/XXXXXXXX", // paste it here
     profileUrl: "https://instagram.com/yourhandle",
     handle: "@yourhandle",
   ```

6. Save and push. Done — the gallery goes live and stays up to date on its own.

Behold handles the Instagram connection for you, so there are **no passwords or
tokens to keep renewing**. This is what keeps the site maintenance-free.

---

## 🌐 Going live (one-time setup)

The site deploys automatically, but the first time it needs to be connected to
GitHub Pages and the domain. High-level steps (Claude can walk you through each):

1. Create a **GitHub** account (if you don't have one) and a repository for this
   project, then push this folder to it.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**. The included workflow (`.github/workflows/deploy.yml`) does the rest.
3. **Domain:** `public/CNAME` is already set to `thegroomroomelkhart.com`. Point
   the domain's DNS at GitHub Pages (four `A` records + a `CNAME`), then remove
   the old Raspberry Pi from the picture. Claude can give you the exact DNS values.

> Until DNS is switched, the site is also reachable at a free
> `yourname.github.io` address, so you can preview it live before touching the
> domain.

---

## 🧑‍💻 Developer commands

Run from the project folder in a terminal:

| Command           | What it does                                  |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Install dependencies (first time only)        |
| `npm run dev`     | Local preview at `http://localhost:4321`      |
| `npm run build`   | Build the production site into `./dist/`      |
| `npm run preview` | Preview the production build locally          |

## 🗂 Project structure

```
src/
├── config/site.ts        ← edit content here
├── pages/index.astro     ← the homepage (assembles the sections below)
├── components/           ← Hero, Services, InstagramFeed, About, Contact, ...
├── layouts/Layout.astro  ← <head>, fonts, SEO
└── styles/global.css     ← colors & fonts (theme)
public/                   ← static files (favicon, CNAME)
```
