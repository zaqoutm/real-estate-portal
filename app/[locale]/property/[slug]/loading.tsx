import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading…</span>

      {/* Top progress bar */}
      <div className={styles.progressBar} aria-hidden="true">
        <span className={styles.progressIndicator} />
      </div>

      <div className="container">
        <div className={`${styles.skeleton} ${styles.back}`} aria-hidden="true" />

        {/* Gallery skeleton */}
        <div className={styles.gallery} aria-hidden="true">
          <div className={`${styles.skeleton} ${styles.galleryMain}`} />
          <div className={styles.galleryThumbs}>
            <div className={`${styles.skeleton} ${styles.thumb}`} />
            <div className={`${styles.skeleton} ${styles.thumb}`} />
            <div className={`${styles.skeleton} ${styles.thumb}`} />
            <div className={`${styles.skeleton} ${styles.thumb}`} />
          </div>
        </div>

        <div className={styles.layout} aria-hidden="true">
          <div className={styles.main}>
            <div className={`${styles.skeleton} ${styles.lineLg}`} />
            <div className={`${styles.skeleton} ${styles.lineSm}`} />
            <div className={styles.grid}>
              <div className={`${styles.skeleton} ${styles.stat}`} />
              <div className={`${styles.skeleton} ${styles.stat}`} />
              <div className={`${styles.skeleton} ${styles.stat}`} />
              <div className={`${styles.skeleton} ${styles.stat}`} />
            </div>
            <div className={`${styles.skeleton} ${styles.line}`} />
            <div className={`${styles.skeleton} ${styles.line}`} />
            <div className={`${styles.skeleton} ${styles.lineShort}`} />
          </div>
          <div className={styles.aside}>
            <div className={`${styles.skeleton} ${styles.card}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
