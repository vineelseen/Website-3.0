import { embeds } from '../../config/homeContent'
import { Button } from '../ui/Button'
import { EmbedFrame } from '../ui/EmbedFrame'
import { SectionHeader } from '../ui/SectionHeader'
import './EcosystemSection.css'

export function EcosystemSection() {
  return (
    <section className="ecosystem-section" id="ecosystem">
      <div className="ecosystem-section__inner">
        <SectionHeader
          eyebrow="RM ECOSYSTEM"
          title="One Platform from Asset Data to Enterprise Decisions"
          description="Centralize your fragmented asset problems into one integrated, intelligence-driven solution."
        />
        <div className="ecosystem-section__cta">
          <Button href="#solution-breadth" variant="primary">
            Explore the Platform
          </Button>
        </div>
        <EmbedFrame src={embeds.ecoflow} title="RM Ecosystem flow diagram" minHeight={560} />
      </div>
    </section>
  )
}
