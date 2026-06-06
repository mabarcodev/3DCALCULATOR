import { useId } from 'react'
import { Block, Hint } from './Block'
import { toNonNegativeNumber } from '../lib/calc'

interface BSliderProps {
  acc: string
  num: string
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  unit: string
  format?: (v: number) => string | number
  secondary?: string
  hint?: string
}

export function BSlider({
  acc, num, label, value, onChange, min, max, step, unit,
  format = (v) => v, secondary, hint,
}: BSliderProps) {
  const id = useId()
  const safeValue = toNonNegativeNumber(value)
  const pct = Math.min(100, Math.max(0, ((safeValue - min) / (max - min)) * 100))

  return (
    <Block
      num={num}
      title={label}
      right={<span style={{ color: acc }}>[{min} ↔ {max}{unit}]</span>}
    >
      <div style={{ padding: '20px 20px 14px' }}>
        <label htmlFor={id} className="sr-only">{label}</label>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
          <span className="metric-value" style={{
            fontFamily: "'Archivo Black', 'Space Grotesk', sans-serif",
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: 0,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {format(safeValue)}
          </span>
          <span className="metric-unit" style={{
            fontFamily: "'Archivo Black', 'Space Grotesk', sans-serif",
            fontWeight: 900,
            color: acc,
            letterSpacing: 0,
          }}>
            {unit}
          </span>
          {secondary && (
            <span style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11,
              color: '#737373',
              letterSpacing: '0.1em',
              marginLeft: 'auto',
            }}>
              ≈ {secondary}
            </span>
          )}
        </div>

        <div style={{ position: 'relative', height: 36 }}>
          <div style={{
            position: 'absolute',
            top: 14, bottom: 14, left: 0, right: 0,
            background: '#1a1a1a',
            border: '2px solid #fafafa',
          }} />
          <div style={{
            position: 'absolute',
            top: 14, bottom: 14, left: 0,
            width: `${pct}%`,
            background: acc,
            transition: 'width 0.08s',
          }} />
          <input
            id={id}
            type="range"
            value={safeValue}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: 36,
              opacity: 0, cursor: 'ew-resize', margin: 0,
            }}
          />
          <div style={{
            position: 'absolute',
            top: 4,
            left: `calc(${pct}% - 14px)`,
            width: 28, height: 28,
            background: '#fafafa',
            border: '2px solid #0a0a0a',
            boxShadow: `0 0 0 2px ${acc}`,
            pointerEvents: 'none',
            transition: 'left 0.08s',
          }} />
        </div>
      </div>
      {hint && <Hint>{hint}</Hint>}
    </Block>
  )
}
