import { ASSET_BASE } from '../../data/homepage'
import './PlatformIntro.css'

export function PlatformIntro() {
  return (
    <section className="rm-section platform-intro">
      <div className="rm-container platform-intro__inner">
        <div className="platform-intro__copy">
          <span className="rm-eyebrow">With Rugged Monitoring&apos;s Advanced Electrical Asset Condition Monitoring Solutions</span>
          <h2 className="rm-heading">
            <span className="rm-heading--lead">RM EYE</span> — Where Assets Meet Unified Intelligence
          </h2>
          <p className="rm-lead">
            14+ interconnected modules bring asset data, health, diagnostics, workflows, and operations into one digital environment.
          </p>
        </div>

        <div className="platform-intro__visual" aria-hidden="true">
          <img
            src={`${ASSET_BASE}/2025/02/image__41_-removebg-preview.webp`}
            alt=""
            className="platform-intro__rm-eye"
          />
          <div className="platform-intro__modules">
            {['Diagnostics', 'Workflows', 'Health', 'Operations', 'Analytics', 'Alerts'].map((module) => (
              <span key={module} className="platform-intro__module">
                {module}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
