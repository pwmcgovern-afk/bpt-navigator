'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import LanguageToggle from '@/components/LanguageToggle'
import NavigatorWordmark from '@/components/NavigatorWordmark'
import { getCategoriesWithDetails } from '@/lib/categories'
import { Button } from '@/components/ui/button'

// `content` is built inside the component because the hero copy interpolates
// `resourceCount`, which is only available as a prop. Defining it at module
// scope referenced an undeclared identifier and crashed the page on first render.
function buildContent(resourceCount: number) {
  return {
    en: {
      heroTitle: 'Find free help in Bridgeport',
      heroSub: `Food, housing, healthcare, legal aid — ${resourceCount} resources in English and Spanish, all in one place.`,
      heroCta: 'Find Resources for Me',
      heroSecondary: 'Browse All Resources',
      browseTitle: 'Browse by Category',
      call211: 'Need help now? Call 211',
      call211Sub: 'Free, confidential, 24/7',
      skipToMain: 'Skip to main content',
      footer: 'A free community resource for Bridgeport residents. Not affiliated with any government agency.',
      resources: 'resources',
    },
    es: {
      heroTitle: 'Encuentre ayuda gratuita en Bridgeport',
      heroSub: `Comida, vivienda, salud, ayuda legal — ${resourceCount} recursos en inglés y español, todo en un solo lugar.`,
      heroCta: 'Buscar Recursos',
      heroSecondary: 'Ver Todos los Recursos',
      browseTitle: 'Buscar por Categoría',
      call211: '¿Necesita ayuda ahora? Llame al 211',
      call211Sub: 'Gratuito, confidencial, 24/7',
      skipToMain: 'Saltar al contenido principal',
      footer: 'Un recurso comunitario gratuito para residentes de Bridgeport. No afiliado a ninguna agencia del gobierno.',
      resources: 'recursos',
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

      {/* Hero Section — full-width gradient. Color comes from --color-primary
          via .hero-bg, so each city's fork shows its own hue. */}
      <div className="hero-bg">
        <div className="max-w-lg mx-auto px-5">
          {/* Header inside hero */}
          <header className="pt-4 pb-2 flex items-center justify-between" role="banner">
            <NavigatorWordmark />
            <LanguageToggle />
          </header>

          {/* Lighthouse — nod to Bridgeport's maritime identity (Penfield Reef,
              Pleasure Beach). Same visual language as NHV's elm and HFD's
              Charter Oak: white-on-gradient, simple geometric shapes, ~0.5 opacity. */}
          <div className="pt-6 pb-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ opacity: 0.5 }}>
              {/* Light dome / lamp */}
              <circle cx="20" cy="8" r="2.5" fill="white" />
              {/* Light room (gallery) */}
              <rect x="15.5" y="9.5" width="9" height="3" rx="0.5" fill="white" />
              {/* Cap line above the tower */}
              <rect x="14.5" y="12.5" width="11" height="1.5" rx="0.5" fill="white" />
              {/* Tower body — tapered downward */}
              <path d="M16 14 L24 14 L26 31 L14 31 Z" fill="white" />
              {/* Window */}
              <rect x="18.5" y="22" width="3" height="4" rx="0.5" fill="white" opacity="0.35" />
              {/* Base / platform */}
              <rect x="11" y="31" width="18" height="3" rx="1" fill="white" />
              {/* Waterline ripple */}
              <path d="M8 36 Q12 34 16 36 T24 36 T32 36" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>

          {/* Hero content */}
          <section className="pb-12" id="main-content">
            <h1 className="text-[2rem] sm:text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-white/80 pb-2" style={{ maxWidth: '38ch' }}>
              {t.heroSub}
            </p>
          </section>
        </div>
      </div>

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

          {/* CTAs — below categories */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/wizard" className="flex-1">
              <Button size="lg" className="w-full text-[15px] font-semibold h-12 rounded-xl" style={{ background: 'var(--color-primary)', color: 'white' }}>
                {t.heroCta}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Button>
            </Link>
            <Link href="/resources" className="flex-1">
              <Button variant="outline" size="lg" className="w-full text-[15px] font-semibold h-12 rounded-xl">
                {t.heroSecondary}
              </Button>
            </Link>
          </div>

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
