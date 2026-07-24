import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import styles from './header.module.css'
import { LanguageSwitcher } from './language-switcher'

export function Header() {
  const t = useTranslations('Nav')

  return (
    <header className={styles.header}>
      <h1 style={{ color: 'white' }}>LOGIN TEST BRACH</h1>
      <h1 style={{ color: 'white' }}>LOGIN TEST BRACH</h1>
      <h1 style={{ color: 'white' }}>LOGIN TEST BRACH</h1>
      <div className={`container ${styles.inner}`}>
        <Link href='/' className={styles.brand} aria-label={t('brand')}>
          <span className={styles.brandIcon} aria-hidden='true'>
            {/* simple house mark */}
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M3 10.5 12 3l9 7.5' />
              <path d='M5 9.5V21h14V9.5' />
              <path d='M9 21v-6h6v6' />
            </svg>
          </span>
          {t('brand')}
        </Link>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <Link href='/' className={styles.ghostBtn}>
            {t('listProperty')}
          </Link>
          <button type='button' className={styles.signInBtn}>
            {t('signIn')}
            test
          </button>
        </div>
      </div>
    </header>
  )
}
