import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations('Property')
  return (
    <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>404</h1>
      <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
        {'This page could not be found.'}
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          background: 'var(--blue)',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 700,
        }}
      >
        {t('backToResults')}
      </Link>
    </div>
  )
}
