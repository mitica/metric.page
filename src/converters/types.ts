import { LocalesKey } from "@/lib/locales/generated-locales";

export type InputType = "number" | "select" | "switcher" | "date" | "time" | "text";

export interface SelectOption {
  value: string;
  labelKey: LocalesKey;
}

export interface UnitOption {
  value: string;
  labelKey: LocalesKey;
  multiplier: number; // multiply display value by this to get base unit value
  step?: number;
}

export interface InputField {
  id: string;
  type: InputType;
  labelKey: LocalesKey;
  placeholder?: LocalesKey;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
  unit?: LocalesKey;
  unitOptions?: UnitOption[];
  options?: SelectOption[];
}

export interface ResultField {
  labelKey: LocalesKey;
  value: string | number;
  unit?: LocalesKey;
  description?: LocalesKey;
}

export type CalculateFn = (inputs: Record<string, string | number>) => ResultField[];

export type Category =
  | "animal-age"
  | "health"
  | "space-science"
  | "date-time"
  | "math-numbers"
  | "digital-tech"
  | "finance"
  | "everyday"
  | "fun";

export interface ConverterConfig {
  slug: string;
  category: Category;
  icon: string;
  titleKey: LocalesKey;
  descriptionKey: LocalesKey;
  inputs: InputField[];
  calculate: CalculateFn;
  keywords?: string[];
  faqKeys?: string[];
}

export const categoryMeta: Record<Category, { icon: string; labelKey: LocalesKey; order: number }> = {
  "animal-age": { icon: "🐾", labelKey: "category_animal_age", order: 0 },
  health: { icon: "💪", labelKey: "category_health", order: 1 },
  "space-science": { icon: "🚀", labelKey: "category_space_science", order: 2 },
  "date-time": { icon: "📅", labelKey: "category_date_time", order: 3 },
  "math-numbers": { icon: "🔢", labelKey: "category_math_numbers", order: 4 },
  "digital-tech": { icon: "💻", labelKey: "category_digital_tech", order: 5 },
  finance: { icon: "💰", labelKey: "category_finance", order: 6 },
  everyday: { icon: "🏠", labelKey: "category_everyday", order: 7 },
  fun: { icon: "🎉", labelKey: "category_fun", order: 8 },
};
