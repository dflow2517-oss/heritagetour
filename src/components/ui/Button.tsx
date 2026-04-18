import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'dark'
}

export function Button({ variant = 'ghost', className = '', children, ...props }: ButtonProps) {
  const variantClass = {
    primary: 'bg-burnt-orange text-cream border-2 border-ink',
    ghost: 'bg-cream text-ink border-2 border-ink',
    dark: 'bg-ink text-cream border-2 border-ink',
  }[variant]

  return (
    <button
      className={`press-shadow inline-flex items-center justify-center gap-2 transition-all disabled:opacity-30 disabled:pointer-events-none ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
