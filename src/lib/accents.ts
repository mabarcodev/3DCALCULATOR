export const ACCENTS = {
  lime:   { c: '#d4ff00', name: 'LIMA' },
  orange: { c: '#ff5c1a', name: 'NARANJA' },
  cyan:   { c: '#00e5ff', name: 'CYAN' },
  pink:   { c: '#ff3ea5', name: 'ROSA' },
  yellow: { c: '#ffd60a', name: 'AMARILLO' },
} as const

export type AccentKey = keyof typeof ACCENTS
