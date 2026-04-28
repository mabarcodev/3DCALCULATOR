import type { CSSProperties } from 'react'

const MONO = "'JetBrains Mono', ui-monospace, monospace"
const DISPLAY = "'Archivo Black', 'Space Grotesk', sans-serif"

interface StepperProps {
  value: number
  step: number
  onChange: (v: number) => void
}

export function Stepper({ value, step, onChange }: StepperProps) {
  const change = (delta: number) =>
    onChange(Math.max(0, Math.round((value + delta) * 100) / 100))

  const btnStyle = (side: 'left' | 'right') => ({
    width: 44, height: 44,
    background: '#0a0a0a',
    border: 'none',
    borderRight: side === 'left' ? '2px solid #fafafa' : undefined,
    borderLeft: side === 'right' ? '2px solid #fafafa' : undefined,
    color: '#fafafa',
    fontSize: 24, fontWeight: 900,
    fontFamily: DISPLAY,
    cursor: 'pointer',
    lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  } as CSSProperties)

  return (
    <div style={{ display: 'flex', border: '2px solid #fafafa' }}>
      <button type="button" onClick={() => change(-step)} style={btnStyle('left')}>−</button>
      <input
        type="number" step={step} value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        style={{
          width: 90, height: 44,
          background: '#0a0a0a',
          border: 'none',
          color: '#fafafa',
          fontSize: 16, fontWeight: 700,
          fontFamily: MONO,
          textAlign: 'center',
          outline: 'none',
        }}
      />
      <button type="button" onClick={() => change(step)} style={btnStyle('right')}>+</button>
    </div>
  )
}

interface LabelInputProps {
  acc: string
  label: string
  value: number
  step: number
  onChange: (v: number) => void
}

export function LabelInput({ acc, label, value, step, onChange }: LabelInputProps) {
  return (
    <div>
      <div style={{
        fontFamily: MONO,
        fontSize: 10, letterSpacing: '0.25em',
        color: '#a3a3a3', marginBottom: 4, fontWeight: 700,
      }}>
        {label}
      </div>
      <input
        type="number" step={step} value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        onFocus={(e) => (e.target.style.borderColor = acc)}
        onBlur={(e) => (e.target.style.borderColor = '#fafafa')}
        style={{
          width: '100%', padding: '10px',
          background: '#0a0a0a',
          border: '2px solid #fafafa',
          color: '#fafafa',
          fontSize: 18, fontWeight: 700,
          fontFamily: MONO,
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
      />
    </div>
  )
}
