import { ASSET_BASE, RELIABILITY_FEATURES } from '../../data/homepage'
import './WhyRM.css'

export function WhyRM() {
  return (
    <section className="rm-section rm-section--light why-rm">
      <div className="rm-container why-rm__grid">
        <div>
          <h2 className="rm-heading">
            Redefining Reliability With Our Advanced Condition Monitoring Solutions
          </h2>
          <p className="rm-lead">
            At Rugged Monitoring, we understand the crucial role of efficient electrical asset condition monitoring in driving operational success. Our comprehensive solutions are designed to empower businesses across global industries with actionable insights, reduced downtime, and optimized asset performance.
          </p>

          <ul className="why-rm__features">
            {RELIABILITY_FEATURES.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <a href="/about-us/" className="rm-btn">Explore About RM</a>
        </div>

        <div className="why-rm__image-wrap">
          <img
            src={`${ASSET_BASE}/2025/08/why-rm-01_HD-scaled-1.webp`}
            alt="Rugged Monitoring condition monitoring platform"
          />
        </div>
      </div>
    </section>
  )
}
