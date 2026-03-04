/**
 * All GROQ queries for the site.
 *
 * HOW CONTENT UPDATES REFLECT:
 * - This is a static export site (GitHub Pages)
 * - Data is fetched from Sanity at BUILD TIME
 * - To see new content: publish in Sanity Studio, then re-run `npm run build`
 * - For live preview in dev: `npm run dev` re-fetches on every request
 */

// ─── Site Settings (singleton) ────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    heroImage
  }
`

// ─── About (singleton) ────────────────────────────────────────────────────────
export const ABOUT_QUERY = `
  *[_type == "about"][0]{
    name,
    tagline,
    portrait,
    bio,
    socialLinks
  }
`

// ─── Projects ─────────────────────────────────────────────────────────────────
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    year,
    featured,
    coverImage,
    description
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(year desc) [0...6] {
    _id,
    title,
    slug,
    year,
    coverImage,
    description
  }
`

export const PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)] { "slug": slug.current }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    year,
    coverImage,
    gallery,
    description,
    externalLinks
  }
`

// ─── Photos ───────────────────────────────────────────────────────────────────
export const ALL_PHOTOS_QUERY = `
  *[_type == "photo"] | order(coalesce(date, "0000") desc, _createdAt desc) {
    _id,
    title,
    image,
    date,
    photographer,
    category
  }
`

// ─── Events ───────────────────────────────────────────────────────────────────
// Upcoming events: date is in the future, sorted soonest first
export const UPCOMING_EVENTS_QUERY = `
  *[_type == "event" && dateTime(date) > dateTime(now())] | order(date asc) {
    _id,
    title,
    date,
    venue,
    city,
    country,
    ticketUrl
  }
`

// All events for the events page (upcoming first, then past)
export const ALL_EVENTS_QUERY = `
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    venue,
    city,
    country,
    ticketUrl
  }
`

// ─── Press ────────────────────────────────────────────────────────────────────
export const ALL_PRESS_QUERY = `
  *[_type == "pressItem"] | order(date desc) {
    _id,
    title,
    source,
    quote,
    link,
    date
  }
`
