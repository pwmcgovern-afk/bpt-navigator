/**
 * One-time seed: add senior + dental resources for Bridgeport.
 * Idempotent — skips any resource whose name already exists.
 *
 * Run once: npx tsx prisma/seed-senior-dental-2026-04.ts
 *
 * Phone + address left blank for admin to fill in after verification.
 * Translation cron auto-populates *Es fields.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const resources = [
  // --- Senior services ---
  {
    name: 'Southwestern Connecticut Agency on Aging',
    organization: 'Southwestern Connecticut Agency on Aging',
    description:
      'Regional Area Agency on Aging (AAA) serving Fairfield County including Bridgeport. Free programs for adults 60+: Meals on Wheels, CHOICES Medicare counseling, case management, benefits screening, and caregiver support.',
    categories: ['senior'],
    website: 'https://www.swcaa.org',
    city: 'Bridgeport',
  },
  {
    name: 'Bridgeport Senior Centers — Eisenhower & Black Rock',
    organization: 'City of Bridgeport',
    description:
      'City-run senior centers offering hot lunch, fitness classes, social programs, and benefits help for Bridgeport residents 60+. Multiple locations across the city.',
    categories: ['senior'],
    website: 'https://www.bridgeportct.gov',
    city: 'Bridgeport',
  },
  {
    name: 'Jewish Senior Services',
    organization: 'Jewish Senior Services',
    description:
      'Continuing-care retirement community and community programs for older adults of all faiths. Adult day program, home-delivered meals, and caregiver support.',
    categories: ['senior'],
    website: 'https://www.jseniors.org',
    city: 'Bridgeport',
  },

  // --- Dental services ---
  {
    name: 'Optimus Health Care — Dental',
    organization: 'Optimus Health Care',
    description:
      'Federally Qualified Health Center offering dental care on a sliding-fee scale at multiple Bridgeport locations. Accepts Medicaid/HUSKY, Medicare, and uninsured patients. Bilingual staff.',
    categories: ['dental', 'healthcare'],
    website: 'https://www.optimushealthcare.org',
    city: 'Bridgeport',
  },
  {
    name: 'Southwest Community Health Center — Dental',
    organization: 'Southwest Community Health Center',
    description:
      'FQHC dental services for adults and children on a sliding-fee scale. Cleanings, fillings, extractions, and preventive care. Accepts HUSKY, Medicaid, Medicare, and most insurance.',
    categories: ['dental', 'healthcare'],
    website: 'https://www.swchc.org',
    city: 'Bridgeport',
  },
  {
    name: 'Fones School of Dental Hygiene Clinic — University of Bridgeport',
    organization: 'University of Bridgeport',
    description:
      'Low-cost dental hygiene services (cleanings, x-rays, fluoride, sealants) provided by supervised dental hygiene students. Appointments required — longer than typical visit.',
    categories: ['dental'],
    website: 'https://www.bridgeport.edu/academics/schoolscolleges/fones-school-of-dental-hygiene',
    city: 'Bridgeport',
  },
]

async function main() {
  let added = 0
  let skipped = 0
  for (const r of resources) {
    const existing = await prisma.resource.findFirst({ where: { name: r.name } })
    if (existing) {
      console.log(`- Skip (exists): ${r.name}`)
      skipped++
      continue
    }
    await prisma.resource.create({
      data: {
        name: r.name,
        organization: r.organization,
        description: r.description,
        categories: r.categories,
        city: r.city,
        state: 'CT',
        website: r.website,
        source: 'manual',
      },
    })
    console.log(`+ Added: ${r.name}`)
    added++
  }
  console.log(`\nSummary: ${added} added, ${skipped} skipped`)
}

main()
  .catch(err => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
