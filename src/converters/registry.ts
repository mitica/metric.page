import { ConverterConfig } from "./types";
import { animalAgeConverters } from "./animal-age";
import { healthConverters } from "./health";
import { spaceScienceConverters } from "./space-science";
import { dateTimeConverters } from "./date-time";
import { mathNumbersConverters } from "./math-numbers";
import { digitalTechConverters } from "./digital-tech";
import { financeConverters } from "./finance";
import { everydayConverters } from "./everyday";
import { funConverters } from "./fun";

export const allConverters: ConverterConfig[] = [
  ...animalAgeConverters,
  ...healthConverters,
  ...spaceScienceConverters,
  ...dateTimeConverters,
  ...mathNumbersConverters,
  ...digitalTechConverters,
  ...financeConverters,
  ...everydayConverters,
  ...funConverters,
];

const converterMap = new Map<string, ConverterConfig>();
for (const converter of allConverters) {
  converterMap.set(converter.slug, converter);
}

export function getConverter(slug: string): ConverterConfig | undefined {
  return converterMap.get(slug);
}

export function getAllSlugs(): string[] {
  return allConverters.map((c) => c.slug);
}

export function getConvertersByCategory(category: string): ConverterConfig[] {
  return allConverters.filter((c) => c.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(allConverters.map((c) => c.category))];
}
