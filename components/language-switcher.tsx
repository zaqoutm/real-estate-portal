'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing, localeLabels, type Locale } from '@/i18n/routing'
import styles from './language-switcher.module.css'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function selectLocale(next: Locale) {
    setOpen(false)
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
        </svg>
        <span className={styles.current}>{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {routing.locales.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                className={`${styles.item} ${l === locale ? styles.itemActive : ''}`}
                onClick={() => selectLocale(l)}
              >
                {localeLabels[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
