import { setRequestLocale } from 'next-intl/server'
import { getProperties } from '@/lib/properties'
import { PropertyExplorer } from '@/components/property-explorer'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const properties = await getProperties()

  return <PropertyExplorer properties={properties} />
}
