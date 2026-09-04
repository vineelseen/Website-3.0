import { useState } from 'react'
import { RM_EYE_ASSETS } from '../../data/homepage'
import './RMEyeCircle.css'

export function RMEyeCircle() {
  const [activeId, setActiveId] = useState<(typeof RM_EYE_ASSETS)[number]['id']>(RM_EYE_ASSETS[0].id)
  const active = RM_EYE_ASSETS.find((item) => item.id === activeId) ?? RM_EYE_ASSETS[0]

  return (
    <section className="rm-section rm-eye-circle">
      <div className="rm-container">
        <div className="rm-eye-circle__header">
          <span className="rm-eyebrow">Predict, Prevent &amp; Perform with RM EYE</span>
          <h2 className="rm-heading">
            Future-Proof Your Operations with Our Reliable Condition Monitoring Solutions
          </h2>
        </div>

        <div className="rm-eye-circle__layout">
          <div className="rm-eye-circle__wheel" aria-hidden="true">
            <div className="rm-eye-circle__center">RM EYE</div>
            {RM_EYE_ASSETS.map((item, index) => {
              const angle = (index / RM_EYE_ASSETS.length) * 360
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`rm-eye-circle__node ${item.id === activeId ? 'rm-eye-circle__node--active' : ''}`}
                  style={{ transform: `rotate(${angle}deg) translateY(-150px) rotate(${-angle}deg)` }}
                  onClick={() => setActiveId(item.id)}
                >
                  <img src={item.icon} alt="" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="rm-eye-circle__detail">
            <h3>{active.label}</h3>
            <p>{active.description}</p>
            <p>{active.extra}</p>
            <a href="/rm-eye/" className="rm-btn">Explore RM EYE</a>
          </div>
        </div>
      </div>
    </section>
  )
}
