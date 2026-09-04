import { HeroFoundation } from '../components/hero'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { ContactSection } from '../components/sections/ContactSection'
import { DoMoreSection } from '../components/sections/DoMoreSection'
import { EcosystemSection } from '../components/sections/EcosystemSection'
import { IndustryBreadthSection } from '../components/sections/IndustryBreadthSection'
import { LogoMarquee } from '../components/sections/LogoMarquee'
import { ProductBreadthSection } from '../components/sections/ProductBreadthSection'
import { SolutionBreadthSection } from '../components/sections/SolutionBreadthSection'
import { SuccessStoriesSection } from '../components/sections/SuccessStoriesSection'
import { TrustedSection } from '../components/sections/TrustedSection'
import { WhyRMSection } from '../components/sections/WhyRMSection'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <main>
        <HeroFoundation />
        <TrustedSection />
        <DoMoreSection />
        <LogoMarquee />
        <EcosystemSection />
        <SolutionBreadthSection />
        <IndustryBreadthSection />
        <ProductBreadthSection />
        <WhyRMSection />
        <SuccessStoriesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
