import { CLIENT_LOGOS } from '../../data/homepage'
import './ClientLogos.css'

export function ClientLogos() {
  return (
    <section className="rm-section rm-section--light client-logos">
      <div className="rm-container">
        <div className="client-logos__header">
          <span className="rm-eyebrow">Trusted by Global Leaders</span>
          <h2 className="rm-heading">Our Clients Speak Volumes for Us</h2>
        </div>

        <div className="client-logos__track">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, index) => (
            <img key={`${logo}-${index}`} src={logo} alt="Client logo" />
          ))}
        </div>

        <div className="client-logos__cta">
          <a href="/contact-us/" className="rm-btn">Talk to Our Team</a>
        </div>
      </div>
    </section>
  )
}
