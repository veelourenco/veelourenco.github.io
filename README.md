# Vee Lourenco — Artist Website

A minimal, dark-themed artist website built with **Next.js** and **Sanity.io**. Deployed statically via GitHub Pages.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| CMS | Sanity.io (Studio in `../studio-veelourenco`) |
| Styling | Tailwind CSS v4 |
| Hosting | GitHub Pages |

## Pages

| Route | Description |
|---|---|
| `/` | Hero, featured projects, upcoming events, press quote |
| `/work` | Full project grid |
| `/work/[slug]` | Individual project with gallery |
| `/photos` | Masonry photo gallery |
| `/events` | Chronological tour dates |
| `/about` | Bio, portrait, social links |
| `/press` | Press quote cards |

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Updates

All content is managed in **Sanity Studio** (`../studio-veelourenco`):

```bash
cd ../studio-veelourenco
npm run dev   # opens at http://localhost:3333
```

After publishing content in the Studio, the site reflects changes on next build.

## Build & Deploy

```bash
npm run build   # generates the static `out/` folder
```

Deploy the `out/` folder to GitHub Pages.

## Adding Content

- **New project** → Sanity Studio → Project → fill in title, slug, cover image, description, set Featured = true for homepage
- **New event** → Sanity Studio → Event → set title, date, venue, city, ticket URL
- **New photo** → Sanity Studio → Photo → upload image and set category
- Rebuild the site after publishing to see changes live

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
