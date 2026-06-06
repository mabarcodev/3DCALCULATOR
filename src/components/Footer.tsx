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
        marginBottom: 32,
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

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 32,
      }}>
        <span style={{
          fontFamily: MONO,
          fontSize: 11,
          color: '#525252',
          letterSpacing: '0.15em',
        }}>
          {t.madeWith} ♥ - {t.by}
        </span>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a
            href="https://www.instagram.com/mabarcodev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de MabarcoDev"
            style={{ color: '#525252', display: 'flex', transition: 'color 0.15s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#fafafa')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#525252')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a
            href="https://github.com/mabarcodev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de MabarcoDev"
            style={{ color: '#525252', display: 'flex', transition: 'color 0.15s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#fafafa')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#525252')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
