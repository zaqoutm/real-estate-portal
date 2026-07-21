import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getProperties, getPropertyBySlug } from '@/lib/properties'
import { localized } from '@/lib/types'
import type { Locale } from '@/i18n/routing'
import { PropertyGallery } from '@/components/property-gallery'
import { PropertyDetails } from '@/components/property-details'
import { ContactForm } from '@/components/contact-form'
import styles from './page.module.css'

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const property = await getPropertyBySlug(slug)
  if (!property) return { title: 'StayRent' }
  const title = localized(property.title, locale as Locale)
  return {
    title: `${title} — StayRent`,
    description: localized(property.description, locale as Locale).slice(0, 155),
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const property = await getPropertyBySlug(slug)
  if (!property) notFound()

  const t = await getTranslations('Property')
  const title = localized(property.title, locale as Locale)

  return (
    <div className={`container ${styles.page}`}>
      <Link href="/" className={styles.back}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
        {t('backToResults')}
      </Link>

      <PropertyGallery images={property.images} title={title} />

      <div className={styles.layout}>
        <div className={styles.main}>
          <PropertyDetails property={property} />
        </div>
        <aside className={styles.aside}>
          <ContactForm propertyTitle={title} />
        </aside>
      </div>
    </div>
  )
}
