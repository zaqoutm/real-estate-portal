import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import styles from './footer.module.css'

export function Footer() {
  const t = useTranslations('Footer')
  const tNav = useTranslations('Nav')
  const year = new Date().getFullYear()

  const columns = [
    {
      title: t('company'),
      links: [t('about'), t('careers'), t('press')],
    },
    {
      title: t('support'),
      links: [t('help'), t('safety'), t('cancellation')],
    },
    {
      title: t('discover'),
      links: [t('cities'), t('neighborhoods'), t('guides')],
    },
  ]

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>{tNav('brand')}</span>
          <p className={styles.tagline}>{t('tagline')}</p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className={styles.col}>
            <h3 className={styles.colTitle}>{col.title}</h3>
            <ul className={styles.list}>
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="/" className={styles.link}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottomBar}>
        <div className="container">
          <p className={styles.copy}>
            &copy; {year} {tNav('brand')}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
