import { embeds, images } from '../../config/homeContent'
import { Button } from '../ui/Button'
import { EmbedFrame } from '../ui/EmbedFrame'
import './TrustedSection.css'

export function TrustedSection() {
  return (
    <section className="trusted-section" id="rm-eye">
      <div className="trusted-section__video-wrap" aria-hidden="true">
        <video autoPlay muted loop playsInline poster={images.banner}>
          <source src={images.heroVideoWebm} type="video/webm" />
          <source src={images.heroVideoMp4} type="video/mp4" />
        </video>
        <div className="trusted-section__overlay" />
      </div>

      <div className="trusted-section__intro">
        <p className="trusted-section__eyebrow">TRUSTED &amp; COMPLIANT</p>
        <p className="trusted-section__sub">RM EYE- CENTRALIZED ASSET MANAGEMENT SYSTEM</p>
        <h2 className="trusted-section__title">Where Assets Meet Unified Intelligence</h2>
        <p className="trusted-section__copy">
          14+ interconnected modules bring asset data, health, diagnostics, workflows, and
          operationas into one digital environment.
        </p>
        <Button href="#do-more" variant="secondary">
          Start Your Transformation
        </Button>
      </div>

      <div className="trusted-section__modules">
        <EmbedFrame src={embeds.modules} title="RM EYE modules" minHeight={520} />
      </div>
    </section>
  )
}
