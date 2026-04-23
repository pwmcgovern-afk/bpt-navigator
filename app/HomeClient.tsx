'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import NavigatorWordmark from '@/components/NavigatorWordmark'
import { getCategoriesWithDetails } from '@/lib/categories'

function buildContent(resourceCount: number) {
  return {
    en: {
      edition: 'Bridgeport, CT',
      heroEyebrow: 'A free directory for Bridgeport residents',
      heroTitle: 'Find free help in Bridgeport',
      heroSub: `Food, housing, healthcare, legal aid — ${resourceCount} resources in English and Spanish, all in one place.`,
      ctaBrowseNum: '01',
      ctaBrowseLabel: 'Browse all resources',
      ctaWizardNum: '02',
      ctaWizardLabel: 'Take the eligibility quiz',
      browseTitle: 'Browse by Category',
      call211: 'Need help now? Call 211',
      call211Sub: 'Free, confidential, 24/7',
      skipToMain: 'Skip to main content',
      footer: 'A free community resource for Bridgeport residents. Not affiliated with any government agency.',
    },
    es: {
      edition: 'Bridgeport, CT',
      heroEyebrow: 'Un directorio gratuito para residentes de Bridgeport',
      heroTitle: 'Encuentre ayuda gratuita en Bridgeport',
      heroSub: `Comida, vivienda, salud, ayuda legal — ${resourceCount} recursos en inglés y español, todo en un solo lugar.`,
      ctaBrowseNum: '01',
      ctaBrowseLabel: 'Ver todos los recursos',
      ctaWizardNum: '02',
      ctaWizardLabel: 'Tomar el cuestionario',
      browseTitle: 'Buscar por Categoría',
      call211: '¿Necesita ayuda ahora? Llame al 211',
      call211Sub: 'Gratuito, confidencial, 24/7',
      skipToMain: 'Saltar al contenido principal',
      footer: 'Un recurso comunitario gratuito para residentes de Bridgeport. No afiliado a ninguna agencia del gobierno.',
    }
  }
}


export default function Home({ resourceCount }: { resourceCount: number }) {
  const { language } = useLanguage()
  const t = buildContent(resourceCount)[language]
  const cats = getCategoriesWithDetails(language)

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">{t.skipToMain}</a>

      {/* Editorial hero — parchment ground, dark serif title, city-color mark */}
      <section className="hero">
        <div className="hero__strip">
          <NavigatorWordmark onDark={false} />
          <span className="hero__edition">{t.edition}</span>
          <LanguageToggle />
        </div>

        <div className="hero__grid" id="main-content">
          <div className="hero__copy">
            <p className="hero__eyebrow">{t.heroEyebrow}</p>
            <h1 className="hero__title">{t.heroTitle}</h1>
            <p className="hero__lede">{t.heroSub}</p>
          </div>
          <div className="hero__mark" aria-hidden="true">
            {/* Colophon stamp — parchment-deep circle with hairline border
                holds the city SVG. Same position across all 3 forks so the
                family reads as a publication series. */}
            <div className="hero__stamp">
            {/* Lighthouse — Penfield Reef / Pleasure Beach. Fills use currentColor
                so the stamp tints the whole thing with Bridgeport blue. */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="8" r="2.5" fill="currentColor" />
              <rect x="15.5" y="9.5" width="9" height="3" rx="0.5" fill="currentColor" />
              <rect x="14.5" y="12.5" width="11" height="1.5" rx="0.5" fill="currentColor" />
              <path d="M16 14 L24 14 L26 31 L14 31 Z" fill="currentColor" />
              <rect x="18.5" y="22" width="3" height="4" rx="0.5" fill="currentColor" opacity="0.35" />
              <rect x="11" y="31" width="18" height="3" rx="1" fill="currentColor" />
              <path d="M8 36 Q12 34 16 36 T24 36 T32 36" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
            </div>
          </div>
        </div>

        <div className="hero__rule" />
        <div className="hero__ctas">
          <Link href="/resources" className="btn-editorial">
            <span className="btn-editorial__num">{t.ctaBrowseNum}</span>
            <span className="btn-editorial__label">{t.ctaBrowseLabel}</span>
            <span className="btn-editorial__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/wizard" className="btn-editorial btn-editorial--outline">
            <span className="btn-editorial__num">{t.ctaWizardNum}</span>
            <span className="btn-editorial__label">{t.ctaWizardLabel}</span>
            <span className="btn-editorial__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-5">
        <main className="pb-12" role="main">

          {/* Categories */}
          <section className="pt-8 mb-10" aria-labelledby="browse-heading">
            <h2 id="browse-heading" className="text-lg font-bold mb-5">
              {t.browseTitle}
            </h2>
            <nav aria-label={language === 'en' ? 'Resource categories' : 'Categorías de recursos'}>
              <div className="grid grid-cols-2 gap-3">
                {cats.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="category-card"
                    aria-label={category.ariaLabel}
                  >
                    <span className="text-3xl shrink-0" aria-hidden="true">{category.icon}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{category.name}</div>
                      <div className="text-xs leading-snug mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{category.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>
          </section>

          {/* Quick Links */}
          <div className="flex gap-3 mb-6">
            <Link href="/tracker" className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>
              My Tracker
            </Link>
          </div>

          {/* 211 CTA */}
          <section className="cta-211 mb-6">
            <a href="tel:211" className="cta-211-call">
              {t.call211}
            </a>
            <p className="cta-211-sub">{t.call211Sub}</p>
          </section>
        </main>

        {/* Footer */}
        <footer className="pb-8 text-center text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }} role="contentinfo">
          {t.footer}
        </footer>
      </div>
    </div>
  )
}
