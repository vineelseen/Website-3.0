import { Button } from '../ui/Button'
import './ContactSection.css'

export function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__inner">
        <header className="contact-section__header">
          <p className="contact-section__eyebrow">CONTACT US</p>
          <h2 className="contact-section__title">All Your Needs</h2>
          <h3 className="contact-section__subtitle">One Platform</h3>
          <p className="contact-section__description">
            One conversation is all it takes to begin connecting your assets, intelligence, and
            operations.
          </p>
        </header>

        <div className="contact-section__actions">
          <Button href="mailto:info@ruggedmonitoring.com" variant="secondary">
            Talk to our Expert
          </Button>
          <Button href="#ecosystem" variant="outline">
            Demo Before You Invest
          </Button>
        </div>
      </div>
    </section>
  )
}
