import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About — Bridgeport Navigator',
  description: 'Why Bridgeport Navigator exists, how it works, and who built it.',
}

export default function AboutPage() {
  return <AboutClient />
}
