'use client'

import {useEffect, useRef, useState, useCallback} from 'react'
import {urlFor} from '@/sanity/client'
import {type Photo} from '@/sanity/types'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface YearGroup {
  year: string  // e.g. "2022" or "Undated"
  photos: Photo[]
}

interface LightboxState {
  open: boolean
  groupIndex: number
  photoIndex: number
}

// ─── Timeline scrubber (draggable vertical indicator) ────────────────────────

const TRACK_H = 400 // px height of the scrubber track

function pctForIndex(index: number, total: number) {
  if (total <= 1) return 0
  return index / (total - 1)
}

function TimelineScrubber({
  groups,
  activeIndex,
  onChange,
}: {
  groups: YearGroup[]
  activeIndex: number
  onChange: (index: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const total = groups.length

  const pctFromClientY = useCallback(
    (clientY: number) => {
      const el = trackRef.current
      if (!el) return 0
      const rect = el.getBoundingClientRect()
      return Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
    },
    [],
  )

  const nearestIndex = useCallback(
    (pct: number) => {
      if (total <= 1) return 0
      return Math.round(pct * (total - 1))
    },
    [total],
  )

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
      onChange(nearestIndex(pctFromClientY(e.clientY)))
    },
    [nearestIndex, onChange, pctFromClientY],
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return
      onChange(nearestIndex(pctFromClientY(e.clientY)))
    },
    [dragging, nearestIndex, onChange, pctFromClientY],
  )

  const onPointerUp = useCallback(() => setDragging(false), [])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        onChange(Math.min(activeIndex + 1, total - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        onChange(Math.max(activeIndex - 1, 0))
      }
    },
    [activeIndex, onChange, total],
  )

  const activePct = pctForIndex(activeIndex, total)

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={total - 1}
      aria-valuenow={activeIndex}
      aria-label="Year selector"
      tabIndex={0}
      className={`relative w-6 select-none outline-none focus-visible:ring-2 focus-visible:ring-orange/50 rounded ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{height: TRACK_H}}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      {/* Track rail */}
      <div className="absolute left-1/2 -translate-x-1/2 w-px bg-border top-0 bottom-0" />

      {/* Active fill from top to thumb */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-px bg-orange top-0 transition-all duration-150 ease-out"
        style={{height: `${activePct * 100}%`}}
      />

      {/* Year dots */}
      {groups.map((_, i) => {
        const pct = pctForIndex(i, total)
        const isActive = i === activeIndex
        return (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-bg transition-all duration-200"
            style={{
              top: `${pct * 100}%`,
              width: isActive ? 14 : 8,
              height: isActive ? 14 : 8,
              background: isActive ? 'var(--orange)' : undefined,
              borderColor: isActive ? 'var(--orange)' : undefined,
              boxShadow: isActive ? '0 0 8px var(--orange)' : undefined,
            }}
          />
        )
      })}

      {/* Draggable thumb */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-orange/20 bg-orange transition-all duration-150 ease-out ${dragging ? 'scale-125' : 'scale-100'}`}
        style={{
          top: `${activePct * 100}%`,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}

// ─── Year labels alongside the scrubber ──────────────────────────────────────

function YearLabels({
  groups,
  activeIndex,
  onChange,
}: {
  groups: YearGroup[]
  activeIndex: number
  onChange: (index: number) => void
}) {
  const total = groups.length
  return (
    <div className="relative" style={{height: TRACK_H, width: 64}}>
      {groups.map((g, i) => {
        const pct = pctForIndex(i, total)
        const isActive = i === activeIndex
        return (
          <button
            key={g.year}
            onClick={() => onChange(i)}
            className={`absolute right-0 -translate-y-1/2 text-right leading-none transition-all duration-200 ${
              isActive
                ? 'text-orange font-display font-bold text-base'
                : 'text-muted text-xs hover:text-text'
            }`}
            style={{top: `${pct * 100}%`}}
          >
            {g.year}
          </button>
        )
      })}
    </div>
  )
}

// ─── Photo grid (keyed so React remounts it on year change → CSS animation) ──

function PhotoGrid({
  group,
  groupIndex,
  onOpen,
  animKey,
}: {
  group: YearGroup
  groupIndex: number
  onOpen: (groupIndex: number, photoIndex: number) => void
  animKey: number
}) {
  return (
    <div key={animKey} className="gallery-grid-enter">
      {/* Year heading */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-10 bg-orange flex-none" />
        <h2 className="font-display text-4xl md:text-5xl font-bold text-text">{group.year}</h2>
        <div className="flex-1 h-px bg-border" />
        <span className="text-muted text-xs tracking-widest">
          {group.photos.length} {group.photos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-1 space-y-1">
        {group.photos.map((photo, pi) => {
          const imgUrl = urlFor(photo.image).width(900).auto('format').url()
          return (
            <button
              key={photo._id}
              onClick={() => onOpen(groupIndex, pi)}
              className="gallery-photo-enter break-inside-avoid block w-full relative group overflow-hidden"
              style={{animationDelay: `${pi * 55}ms`}}
              aria-label={`View ${photo.title ?? 'photo'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={photo.title ?? ''}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-left">
                  {photo.title && (
                    <p className="text-text text-sm font-semibold leading-tight">{photo.title}</p>
                  )}
                  {photo.photographer && (
                    <p className="text-orange text-xs tracking-wider mt-1">
                      © {photo.photographer}
                    </p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  groups,
  state,
  onClose,
  onNavigate,
}: {
  groups: YearGroup[]
  state: LightboxState
  onClose: () => void
  onNavigate: (dir: 'prev' | 'next') => void
}) {
  const photo = groups[state.groupIndex]?.photos[state.photoIndex]
  const imgUrl = photo ? urlFor(photo.image).width(1600).auto('format').url() : null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate('next')
      if (e.key === 'ArrowLeft') onNavigate('prev')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNavigate])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!photo || !imgUrl) return null

  return (
    <div
      className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgUrl}
          alt={photo.title ?? ''}
          className="max-w-[90vw] max-h-[80vh] object-contain"
        />
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            {photo.title && <p className="text-text font-semibold">{photo.title}</p>}
            {photo.photographer && (
              <p className="text-orange text-sm mt-1">© {photo.photographer}</p>
            )}
            {photo.date && (
              <p className="text-muted text-xs mt-1">
                {new Date(photo.date).toLocaleDateString('en-GB', {year: 'numeric', month: 'long'})}
              </p>
            )}
          </div>
          {photo.category && (
            <span className="text-xs text-muted tracking-widest uppercase border border-border px-2 py-1 flex-none">
              {photo.category}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 border border-border text-muted hover:text-text hover:border-orange transition-colors flex items-center justify-center text-lg"
        aria-label="Close"
      >
        ✕
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate('prev') }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-border text-muted hover:text-text hover:border-orange transition-colors flex items-center justify-center"
        aria-label="Previous photo"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate('next') }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-border text-muted hover:text-text hover:border-orange transition-colors flex items-center justify-center"
        aria-label="Next photo"
      >
        →
      </button>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function GalleryTimeline({groups}: {groups: YearGroup[]}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxState>({
    open: false,
    groupIndex: 0,
    photoIndex: 0,
  })

  const handleYearChange = useCallback((index: number) => {
    setActiveIndex(index)
    setAnimKey((k) => k + 1)
  }, [])

  // Flatten all photos for continuous lightbox prev/next across years
  const allFlat = groups.flatMap((g, gi) => g.photos.map((_, pi) => ({gi, pi})))

  const openLightbox = useCallback((groupIndex: number, photoIndex: number) => {
    setLightbox({open: true, groupIndex, photoIndex})
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox((s) => ({...s, open: false}))
  }, [])

  const navigate = useCallback(
    (dir: 'prev' | 'next') => {
      setLightbox((s) => {
        const flat = allFlat.findIndex(({gi, pi}) => gi === s.groupIndex && pi === s.photoIndex)
        const next =
          dir === 'next'
            ? Math.min(flat + 1, allFlat.length - 1)
            : Math.max(flat - 1, 0)
        const {gi, pi} = allFlat[next]
        return {...s, groupIndex: gi, photoIndex: pi}
      })
    },
    [allFlat],
  )

  if (!groups.length) {
    return <p className="text-muted text-center py-24">No photos yet — check back soon.</p>
  }

  const activeGroup = groups[activeIndex]

  return (
    <>
      {/* ── Mobile: horizontal year pills ── */}
      <div className="flex md:hidden gap-2 flex-wrap mb-8">
        {groups.map((g, i) => (
          <button
            key={g.year}
            onClick={() => handleYearChange(i)}
            className={`px-4 py-1.5 text-xs tracking-widest border transition-colors duration-200 ${
              i === activeIndex
                ? 'border-orange text-orange'
                : 'border-border text-muted hover:border-text hover:text-text'
            }`}
          >
            {g.year}
          </button>
        ))}
      </div>

      {/* ── Desktop: sidebar scrubber + photo grid ── */}
      <div className="hidden md:flex gap-6 items-start">
        {/* Year labels */}
        <YearLabels groups={groups} activeIndex={activeIndex} onChange={handleYearChange} />

        {/* Draggable scrubber */}
        <div className="sticky top-28 flex-none">
          <TimelineScrubber groups={groups} activeIndex={activeIndex} onChange={handleYearChange} />
        </div>

        {/* Photo grid — remounts (via key) on year change for CSS entrance animation */}
        <div className="flex-1 min-w-0">
          <PhotoGrid
            key={animKey}
            group={activeGroup}
            groupIndex={activeIndex}
            onOpen={openLightbox}
            animKey={animKey}
          />
        </div>
      </div>

      {/* ── Mobile photo grid (below pills) ── */}
      <div className="md:hidden">
        <PhotoGrid
          key={animKey}
          group={activeGroup}
          groupIndex={activeIndex}
          onOpen={openLightbox}
          animKey={animKey}
        />
      </div>

      {lightbox.open && (
        <Lightbox
          groups={groups}
          state={lightbox}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      )}
    </>
  )
}
