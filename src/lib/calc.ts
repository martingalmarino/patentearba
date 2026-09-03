export type VehicleType = "auto" | "moto";

export type TaxBracket = {
  name: string;
  max: number;
  base: number;
  rate: number;
  floor: number;
};

export const TAX_YEAR = 2026;

export const TAX_BRACKETS: TaxBracket[] = [
  { name: "Hasta $14.100.000", max: 14_100_000, base: 0, rate: 0.01, floor: 0 },
  {
    name: "$14.100.001 - $18.700.000",
    max: 18_700_000,
    base: 141_000,
    rate: 0.02,
    floor: 14_100_000,
  },
  {
    name: "$18.700.001 - $26.100.000",
    max: 26_100_000,
    base: 233_000,
    rate: 0.03,
    floor: 18_700_000,
  },
  {
    name: "$26.100.001 - $53.900.000",
    max: 53_900_000,
    base: 455_000,
    rate: 0.04,
    floor: 26_100_000,
  },
  {
    name: "Más de $53.900.000",
    max: Number.POSITIVE_INFINITY,
    base: 1_567_000,
    rate: 0.045,
    floor: 53_900_000,
  },
];

export const moneyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export const numberFormatter = new Intl.NumberFormat("es-AR");

export function parseMoney(input: string): number {
  const cleaned = String(input || "").replace(/[^\d]/g, "");
  if (!cleaned) return Number.NaN;
  return Number(cleaned);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function ageFactor(vehicleYear: number): { age: number; factor: number } {
  const age = Math.max(0, TAX_YEAR - vehicleYear);
  const factor = clamp(1 - 0.05 * age, 0.3, 1);
  return { age, factor };
}

export type TaxResult = {
  bracket: TaxBracket;
  excess: number;
  tax: number;
};

export function calculateTax(fiscalValue: number): TaxResult {
  const bracket =
    TAX_BRACKETS.find((item) => fiscalValue <= item.max) ??
    TAX_BRACKETS[TAX_BRACKETS.length - 1];
  const excess = Math.max(0, fiscalValue - bracket.floor);
  const tax = bracket.base + bracket.rate * excess;
  return { bracket, excess, tax };
}

export function describeCalculation(input: {
  type: VehicleType;
  year: number;
  fiscalValue: number;
  result: TaxResult;
}): string {
  const typeLabel = input.type === "auto" ? "Automóvil" : "Motocicleta";
  return [
    `Tipo: ${typeLabel} | Año: ${input.year}`,
    `Valuación fiscal: ${moneyFormatter.format(input.fiscalValue)}`,
    "",
    `Tramo aplicado: ${input.result.bracket.name}`,
    `Base: ${moneyFormatter.format(input.result.bracket.base)}`,
    `Tasa: ${(input.result.bracket.rate * 100).toFixed(2)}%`,
    `Excedente: ${moneyFormatter.format(input.result.excess)}`,
    "",
    `Cálculo: ${moneyFormatter.format(input.result.bracket.base)} + (${(input.result.bracket.rate * 100).toFixed(2)}% x ${moneyFormatter.format(input.result.excess)})`,
    "",
    `Impuesto anual estimado: ${moneyFormatter.format(input.result.tax)}`,
    `Valor por cuota (10 cuotas): ${moneyFormatter.format(input.result.tax / 10)}`,
  ].join("\n");
}
