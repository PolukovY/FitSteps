import type { ReactNode } from 'react'

export function Pill({
  children,
  variant = 'muted',
}: {
  children: ReactNode
  variant?: 'accent' | 'soft' | 'muted' | 'outline'
}) {
  return <span className={`pill pill-${variant}`}>{children}</span>
}

export function Switch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button className={`switch${on ? ' on' : ''}`} onClick={onChange} role="switch" aria-checked={on}>
      <i />
    </button>
  )
}

export function Bar({ value }: { value: number }) {
  return (
    <div className="bar">
      <i style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }} />
    </div>
  )
}

export function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        {children}
      </div>
    </div>
  )
}
