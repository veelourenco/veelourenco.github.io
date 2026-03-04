import {client} from '@/sanity/client'
import {ALL_PROJECTS_QUERY} from '@/sanity/queries'
import {type Project} from '@/sanity/types'
import Container from '@/components/Container'
import ProjectCard from '@/components/ProjectCard'

export const dynamic = 'force-static'

export default async function WorkPage() {
  const projects = await client.fetch<Project[]>(ALL_PROJECTS_QUERY)

  return (
    <main className="pt-16">
      {/* Page header */}
      <section className="section-gap border-b border-border">
        <Container>
          <p className="text-orange text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-text uppercase">Work</h1>
          <p className="text-muted mt-4 text-sm tracking-wide max-w-md">
            A collection of projects, releases, and creative works.
          </p>
        </Container>
      </section>

      {/* Grid */}
      <section className="section-gap">
        <Container>
          {projects?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {projects.map((project) => (
                <div key={project._id} className="bg-bg">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-24">No projects yet — check back soon.</p>
          )}
        </Container>
      </section>
    </main>
  )
}
