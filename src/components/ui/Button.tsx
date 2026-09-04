import './Button.css'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  onClick?: () => void
}

export function Button({
  children,
  href = '#',
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) {
  const classes = `rm-button rm-button--${variant} ${className}`.trim()

  if (onClick) {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
