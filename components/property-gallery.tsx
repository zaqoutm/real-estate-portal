'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { PropertyImage } from '@/lib/types'
import styles from './property-gallery.module.css'

export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const t = useTranslations('Property')
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!images || images.length === 0) return null

  const main = images[active]

  return (
    <section className={styles.gallery} aria-label={t('gallery')}>
      <button
        type="button"
        className={styles.mainImage}
        onClick={() => setLightbox(true)}
        aria-label={t('showAllPhotos')}
      >
        <Image
          src={main.url || '/placeholder.svg'}
          alt={main.alt || title}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className={styles.img}
          priority
        />
      </button>

      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`${title} — ${i + 1}`}
              aria-current={i === active}
            >
              <Image
                src={img.url || '/placeholder.svg'}
                alt={img.alt || `${title} ${i + 1}`}
                fill
                sizes="120px"
                className={styles.img}
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery')}
          onClick={() => setLightbox(false)}
        >
          <button type="button" className={styles.close} aria-label="Close" onClick={() => setLightbox(false)}>
            &times;
          </button>
          <div className={styles.lightboxImage} onClick={(e) => e.stopPropagation()}>
            <Image
              src={main.url || '/placeholder.svg'}
              alt={main.alt || title}
              fill
              sizes="90vw"
              className={styles.imgContain}
            />
          </div>
        </div>
      )}
    </section>
  )
}
