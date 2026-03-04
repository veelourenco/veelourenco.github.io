import {client, urlFor} from '@/sanity/client'
import {
  SITE_SETTINGS_QUERY,
  FEATURED_PROJECTS_QUERY,
  UPCOMING_EVENTS_QUERY,
  ALL_PRESS_QUERY,
  ABOUT_QUERY,
} from '@/sanity/queries'
import {type SiteSettings, type Project, type Event, type PressItem, type About} from '@/sanity/types'
import Container from '@/components/Container'
import Button from '@/components/Button'
import ProjectCarousel from '@/components/ProjectCarousel'
import EventCard from '@/components/EventCard'
import SocialIcon from '@/components/SocialIcon'

export const dynamic = 'force-static'

export default async function HomePage() {
  // Fetch all homepage data in parallel
  const [settings, featuredProjects, upcomingEvents, pressItems, about] = await Promise.all([
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    client.fetch<Project[]>(FEATURED_PROJECTS_QUERY),
    client.fetch<Event[]>(UPCOMING_EVENTS_QUERY),
    client.fetch<PressItem[]>(ALL_PRESS_QUERY),
    client.fetch<About>(ABOUT_QUERY),
  ])

  const socialLinks = about?.socialLinks

  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).height(1080).auto('format').url()
    : null

  return (
    <main>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        {heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg-secondary to-[#1a0a00]" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/30 to-bg" />

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'1\' height=\'1\' fill=\'%23fff\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 animate-fade-in-up">
          <p className="text-muted text-xs tracking-[0.4em] uppercase mb-6">
            {settings?.tagline ?? 'Artist · Musician · Creator'}
          </p>
          <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] font-bold tracking-tight text-text leading-none uppercase">
            {settings?.siteTitle ?? 'Vee Lourenco'}
          </h1>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Button href="/work" variant="primary">View Work</Button>
            <Button href="/events" variant="outline">Live Dates</Button>
          </div>

          {/* Social icons */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {socialLinks.map((link, i) => (
                <SocialIcon key={i} platform={link.platform} url={link.url} label={link.label} />
              ))}
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* ─── Featured Projects ─────────────────────────────────────────────── */}
      {featuredProjects?.length > 0 && (
        <section className="section-gap">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-orange text-xs tracking-[0.3em] uppercase mb-3">Selected Work</p>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-text">Projects</h2>
              </div>
              <Button href="/work" variant="ghost">View all →</Button>
            </div>

            <ProjectCarousel projects={featuredProjects} />
          </Container>
        </section>
      )}

      {/* ─── Upcoming Events ──────────────────────────────────────────────── */}
      {upcomingEvents?.length > 0 && (
        <section className="section-gap border-t border-border">
          <Container size="md">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-orange text-xs tracking-[0.3em] uppercase mb-3">On Tour</p>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-text">Live Dates</h2>
              </div>
              <Button href="/events" variant="ghost">All dates →</Button>
            </div>

            <div>
              {upcomingEvents.slice(0, 4).map((event, i) => (
                <EventCard key={event._id} event={event} featured={i === 0} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ─── Press Quote ──────────────────────────────────────────────────── */}
      {pressItems?.[0] && (
        <section className="section-gap border-t border-border bg-bg-secondary">
          <Container size="md">
            <div className="text-center">
              <p className="text-orange text-xs tracking-[0.3em] uppercase mb-12">Press</p>
              <blockquote className="font-display text-3xl md:text-4xl font-light text-text leading-relaxed">
                &ldquo;{pressItems[0].quote}&rdquo;
              </blockquote>
              <p className="mt-8 text-orange text-sm font-semibold tracking-widest uppercase">
                — {pressItems[0].source}
              </p>
              <div className="mt-10">
                <Button href="/press" variant="outline">Read All Press</Button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
