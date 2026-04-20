"use client";

import { useCallback, useState } from "react";
import { InputField, SelectOption, UnitOption } from "@/converters/types";
import { localesProvider } from "@/lib/locales";
import { LocalesKey } from "@/lib/locales/generated-locales";

function translate(
  t: ReturnType<typeof localesProvider.lang>,
  key: LocalesKey,
): string {
  try {
    return t.v(key);
  } catch {
    return key;
  }
}

interface ConverterInputProps {
  field: InputField;
  value: string | number;
  onChange: (id: string, value: string | number) => void;
  lang: string;
  unitSystem?: string;
  selectedUnit?: UnitOption;
  onUnitChange?: (id: string, unit: UnitOption) => void;
}

const imperialUnits: Record<string, string> = { kg: "lb", cm: "in" };

export default function ConverterInput({
  field,
  value,
  onChange,
  lang,
  unitSystem,
  selectedUnit,
  onUnitChange,
}: ConverterInputProps) {
  const t = localesProvider.lang(lang);
  const label = translate(t, field.labelKey);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const val =
        field.type === "number" ? Number(e.target.value) : e.target.value;
      onChange(field.id, val);
    },
    [field.id, field.type, onChange],
  );

  const activeUnit =
    selectedUnit || (field.unitOptions ? field.unitOptions[0] : undefined);
  const step = activeUnit?.step ?? field.step;
  const min =
    field.min != null && activeUnit
      ? field.min / activeUnit.multiplier
      : field.min;
  const max =
    field.max != null && activeUnit
      ? field.max / activeUnit.multiplier
      : field.max;

  if (field.type === "select" && field.options) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
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

  if (field.type === "switcher" && field.options) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
        <div
          className="inline-flex w-full rounded-lg p-0.5"
          style={{ backgroundColor: "#2c2c2e" }}
        >
          {field.options.map((opt: SelectOption) => {
            const isActive = String(value) === opt.value;
            return (
              <div
                key={opt.value}
                role="button"
                tabIndex={0}
                onClick={() => onChange(field.id, opt.value)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onChange(field.id, opt.value);
                }}
                className="flex-1 cursor-pointer select-none rounded-md px-3 py-2 text-center text-sm font-medium"
                style={{
                  backgroundColor: isActive ? "#0a84ff" : "transparent",
                  color: isActive ? "#ffffff" : "#8e8e93",
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                }}
              >
                {translate(t, opt.labelKey)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
        <input
          type="date"
          value={value}
          onChange={handleChange}
          className="w-full"
        />
      </div>
    );
  }

  const hasUnits = !!(
    field.unitOptions &&
    field.unitOptions.length > 1 &&
    activeUnit &&
    onUnitChange
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-secondary">
          {label}
          {field.unit && !field.unitOptions && (
            <span className="ml-1 text-text-tertiary">
              (
              {unitSystem === "imperial" && imperialUnits[field.unit]
                ? imperialUnits[field.unit]
                : field.unit}
              )
            </span>
          )}
        </label>
        {hasUnits && (
          <UnitPills
            options={field.unitOptions!}
            selectedValue={activeUnit!.value}
            onSelect={(u) => onUnitChange!(field.id, u)}
            lang={lang}
          />
        )}
      </div>
      <input
        type={field.type === "number" ? "number" : "text"}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={field.placeholder}
      />
    </div>
  );
}

function UnitPills({
  options,
  selectedValue,
  onSelect,
  lang,
}: {
  options: UnitOption[];
  selectedValue: string;
  onSelect: (u: UnitOption) => void;
  lang: string;
}) {
  const t = localesProvider.lang(lang);
  const [localSelected, setLocalSelected] = useState(selectedValue);

  const handleTap = (opt: UnitOption) => {
    setLocalSelected(opt.value);
    onSelect(opt);
  };

  const active =
    selectedValue !== localSelected ? selectedValue : localSelected;

  return (
    <div
      className="inline-flex rounded-lg p-0.5"
      style={{ backgroundColor: "#2c2c2e" }}
    >
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <div
            key={opt.value}
            role="button"
            tabIndex={0}
            onClick={() => handleTap(opt)}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleTap(opt);
            }}
            className="cursor-pointer select-none rounded-md px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: isActive ? "#0a84ff" : "transparent",
              color: isActive ? "#ffffff" : "#8e8e93",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              minWidth: 44,
              minHeight: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {translate(t, opt.labelKey)}
          </div>
        );
      })}
    </div>
  );
}

interface ConverterResultProps {
  results: {
    labelKey: LocalesKey;
    value: string | number;
    unit?: LocalesKey;
  }[];
  lang: string;
  animate?: boolean;
}

export function ConverterResult({
  results,
  lang,
  animate,
}: ConverterResultProps) {
  if (results.length === 0) return null;
  const t = localesProvider.lang(lang);
  const useGrid = results.length >= 4;

  return (
    <div
      className={useGrid ? "grid grid-cols-2 gap-2" : "space-y-2"}
      aria-live="polite"
      aria-atomic="true"
      role="region"
      aria-label={localesProvider.lang(lang).common_results()}
    >
      {results.map((result, i) => {
        const label = translate(t, result.labelKey);
        const displayValue = String(result.value);
        const unit = result.unit ? translate(t, result.unit) : "";

        return (
          <div
            key={i}
            className={`rounded-2xl bg-surface-elevated/50 px-4 py-3 ${animate ? "result-updating" : ""} ${useGrid ? "" : "flex items-center justify-between"}`}
          >
            <span
              className={`text-text-secondary ${useGrid ? "text-xs block mb-0.5" : "text-sm"}`}
            >
              {label}
            </span>
            <span
              className={`result-value font-semibold text-accent ${useGrid ? "text-lg block" : "text-xl"}`}
            >
              {displayValue}
              {unit && (
                <span className="ml-1 text-sm font-normal text-text-tertiary">
                  {unit}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
