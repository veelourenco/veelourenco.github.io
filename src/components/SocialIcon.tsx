/**
 * Inline SVG social media icons with an orange border ring.
 * Extend the `icons` map to add new platforms.
 */

interface SocialIconProps {
  platform: string
  url: string
  label?: string
}

const icons: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96C23 15.86 23 12 23 12s0-3.86-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13.6c2.4-1 5.1-.9 7.3.4" />
      <path d="M7 10.8c3-1.3 6.3-1.1 9 .6" />
      <path d="M9 16.4c1.8-.7 3.8-.6 5.5.3" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.16 8.16 0 0 0 4.77 1.52V6.72a4.85 4.85 0 0 1-1-.03z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  bandcamp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M0 18.75l7.437-13.5H24l-7.438 13.5z" />
    </svg>
  ),
  soundcloud: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M1.175 12.225c-.018 0-.026.009-.03.025l-.42 2.835.42 2.76c.004.016.012.025.03.025.017 0 .025-.009.03-.025l.48-2.76-.48-2.835c-.005-.016-.013-.025-.03-.025zm.84-.495c-.022 0-.032.012-.036.03L1.56 14.09l.42 2.68c.004.018.014.03.036.03.022 0 .032-.012.036-.03l.474-2.68-.474-2.33c-.004-.018-.014-.03-.036-.03zm.87-.24c-.028 0-.04.015-.044.037l-.415 2.563.415 2.604c.004.022.016.037.044.037.028 0 .04-.015.044-.037l.474-2.604-.474-2.563c-.004-.022-.016-.037-.044-.037zM20.16 8.4c-.39 0-.757.09-1.09.24a5.52 5.52 0 0 0-5.49-4.87 5.47 5.47 0 0 0-2.01.384 1.5 1.5 0 0 0-.498.252c-.012.01-.018.022-.018.036v10.696c0 .015.006.027.018.036l.03.012H20.16c1.566 0 2.84-1.268 2.84-2.834A2.837 2.837 0 0 0 20.16 8.4z" />
    </svg>
  ),
  applemusic: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.57.19 3.818.383 3.124.727 2.03 1.289 1.294 2.145.86 3.294a7.606 7.606 0 0 0-.384 2.033C.456 5.51.45 5.692.45 6v12.002c.002.29.009.58.026.87.055.665.189 1.322.424 1.96.55 1.48 1.637 2.47 3.146 2.94.46.145.938.213 1.42.25.504.037 1.01.047 1.515.047h11.028c.595 0 1.19-.008 1.785-.045.645-.044 1.28-.16 1.888-.42 1.42-.593 2.34-1.63 2.763-3.106.133-.47.21-.948.25-1.43.03-.403.047-.81.047-1.214L24 6c-.003-.627-.002-1.252-.006-1.876zM8.995 15.415V7.17l8.012 4.123-8.012 4.122z" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

const platformNames: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  spotify: 'Spotify',
  twitter: 'Twitter',
  x: 'X',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  bandcamp: 'Bandcamp',
  soundcloud: 'SoundCloud',
  applemusic: 'Apple Music',
  website: 'Website',
}

export default function SocialIcon({platform, url, label}: SocialIconProps) {
  const key = platform?.toLowerCase()
  const icon = icons[key]
  const displayLabel = label ?? platformNames[key] ?? platform

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={displayLabel}
      title={displayLabel}
      className="
        inline-flex items-center justify-center w-11 h-11 rounded-full
        border border-orange text-text
        hover:bg-orange hover:text-bg
        transition-all duration-300
        group
      "
    >
      {icon ?? (
        <span className="text-xs font-bold tracking-wider uppercase">
          {(displayLabel).slice(0, 2)}
        </span>
      )}
    </a>
  )
}
