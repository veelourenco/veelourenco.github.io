import {createClient} from 'next-sanity'
import {createImageUrlBuilder} from '@sanity/image-url'

export const client = createClient({
  projectId: 'kay53yh8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  // useCdn: false fetches fresh data every build — ideal for static export
  useCdn: false,
})

// Build image URLs via Sanity's image pipeline
// Usage: urlFor(image).width(800).height(600).url()
const builder = createImageUrlBuilder({projectId: 'kay53yh8', dataset: 'production'})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source)