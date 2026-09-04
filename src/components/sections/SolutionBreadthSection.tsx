import { embeds } from '../../config/homeContent'
import { EmbedFrame } from '../ui/EmbedFrame'
import { SectionHeader } from '../ui/SectionHeader'
import './SolutionBreadthSection.css'

export function SolutionBreadthSection() {
  return (
    <section className="solution-section" id="solution-breadth">
      <div className="solution-section__inner">
        <SectionHeader
          eyebrow="RM SOLUTION BREADTH"
          title="Designed for Electrical Assets at Every Scale"
          description="Monitor electrical assets and the conditions that shape their health, scaling from individual to fleet, and fleet to enterprise."
        />

        <div className="solution-section__stat">
          <span className="solution-section__stat-number">131+</span>
          <span className="solution-section__stat-label">Assets</span>
        </div>

        <EmbedFrame src={embeds.assets} title="RM asset monitoring showcase" minHeight={620} />
      </div>
    </section>
  )
}
