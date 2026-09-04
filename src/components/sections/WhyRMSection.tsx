import { embeds, whyRmFeatures } from '../../config/homeContent'
import { EmbedFrame } from '../ui/EmbedFrame'
import { SectionHeader } from '../ui/SectionHeader'
import './WhyRMSection.css'

export function WhyRMSection() {
  return (
    <section className="why-rm-section" id="why-rm">
      <div className="why-rm-section__inner">
        <SectionHeader
          eyebrow="WHY RM"
          title="One Partner Across Your Asset's Lifetime"
          description="From field sensing to enterprise systems, RM brings the technologies, asset expertise and integration capabilities into one complete ecosystem."
        />

        <div className="why-rm-section__grid">
          {whyRmFeatures.map((feature) => (
            <article key={feature.title} className="why-rm-section__card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
          <article className="why-rm-section__card why-rm-section__card--highlight">
            <h3>One Technology Partner</h3>
            <p>
              Bring traditionally fragmented electrical asset technologies and digital capabilities
              together through RM.
            </p>
          </article>
        </div>

        <div className="why-rm-section__visual">
          <EmbedFrame src={embeds.aboutCircle} title="RM capabilities circle" minHeight={420} />
        </div>
      </div>
    </section>
  )
}
