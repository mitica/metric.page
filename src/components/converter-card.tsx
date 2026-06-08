"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { ConverterConfig, ResultField, UnitOption } from "@/converters/types";
import ConverterInput, { ConverterResult } from "./converter-input";
import ShareButton from "./share-button";
import { addRecent } from "@/lib/recents";
import { localesProvider } from "@/lib/locales";

interface ConverterCardProps {
  converter: ConverterConfig;
  lang: string;
  isFullPage?: boolean;
}

function applyUnits(values: Record<string, string | number>, units: Record<string, UnitOption>, converter: ConverterConfig): Record<string, string | number> {
  const converted = { ...values };
  for (const input of converter.inputs) {
    const unit = units[input.id];
    if (unit && unit.multiplier !== 1) {
      converted[input.id] = Number(converted[input.id]) * unit.multiplier;
    }
  }
  return converted;
}

export default function ConverterCard({ converter, lang }: ConverterCardProps) {
  const t = localesProvider.lang(lang);

  const initialValues = useMemo(() => {
    const vals: Record<string, string | number> = {};
    for (const input of converter.inputs) {
      vals[input.id] = input.defaultValue ?? "";
    }
    return vals;
  }, [converter.inputs]);

  const initialUnits = useMemo(() => {
    const u: Record<string, UnitOption> = {};
    for (const input of converter.inputs) {
      if (input.unitOptions) u[input.id] = input.unitOptions[0];
    }
    return u;
  }, [converter.inputs]);

  const initialResults = useMemo(() => {
    try {
      return converter.calculate(initialValues);
    } catch {
      return [];
    }
  }, [converter, initialValues]);

  const [values, setValues] = useState(initialValues);
  const [selectedUnits, setSelectedUnits] = useState(initialUnits);
  const [results, setResults] = useState<ResultField[]>(initialResults);
  const [animate, setAnimate] = useState(false);

  // Use refs to avoid stale closures
  const valuesRef = useRef(values);
  valuesRef.current = values;
  const unitsRef = useRef(selectedUnits);
  unitsRef.current = selectedUnits;

  const doCalculate = useCallback(
    (displayValues: Record<string, string | number>, units: Record<string, UnitOption>) => {
      try {
        const converted = applyUnits(displayValues, units, converter);
        const r = converter.calculate(converted);
        setResults(r);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
        addRecent(converter.slug);
      } catch {
        setResults([]);
      }
    },
    [converter]
  );

  const handleChange = useCallback(
    (id: string, value: string | number) => {
      const next = { ...valuesRef.current, [id]: value };
      setValues(next);
      doCalculate(next, unitsRef.current);
    },
    [doCalculate]
  );

  const handleUnitChange = useCallback(
    (id: string, newUnit: UnitOption) => {
      const oldUnit = unitsRef.current[id];
      const nextUnits = { ...unitsRef.current, [id]: newUnit };
      setSelectedUnits(nextUnits);

      // Convert the display value to the new unit
      const oldValue = Number(valuesRef.current[id]) || 0;
      const baseValue = oldValue * (oldUnit?.multiplier ?? 1);
      const newValue = Math.round((baseValue / newUnit.multiplier) * 1000) / 1000;
      const nextValues = { ...valuesRef.current, [id]: newValue };
      setValues(nextValues);
      doCalculate(nextValues, nextUnits);
    },
    [doCalculate]
  );

  const title = t.v(converter.titleKey);
  const description = t.v(converter.descriptionKey);

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      {/* Header */}
      <div className="relative mb-6 text-center">
        <span className="text-4xl" role="img" aria-label={title}>
          {converter.icon}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-text-primary">{title}</h1>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
        <div className="absolute right-0 top-0">
          <ShareButton title={title} text={description} lang={lang} />
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        {converter.inputs.map((field) => (
          <ConverterInput
            key={field.id}
            field={field}
            value={values[field.id]}
            onChange={handleChange}
            lang={lang}
            unitSystem={values.unitSystem as string | undefined}
            selectedUnit={selectedUnits[field.id]}
            onUnitChange={handleUnitChange}
          />
        ))}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <span aria-hidden className="h-4 w-1 rounded-full bg-accent" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
              {t.common_results()}
            </h2>
          </div>
          <ConverterResult results={results} lang={lang} animate={animate} />
        </div>
      )}

      <hr className="mt-8 border-border/50" />
    </div>
  );
}
