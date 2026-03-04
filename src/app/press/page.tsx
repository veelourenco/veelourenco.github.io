import {client} from '@/sanity/client'
import {ALL_PRESS_QUERY} from '@/sanity/queries'
import {type PressItem} from '@/sanity/types'
import Container from '@/components/Container'
import PressCard from '@/components/PressCard'

export const dynamic = 'force-static'

export default async function PressPage() {
  const pressItems = await client.fetch<PressItem[]>(ALL_PRESS_QUERY)

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="section-gap border-b border-border">
        <Container>
          <p className="text-orange text-xs tracking-[0.3em] uppercase mb-4">Media</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-text uppercase">Press</h1>
        </Container>
      </section>

      {/* Press cards */}
      <section className="section-gap">
        <Container size="md">
          {pressItems?.length > 0 ? (
            <div className="flex flex-col gap-6">
              {pressItems.map((item) => (
                <PressCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-24">
              No press items yet — add them in Sanity Studio → Press Item.
            </p>
          )}
        </Container>
      </section>
    </main>
  )
}
