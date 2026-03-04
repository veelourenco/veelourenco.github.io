import Button from '@/components/Button'
import {type Event} from '@/sanity/types'

interface EventCardProps {
  event: Event
  /** Visually highlight as the next upcoming event */
  featured?: boolean
}

export default function EventCard({event, featured = false}: EventCardProps) {
  const date = new Date(event.date)

  const day = date.toLocaleDateString('en-GB', {day: '2-digit'})
  const month = date.toLocaleDateString('en-GB', {month: 'short'}).toUpperCase()
  const year = date.getFullYear()
  const time = date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})

  return (
    <div
      className={`flex items-center gap-6 py-6 border-b transition-colors duration-300 ${
        featured
          ? 'border-orange/60 bg-orange/5 px-4 -mx-4'
          : 'border-border hover:border-orange/30'
      }`}
    >
      {/* Date block */}
      <div className="shrink-0 w-14 text-center">
        <p className={`text-3xl font-display font-bold leading-none ${featured ? 'text-orange' : 'text-text'}`}>
          {day}
        </p>
        <p className="text-muted text-xs tracking-widest mt-1">{month}</p>
        <p className="text-muted text-xs">{year}</p>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-text truncate">{event.title}</h3>
        <p className="text-muted text-sm mt-0.5">
          {[event.venue, event.city, event.country].filter(Boolean).join(' · ')}
        </p>
        <p className="text-muted text-xs mt-0.5 tracking-wider">{time}</p>
      </div>

      {/* Ticket button */}
      {event.ticketUrl && (
        <Button href={event.ticketUrl} external variant={featured ? 'primary' : 'outline'} className="shrink-0">
          Tickets
        </Button>
      )}
    </div>
  )
}
