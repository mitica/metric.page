"use client";

import { useCallback } from "react";
import { InputField, SelectOption } from "@/converters/types";
import { localesProvider } from "@/lib/locales";
import { LocalesKey } from "@/lib/locales/generated-locales";

function translate(t: ReturnType<typeof localesProvider.lang>, key: string): string {
  try {
    return t.v(key as LocalesKey);
  } catch {
    return key;
  }
}

interface ConverterInputProps {
  field: InputField;
  value: string | number;
  onChange: (id: string, value: string | number) => void;
  lang: string;
}

export default function ConverterInput({ field, value, onChange, lang }: ConverterInputProps) {
  const t = localesProvider.lang(lang);
  const label = translate(t, field.labelKey);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val = field.type === "number" ? Number(e.target.value) : e.target.value;
      onChange(field.id, val);
    },
    [field.id, field.type, onChange]
  );

  if (field.type === "select" && field.options) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
        <select value={value} onChange={handleChange} className="w-full">
          {field.options.map((opt: SelectOption) => (
            <option key={opt.value} value={opt.value}>
              {translate(t, opt.labelKey)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
        <input type="date" value={value} onChange={handleChange} className="w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-secondary">
        {label}
        {field.unit && <span className="ml-1 text-text-tertiary">({field.unit})</span>}
      </label>
      <input
        type={field.type === "number" ? "number" : "text"}
        value={value}
        onChange={handleChange}
        min={field.min}
        max={field.max}
        step={field.step}
        placeholder={field.placeholder}
      />
    </div>
  );
}

interface ConverterResultProps {
  results: { labelKey: string; value: string | number; unit?: string }[];
  lang: string;
  animate?: boolean;
}

export function ConverterResult({ results, lang, animate }: ConverterResultProps) {
  if (results.length === 0) return null;
  const t = localesProvider.lang(lang);

  return (
    <div className="space-y-3">
      {results.map((result, i) => {
        const label = translate(t, result.labelKey);
        const displayValue = String(result.value);
        const unit = result.unit ? translate(t, result.unit) : "";

        return (
          <div
            key={i}
            className={`flex items-center justify-between rounded-2xl bg-surface-elevated/50 px-4 py-3 ${animate ? "result-updating" : ""}`}
          >
            <span className="text-sm text-text-secondary">{label}</span>
            <span className="result-value text-lg font-semibold text-accent">
              {displayValue}
              {unit && <span className="ml-1 text-sm font-normal text-text-tertiary">{unit}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}
