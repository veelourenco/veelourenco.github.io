import {notFound} from 'next/navigation'
import {PortableText} from 'next-sanity'
import {client, urlFor} from '@/sanity/client'
import {PROJECT_SLUGS_QUERY, PROJECT_BY_SLUG_QUERY} from '@/sanity/queries'
import {type Project} from '@/sanity/types'
import Container from '@/components/Container'
import Button from '@/components/Button'

// Called at build time — generates a static page for every project slug.
// HOW TO ADD A NEW PROJECT PAGE:
// 1. Add a new project in Sanity Studio with a slug
// 2. Re-run `npm run build` — this function will pick up the new slug automatically
export async function generateStaticParams() {
  const slugs = await client.fetch<{slug: string}[]>(PROJECT_SLUGS_QUERY)
  return slugs.map(({slug}) => ({slug}))
}

interface Props {
  params: Promise<{slug: string}>
}

export default async function ProjectPage({params}: Props) {
  const {slug} = await params
  const project = await client.fetch<Project>(PROJECT_BY_SLUG_QUERY, {slug})

  if (!project) return notFound()

  const heroUrl = project.coverImage
    ? urlFor(project.coverImage).width(1600).height(900).auto('format').url()
    : null

  return (
    <main className="pt-16">
      {/* Hero image */}
      {heroUrl && (
        <div className="relative w-full aspect-[16/7] overflow-hidden bg-bg-secondary">
          <img
            src={heroUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <Container size="md">
        <div className="py-16">
          {/* Header */}
          <div className="mb-12">
            <Button href="/work" variant="ghost" className="mb-8 inline-flex">
              ← Back to Work
            </Button>
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <h1 className="font-display text-5xl md:text-7xl font-bold text-text uppercase leading-none">
                  {project.title}
                </h1>
                {project.year && (
                  <p className="text-orange text-sm tracking-widest mt-3">{project.year}</p>
                )}
              </div>

              {/* External links */}
              {project.externalLinks?.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.externalLinks.map((link, i) => (
                    <Button key={i} href={link.url} external variant="outline">
                      {link.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="prose-artist max-w-2xl mb-16">
              <PortableText value={project.description} />
            </div>
          )}

          {/* Gallery */}
          {project.gallery?.length > 0 && (
            <div>
              <p className="text-orange text-xs tracking-[0.3em] uppercase mb-8">Gallery</p>
              <div className="flex flex-col gap-4">
                {project.gallery.map((img, i) => {
                  const imgUrl = urlFor(img).width(1200).auto('format').url()
                  return (
                    <div key={i} className="overflow-hidden border border-border">
                      <img
                        src={imgUrl}
                        alt={`${project.title} gallery ${i + 1}`}
                        className="w-full object-cover hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}
