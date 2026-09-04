import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '../../data/homepage'
import './Header.css'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`rm-header ${scrolled ? 'rm-header--scrolled' : ''}`}>
      <div className="rm-header__utility">
        <div className="rm-container rm-header__utility-inner">
          <a href="tel:+14187670111">+1-418-767-0111</a>
          <a href="mailto:info@ruggedmonitoring.com">info@ruggedmonitoring.com</a>
        </div>
      </div>

      <div className="rm-container rm-header__main">
        <a href="/" className="rm-header__logo" aria-label="Rugged Monitoring home">
          <img src="/assets/rm-logo.png" alt="Rugged Monitoring" />
        </a>

        <button
          type="button"
          className="rm-header__toggle"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`rm-header__nav ${menuOpen ? 'rm-header__nav--open' : ''}`} aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/contact-us/" className="rm-btn rm-header__cta" onClick={() => setMenuOpen(false)}>
            Contact us
          </a>
        </nav>
      </div>
    </header>
  )
}
