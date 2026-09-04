import { PRODUCT_CARDS } from '../../data/homepage'
import './ProductOverview.css'

export function ProductOverview() {
  return (
    <section className="rm-section rm-section--dark product-overview">
      <div className="rm-container">
        <div className="product-overview__header">
          <span className="rm-eyebrow">Invest in Efficiency &amp; Sustainability</span>
          <h2 className="rm-heading">Find the Right Solution with RM</h2>
        </div>

        <div className="rm-grid-3">
          {PRODUCT_CARDS.map((card) => (
            <article key={card.title} className="product-overview__card">
              <div className="product-overview__image-wrap">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="product-overview__body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <a href={card.href} className="product-overview__link">
                  Learn more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
