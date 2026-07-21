'use client'

import { useLocale, useTranslations } from 'next-intl'
import { localized, type Property } from '@/lib/types'
import { formatPrice, formatDate } from '@/lib/format'
import type { Locale } from '@/i18n/routing'
import styles from './property-details.module.css'

export function PropertyDetails({ property }: { property: Property }) {
  const t = useTranslations('Property')
  const tHero = useTranslations('Hero')
  const tList = useTranslations('Listings')
  const locale = useLocale() as Locale

  const typeLabel = tHero(property.type)

  const stats = [
    { label: t('bedrooms'), value: property.bedrooms },
    { label: t('bathrooms'), value: property.bathrooms },
    { label: t('size'), value: tList('area', { value: property.area }) },
    { label: t('type'), value: typeLabel },
  ]

  return (
    <article className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{localized(property.title, locale)}</h1>
          <p className={styles.address}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.address}
          </p>
        </div>
        <div className={styles.priceBox}>
          <strong className={styles.price}>
            {formatPrice(property.price, property.currency, locale)}
          </strong>
          <span className={styles.per}>{t('perMonth')}</span>
        </div>
      </header>

      <div className={styles.statGrid}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>{t('description')}</h2>
        <p className={styles.text}>{localized(property.description, locale)}</p>
      </section>

      {property.amenities?.length > 0 && (
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>{t('amenities')}</h2>
          <ul className={styles.amenities}>
            {property.amenities.map((a) => (
              <li key={a} className={styles.amenity}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {a}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>{t('details')}</h2>
        <dl className={styles.detailList}>
          <div className={styles.detailRow}>
            <dt>{t('type')}</dt>
            <dd>{typeLabel}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>{t('availableFrom')}</dt>
            <dd>{formatDate(property.availableFrom, locale)}</dd>
          </div>
          <div className={styles.detailRow}>
            <dt>{t('location')}</dt>
            <dd>{property.city}</dd>
          </div>
        </dl>
      </section>
    </article>
  )
}
