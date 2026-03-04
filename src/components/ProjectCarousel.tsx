'use client'

import {useRef, useState, useCallback, useEffect} from 'react'
import ProjectCard from '@/components/ProjectCard'
import {type Project} from '@/sanity/types'

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({projects}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, {passive: true})
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState])

  const scrollTo = useCallback((direction: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-card]')?.clientWidth ?? 380
    const gap = 1 // 1px gap (bg-border grid trick)
    const step = cardWidth + gap
    el.scrollBy({left: direction === 'next' ? step : -step, behavior: 'smooth'})

    setActiveIndex((prev) =>
      direction === 'next'
        ? Math.min(prev + 1, projects.length - 1)
        : Math.max(prev - 1, 0),
    )
  }, [projects.length])

  if (!projects.length) return null

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-px overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
      >
        {projects.map((project) => (
          <div
            data-card
            key={project._id}
            className="flex-none w-[85vw] sm:w-[55vw] md:w-[40vw] lg:w-[33vw] snap-start bg-bg"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between mt-8">
        {/* Dot indicators */}
        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = trackRef.current
                if (!el) return
                const cards = el.querySelectorAll('[data-card]')
                cards[i]?.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'nearest'})
                setActiveIndex(i)
              }}
              aria-label={`Go to project ${i + 1}`}
              className={`h-px transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-orange' : 'w-4 bg-border'
              }`}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => scrollTo('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous project"
            className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-orange text-orange hover:bg-orange hover:text-bg'
                : 'border-border text-muted cursor-not-allowed'
            }`}
          >
            ←
          </button>
          <button
            onClick={() => scrollTo('next')}
            disabled={!canScrollRight}
            aria-label="Next project"
            className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-orange text-orange hover:bg-orange hover:text-bg'
                : 'border-border text-muted cursor-not-allowed'
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}
