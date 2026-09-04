import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { HomeHero } from '../components/sections/HomeHero'
import { PlatformIntro } from '../components/sections/PlatformIntro'
import { AssetSolutions } from '../components/sections/AssetSolutions'
import { ProductOverview } from '../components/sections/ProductOverview'
import { RMEyeCircle } from '../components/sections/RMEyeCircle'
import { WhyRM } from '../components/sections/WhyRM'
import { Industries } from '../components/sections/Industries'
import { Certifications } from '../components/sections/Certifications'
import { ClientLogos } from '../components/sections/ClientLogos'
import { Resources } from '../components/sections/Resources'
import '../styles/homepage.css'
import './HomePage.css'

export function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <main>
        <HomeHero />
        <PlatformIntro />
        <AssetSolutions />
        <ProductOverview />
        <div id="ecosystem">
          <RMEyeCircle />
        </div>
        <WhyRM />
        <Industries />
        <Certifications />
        <ClientLogos />
        <Resources />
      </main>
      <Footer />
    </div>
  )
}
