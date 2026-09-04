import { useState } from 'react'
import { ASSET_SOLUTIONS } from '../../data/homepage'
import './AssetSolutions.css'

export function AssetSolutions() {
  const [active, setActive] = useState(0)
  const current = ASSET_SOLUTIONS[active]

  return (
    <section className="rm-section asset-solutions">
      <div className="rm-container">
        <div className="asset-solutions__header">
          <h2 className="rm-heading">Make Every Asset Predictable</h2>
          <p className="rm-lead">
            Explore purpose-built monitoring solutions for every critical electrical asset across your operation.
          </p>
        </div>

        <div className="asset-solutions__layout">
          <div className="asset-solutions__accordion">
            {ASSET_SOLUTIONS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`asset-solutions__item ${index === active ? 'asset-solutions__item--active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span>{item.title}</span>
                <span className="asset-solutions__arrow">→</span>
              </button>
            ))}
          </div>

          <div className="asset-solutions__preview">
            <img src={current.image} alt={current.title} />
            <div className="asset-solutions__preview-copy">
              <h3>{current.title}</h3>
              <a href={current.href} className="rm-btn">Explore Solution</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
