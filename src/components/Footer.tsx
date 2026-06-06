import type { Translations } from '../lib/i18n'

const MONO = "'JetBrains Mono', ui-monospace, monospace"

interface FooterProps {
  t: Translations
  onReset: () => void
}

export function Footer({ t, onReset }: FooterProps) {
  return (
    <footer style={{ marginTop: 20 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 16,
        borderTop: '2px solid #1a1a1a',
        flexWrap: 'wrap', gap: 12,
        marginBottom: 34,
      }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: '#525252', letterSpacing: '0.25em' }}>
          {t.footerTag}
        </span>
        <button
          type="button"
          onClick={onReset}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.color = '#0a0a0a' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fafafa' }}
          style={{
            fontFamily: MONO,
            padding: '10px 18px',
            background: 'transparent',
            border: '2px solid #fafafa',
            color: '#fafafa',
            fontSize: 11, letterSpacing: '0.25em', fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {t.resetBtn}
        </button>
      </div>

      <div className="brand-footer">
        <div className="brand-credit">
          <a className="brand-logo-link" href="https://www.mabarcodev.com" target="_blank" rel="noopener noreferrer" aria-label="Web de MabarcoDev">
            <span className="brand-logo" aria-hidden="true" />
          </a>
          <span>{t.creditPrefix}</span>
          <a className="brand-name" href="https://www.mabarcodev.com" target="_blank" rel="noopener noreferrer">
            MabarcoDev
          </a>
        </div>

        <nav className="brand-links" aria-label="Enlaces de MabarcoDev">
          <a href="https://www.mabarcodev.com" target="_blank" rel="noopener noreferrer">Web</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/mabarcodev" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://www.instagram.com/mabarcodev" target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
      </div>
    </footer>
  )
}
