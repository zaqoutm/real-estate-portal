'use client'

import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { localized, type Property, type PropertyType } from '@/lib/types'
import type { Locale } from '@/i18n/routing'
import { PropertyCard } from './property-card'
import styles from './property-explorer.module.css'

interface Filters {
  query: string
  type: '' | PropertyType
  maxPrice: string
}

const priceOptions = [1000, 1500, 2000, 3000, 5000]

export function PropertyExplorer({ properties }: { properties: Property[] }) {
  const t = useTranslations('Hero')
  const tl = useTranslations('Listings')
  const locale = useLocale() as Locale

  // Draft = what's in the inputs; applied = what filters the list on submit.
  const [draft, setDraft] = useState<Filters>({ query: '', type: '', maxPrice: '' })
  const [applied, setApplied] = useState<Filters>({ query: '', type: '', maxPrice: '' })

  const results = useMemo(() => {
    return properties.filter((p) => {
      const q = applied.query.trim().toLowerCase()
      if (q) {
        const haystack = `${p.city} ${p.address} ${localized(p.title, locale)}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (applied.type && p.type !== applied.type) return false
      if (applied.maxPrice && p.price > Number(applied.maxPrice)) return false
      return true
    })
  }, [properties, applied, locale])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApplied(draft)
  }

  function clearFilters() {
    const empty: Filters = { query: '', type: '', maxPrice: '' }
    setDraft(empty)
    setApplied(empty)
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>{t('title')}</h1>
          <p className={styles.heroSubtitle}>{t('subtitle')}</p>

          <form className={styles.searchBar} onSubmit={onSubmit}>
            <div className={styles.field}>
              <svg className={styles.fieldIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                className={styles.input}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                value={draft.query}
                onChange={(e) => setDraft({ ...draft, query: e.target.value })}
              />
            </div>

            <select
              className={styles.select}
              aria-label={t('anyType')}
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value as Filters['type'] })}
            >
              <option value="">{t('anyType')}</option>
              <option value="apartment">{t('apartment')}</option>
              <option value="house">{t('house')}</option>
              <option value="studio">{t('studio')}</option>
              <option value="villa">{t('villa')}</option>
            </select>

            <select
              className={styles.select}
              aria-label={t('priceRange')}
              value={draft.maxPrice}
              onChange={(e) => setDraft({ ...draft, maxPrice: e.target.value })}
            >
              <option value="">{t('anyPrice')}</option>
              {priceOptions.map((p) => (
                <option key={p} value={p}>
                  {`≤ €${p.toLocaleString()}`}
                </option>
              ))}
            </select>

            <button type="submit" className={styles.searchBtn}>
              {t('search')}
            </button>
          </form>
        </div>
      </section>

      <section className={`container ${styles.results}`}>
        <div className={styles.resultsHead}>
          <h2 className={styles.resultsTitle}>{tl('title')}</h2>
          <span className={styles.count}>{tl('resultsCount', { count: results.length })}</span>
        </div>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <p>{tl('noResults')}</p>
            <button type="button" className={styles.clearBtn} onClick={clearFilters}>
              {tl('clearFilters')}
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {results.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
