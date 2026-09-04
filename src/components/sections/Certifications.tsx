import { CERTIFICATIONS } from '../../data/homepage'
import './Certifications.css'

export function Certifications() {
  return (
    <section className="rm-section certifications">
      <div className="rm-container certifications__grid">
        <div>
          <h2 className="rm-heading">Our Industry Certifications</h2>
          <p className="rm-lead">
            At Rugged Monitoring, we believe in &ldquo;Quality First&rdquo; products. We are dedicated to delivering reliable, efficient, and innovative products that enhance customer trust and satisfaction.
          </p>
        </div>

        <div className="certifications__logos">
          {CERTIFICATIONS.map((logo) => (
            <img key={logo} src={logo} alt="ISO certification" />
          ))}
        </div>
      </div>
    </section>
  )
}
