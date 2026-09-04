import { RESOURCE_CARDS } from '../../data/homepage'
import './Resources.css'

export function Resources() {
  return (
    <section className="rm-section resources">
      <div className="rm-container">
        <div className="resources__header">
          <span className="rm-eyebrow">Focus on Solution, Not the Problem</span>
          <h2 className="rm-heading">RM Resources</h2>
        </div>

        <div className="rm-grid-3">
          {RESOURCE_CARDS.map((card) => (
            <article key={card.title} className="resources__card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.href}>Read more →</a>
            </article>
          ))}
        </div>

        <div className="resources__cta">
          <a href="/resources/" className="rm-btn">View All Resources</a>
        </div>
      </div>
    </section>
  )
}
