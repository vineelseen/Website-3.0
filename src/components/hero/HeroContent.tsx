import { ASSET_CONFIGS } from '../../config/assets'
import './HeroContent.css'

export function HeroContent() {
  return (
    <div className="hero-content">
      <div className="hero-content__center">
        <h1 className="hero-content__heading">
          <span>THE ONE HEALTH PLATFORM</span>
          <span>FOR ALL ELECTRICAL ASSETS</span>
        </h1>
        <a href="#ecosystem" className="hero-content__cta">
          Explore the RM Ecosystem <span className="hero-content__arrow">→</span>
        </a>
      </div>

      {ASSET_CONFIGS.map((asset) => (
        <span
          key={asset.id}
          className="hero-content__label"
          style={{ left: asset.labelPosition.left, top: asset.labelPosition.top }}
        >
          {asset.label}
        </span>
      ))}
    </div>
  )
}
