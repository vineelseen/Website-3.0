import { images } from '../../config/homeContent'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import './DoMoreSection.css'

export function DoMoreSection() {
  return (
    <section className="do-more-section" id="do-more">
      <div className="do-more-section__inner">
        <div className="do-more-section__content">
          <SectionHeader
            align="left"
            eyebrow="DO MORE WITH RM EYE"
            title="Intelligent. Reliable. Efficient"
            description="RM EYE transforms real-time asset intelligence into earlier action, stronger lifecycle performance, and data-driven business decisions."
          />

          <div className="do-more-section__stat">
            <div className="do-more-section__stat-value">
              <span>70</span>
              <span className="do-more-section__percent">%</span>
            </div>
            <p className="do-more-section__stat-label">Reduced Unplanned Downtime</p>
            <p className="do-more-section__stat-copy">
              RM EYE identifies developing risks before they impact critical operations.
            </p>
            <Button href="#contact">Get Started with RM EYE</Button>
          </div>
        </div>

        <div className="do-more-section__visual">
          <img src={images.transformerGif} alt="Power transformer monitoring visualization" loading="lazy" />
        </div>
      </div>
    </section>
  )
}
