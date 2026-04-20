import { ConverterConfig } from "../types";

export const lifetimeHeartbeats: ConverterConfig = {
  slug: "lifetime-heartbeats",
  category: "fun",
  icon: "💓",
  titleKey: "converter_heartbeats_title",
  descriptionKey: "converter_heartbeats_description",
  inputs: [
    { id: "age", type: "number", labelKey: "converter_common_age", min: 0, max: 120, step: 1, defaultValue: 30 },
    { id: "bpm", type: "number", labelKey: "converter_heartbeats_avg_bpm", min: 40, max: 200, step: 1, defaultValue: 72 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age) || 0;
    const bpm = Number(inputs.bpm) || 72;
    const totalMinutes = age * 365.25 * 24 * 60;
    const heartbeats = totalMinutes * bpm;
    const remaining80 = Math.max(0, (80 - age) * 365.25 * 24 * 60 * bpm);
    return [
      { labelKey: "converter_heartbeats_total", value: Math.round(heartbeats).toLocaleString() },
      { labelKey: "converter_heartbeats_per_day", value: Math.round(bpm * 60 * 24).toLocaleString() },
      { labelKey: "converter_heartbeats_per_year", value: Math.round(bpm * 60 * 24 * 365.25).toLocaleString() },
      { labelKey: "converter_heartbeats_remaining_80", value: Math.round(remaining80).toLocaleString() },
    ];
  },
};

export const lifetimeBreaths: ConverterConfig = {
  slug: "lifetime-breaths",
  category: "fun",
  icon: "🌬️",
  titleKey: "converter_breaths_title",
  descriptionKey: "converter_breaths_description",
  inputs: [
    { id: "age", type: "number", labelKey: "converter_common_age", min: 0, max: 120, step: 1, defaultValue: 30 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age) || 0;
    const bpmAvg = 15; // average breaths per minute
    const totalMinutes = age * 365.25 * 24 * 60;
    const breaths = totalMinutes * bpmAvg;
    const litersOfAir = breaths * 0.5; // avg 0.5L per breath
    return [
      { labelKey: "converter_breaths_total", value: Math.round(breaths).toLocaleString() },
      { labelKey: "converter_breaths_per_day", value: Math.round(bpmAvg * 60 * 24).toLocaleString() },
      { labelKey: "converter_breaths_liters_of_air", value: Math.round(litersOfAir).toLocaleString(), unit: "L" },
      { labelKey: "converter_breaths_kg_of_air", value: Math.round(litersOfAir * 0.001225).toLocaleString(), unit: "kg" },
    ];
  },
};

export const hairGrowth: ConverterConfig = {
  slug: "hair-growth-calculator",
  category: "fun",
  icon: "💇",
  titleKey: "converter_hair_growth_title",
  descriptionKey: "converter_hair_growth_description",
  inputs: [
    { id: "months", type: "number", labelKey: "converter_hair_growth_months", min: 0, max: 120, step: 1, defaultValue: 6 },
  ],
  calculate: (inputs) => {
    const months = Number(inputs.months) || 0;
    const cmPerMonth = 1.25; // average hair growth
    const totalCm = months * cmPerMonth;
    const totalInches = totalCm / 2.54;
    return [
      { labelKey: "converter_hair_growth_growth_cm", value: Math.round(totalCm * 100) / 100, unit: "cm" },
      { labelKey: "converter_hair_growth_growth_inches", value: Math.round(totalInches * 100) / 100, unit: "in" },
      { labelKey: "converter_hair_growth_per_day", value: Math.round(cmPerMonth / 30 * 10000) / 10000, unit: "cm" },
    ];
  },
};

export const caffeineCalculator: ConverterConfig = {
  slug: "caffeine-calculator",
  category: "fun",
  icon: "☕",
  titleKey: "converter_caffeine_title",
  descriptionKey: "converter_caffeine_description",
  inputs: [
    { id: "drink", type: "select", labelKey: "converter_caffeine_drink_type", defaultValue: "coffee", options: [
      { value: "coffee", labelKey: "converter_caffeine_coffee" },
      { value: "espresso", labelKey: "converter_caffeine_espresso" },
      { value: "tea", labelKey: "converter_caffeine_tea" },
      { value: "energy_drink", labelKey: "converter_caffeine_energy_drink" },
      { value: "cola", labelKey: "converter_caffeine_cola" },
      { value: "matcha", labelKey: "converter_caffeine_matcha" },
    ]},
    { id: "cups", type: "number", labelKey: "converter_caffeine_cups_per_day", min: 0, max: 20, step: 0.5, defaultValue: 3 },
  ],
  calculate: (inputs) => {
    const drink = String(inputs.drink || "coffee");
    const cups = Number(inputs.cups) || 0;
    const mgPerCup: Record<string, number> = { coffee: 95, espresso: 63, tea: 47, energy_drink: 80, cola: 34, matcha: 70 };
    const mg = (mgPerCup[drink] || 95) * cups;
    const safeLimit = 400; // mg/day
    const percentage = (mg / safeLimit) * 100;
    return [
      { labelKey: "converter_caffeine_total_mg", value: Math.round(mg), unit: "mg" },
      { labelKey: "converter_caffeine_safe_limit", value: safeLimit, unit: "mg" },
      { labelKey: "converter_caffeine_percent_limit", value: Math.round(percentage), unit: "%" },
      { labelKey: "converter_caffeine_half_life", value: "5-6", unit: "common_hours" },
    ];
  },
};

export const typingSpeed: ConverterConfig = {
  slug: "typing-speed-converter",
  category: "fun",
  icon: "⌨️",
  titleKey: "converter_typing_speed_title",
  descriptionKey: "converter_typing_speed_description",
  inputs: [
    { id: "wpm", type: "number", labelKey: "converter_typing_speed_wpm", min: 0, max: 300, step: 1, defaultValue: 65 },
  ],
  calculate: (inputs) => {
    const wpm = Number(inputs.wpm) || 0;
    const cpm = wpm * 5;
    const wordsPerHour = wpm * 60;
    const pagesPerHour = wordsPerHour / 250;
    let level = "converter_typing_speed_beginner";
    if (wpm >= 80) level = "converter_typing_speed_professional";
    else if (wpm >= 60) level = "converter_typing_speed_advanced";
    else if (wpm >= 40) level = "converter_typing_speed_intermediate";
    return [
      { labelKey: "converter_typing_speed_cpm", value: cpm, unit: "CPM" },
      { labelKey: "converter_typing_speed_words_hour", value: wordsPerHour.toLocaleString() },
      { labelKey: "converter_typing_speed_pages_hour", value: Math.round(pagesPerHour * 10) / 10 },
      { labelKey: "converter_typing_speed_level", value: level },
    ];
  },
};

export const funConverters = [lifetimeHeartbeats, lifetimeBreaths, hairGrowth, caffeineCalculator, typingSpeed];
