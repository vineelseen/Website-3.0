import './HeroContent.css'

export function HeroContent() {
  return (
    <div className="hero-content">
      <div className="hero-content__text-gradient" aria-hidden="true" />
      <h1 className="hero-content__heading">
        <span>ONE HEALTH PLATFORM</span>
        <span>FOR ALL YOUR</span>
        <span>ELECTRICAL ASSETS.</span>
      </h1>
      <a href="#ecosystem" className="hero-content__cta">
        Explore the RM Ecosystem →
      </a>
    </div>
  )
}
