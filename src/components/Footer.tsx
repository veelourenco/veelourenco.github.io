import Link from 'next/link'
import {client} from '@/sanity/client'
import {ABOUT_QUERY} from '@/sanity/queries'
import {type About} from '@/sanity/types'
import SocialIcon from '@/components/SocialIcon'

const navLinks = [
  {href: '/work', label: 'Work'},
  {href: '/gallery', label: 'Gallery'},
  {href: '/events', label: 'Events'},
  {href: '/about', label: 'About'},
  {href: '/press', label: 'Press'},
]

export default async function Footer() {
  const about = await client.fetch<About>(ABOUT_QUERY)
  const socialLinks = about?.socialLinks

  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col items-center gap-8">
        {/* Social icons row */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            {socialLinks.map((link, i) => (
              <SocialIcon key={i} platform={link.platform} url={link.url} label={link.label} />
            ))}
          </div>
        )}

        {/* Nav + copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <p className="font-display text-lg tracking-widest uppercase text-muted">
            Vee Lourenco
          </p>
          <nav className="flex flex-wrap gap-6 justify-center">
            {navLinks.map(({href, label}) => (
              <Link key={href} href={href} className="nav-link text-xs">
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-muted text-xs tracking-wider">
            © {new Date().getFullYear()} Vee Lourenco
          </p>
        </div>
      </div>
    </footer>
  )
}
