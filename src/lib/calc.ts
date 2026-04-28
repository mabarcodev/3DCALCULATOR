export interface CalcInputs {
  materialPricePerKg: number
  weightG: number
  printTimeH: number
  machineHourly: number
  laborTimeH: number
  laborHourly: number
  wastePct: number
  marginPct: number
}

export interface CalcResult {
  materialBase: number
  wasteAmount: number
  materialTotal: number
  machineCost: number
  laborCost: number
  subtotal: number
  profit: number
  finalPrice: number
}

export const DEFAULTS: CalcInputs = {
  materialPricePerKg: 18,
  weightG: 50,
  printTimeH: 2,
  machineHourly: 1.2,
  laborTimeH: 0.5,
  laborHourly: 15,
  wastePct: 12,
  marginPct: 60,
}

export const PRESETS: Record<string, Partial<CalcInputs>> = {
  PLA:    { materialPricePerKg: 18, wastePct: 10 },
  PETG:   { materialPricePerKg: 22, wastePct: 12 },
  ABS:    { materialPricePerKg: 20, wastePct: 15 },
  RESINA: { materialPricePerKg: 45, wastePct: 18 },
}

export function calculate(i: CalcInputs): CalcResult {
  const w = i.weightG / 1000
  const mb = w * i.materialPricePerKg
  const wa = mb * (i.wastePct / 100)
  const mt = mb + wa
  const mc = i.printTimeH * i.machineHourly
  const lc = i.laborTimeH * i.laborHourly
  const sub = mt + mc + lc
  const prof = sub * (i.marginPct / 100)
  return {
    materialBase: mb, wasteAmount: wa, materialTotal: mt,
    machineCost: mc, laborCost: lc, subtotal: sub,
    profit: prof, finalPrice: sub + prof,
  }
}

export type CurrencySymbol = '€' | '$'

export const fmt2 = (n: number): string => n.toFixed(2).replace('.', ',')
export const fmtCurrency = (n: number, sym: CurrencySymbol): string =>
  sym === '€'
    ? `${n.toFixed(2).replace('.', ',')}€`
    : `$${n.toFixed(2).replace('.', ',')}`
export const fmtEuro = (n: number): string => fmtCurrency(n, '€')
