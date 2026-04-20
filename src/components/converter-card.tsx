"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { ConverterConfig, ResultField } from "@/converters/types";
import ConverterInput, { ConverterResult } from "./converter-input";
import { addRecent } from "@/lib/recents";
import { localesProvider } from "@/lib/locales";
import Link from "next/link";

interface ConverterCardProps {
  converter: ConverterConfig;
  lang: string;
  isFullPage?: boolean;
}

export default function ConverterCard({ converter, lang, isFullPage }: ConverterCardProps) {
  const t = localesProvider.lang(lang);

  const initialValues = useMemo(() => {
    const vals: Record<string, string | number> = {};
    for (const input of converter.inputs) {
      vals[input.id] = input.defaultValue ?? "";
    }
    return vals;
  }, [converter.inputs]);

  const [values, setValues] = useState(initialValues);
  const [results, setResults] = useState<ResultField[]>([]);
  const [animate, setAnimate] = useState(false);

  // Calculate on initial load
  useEffect(() => {
    try {
      const r = converter.calculate(initialValues);
      setResults(r);
    } catch {
      setResults([]);
    }
  }, [converter, initialValues]);

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

  const content = (
    <>
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="text-4xl" role="img" aria-label={title}>
          {converter.icon}
        </span>
        <h2 className={`mt-3 font-bold text-text-primary ${isFullPage ? "text-2xl" : "text-xl"}`}>
          {title}
        </h2>
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
    </>
  );

  if (isFullPage) {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-8">
        {content}
      </div>
    );
  }

  return (
    <div className="feed-card flex items-center justify-center p-4">
      <div className="glass-card relative w-full max-w-lg p-6">
        {content}
        <Link
          href={`/${lang}/${converter.slug}/`}
          className="mt-4 flex items-center justify-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
        >
          {t.common_open()}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
