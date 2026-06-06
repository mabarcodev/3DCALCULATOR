import test from 'node:test'
import assert from 'node:assert/strict'
import {
  calculate,
  fmt2,
  fmtCurrency,
  normalizeInputs,
  parseDecimalInput,
  toNonNegativeNumber,
  type CalcInputs,
} from '../src/lib/calc.ts'

const baseInputs: CalcInputs = {
  materialPricePerKg: 20,
  weightG: 100,
  printTimeH: 3,
  machineHourly: 1.5,
  laborTimeH: 0.5,
  laborHourly: 16,
  wastePct: 10,
  marginPct: 50,
}

const assertClose = (actual: number, expected: number) => {
  assert.ok(Math.abs(actual - expected) < 0.000001, `${actual} is not close to ${expected}`)
}

test('calculate returns a full cost breakdown and final price', () => {
  const result = calculate(baseInputs)

  assertClose(result.materialBase, 2)
  assertClose(result.wasteAmount, 0.2)
  assertClose(result.materialTotal, 2.2)
  assertClose(result.machineCost, 4.5)
  assertClose(result.laborCost, 8)
  assertClose(result.subtotal, 14.7)
  assertClose(result.profit, 7.35)
  assertClose(result.finalPrice, 22.05)
})

test('calculate sanitizes negative and non-finite input values', () => {
  const result = calculate({
    ...baseInputs,
    materialPricePerKg: Number.POSITIVE_INFINITY,
    weightG: -25,
    printTimeH: Number.NaN,
    machineHourly: 3,
    laborTimeH: 1,
    laborHourly: -10,
    wastePct: -5,
    marginPct: 100,
  })

  assert.deepEqual(result, {
    materialBase: 0,
    wasteAmount: 0,
    materialTotal: 0,
    machineCost: 0,
    laborCost: 0,
    subtotal: 0,
    profit: 0,
    finalPrice: 0,
  })
})

test('parseDecimalInput accepts comma and dot decimal separators', () => {
  assert.equal(parseDecimalInput('2,5'), 2.5)
  assert.equal(parseDecimalInput('2.5'), 2.5)
  assert.equal(parseDecimalInput('  18,75  '), 18.75)
})

test('parseDecimalInput rejects empty or invalid values', () => {
  assert.equal(parseDecimalInput(''), null)
  assert.equal(parseDecimalInput('abc'), null)
  assert.equal(parseDecimalInput('1,2,3'), null)
  assert.equal(parseDecimalInput('-1'), null)
})

test('normalizeInputs converts missing, negative and infinite values to zero', () => {
  assert.deepEqual(normalizeInputs({
    materialPricePerKg: 12,
    weightG: Number.NEGATIVE_INFINITY,
    marginPct: -1,
  }), {
    materialPricePerKg: 12,
    weightG: 0,
    printTimeH: 0,
    machineHourly: 0,
    laborTimeH: 0,
    laborHourly: 0,
    wastePct: 0,
    marginPct: 0,
  })
})

test('formatters return Spanish decimal output with the selected currency', () => {
  assert.equal(toNonNegativeNumber(Number.NaN), 0)
  assert.equal(fmt2(12.345), '12,35')
  assert.equal(fmtCurrency(12.3, '€'), '12,30€')
  assert.equal(fmtCurrency(12.3, '$'), '$12,30')
})
