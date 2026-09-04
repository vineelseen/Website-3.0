import './HeroTypography.css'

export function HeroTypography() {
  return (
    <div className="hero-typography">
      <h1 className="hero-typography__title">
        <span>THE ONE HEALTH PLATFORM</span>
        <span>FOR ALL ELECTRICAL ASSETS</span>
      </h1>
      <a href="#ecosystem" className="hero-typography__cta">
        EXPLORE THE RM ECOSYSTEM <span className="hero-typography__arrow">→</span>
      </a>
    </div>
  )
}
