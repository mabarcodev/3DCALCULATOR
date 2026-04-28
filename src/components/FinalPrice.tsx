import { useState } from 'react'
import { fmtCurrency, type CurrencySymbol } from '../lib/calc'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import type { Translations } from '../lib/i18n'

const MONO    = "'JetBrains Mono', ui-monospace, monospace"
const DISPLAY = "'Archivo Black', 'Space Grotesk', sans-serif"

interface FinalPriceProps { acc: string; price: number; t: Translations; currency: CurrencySymbol }

export function FinalPrice({ acc, price, t, currency }: FinalPriceProps) {
  const [copied, setCopied] = useState(false)
  const animated = useAnimatedNumber(price)

  const copy = async () => {
    const text = fmtCurrency(price, currency)
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text)
      else {
        const ta = document.createElement('textarea')
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
      }
      setCopied(true); setTimeout(() => setCopied(false), 1500)
    } catch { /* noop */ }
  }

  return (
    <div style={{ background: acc, color: '#0a0a0a', border: '2px solid #fafafa', position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ fontFamily: MONO, display: 'flex', justifyContent: 'space-between', padding: '6px 14px', background: '#0a0a0a', color: acc, fontSize: 11, letterSpacing: '0.3em', fontWeight: 700 }}>
        <span>{t.finalPriceLabel}</span><span>OUTPUT.€</span>
      </div>
      <div style={{ padding: '24px 20px 20px' }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(96px, 18vw, 180px)', fontWeight: 900, lineHeight: 0.78, letterSpacing: '-0.06em', fontVariantNumeric: 'tabular-nums', marginBottom: 14 }}>
          {currency === '$' && <span style={{ fontSize: '0.55em' }}>$</span>}
          {animated}
          {currency === '€' && <span style={{ fontSize: '0.55em' }}>€</span>}
        </div>
        <button type="button" onClick={copy}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.color = '#0a0a0a' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = acc }}
          style={{ fontFamily: MONO, width: '100%', padding: 16, background: '#0a0a0a', color: acc, border: '2px solid #0a0a0a', fontSize: 14, letterSpacing: '0.3em', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.15s' }}>
          {copied ? t.copiedBtn : t.copyBtn}
        </button>
      </div>
    </div>
  )
}
