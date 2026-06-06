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

const ZERO_INPUTS: CalcInputs = {
  materialPricePerKg: 0,
  weightG: 0,
  printTimeH: 0,
  machineHourly: 0,
  laborTimeH: 0,
  laborHourly: 0,
  wastePct: 0,
  marginPct: 0,
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
  PLA: { materialPricePerKg: 18, wastePct: 10 },
  PETG: { materialPricePerKg: 22, wastePct: 12 },
  ABS: { materialPricePerKg: 20, wastePct: 15 },
  RESINA: { materialPricePerKg: 45, wastePct: 18 },
}

export function toNonNegativeNumber(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

export function parseDecimalInput(value: string): number | null {
  const normalized = value.trim().replace(',', '.')

  if (normalized === '') return null
  if (!/^\d*\.?\d+$/.test(normalized)) return null

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

export function normalizeInputs(inputs: Partial<CalcInputs>): CalcInputs {
  return {
    materialPricePerKg: toNonNegativeNumber(inputs.materialPricePerKg ?? ZERO_INPUTS.materialPricePerKg),
    weightG: toNonNegativeNumber(inputs.weightG ?? ZERO_INPUTS.weightG),
    printTimeH: toNonNegativeNumber(inputs.printTimeH ?? ZERO_INPUTS.printTimeH),
    machineHourly: toNonNegativeNumber(inputs.machineHourly ?? ZERO_INPUTS.machineHourly),
    laborTimeH: toNonNegativeNumber(inputs.laborTimeH ?? ZERO_INPUTS.laborTimeH),
    laborHourly: toNonNegativeNumber(inputs.laborHourly ?? ZERO_INPUTS.laborHourly),
    wastePct: toNonNegativeNumber(inputs.wastePct ?? ZERO_INPUTS.wastePct),
    marginPct: toNonNegativeNumber(inputs.marginPct ?? ZERO_INPUTS.marginPct),
  }
}

export function calculate(inputs: CalcInputs): CalcResult {
  const safeInputs = normalizeInputs(inputs)
  const weightKg = safeInputs.weightG / 1000
  const materialBase = weightKg * safeInputs.materialPricePerKg
  const wasteAmount = materialBase * (safeInputs.wastePct / 100)
  const materialTotal = materialBase + wasteAmount
  const machineCost = safeInputs.printTimeH * safeInputs.machineHourly
  const laborCost = safeInputs.laborTimeH * safeInputs.laborHourly
  const subtotal = materialTotal + machineCost + laborCost
  const profit = subtotal * (safeInputs.marginPct / 100)

  return {
    materialBase,
    wasteAmount,
    materialTotal,
    machineCost,
    laborCost,
    subtotal,
    profit,
    finalPrice: subtotal + profit,
  }
}

export type CurrencySymbol = '€' | '$'

export const fmt2 = (n: number): string => toNonNegativeNumber(n).toFixed(2).replace('.', ',')

export const fmtCurrency = (n: number, sym: CurrencySymbol): string =>
  sym === '€' ? `${fmt2(n)}€` : `$${fmt2(n)}`

export const fmtEuro = (n: number): string => fmtCurrency(n, '€')
