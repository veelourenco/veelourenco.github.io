import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // Trailing slashes so /about → /about/index.html works on Pages
  trailingSlash: true,
  // next/image cannot optimize images in static export; use Sanity's CDN instead
  images: {unoptimized: true},
  reactCompiler: true,
}

export default nextConfig
