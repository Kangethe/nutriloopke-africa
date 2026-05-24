import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { CrisisSection } from '@/components/sections/CrisisSection'
import { BSFLifecycleSection } from '@/components/sections/BSFLifecycleSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { StakeholderTabsSection } from '@/components/sections/StakeholderTabsSection'
import { KPIStripSection } from '@/components/sections/KPIStripSection'
import { SDGSection } from '@/components/sections/SDGSection'
import { AffiliationSection, NewsSection, PartnerCTASection } from '@/components/sections/HomeSections'

export const metadata: Metadata = {
  title: "NutriLoop Africa — Turning Nairobi's Waste into Protein and Fertiliser",
  description: "Kenya generates 22,000+ tonnes of organic waste daily. NutriLoop Africa converts it into BSF protein meal and frass fertiliser in 14 days at 50%+ margin.",
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CrisisSection />
      <BSFLifecycleSection />
      <ProductsSection />
      <StakeholderTabsSection />
      <KPIStripSection />
      <SDGSection />
      <AffiliationSection />
      <NewsSection />
      <PartnerCTASection />
    </>
  )
}
