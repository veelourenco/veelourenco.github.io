import {type PressItem} from '@/sanity/types'

interface PressCardProps {
  item: PressItem
}

export default function PressCard({item}: PressCardProps) {
  return (
    <article className="border border-border hover:border-orange/40 bg-bg-card p-8 transition-all duration-300 group">
      {item.quote && (
        <blockquote className="font-display text-xl md:text-2xl font-light text-text leading-relaxed mb-6">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      )}

      <footer className="flex items-end justify-between gap-4">
        <div>
          <p className="text-orange text-sm font-semibold tracking-wider uppercase">
            {item.source}
          </p>
          {item.title && (
            <p className="text-muted text-xs mt-1">{item.title}</p>
          )}
          {item.date && (
            <p className="text-muted text-xs mt-0.5">
              {new Date(item.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
              })}
            </p>
          )}
        </div>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-muted hover:text-orange transition-colors shrink-0"
          >
            Read →
          </a>
        )}
      </footer>
    </article>
  )
}
