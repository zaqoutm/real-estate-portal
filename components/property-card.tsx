'use client'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { formatPrice } from '@/lib/format'
import { localized, type Property } from '@/lib/types'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './property-card.module.css'

export function PropertyCard({ property }: { property: Property }) {
  const locale = useLocale() as Locale
  const t = useTranslations('Listings')
  const cover = property.images?.[0]

  return (
    <Link href={`/property/${property.slug}`} className={styles.card}>
      <div className={styles.media}>
        {cover && (
          <Image
            src={cover.url || '/placeholder.svg'}
            alt={cover.alt || localized(property.title, locale)}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className={styles.image}
          />
        )}
        {property.featured && <span className={styles.badge}>{t('featured')}</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.location}>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
            <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
            <circle cx='12' cy='10' r='3' />
          </svg>
          {property.city}
        </div>

        <h3 className={styles.title}>{localized(property.title, locale)}</h3>

        <ul className={styles.specs}>
          <li>{t('beds', { count: property.bedrooms })}</li>
          <li aria-hidden='true'>&middot;</li>
          <li>{t('baths', { count: property.bathrooms })}</li>
          <li aria-hidden='true'>&middot;</li>
          <li>{t('area', { value: property.area })}</li>
        </ul>

        <div className={styles.footer}>
          <div className={styles.price}>
            <strong>{formatPrice(property.price, property.currency, locale)}</strong>
            <span className={styles.per}>{t('perMonth')}</span>
          </div>
          <span className={styles.cta}>{t('viewDetails')}</span>
        </div>
      </div>
    </Link>
  )
}
