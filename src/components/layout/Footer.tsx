import { navLinks } from '../../config/homeContent'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__contact">
          <a href="tel:1-418-767-0111">1-418-767-0111</a>
          <a href="mailto:info@ruggedmonitoring.com">info@ruggedmonitoring.com</a>
          <a href="mailto:support@ruggedmonitoring.com">support@ruggedmonitoring.com</a>
        </div>

        <div className="site-footer__links">
          <div className="site-footer__column">
            <h3>Industries</h3>
            <ul>
              {navLinks.slice(1, 4).map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer__column">
            <h3>Products</h3>
            <ul>
              <li>
                <a href="#product-breadth">Asset Monitoring</a>
              </li>
              <li>
                <a href="#product-breadth">Products</a>
              </li>
            </ul>
          </div>
          <div className="site-footer__column">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#why-rm">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service &amp; Cookie Policy</a>
        </div>
        <p>© 2026, Rugged Monitoring. All rights reserved</p>
      </div>
    </footer>
  )
}
