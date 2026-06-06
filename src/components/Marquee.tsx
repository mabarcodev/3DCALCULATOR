import type { Translations } from '../lib/i18n'

interface MarqueeProps { acc: string; t: Translations }

export function Marquee({ acc, t }: MarqueeProps) {
  return (
    <div aria-hidden="true" style={{
      overflow: 'hidden',
      borderTop: '2px solid #fafafa', borderBottom: '2px solid #fafafa',
      padding: '6px 0', marginBottom: 18,
      background: acc, color: '#0a0a0a',
    }}>
      <div className="marquee-track" style={{
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontWeight: 700, fontSize: 13, letterSpacing: '0.25em',
      }}>
        <span>{t.marqueeText}{t.marqueeText}</span>
      </div>
    </div>
  )
}
