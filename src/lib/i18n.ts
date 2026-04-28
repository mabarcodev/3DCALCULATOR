export type Lang = 'es' | 'en'

export interface Translations {
  marqueeText: string
  headline1: string
  headline2: string
  headline3: string
  subheadline: string
  presetsLabel: string
  materialTitle: string
  materialUnit: string
  materialHint: string
  pesoTitle: string
  tiempoTitle: string
  maquinaTitle: string
  maquinaHint: string
  mobraTitle: string
  mobraHint: string
  mobraHoras: string
  desperdicioTitle: string
  desperdicioHint: string
  margenTitle: string
  margenHint: (profit: string) => string
  desglosTitle: string
  rowMaterial: string
  rowWaste: string
  rowMachine: string
  rowLabor: string
  wasteLabel: (pct: number) => string
  subtotalLabel: string
  margenLabel: (pct: number) => string
  finalPriceLabel: string
  copyBtn: string
  copiedBtn: string
  resetBtn: string
  footerTag: string
  madeWith: string
  by: string
}

const ES: Translations = {
  marqueeText:      '▸ 3DCALC.SYSTEM \u00a0◆\u00a0 CALCULA EL PRECIO JUSTO \u00a0◆\u00a0 100% CLIENT-SIDE \u00a0◆\u00a0 SIN TRACKING \u00a0◆\u00a0 SIN SIGNUP \u00a0◆\u00a0 FDM / SLA \u00a0◆\u00a0 EUR \u00a0◆\u00a0\u00a0',
  headline1:        'CALCULA',
  headline2:        'TU',
  headline3:        'PRECIO.',
  subheadline:      'MATERIAL × PESO + MÁQUINA + MANO·OBRA + MARGEN.',
  presetsLabel:     '▸ PRESET RÁPIDO',
  materialTitle:    'MATERIAL',
  materialUnit:     '€/KG',
  materialHint:     'El precio real de tu bobina o resina · típico 12—25€/kg',
  pesoTitle:        'PESO',
  tiempoTitle:      'TIEMPO',
  maquinaTitle:     'MÁQUINA',
  maquinaHint:      'Amortización + energía',
  mobraTitle:       'M. OBRA',
  mobraHint:        'Post-procesado, limpieza, soportes',
  mobraHoras:       'HORAS',
  desperdicioTitle: 'DESPERDICIO',
  desperdicioHint:  'Soportes, fallos, recortes · típico 10—15%',
  margenTitle:      'MARGEN',
  margenHint:       (profit) => `Recomendado 50—100% · +${profit} ganancia`,
  desglosTitle:     'DESGLOSE',
  rowMaterial:      'Material',
  rowWaste:         'Desperdicio',
  rowMachine:       'Máquina',
  rowLabor:         'M. obra',
  wasteLabel:       (pct) => `+${pct}% del material`,
  subtotalLabel:    'SUBTOTAL',
  margenLabel:      (pct) => `+ MARGEN ${pct}%`,
  finalPriceLabel:  '▸ PRECIO FINAL',
  copyBtn:          '▸ COPIAR PRECIO',
  copiedBtn:        '✓ COPIADO AL PORTAPAPELES',
  resetBtn:         '↻ RESET',
  footerTag:        'NO BACKEND · NO TRACKING · NO BS',
  madeWith:         'Hecho con cariño',
  by:               'MabarcoDev',
}

const EN: Translations = {
  marqueeText:      '▸ 3DCALC.SYSTEM \u00a0◆\u00a0 CALCULATE THE FAIR PRICE \u00a0◆\u00a0 100% CLIENT-SIDE \u00a0◆\u00a0 NO TRACKING \u00a0◆\u00a0 NO SIGNUP \u00a0◆\u00a0 FDM / SLA \u00a0◆\u00a0 EUR \u00a0◆\u00a0\u00a0',
  headline1:        'CALCULATE',
  headline2:        'YOUR',
  headline3:        'PRICE.',
  subheadline:      'MATERIAL × WEIGHT + MACHINE + LABOUR + MARGIN.',
  presetsLabel:     '▸ QUICK PRESET',
  materialTitle:    'MATERIAL',
  materialUnit:     '€/KG',
  materialHint:     'Real price of your spool or resin · typical 12—25€/kg',
  pesoTitle:        'WEIGHT',
  tiempoTitle:      'TIME',
  maquinaTitle:     'MACHINE',
  maquinaHint:      'Amortisation + energy',
  mobraTitle:       'LABOUR',
  mobraHint:        'Post-processing, cleaning, supports',
  mobraHoras:       'HOURS',
  desperdicioTitle: 'WASTE',
  desperdicioHint:  'Supports, failures, trimmings · typical 10—15%',
  margenTitle:      'MARGIN',
  margenHint:       (profit) => `Recommended 50—100% · +${profit} profit`,
  desglosTitle:     'BREAKDOWN',
  rowMaterial:      'Material',
  rowWaste:         'Waste',
  rowMachine:       'Machine',
  rowLabor:         'Labour',
  wasteLabel:       (pct) => `+${pct}% of material`,
  subtotalLabel:    'SUBTOTAL',
  margenLabel:      (pct) => `+ MARGIN ${pct}%`,
  finalPriceLabel:  '▸ FINAL PRICE',
  copyBtn:          '▸ COPY PRICE',
  copiedBtn:        '✓ COPIED TO CLIPBOARD',
  resetBtn:         '↻ RESET',
  footerTag:        'NO BACKEND · NO TRACKING · NO BS',
  madeWith:         'Made with love',
  by:               'MabarcoDev',
}

export const TRANSLATIONS: Record<Lang, Translations> = { es: ES, en: EN }
