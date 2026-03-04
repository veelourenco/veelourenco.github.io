import {type SanityDocument} from 'next-sanity'

/** A block of Portable Text content — compatible with the <PortableText> component */
export type PortableTextBlock = {
  _key: string
  _type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface SiteSettings extends SanityDocument {
  siteTitle: string
  tagline: string
  heroImage: SanityImage
}

export interface About extends SanityDocument {
  name: string
  tagline: string
  portrait: SanityImage
  bio: PortableTextBlock[]
  socialLinks: {platform: string; url: string; label?: string}[]
}

export interface Project extends SanityDocument {
  title: string
  slug: {current: string}
  year: number
  featured: boolean
  coverImage: SanityImage
  gallery: SanityImage[]
  description: PortableTextBlock[]
  externalLinks: {label: string; url: string}[]
}

export interface Photo extends SanityDocument {
  title: string
  image: SanityImage
  date: string        // YYYY-MM-DD or null
  photographer: string
  category: string
}

export interface Event extends SanityDocument {
  title: string
  date: string
  venue: string
  city: string
  country: string
  ticketUrl: string
}

export interface PressItem extends SanityDocument {
  title: string
  source: string
  quote: string
  link: string
  date: string
}

export interface SanityImage {
  _type: 'image'
  asset: {_ref: string; _type: 'reference'}
  hotspot?: {x: number; y: number; width: number; height: number}
  crop?: {top: number; bottom: number; left: number; right: number}
}
