import {PortableText} from 'next-sanity'
import {client, urlFor} from '@/sanity/client'
import {ABOUT_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/queries'
import {type About, type SiteSettings} from '@/sanity/types'
import Container from '@/components/Container'
import SocialIcon from '@/components/SocialIcon'

export const dynamic = 'force-static'

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    client.fetch<About>(ABOUT_QUERY),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
  ])

  // Portrait: prefer dedicated About portrait, fall back to hero image
  const portraitSource = about?.portrait ?? settings?.heroImage
  const portraitUrl = portraitSource
    ? urlFor(portraitSource).width(900).height(1100).auto('format').url()
    : null

  const displayName = about?.name ?? settings?.siteTitle ?? 'Vee Lourenco'
  const bio = about?.bio
  const socialLinks = about?.socialLinks

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="section-gap border-b border-border">
        <Container>
          <p className="text-orange text-xs tracking-[0.3em] uppercase mb-4">The Artist</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-text uppercase">About</h1>
        </Container>
      </section>

      {/* Bio section */}
      <section className="section-gap">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Portrait */}
            {portraitUrl && (
              <div className="relative overflow-hidden border border-border">
                <img
                  src={portraitUrl}
                  alt={displayName}
                  className="w-full object-cover"
                />
                {/* Accent corner */}
                <div className="absolute bottom-0 left-0 w-16 h-1 bg-orange" />
              </div>
            )}

            {/* Bio text */}
            <div className="lg:pt-8">
              <h2 className="font-display text-4xl font-bold text-text mb-8">
                {displayName}
              </h2>

              {bio ? (
                <div className="prose-artist">
                  <PortableText value={bio} />
                </div>
              ) : (
                <p className="text-muted">Add a bio in Sanity Studio → About → Biography.</p>
              )}

              {/* Social links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="mt-10">
                  <p className="text-muted text-xs tracking-[0.3em] uppercase mb-5">Follow</p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, i) => (
                      <SocialIcon
                        key={i}
                        platform={link.platform}
                        url={link.url}
                        label={link.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
