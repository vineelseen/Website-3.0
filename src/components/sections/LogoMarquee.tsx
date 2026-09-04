import { partnerLogos } from '../../config/homeContent'
import './LogoMarquee.css'

export function LogoMarquee() {
  const logos = [...partnerLogos, ...partnerLogos]

  return (
    <section className="logo-marquee" aria-label="Trusted partners">
      <div className="logo-marquee__track">
        {logos.map((logo, index) => (
          <div className="logo-marquee__item" key={`${logo}-${index}`}>
            <img src={logo} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
