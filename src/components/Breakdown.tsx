import { fmtCurrency, fmt2, type CalcInputs, type CalcResult, type CurrencySymbol } from '../lib/calc'
import { Block } from './Block'
import type { Translations } from '../lib/i18n'

const MONO = "'JetBrains Mono', ui-monospace, monospace"

interface BreakdownProps { acc: string; inputs: CalcInputs; result: CalcResult; t: Translations; currency: CurrencySymbol }

export function Breakdown({ acc, inputs, result, t, currency }: BreakdownProps) {
  const fmt = (n: number) => fmtCurrency(n, currency)
  const sym = currency
  const rows = [
    { name: t.rowMaterial,  value: result.materialBase, sub: `${(inputs.weightG/1000).toFixed(3).replace('.',',')}kg × ${fmt2(inputs.materialPricePerKg)}${sym}/kg` },
    { name: t.rowWaste,     value: result.wasteAmount,  sub: t.wasteLabel(inputs.wastePct) },
    { name: t.rowMachine,   value: result.machineCost,  sub: `${fmt2(inputs.printTimeH)}h × ${fmt2(inputs.machineHourly)}${sym}/h` },
    { name: t.rowLabor,     value: result.laborCost,    sub: `${fmt2(inputs.laborTimeH)}h × ${inputs.laborHourly}${sym}/h` },
  ]
  const maxVal = Math.max(...rows.map((r) => r.value), 0.01)

  return (
    <Block num="=" title={t.desglosTitle} right={<span style={{ color: acc }}>{fmt(result.subtotal)}</span>}>
      <div style={{ padding: 20 }}>
        {rows.map((row) => (
          <div key={row.name} style={{ marginBottom: 12, display: 'grid', gridTemplateColumns: '120px 1fr 90px', gap: 12, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>{row.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 9, color: '#737373', letterSpacing: '0.05em', marginTop: 1 }}>{row.sub}</div>
            </div>
            <div style={{ height: 22, background: '#1a1a1a', border: '2px solid #fafafa', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, width: `${(row.value / maxVal) * 100}%`, background: acc, transition: 'width 0.25s ease-out' }} />
            </div>
            <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt(row.value)}</span>
          </div>
        ))}
        <div style={{ fontFamily: MONO, borderTop: '2px solid #fafafa', marginTop: 16, paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, letterSpacing: '0.15em' }}>
          <span>{t.subtotalLabel}</span><span>{fmt(result.subtotal)}</span>
        </div>
        <div style={{ fontFamily: MONO, paddingTop: 8, display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', color: acc }}>
          <span>{t.margenLabel(inputs.marginPct)}</span><span>{fmt(result.profit)}</span>
        </div>
      </div>
    </Block>
  )
}
