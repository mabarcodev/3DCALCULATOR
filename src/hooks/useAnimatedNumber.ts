import { useEffect, useRef, useState } from 'react'
import { fmt2 } from '../lib/calc'

export function useAnimatedNumber(value: number, duration = 350): string {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    fromRef.current = display
    startRef.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - (startRef.current ?? now)
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(fromRef.current + (value - fromRef.current) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return fmt2(display)
}
