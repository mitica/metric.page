"use client";

import { useState, useCallback, useMemo } from "react";
import { ConverterConfig, ResultField } from "@/converters/types";
import ConverterInput, { ConverterResult } from "./converter-input";
import { addRecent } from "@/lib/recents";
import { localesProvider } from "@/lib/locales";

interface ConverterCardProps {
  converter: ConverterConfig;
  lang: string;
  isFullPage?: boolean;
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

  const initialResults = useMemo(() => {
    try {
      return converter.calculate(initialValues);
    } catch {
      return [];
    }
  }, [converter, initialValues]);

  const [values, setValues] = useState(initialValues);
  const [results, setResults] = useState<ResultField[]>(initialResults);
  const [animate, setAnimate] = useState(false);

  const handleChange = useCallback(
    (id: string, value: string | number) => {
      const newValues = { ...values, [id]: value };
      setValues(newValues);
      try {
        const r = converter.calculate(newValues);
        setResults(r);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
        addRecent(converter.slug);
      } catch {
        setResults([]);
      }
    },
    [values, converter]
  );

  const title = t.v(converter.titleKey);
  const description = t.v(converter.descriptionKey);

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="text-4xl" role="img" aria-label={title}>
          {converter.icon}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-text-primary">{title}</h1>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
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
          />
        ))}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {t.common_results()}
          </div>
          <ConverterResult results={results} lang={lang} animate={animate} />
        </div>
      )}

      <hr className="mt-8 border-border/50" />
    </div>
  );
}
