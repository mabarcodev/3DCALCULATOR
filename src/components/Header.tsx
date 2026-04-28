import { useState, useEffect } from 'react'
import { ACCENTS, type AccentKey } from '../lib/accents'
import type { Lang, Translations } from '../lib/i18n'
import type { CurrencySymbol } from '../lib/calc'

const MONO    = "'JetBrains Mono', ui-monospace, monospace"
const DISPLAY = "'Archivo Black', 'Space Grotesk', sans-serif"

interface HeaderProps {
  acc: string
  accent: AccentKey
  onAccentChange: (k: AccentKey) => void
  lang: Lang
  onLangChange: (l: Lang) => void
  currency: CurrencySymbol
  onCurrencyChange: (c: CurrencySymbol) => void
  t: Translations
}

export function Header({ acc, accent, onAccentChange, lang, onLangChange, currency, onCurrencyChange, t }: HeaderProps) {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 560)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const Controls = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      {/* Toggle idioma */}
      <div style={{ display: 'flex', border: '2px solid #333', overflow: 'hidden' }}>
        {(['es', 'en']).map((l, i) => (
          <button key={l} type="button" onClick={() => onLangChange(l as Lang)}
            style={{
              fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
              padding: '4px 8px',
              background: lang === l ? acc : 'transparent',
              color: lang === l ? '#0a0a0a' : '#555',
              border: 'none', borderLeft: i === 1 ? '2px solid #333' : 'none',
              cursor: 'pointer', transition: 'all 0.1s', lineHeight: 1.4,
            }}
          >{l.toUpperCase()}</button>
        ))}
      </div>

      {/* Toggle divisa */}
      <div style={{ display: 'flex', border: '2px solid #333', overflow: 'hidden' }}>
        {(['€', '$'] as CurrencySymbol[]).map((c, i) => (
          <button key={c} type="button" onClick={() => onCurrencyChange(c)}
            style={{
              fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
              padding: '4px 8px',
              background: currency === c ? acc : 'transparent',
              color: currency === c ? '#0a0a0a' : '#555',
              border: 'none', borderLeft: i === 1 ? '2px solid #333' : 'none',
              cursor: 'pointer', transition: 'all 0.1s', lineHeight: 1.4,
            }}
          >{c}</button>
        ))}
      </div>

      {/* Puntos de color */}
      <div style={{ display: 'flex', gap: 6 }}>
        {(Object.entries(ACCENTS) as [AccentKey, typeof ACCENTS[AccentKey]][]).map(([k, v]) => (
          <button key={k} type="button" onClick={() => onAccentChange(k)} aria-label={v.name}
            style={{
              width: 22, height: 22, padding: 0,
              background: v.c,
              border: accent === k ? '2px solid #fafafa' : '2px solid transparent',
              outline: accent === k ? '2px solid ' + v.c : 'none',
              outlineOffset: 1, cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ border: '2px solid #fafafa', marginBottom: 16 }}>
      {/* Barra superior */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '6px 14px',
        background: '#fafafa', color: '#0a0a0a',
        fontWeight: 700, fontSize: 11, letterSpacing: '0.25em',
        fontFamily: MONO,
      }}>
        <span>● ONLINE</span>
        <span>v1.0</span>
        <span>{new Date().toISOString().slice(0, 10)}</span>
      </div>

      <div style={{ padding: '28px 18px 22px', position: 'relative' }}>
        {/* Controles en desktop: absolute top-right */}
        {!mobile && (
          <div style={{ position: 'absolute', top: 18, right: 18 }}>
            <Controls />
          </div>
        )}

        <h1 style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(48px, 11vw, 110px)',
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          margin: 0,
          fontWeight: 900,
        }}>
          {t.headline1}<br />
          {t.headline2} <span style={{ color: acc }}>{t.headline3}</span>
        </h1>

        <p style={{
          fontFamily: MONO,
          fontSize: 12, letterSpacing: '0.05em',
          marginTop: 18, marginBottom: 0,
          color: '#a3a3a3', maxWidth: 540, lineHeight: 1.6,
        }}>
          {t.subheadline}
        </p>

        {/* Controles en móvil: debajo del texto */}
        {mobile && (
          <div style={{ marginTop: 18 }}>
            <Controls />
          </div>
        )}
      </div>
    </div>
  )
}
