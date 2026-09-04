import { useState } from 'react'
import { images, industries, type IndustryKey } from '../../config/homeContent'
import { SectionHeader } from '../ui/SectionHeader'
import './IndustryBreadthSection.css'

export function IndustryBreadthSection() {
  const [active, setActive] = useState<IndustryKey>('generation')
  const activeIndustry = industries.find((item) => item.key === active) ?? industries[0]

  return (
    <section className="industry-section" id="industry-breadth">
      <div className="industry-section__inner">
        <SectionHeader
          eyebrow="RM INDUSTRY BREADTH"
          title="Built for Every Enterprise Scale & Environment"
          description="Transform electrical asset infrastructure across 10+ industries to be AI-native, sustainable, and future-proof."
        />

        <div className="industry-section__tabs" role="tablist" aria-label="Industry categories">
          {industries.map((industry) => (
            <button
              key={industry.key}
              type="button"
              role="tab"
              aria-selected={active === industry.key}
              className={`industry-section__tab${active === industry.key ? ' industry-section__tab--active' : ''}`}
              onClick={() => setActive(industry.key)}
            >
              {industry.label}
            </button>
          ))}
        </div>

        <div className="industry-section__cards" role="tabpanel">
          {industries.map((industry) => {
            const cardImages = images.industry[industry.key]
            const isActive = industry.key === active

            return (
              <article
                key={industry.key}
                className={`industry-section__card${isActive ? ' industry-section__card--active' : ''}`}
                aria-hidden={!isActive}
              >
                <img
                  src={isActive ? cardImages.open : cardImages.closed}
                  alt={`${industry.label} industry`}
                  loading="lazy"
                />
              </article>
            )
          })}
        </div>

        <p className="industry-section__active-label">{activeIndustry.label}</p>
      </div>
    </section>
  )
}
