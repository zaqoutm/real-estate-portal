import { PropertyExplorer } from '@/components/property-explorer'
import { getProperties } from '@/lib/properties-service'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 60

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const properties = await getProperties()

  return <PropertyExplorer properties={properties} />
}
