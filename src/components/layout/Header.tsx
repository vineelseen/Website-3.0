import { useEffect, useState } from 'react'
import { images, navLinks } from '../../config/homeContent'
import './Header.css'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <a href="#" className="site-header__logo" aria-label="Rugged Monitoring home">
          <img
            src={scrolled ? images.logoBlue : images.logoWhite}
            alt="Rugged Monitoring"
            width={180}
            height={45}
          />
        </a>

        <nav className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`} aria-label="Main">
          <ul className="site-header__menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`site-header__toggle${menuOpen ? ' site-header__toggle--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
