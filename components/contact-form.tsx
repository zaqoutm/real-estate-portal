'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import styles from './contact-form.module.css'

interface ContactValues {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactForm({ propertyTitle }: { propertyTitle: string }) {
  const t = useTranslations('Contact')
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    defaultValues: { name: '', email: '', phone: '', message: '' },
  })

  async function onSubmit(values: ContactValues) {
    // Simulate a network request. Replace with a real API route / Sanity mutation.
    console.log('[v0] Contact submission:', { property: propertyTitle, ...values })
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    reset()
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      {sent && (
        <div className={styles.success} role="status">
          {t('success')}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.group}>
          <label className={styles.label} htmlFor="name">
            {t('name')}
          </label>
          <input
            id="name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder={t('namePlaceholder')}
            aria-invalid={!!errors.name}
            {...register('name', { required: t('errorName') })}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="email">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder={t('emailPlaceholder')}
            aria-invalid={!!errors.email}
            {...register('email', {
              required: t('errorEmail'),
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('errorEmail') },
            })}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="phone">
            {t('phone')}
          </label>
          <input
            id="phone"
            type="tel"
            className={styles.input}
            placeholder={t('phonePlaceholder')}
            {...register('phone')}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label} htmlFor="message">
            {t('message')}
          </label>
          <textarea
            id="message"
            rows={4}
            className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            placeholder={t('messagePlaceholder')}
            aria-invalid={!!errors.message}
            {...register('message', { required: t('errorMessage') })}
          />
          {errors.message && <span className={styles.error}>{errors.message.message}</span>}
        </div>

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          {isSubmitting ? t('sending') : t('send')}
        </button>
      </form>
    </div>
  )
}
