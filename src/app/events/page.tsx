import {client} from '@/sanity/client'
import {ALL_EVENTS_QUERY} from '@/sanity/queries'
import {type Event} from '@/sanity/types'
import Container from '@/components/Container'
import EventCard from '@/components/EventCard'

export const dynamic = 'force-static'

export default async function EventsPage() {
  const events = await client.fetch<Event[]>(ALL_EVENTS_QUERY)

  const now = new Date()
  const upcoming = events?.filter((e) => new Date(e.date) >= now) ?? []
  const past = events?.filter((e) => new Date(e.date) < now) ?? []

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="section-gap border-b border-border">
        <Container>
          <p className="text-orange text-xs tracking-[0.3em] uppercase mb-4">Tour</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-text uppercase">Live Dates</h1>
        </Container>
      </section>

      {/* Upcoming events */}
      <section className="section-gap">
        <Container size="md">
          {upcoming.length > 0 ? (
            <>
              <p className="text-orange text-xs tracking-[0.3em] uppercase mb-8">Upcoming</p>
              {/* Highlight the next event with an accent border */}
              {upcoming.map((event, i) => (
                <EventCard key={event._id} event={event} featured={i === 0} />
              ))}
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-3xl text-muted">No upcoming dates</p>
              <p className="text-muted text-sm mt-3">
                Follow on social media for announcements.
              </p>
            </div>
          )}

          {/* Past events */}
          {past.length > 0 && (
            <div className="mt-20">
              <p className="text-muted text-xs tracking-[0.3em] uppercase mb-8">Past Shows</p>
              {past.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
