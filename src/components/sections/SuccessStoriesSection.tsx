import { useState } from 'react'
import { images, successStories } from '../../config/homeContent'
import { Button } from '../ui/Button'
import './SuccessStoriesSection.css'

export function SuccessStoriesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const story = successStories[activeIndex]

  const goTo = (index: number) => {
    const total = successStories.length
    setActiveIndex((index + total) % total)
  }

  return (
    <section
      className="success-section"
      style={{ backgroundImage: `url(${images.caseStudiesBg})` }}
    >
      <div className="success-section__overlay" />

      <div className="success-section__inner">
        <header className="success-section__header">
          <p className="success-section__eyebrow">Over 15000+ Assets Digitally Transformed by RM EYE</p>
        </header>

        <div className="success-section__carousel">
          <button
            type="button"
            className="success-section__nav success-section__nav--prev"
            aria-label="Previous success story"
            onClick={() => goTo(activeIndex - 1)}
          >
            ‹
          </button>

          <article className="success-section__slide" key={story.title}>
            <div className="success-section__content">
              <h2>{story.title}</h2>
              <p className="success-section__location">{story.location}</p>
              <p className="success-section__description">{story.description}</p>
              <Button href="#" variant="primary">
                Read Our Success Story
              </Button>
            </div>

            <div className="success-section__metric">
              <p className="success-section__metric-value">{story.stat}</p>
              <p className="success-section__metric-label">{story.statLabel}</p>
            </div>
          </article>

          <button
            type="button"
            className="success-section__nav success-section__nav--next"
            aria-label="Next success story"
            onClick={() => goTo(activeIndex + 1)}
          >
            ›
          </button>
        </div>

        <div className="success-section__dots" role="tablist" aria-label="Success stories">
          {successStories.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${item.title}`}
              className={`success-section__dot${index === activeIndex ? ' success-section__dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
