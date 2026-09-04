import './Footer.css'

const FOOTER_LINKS = {
  Products: [
    { label: 'IIoT Sensors', href: '/products/iiot-sensors/' },
    { label: 'Edge Devices', href: '/products/edge-devices/' },
    { label: 'RM EYE', href: '/rm-eye/' },
  ],
  Solutions: [
    { label: 'Transformer Monitoring', href: '/asset-monitoring/transformer-monitoring-system/' },
    { label: 'Cable Monitoring', href: '/asset-monitoring/cable-monitoring-system/' },
    { label: 'Circuit Breaker Monitoring', href: '/asset-monitoring/circuit-breakers-monitoring-system/' },
  ],
  Company: [
    { label: 'About Us', href: '/about-us/' },
    { label: 'Case Studies', href: '/case-studies/' },
    { label: 'Careers', href: '/careers/' },
    { label: 'Contact Us', href: '/contact-us/' },
  ],
  Resources: [
    { label: 'Blogs', href: '/blogs/' },
    { label: 'Brochures', href: '/resources/' },
    { label: 'Login', href: '/login/' },
  ],
} as const

export function Footer() {
  return (
    <footer className="rm-footer">
      <div className="rm-container rm-footer__grid">
        <div className="rm-footer__brand">
          <img src="/assets/rm-logo.png" alt="Rugged Monitoring" />
          <p>
            Advanced electrical asset condition monitoring solutions for the most extreme environments.
          </p>
          <div className="rm-footer__contact">
            <a href="tel:+14187670111">+1-418-767-0111</a>
            <a href="mailto:info@ruggedmonitoring.com">info@ruggedmonitoring.com</a>
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} className="rm-footer__column">
            <h3>{title}</h3>
            <ul>
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rm-container rm-footer__legal">
        <p>© {new Date().getFullYear()} Rugged Monitoring. All rights reserved.</p>
      </div>
    </footer>
  )
}
