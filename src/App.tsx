import { useMemo, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { calculate, DEFAULTS, PRESETS, fmt2, fmtCurrency, type CalcInputs, type CurrencySymbol } from './lib/calc'
import { ACCENTS, type AccentKey } from './lib/accents'
import { TRANSLATIONS, type Lang } from './lib/i18n'
import { Marquee }   from './components/Marquee'
import { Header }    from './components/Header'
import { Presets }   from './components/Presets'
import { Block, Hint } from './components/Block'
import { BSlider }   from './components/BSlider'
import { Stepper, LabelInput } from './components/Stepper'
import { Breakdown } from './components/Breakdown'
import { FinalPrice } from './components/FinalPrice'
import { Footer }    from './components/Footer'

const DISPLAY = "'Archivo Black', 'Space Grotesk', sans-serif"

function App() {
  const [inputs, setInputs]             = useState<CalcInputs>(DEFAULTS)
  const [accent, setAccent]             = useState<AccentKey>('lime')
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [lang, setLang]                 = useState<Lang>('es')
  const [currency, setCurrency]         = useState<CurrencySymbol>('€')

  const acc = ACCENTS[accent].c
  const t   = TRANSLATIONS[lang]
  const fmt = (n: number) => fmtCurrency(n, currency)

  const update = <K extends keyof CalcInputs>(k: K, v: CalcInputs[K]) =>
    setInputs((p) => ({ ...p, [k]: v }))

  const reset = () => { setInputs(DEFAULTS); setActivePreset(null) }

  const applyPreset = (k: string) => {
    setInputs((p) => ({ ...p, ...PRESETS[k] }))
    setActivePreset(k)
  }

  const result = useMemo(() => calculate(inputs), [inputs])

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '20px 20px 0' }}>

      <Marquee acc={acc} t={t} />
      <Header  acc={acc} accent={accent} onAccentChange={setAccent} lang={lang} onLangChange={setLang} currency={currency} onCurrencyChange={setCurrency} t={t} />
      <Presets acc={acc} active={activePreset} onApply={applyPreset} t={t} />

      {/* 01 MATERIAL */}
      <Block num="01" title={t.materialTitle} right={<span style={{ color: acc }}>{currency}/KG</span>}>
        <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(48px,8vw,76px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>
            {fmt2(inputs.materialPricePerKg)}<span style={{ color: acc, fontSize: '0.5em' }}>{currency}</span>
          </span>
          <Stepper value={inputs.materialPricePerKg} step={0.5} onChange={(v) => update('materialPricePerKg', v)} />
        </div>
        <Hint>{t.materialHint}</Hint>
      </Block>

      <BSlider acc={acc} num="02" label={t.pesoTitle}   value={inputs.weightG}    onChange={(v) => update('weightG', v)}    min={5}    max={500} step={5}    unit="G"   secondary={`${(inputs.weightG/1000).toFixed(3).replace('.',',')}kg`} />
      <BSlider acc={acc} num="03" label={t.tiempoTitle} value={inputs.printTimeH} onChange={(v) => update('printTimeH', v)} min={0.25} max={48}  step={0.25} unit="H"   format={fmt2} secondary={`${Math.round(inputs.printTimeH*60)}min`} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <BSlider acc={acc} num="04" label={t.maquinaTitle} value={inputs.machineHourly} onChange={(v) => update('machineHourly', v)} min={0.5} max={5} step={0.1} unit={`${currency}/H`} format={fmt2} hint={t.maquinaHint} />

        <Block num="05" title={t.mobraTitle} right={<span style={{ color: acc }}>{fmt(inputs.laborTimeH * inputs.laborHourly)}</span>}>
          <div style={{ padding: '16px 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <LabelInput acc={acc} label={t.mobraHoras} value={inputs.laborTimeH}  step={0.25} onChange={(v) => update('laborTimeH', v)} />
            <LabelInput acc={acc} label={`${currency}/H`} value={inputs.laborHourly} step={1} onChange={(v) => update('laborHourly', v)} />
          </div>
          <Hint>{t.mobraHint}</Hint>
        </Block>
      </div>

      <BSlider acc={acc} num="06" label={t.desperdicioTitle} value={inputs.wastePct}  onChange={(v) => update('wastePct', v)}  min={5}  max={30}  step={1} unit="%" hint={t.desperdicioHint} />
      <BSlider acc={acc} num="07" label={t.margenTitle}      value={inputs.marginPct} onChange={(v) => update('marginPct', v)} min={20} max={200} step={5} unit="%" hint={t.margenHint(fmt(result.profit))} />

      <Breakdown acc={acc} inputs={inputs} result={result} t={t} currency={currency} />
      <FinalPrice acc={acc} price={result.finalPrice} t={t} currency={currency} />

      <Footer t={t} onReset={reset} />
      <Analytics />
    </div>
  )
}

export default App
