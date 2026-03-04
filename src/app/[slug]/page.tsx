// This route is no longer used — projects now live at /work/[slug]
// generateStaticParams returns [] so no static files are emitted for this route.
export async function generateStaticParams() {
  return []
}

export default function LegacySlugPage() {
  return null
}
