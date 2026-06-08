"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ConverterConfig, ResultField, UnitOption, InputField, CalculateFn } from "@/converters/types";
import ConverterInput, { ConverterResult } from "./converter-input";
import ShareButton from "./share-button";
import { addRecent } from "@/lib/recents";
import { localesProvider } from "@/lib/locales";
import { toolRegistry } from "./tools";

interface ConverterCardProps {
  converter: ConverterConfig;
  lang: string;
  isFullPage?: boolean;
}

function applyUnits(
  values: Record<string, string | number>,
  units: Record<string, UnitOption>,
  inputs: InputField[],
): Record<string, string | number> {
  const converted = { ...values };
  for (const input of inputs) {
    const unit = units[input.id];
    if (unit && unit.multiplier !== 1) {
      converted[input.id] = Number(converted[input.id]) * unit.multiplier;
    }
  }
  return converted;
}

export default function ConverterCard({ converter, lang }: ConverterCardProps) {
  const t = localesProvider.lang(lang);
  const title = t.v(converter.titleKey);
  const description = t.v(converter.descriptionKey);

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
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

      {converter.tool ? (
        <ToolBody converter={converter} lang={lang} />
      ) : (
        <ConverterBody converter={converter} lang={lang} />
      )}

      <hr className="mt-8 border-border/50" />
    </div>
  );
}

function ToolBody({ converter, lang }: { converter: ConverterConfig; lang: string }) {
  const Tool = toolRegistry[converter.tool!];
  useEffect(() => {
    addRecent(converter.slug);
  }, [converter.slug]);
  return <Tool lang={lang} />;
}

function ConverterBody({ converter, lang }: { converter: ConverterConfig; lang: string }) {
  const t = localesProvider.lang(lang);
  const inputs = converter.inputs as InputField[];
  const calculate = converter.calculate as CalculateFn;

  const initialValues = useMemo(() => {
    const vals: Record<string, string | number> = {};
    for (const input of inputs) {
      vals[input.id] = input.defaultValue ?? "";
    }
    return vals;
  }, [inputs]);

  const initialUnits = useMemo(() => {
    const u: Record<string, UnitOption> = {};
    for (const input of inputs) {
      if (input.unitOptions) u[input.id] = input.unitOptions[0];
    }
    return u;
  }, [inputs]);

  const initialResults = useMemo(() => {
    try {
      return calculate(initialValues);
    } catch {
      return [];
    }
  }, [calculate, initialValues]);

  const [values, setValues] = useState(initialValues);
  const [selectedUnits, setSelectedUnits] = useState(initialUnits);
  const [results, setResults] = useState<ResultField[]>(initialResults);
  const [animate, setAnimate] = useState(false);

  const valuesRef = useRef(values);
  valuesRef.current = values;
  const unitsRef = useRef(selectedUnits);
  unitsRef.current = selectedUnits;

  const doCalculate = useCallback(
    (displayValues: Record<string, string | number>, units: Record<string, UnitOption>) => {
      try {
        const converted = applyUnits(displayValues, units, inputs);
        const r = calculate(converted);
        setResults(r);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
        addRecent(converter.slug);
      } catch {
        setResults([]);
      }
    },
    [calculate, inputs, converter.slug],
  );

  const handleChange = useCallback(
    (id: string, value: string | number) => {
      const next = { ...valuesRef.current, [id]: value };
      setValues(next);
      doCalculate(next, unitsRef.current);
    },
    [doCalculate],
  );

  const handleUnitChange = useCallback(
    (id: string, newUnit: UnitOption) => {
      const oldUnit = unitsRef.current[id];
      const nextUnits = { ...unitsRef.current, [id]: newUnit };
      setSelectedUnits(nextUnits);

      const oldValue = Number(valuesRef.current[id]) || 0;
      const baseValue = oldValue * (oldUnit?.multiplier ?? 1);
      const newValue = Math.round((baseValue / newUnit.multiplier) * 1000) / 1000;
      const nextValues = { ...valuesRef.current, [id]: newValue };
      setValues(nextValues);
      doCalculate(nextValues, nextUnits);
    },
    [doCalculate],
  );

  return (
    <>
      <div className="space-y-4">
        {inputs.map((field) => (
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
    </>
  );
}
