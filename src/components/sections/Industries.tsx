import { useState } from 'react'
import { INDUSTRIES } from '../../data/homepage'
import './Industries.css'

export function Industries() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = INDUSTRIES[activeIndex]

  return (
    <section className="rm-section rm-section--dark industries">
      <div className="rm-container">
        <div className="industries__header">
          <span className="rm-eyebrow">Industry We Serve</span>
          <h2 className="rm-heading">Designed with Intelligence for the Most Extreme Environments</h2>
        </div>

        <div className="industries__tabs" role="tablist" aria-label="Industries">
          {INDUSTRIES.map((industry, index) => (
            <button
              key={industry.label}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={`industries__tab ${index === activeIndex ? 'industries__tab--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {industry.label}
            </button>
          ))}
        </div>

        <div className="industries__panel" role="tabpanel">
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <a href={active.href} className="rm-btn rm-btn--outline">Learn More</a>
        </div>
      </div>
    </section>
  )
}
