import { useEffect, useId, useState, type CSSProperties } from 'react'
import { fmt2, parseDecimalInput, toNonNegativeNumber } from '../lib/calc'

const MONO = "'JetBrains Mono', ui-monospace, monospace"
const DISPLAY = "'Archivo Black', 'Space Grotesk', sans-serif"

interface StepperProps {
  value: number
  step: number
  label: string
  onChange: (v: number) => void
}

const displayValue = (value: number) => fmt2(value).replace(/,00$/, '')

export function Stepper({ value, step, label, onChange }: StepperProps) {
  const [draft, setDraft] = useState(displayValue(value))

  useEffect(() => {
    setDraft(displayValue(value))
  }, [value])

  const change = (delta: number) =>
    onChange(Math.round(toNonNegativeNumber(value + delta) * 100) / 100)

  const commitDraft = () => {
    const parsed = parseDecimalInput(draft)
    if (parsed === null) {
      setDraft(displayValue(value))
      return
    }

    const nextValue = Math.round(toNonNegativeNumber(parsed) * 100) / 100
    onChange(nextValue)
    setDraft(displayValue(nextValue))
  }

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
      <button type="button" onClick={() => change(-step)} style={btnStyle('left')} aria-label={`Reducir ${label}`}>−</button>
      <input
        type="text"
        inputMode="decimal"
        aria-label={label}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          const parsed = parseDecimalInput(e.target.value)
          if (parsed !== null) onChange(Math.round(toNonNegativeNumber(parsed) * 100) / 100)
        }}
        onBlur={commitDraft}
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
      <button type="button" onClick={() => change(step)} style={btnStyle('right')} aria-label={`Aumentar ${label}`}>+</button>
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
  const id = useId()
  const [draft, setDraft] = useState(displayValue(value))

  useEffect(() => {
    setDraft(displayValue(value))
  }, [value])

  const commitDraft = () => {
    const parsed = parseDecimalInput(draft)
    if (parsed === null) {
      setDraft(displayValue(value))
      return
    }

    const nextValue = Math.round(toNonNegativeNumber(parsed) / step) * step
    const rounded = Math.round(nextValue * 100) / 100
    onChange(rounded)
    setDraft(displayValue(rounded))
  }

  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontFamily: MONO,
          fontSize: 10, letterSpacing: '0.25em',
          color: '#a3a3a3', marginBottom: 4, fontWeight: 700,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          const parsed = parseDecimalInput(e.target.value)
          if (parsed !== null) onChange(toNonNegativeNumber(parsed))
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#fafafa'
          commitDraft()
        }}
        onFocus={(e) => (e.target.style.borderColor = acc)}
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
