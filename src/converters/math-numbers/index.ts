import { ConverterConfig } from "../types";

export const romanNumeral: ConverterConfig = {
  slug: "roman-numeral-converter",
  category: "math-numbers",
  icon: "🏛️",
  titleKey: "converter_roman_numeral_title",
  descriptionKey: "converter_roman_numeral_description",
  inputs: [
    { id: "number", type: "number", labelKey: "converter_roman_numeral_input_number", min: 1, max: 3999, step: 1, defaultValue: 2024 },
  ],
  calculate: (inputs) => {
    const num = Math.floor(Number(inputs.number) || 0);
    if (num < 1 || num > 3999) return [{ labelKey: "converter_roman_numeral_result", value: "-" }];
    const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";
    let remaining = num;
    for (let i = 0; i < vals.length; i++) {
      while (remaining >= vals[i]) { result += syms[i]; remaining -= vals[i]; }
    }
    return [{ labelKey: "converter_roman_numeral_result", value: result }];
  },
};

export const baseConverter: ConverterConfig = {
  slug: "number-base-converter",
  category: "math-numbers",
  icon: "🔢",
  titleKey: "converter_base_converter_title",
  descriptionKey: "converter_base_converter_description",
  inputs: [
    { id: "number", type: "number", labelKey: "converter_base_converter_input_decimal", min: 0, max: 2147483647, step: 1, defaultValue: 255 },
  ],
  calculate: (inputs) => {
    const num = Math.floor(Number(inputs.number) || 0);
    return [
      { labelKey: "converter_base_converter_binary", value: num.toString(2) },
      { labelKey: "converter_base_converter_octal", value: num.toString(8) },
      { labelKey: "converter_base_converter_decimal", value: num.toString(10) },
      { labelKey: "converter_base_converter_hex", value: num.toString(16).toUpperCase() },
    ];
  },
};

export const percentageCalc: ConverterConfig = {
  slug: "percentage-calculator",
  category: "math-numbers",
  icon: "%",
  titleKey: "converter_percentage_title",
  descriptionKey: "converter_percentage_description",
  inputs: [
    { id: "percent", type: "number", labelKey: "converter_percentage_percent", step: 0.1, defaultValue: 15 },
    { id: "total", type: "number", labelKey: "converter_percentage_of_value", step: 0.1, defaultValue: 200 },
  ],
  calculate: (inputs) => {
    const pct = Number(inputs.percent) || 0;
    const total = Number(inputs.total) || 0;
    const result = (pct / 100) * total;
    const inverse = total !== 0 ? (pct / total) * 100 : 0;
    return [
      { labelKey: "converter_percentage_result_value", value: Math.round(result * 1000) / 1000 },
      { labelKey: "converter_percentage_x_is_pct_of_y", value: `${Math.round(inverse * 100) / 100}%` },
      { labelKey: "converter_percentage_increase", value: Math.round((total + result) * 1000) / 1000 },
      { labelKey: "converter_percentage_decrease", value: Math.round((total - result) * 1000) / 1000 },
    ];
  },
};

export const fractionDecimal: ConverterConfig = {
  slug: "fraction-decimal-converter",
  category: "math-numbers",
  icon: "½",
  titleKey: "converter_fraction_decimal_title",
  descriptionKey: "converter_fraction_decimal_description",
  inputs: [
    { id: "numerator", type: "number", labelKey: "converter_fraction_decimal_numerator", step: 1, defaultValue: 3 },
    { id: "denominator", type: "number", labelKey: "converter_fraction_decimal_denominator", step: 1, defaultValue: 8, min: 1 },
  ],
  calculate: (inputs) => {
    const num = Number(inputs.numerator) || 0;
    const den = Number(inputs.denominator) || 1;
    if (den === 0) return [{ labelKey: "converter_fraction_decimal_result", value: "-" }];
    const decimal = num / den;
    const percentage = decimal * 100;
    // Simplify fraction
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
    const g = gcd(num, den);
    return [
      { labelKey: "converter_fraction_decimal_decimal", value: Math.round(decimal * 1000000) / 1000000 },
      { labelKey: "converter_fraction_decimal_percentage", value: `${Math.round(percentage * 100) / 100}%` },
      { labelKey: "converter_fraction_decimal_simplified", value: `${num / g}/${den / g}` },
    ];
  },
};

export const scientificNotation: ConverterConfig = {
  slug: "scientific-notation-converter",
  category: "math-numbers",
  icon: "🔬",
  titleKey: "converter_scientific_notation_title",
  descriptionKey: "converter_scientific_notation_description",
  inputs: [
    { id: "number", type: "text", labelKey: "converter_scientific_notation_input_number", defaultValue: "1500000" },
  ],
  calculate: (inputs) => {
    const val = parseFloat(String(inputs.number) || "0");
    if (isNaN(val)) return [{ labelKey: "converter_scientific_notation_result", value: "-" }];
    return [
      { labelKey: "converter_scientific_notation_scientific", value: val.toExponential() },
      { labelKey: "converter_scientific_notation_engineering", value: val.toExponential(3) },
      { labelKey: "converter_scientific_notation_decimal", value: val.toLocaleString("en", { maximumFractionDigits: 20 }) },
    ];
  },
};

export const gcdLcm: ConverterConfig = {
  slug: "gcd-lcm-calculator",
  category: "math-numbers",
  icon: "🧮",
  titleKey: "converter_gcd_lcm_title",
  descriptionKey: "converter_gcd_lcm_description",
  inputs: [
    { id: "a", type: "number", labelKey: "converter_gcd_lcm_number_a", min: 1, max: 999999, step: 1, defaultValue: 12 },
    { id: "b", type: "number", labelKey: "converter_gcd_lcm_number_b", min: 1, max: 999999, step: 1, defaultValue: 18 },
  ],
  calculate: (inputs) => {
    const a = Math.abs(Math.floor(Number(inputs.a) || 1));
    const b = Math.abs(Math.floor(Number(inputs.b) || 1));
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const g = gcd(a, b);
    const l = (a * b) / g;
    return [
      { labelKey: "converter_gcd_lcm_gcd", value: g },
      { labelKey: "converter_gcd_lcm_lcm", value: l },
    ];
  },
};

export const numberBase: ConverterConfig = {
  slug: "any-base-converter",
  category: "math-numbers",
  icon: "🔀",
  titleKey: "converter_any_base_title",
  descriptionKey: "converter_any_base_description",
  inputs: [
    { id: "number", type: "text", labelKey: "converter_any_base_input_value", defaultValue: "FF" },
    { id: "fromBase", type: "number", labelKey: "converter_any_base_from_base", min: 2, max: 36, step: 1, defaultValue: 16 },
    { id: "toBase", type: "number", labelKey: "converter_any_base_to_base", min: 2, max: 36, step: 1, defaultValue: 10 },
  ],
  calculate: (inputs) => {
    const numStr = String(inputs.number || "0");
    const fromBase = Math.floor(Number(inputs.fromBase) || 10);
    const toBase = Math.floor(Number(inputs.toBase) || 10);
    if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) return [{ labelKey: "converter_any_base_result", value: "-" }];
    const decimal = parseInt(numStr, fromBase);
    if (isNaN(decimal)) return [{ labelKey: "converter_any_base_result", value: "-" }];
    return [
      { labelKey: "converter_any_base_result", value: decimal.toString(toBase).toUpperCase() },
      { labelKey: "converter_base_converter_decimal", value: decimal },
    ];
  },
};

export const mathNumbersConverters = [romanNumeral, baseConverter, percentageCalc, fractionDecimal, scientificNotation, gcdLcm, numberBase];
