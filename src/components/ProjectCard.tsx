import Link from 'next/link'
import {urlFor} from '@/sanity/client'
import {type Project} from '@/sanity/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({project}: ProjectCardProps) {
  const imgUrl = project.coverImage
    ? urlFor(project.coverImage).width(800).height(500).auto('format').url()
    : null

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className="group block bg-bg-card border border-border hover:border-orange transition-all duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-bg-secondary">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted text-sm tracking-widest uppercase">
            No Image
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/20 transition-all duration-500" />
      </div>

      {/* Meta */}
      <div className="p-5 flex items-end justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold text-text group-hover:text-orange transition-colors">
            {project.title}
          </h3>
          {project.year && (
            <p className="text-muted text-xs tracking-widest mt-1">{project.year}</p>
          )}
        </div>
        <span className="text-orange text-lg transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  )
}
