import { PRESETS } from '../lib/calc'
import type { Translations } from '../lib/i18n'

const MONO = "'JetBrains Mono', ui-monospace, monospace"

interface PresetsProps { acc: string; active: string | null; onApply: (k: string) => void; t: Translations }

export function Presets({ acc, active, onApply, t }: PresetsProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.3em', color: '#a3a3a3', marginBottom: 6, paddingLeft: 2 }}>
        {t.presetsLabel}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '2px solid #fafafa' }}>
        {Object.keys(PRESETS).map((k, i) => {
          const isActive = active === k
          return (
            <button key={k} type="button" onClick={() => onApply(k)}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = acc; e.currentTarget.style.color = '#0a0a0a' } }}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fafafa' } }}
              style={{
                padding: '14px 8px',
                background: isActive ? acc : '#0a0a0a',
                color: isActive ? '#0a0a0a' : '#fafafa',
                border: 'none',
                borderLeftWidth: i === 0 ? 0 : 2, borderLeftStyle: 'solid', borderLeftColor: '#fafafa',
                fontFamily: MONO, fontSize: 13, letterSpacing: '0.25em', fontWeight: 700,
                cursor: 'pointer', transition: 'all 0.1s',
              }}
            >▸ {k}</button>
          )
        })}
      </div>
    </div>
  )
}
