import type { ReactNode, CSSProperties } from 'react'

const S = {
  wrap: {
    border: '2px solid #fafafa',
    background: '#0a0a0a',
    marginBottom: 16,
  } satisfies CSSProperties,
  header: {
    borderBottom: '2px solid #fafafa',
    padding: '8px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    letterSpacing: '0.25em',
    textTransform: 'uppercase' as const,
    fontWeight: 700,
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  },
}

interface BlockProps {
  num: string
  title: string
  right?: ReactNode
  children: ReactNode
}

export function Block({ num, title, right, children }: BlockProps) {
  return (
    <section style={S.wrap} aria-labelledby={`section-${num}-${title}`.replace(/[^a-zA-Z0-9-]/g, '-')}>
      <div style={S.header}>
        <h2
          id={`section-${num}-${title}`.replace(/[^a-zA-Z0-9-]/g, '-')}
          style={{
            margin: 0,
            font: 'inherit',
            letterSpacing: 'inherit',
            textTransform: 'inherit',
          }}
        >
          {num} / {title}
        </h2>
        <span>{right}</span>
      </div>
      {children}
    </section>
  )
}

export function Hint({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: 10,
      color: '#737373',
      padding: '0 20px 14px',
      letterSpacing: '0.05em',
    }}>
      {children}
    </div>
  )
}
