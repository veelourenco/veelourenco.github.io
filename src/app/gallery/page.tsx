import {client} from '@/sanity/client'
import {ALL_PHOTOS_QUERY} from '@/sanity/queries'
import {type Photo} from '@/sanity/types'
import Container from '@/components/Container'
import GalleryTimeline, {type YearGroup} from '@/components/GalleryTimeline'

export const dynamic = 'force-static'

/** Group a flat array of photos (sorted date desc) into labelled year buckets. */
function groupByYear(photos: Photo[]): YearGroup[] {
  const map = new Map<string, Photo[]>()

  for (const photo of photos) {
    const year = photo.date ? photo.date.slice(0, 4) : 'Undated'
    if (!map.has(year)) map.set(year, [])
    map.get(year)!.push(photo)
  }

  // Sort years descending (most recent first); push "Undated" to the end
  return Array.from(map.entries())
    .sort(([a], [b]) => {
      if (a === 'Undated') return 1
      if (b === 'Undated') return -1
      return Number(b) - Number(a)
    })
    .map(([year, photos]) => ({year, photos}))
}

export default async function GalleryPage() {
  const photos = await client.fetch<Photo[]>(ALL_PHOTOS_QUERY)
  const groups = groupByYear(photos ?? [])
  const totalCount = photos?.length ?? 0

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="section-gap border-b border-border">
        <Container>
          <p className="text-orange text-xs tracking-[0.3em] uppercase mb-4">Visual</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-text uppercase">
            Gallery
          </h1>
          {totalCount > 0 && (
            <p className="text-muted text-sm mt-4 tracking-wider">
              {totalCount} photos across {groups.length} {groups.length === 1 ? 'year' : 'years'}
            </p>
          )}
        </Container>
      </section>

      {/* Timeline */}
      <section className="section-gap">
        <Container>
          <GalleryTimeline groups={groups} />
        </Container>
      </section>
    </main>
  )
}
