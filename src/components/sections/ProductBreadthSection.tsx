import { embeds } from '../../config/homeContent'
import { EmbedFrame } from '../ui/EmbedFrame'
import { SectionHeader } from '../ui/SectionHeader'
import './ProductBreadthSection.css'

export function ProductBreadthSection() {
  return (
    <section className="product-section" id="product-breadth">
      <div className="product-section__inner">
        <SectionHeader
          eyebrow="RM PRODUCT BREADTH"
          title="From Field-Deployed Sensors to Unified Intelligence"
          description="Retrofit, highly customizable & scalable IIoT-based sensors & edge devices."
        />
        <EmbedFrame src={embeds.products} title="RM sensors and monitors" minHeight={480} />
      </div>
    </section>
  )
}
