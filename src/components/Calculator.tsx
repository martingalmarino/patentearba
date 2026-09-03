"use client";

import { Calculator as CalculatorIcon, Info } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { FormEvent, ReactNode, useState } from "react";
import {
  TAX_BRACKETS,
  TAX_YEAR,
  VehicleType,
  ageFactor,
  calculateTax,
  describeCalculation,
  formatNumber,
  moneyFormatter,
  parseMoney,
} from "@/lib/calc";

type FieldErrors = {
  valuacion?: string;
  anio?: string;
  valorBase?: string;
};

type ResultState = {
  type: VehicleType;
  year: number;
  fiscalValue: number;
  usedFactor: boolean;
  marketValue?: number;
  age?: number;
  factor?: number;
  tax: number;
  excess: number;
  bracketName: string;
  detail: string;
};

export function Calculator() {
  const reduceMotion = useReducedMotion();
  const [type, setType] = useState<VehicleType>("auto");
  const [year, setYear] = useState("2022");
  const [valuacion, setValuacion] = useState("");
  const [useFactor, setUseFactor] = useState(false);
  const [valorBase, setValorBase] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<ResultState | null>(null);

  function onMoneyInput(
    value: string,
    setter: (next: string) => void,
  ) {
    const parsed = parseMoney(value);
    setter(Number.isFinite(parsed) ? formatNumber(parsed) : "");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    const yearNumber = Number(year);
    const fiscalInput = parseMoney(valuacion);
    const marketInput = parseMoney(valorBase);

    if (!Number.isFinite(yearNumber) || yearNumber < 1950 || yearNumber > TAX_YEAR) {
      nextErrors.anio = `Ingresá un año entre 1950 y ${TAX_YEAR}.`;
    }

    if (useFactor) {
      if (!Number.isFinite(marketInput) || marketInput <= 0) {
        nextErrors.valorBase = "Ingresá un valor de mercado estimado válido.";
      }
    } else if (!Number.isFinite(fiscalInput) || fiscalInput <= 0) {
      nextErrors.valuacion = "Ingresá la valuación fiscal oficial del vehículo.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setResult(null);
      return;
    }

    let fiscalValue = fiscalInput;
    let factorInfo = { age: 0, factor: 1 };

    if (useFactor) {
      factorInfo = ageFactor(yearNumber);
      fiscalValue = Math.round(marketInput * factorInfo.factor);
    }

    const calc = calculateTax(fiscalValue);
    setResult({
      type,
      year: yearNumber,
      fiscalValue,
      usedFactor: useFactor,
      marketValue: useFactor ? marketInput : undefined,
      age: useFactor ? factorInfo.age : undefined,
      factor: useFactor ? factorInfo.factor : undefined,
      tax: calc.tax,
      excess: calc.excess,
      bracketName: calc.bracket.name,
      detail: describeCalculation({
        type,
        year: yearNumber,
        fiscalValue,
        result: calc,
      }),
    });
  }

  function handleReset() {
    setType("auto");
    setYear("2022");
    setValuacion("");
    setUseFactor(false);
    setValorBase("");
    setErrors({});
    setResult(null);
  }

  return (
    <div className="calculator-panel rounded-[8px] bg-card p-5 md:p-7">
      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tipo de vehículo" htmlFor="tipo">
            <select
              id="tipo"
              value={type}
              onChange={(event) => setType(event.target.value as VehicleType)}
              className="field-input"
            >
              <option value="auto">Automóvil</option>
              <option value="moto">Motocicleta</option>
            </select>
          </Field>
          <Field label="Año del vehículo" htmlFor="anio" error={errors.anio}>
            <input
              id="anio"
              type="number"
              min={1950}
              max={TAX_YEAR}
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="field-input"
            />
          </Field>
        </div>

        <Field
          label={`Valuación fiscal ${TAX_YEAR}`}
          htmlFor="valuacion"
          hint="Usá el valor de la boleta o de ARBA, no el precio de venta."
          error={errors.valuacion}
        >
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted">
              $
            </span>
            <input
              id="valuacion"
              inputMode="numeric"
              placeholder="16.000.000"
              value={valuacion}
              onChange={(event) => onMoneyInput(event.target.value, setValuacion)}
              className="field-input field-input-money"
              disabled={useFactor}
            />
          </div>
        </Field>

        <details className="rounded-[8px] border border-line bg-background px-4 py-3">
          <summary className="cursor-pointer text-sm font-medium">
            Estimar por antigüedad si no tenés la valuación
          </summary>
          <div className="mt-4 grid gap-4">
            <label className="flex items-start gap-2 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={useFactor}
                onChange={(event) => setUseFactor(event.target.checked)}
                className="mt-0.5"
              />
              Aplicar un factor de 5% por año desde {TAX_YEAR}, con un piso del 30%.
            </label>
            <Field
              label="Valor de mercado estimado"
              htmlFor="valorBase"
              error={errors.valorBase}
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted">
                  $
                </span>
                <input
                  id="valorBase"
                  inputMode="numeric"
                  placeholder="18.000.000"
                  value={valorBase}
                  disabled={!useFactor}
                  onChange={(event) => onMoneyInput(event.target.value, setValorBase)}
                  className="field-input field-input-money"
                />
              </div>
            </Field>
          </div>
        </details>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover active:scale-[0.98]"
          >
            <CalculatorIcon size={18} />
            Calcular patente
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-11 items-center justify-center rounded-[8px] border border-line px-5 text-sm font-semibold text-foreground hover:bg-background active:scale-[0.98]"
          >
            Limpiar
          </button>
        </div>
      </form>

      <p className="mt-5 flex gap-2 text-sm leading-relaxed text-muted">
        <Info size={16} className="mt-0.5 shrink-0" />
        Estimación del impuesto base. ARBA puede aplicar descuentos, recargos o
        una valuación distinta.
      </p>

      <div className="mt-6" aria-live="polite">
        {result ? (
          <motion.div
            key="result"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 border-t border-line pt-6"
          >
              <p className="text-sm font-medium text-muted">
                Tramo: {result.bracketName}
              </p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Impuesto anual estimado
                </p>
                <p className="mt-1 font-mono text-4xl font-semibold tracking-tight text-accent md:text-5xl">
                  {moneyFormatter.format(result.tax)}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="border border-line bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Por cuota (10)
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold">
                    {moneyFormatter.format(result.tax / 10)}
                  </p>
                </div>
                <div className="border border-line bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Ahorro pago anual*
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold">
                    {moneyFormatter.format(result.tax * 0.1)}
                  </p>
                </div>
              </div>
              <details className="text-sm">
                <summary className="cursor-pointer font-medium">
                  Ver detalle del cálculo
                </summary>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-[8px] bg-background p-4 font-mono text-xs leading-relaxed text-ink-soft">
                  {result.detail}
                  {result.usedFactor
                    ? `\n\nValor de mercado: ${moneyFormatter.format(result.marketValue ?? 0)}\nAntigüedad: ${result.age} año(s)\nFactor aplicado: ${Math.round((result.factor ?? 1) * 100)}%\nEsta valuación es aproximada.`
                    : ""}
                </pre>
              </details>
              <p className="text-xs text-muted">
                *Ahorro ilustrativo del 10% por pago anual, sujeto al calendario
                vigente de ARBA.
              </p>
            </motion.div>
          ) : (
            <p className="border-t border-line pt-6 text-sm text-muted">
              El resultado va a aparecer acá después de calcular.
            </p>
          )}
      </div>

      <details className="mt-6 text-sm">
        <summary className="cursor-pointer font-medium">
          Tabla de tramos {TAX_YEAR}
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border border-line text-left text-sm">
            <thead className="bg-accent text-white">
              <tr>
                <th className="px-3 py-2 font-medium">Valuación fiscal</th>
                <th className="px-3 py-2 font-medium">Cálculo</th>
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS.map((bracket) => (
                <tr key={bracket.name} className="border-t border-line">
                  <td className="px-3 py-2">{bracket.name}</td>
                  <td className="px-3 py-2">
                    {bracket.base === 0
                      ? `${bracket.rate * 100}% del valor`
                      : `${moneyFormatter.format(bracket.base)} + ${
                          bracket.rate * 100
                        }% del excedente`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs leading-relaxed text-muted">{hint}</p> : null}
      {error ? (
        <p className="text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
