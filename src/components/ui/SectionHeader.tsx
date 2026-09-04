import './SectionHeader.css'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  return (
    <header className={`section-header section-header--${align}${light ? ' section-header--light' : ''}`}>
      <p className="section-header__eyebrow">{eyebrow}</p>
      <h2 className="section-header__title">{title}</h2>
      {description ? <p className="section-header__description">{description}</p> : null}
    </header>
  )
}
