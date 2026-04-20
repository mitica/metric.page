import { ConverterConfig } from "../types";

export const shoeSize: ConverterConfig = {
  slug: "shoe-size-converter",
  category: "everyday",
  icon: "👟",
  titleKey: "converter_shoe_size_title",
  descriptionKey: "converter_shoe_size_description",
  inputs: [
    { id: "gender", type: "switcher", labelKey: "converter_common_gender", defaultValue: "male", options: [
      { value: "male", labelKey: "converter_common_male" },
      { value: "female", labelKey: "converter_common_female" },
    ]},
    { id: "usSize", type: "number", labelKey: "converter_shoe_size_us_size", min: 1, max: 20, step: 0.5, defaultValue: 10 },
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender || "male");
    const us = Number(inputs.usSize) || 10;
    // US to other systems
    const eu = gender === "male" ? us + 33 : us + 31;
    const uk = gender === "male" ? us - 0.5 : us - 2;
    const cm = gender === "male" ? (us + 18) * 0.847 + 9.5 : (us + 18.5) * 0.847 + 7.5;
    const jp = Math.round(cm * 10) / 10;
    return [
      { labelKey: "converter_shoe_size_us", value: us },
      { labelKey: "converter_shoe_size_eu", value: eu },
      { labelKey: "converter_shoe_size_uk", value: uk },
      { labelKey: "converter_shoe_size_jp_cm", value: jp, unit: "cm" },
    ];
  },
};

export const clothingSize: ConverterConfig = {
  slug: "clothing-size-converter",
  category: "everyday",
  icon: "👕",
  titleKey: "converter_clothing_size_title",
  descriptionKey: "converter_clothing_size_description",
  inputs: [
    { id: "size", type: "select", labelKey: "converter_clothing_size_us_size", defaultValue: "M", options: [
      { value: "XS", labelKey: "XS" },
      { value: "S", labelKey: "S" },
      { value: "M", labelKey: "M" },
      { value: "L", labelKey: "L" },
      { value: "XL", labelKey: "XL" },
      { value: "XXL", labelKey: "XXL" },
    ]},
  ],
  calculate: (inputs) => {
    const size = String(inputs.size || "M");
    const map: Record<string, { eu: string; uk: string; it: string; chest: string }> = {
      XS: { eu: "44", uk: "34", it: "44", chest: "86-91 cm" },
      S: { eu: "46-48", uk: "36-38", it: "46-48", chest: "91-96 cm" },
      M: { eu: "48-50", uk: "38-40", it: "48-50", chest: "96-101 cm" },
      L: { eu: "50-52", uk: "40-42", it: "50-52", chest: "101-107 cm" },
      XL: { eu: "52-54", uk: "42-44", it: "52-54", chest: "107-112 cm" },
      XXL: { eu: "54-56", uk: "44-46", it: "54-56", chest: "112-117 cm" },
    };
    const m = map[size] || map.M;
    return [
      { labelKey: "converter_clothing_size_us_uk_result", value: `US: ${size}` },
      { labelKey: "converter_clothing_size_eu", value: m.eu },
      { labelKey: "converter_clothing_size_uk", value: m.uk },
      { labelKey: "converter_clothing_size_it", value: m.it },
      { labelKey: "converter_clothing_size_chest", value: m.chest },
    ];
  },
};

export const cookingMeasure: ConverterConfig = {
  slug: "cooking-measurement-converter",
  category: "everyday",
  icon: "🍳",
  titleKey: "converter_cooking_title",
  descriptionKey: "converter_cooking_description",
  inputs: [
    { id: "value", type: "number", labelKey: "converter_cooking_input_value", min: 0, step: 0.25, defaultValue: 1 },
    { id: "unit", type: "select", labelKey: "converter_cooking_input_unit", defaultValue: "cup", options: [
      { value: "cup", labelKey: "converter_cooking_cup" },
      { value: "tbsp", labelKey: "converter_cooking_tbsp" },
      { value: "tsp", labelKey: "converter_cooking_tsp" },
      { value: "ml", labelKey: "converter_cooking_ml" },
      { value: "fl_oz", labelKey: "converter_cooking_fl_oz" },
    ]},
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value) || 0;
    const unit = String(inputs.unit || "cup");
    const toMl: Record<string, number> = { cup: 236.588, tbsp: 14.787, tsp: 4.929, ml: 1, fl_oz: 29.574 };
    const ml = value * (toMl[unit] || 1);
    return [
      { labelKey: "converter_cooking_ml", value: Math.round(ml * 100) / 100, unit: "ml" },
      { labelKey: "converter_cooking_cup", value: Math.round((ml / toMl.cup) * 1000) / 1000 },
      { labelKey: "converter_cooking_tbsp", value: Math.round((ml / toMl.tbsp) * 100) / 100 },
      { labelKey: "converter_cooking_tsp", value: Math.round((ml / toMl.tsp) * 100) / 100 },
      { labelKey: "converter_cooking_fl_oz", value: Math.round((ml / toMl.fl_oz) * 100) / 100, unit: "fl oz" },
    ];
  },
};

export const readingTime: ConverterConfig = {
  slug: "reading-time-estimator",
  category: "everyday",
  icon: "📖",
  titleKey: "converter_reading_time_title",
  descriptionKey: "converter_reading_time_description",
  inputs: [
    { id: "wordCount", type: "number", labelKey: "converter_reading_time_word_count", min: 0, step: 100, defaultValue: 2500 },
    { id: "speed", type: "select", labelKey: "converter_reading_time_speed", defaultValue: "average", options: [
      { value: "slow", labelKey: "converter_reading_time_slow" },
      { value: "average", labelKey: "converter_reading_time_average" },
      { value: "fast", labelKey: "converter_reading_time_fast" },
    ]},
  ],
  calculate: (inputs) => {
    const words = Number(inputs.wordCount) || 0;
    const speed = String(inputs.speed || "average");
    const wpm: Record<string, number> = { slow: 150, average: 238, fast: 350 };
    const rate = wpm[speed] || 238;
    const minutes = words / rate;
    const speakingMinutes = words / 130;
    return [
      { labelKey: "converter_reading_time_result", value: Math.ceil(minutes), unit: "common_minutes" },
      { labelKey: "converter_reading_time_speaking_time", value: Math.ceil(speakingMinutes), unit: "common_minutes" },
      { labelKey: "converter_reading_time_pages", value: Math.ceil(words / 250) },
    ];
  },
};

export const fuelEfficiency: ConverterConfig = {
  slug: "fuel-efficiency-converter",
  category: "everyday",
  icon: "⛽",
  titleKey: "converter_fuel_efficiency_title",
  descriptionKey: "converter_fuel_efficiency_description",
  inputs: [
    { id: "value", type: "number", labelKey: "converter_fuel_efficiency_input_value", min: 0, step: 0.1, defaultValue: 8 },
    { id: "unit", type: "select", labelKey: "converter_fuel_efficiency_input_unit", defaultValue: "l100km", options: [
      { value: "l100km", labelKey: "converter_fuel_efficiency_l_100km" },
      { value: "mpg_us", labelKey: "converter_fuel_efficiency_mpg_us" },
      { value: "mpg_uk", labelKey: "converter_fuel_efficiency_mpg_uk" },
      { value: "kml", labelKey: "converter_fuel_efficiency_km_l" },
    ]},
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value) || 0;
    const unit = String(inputs.unit || "l100km");
    let l100km: number;
    switch (unit) {
      case "mpg_us": l100km = value > 0 ? 235.215 / value : 0; break;
      case "mpg_uk": l100km = value > 0 ? 282.481 / value : 0; break;
      case "kml": l100km = value > 0 ? 100 / value : 0; break;
      default: l100km = value;
    }
    if (l100km <= 0) return [{ labelKey: "converter_fuel_efficiency_result", value: "-" }];
    return [
      { labelKey: "converter_fuel_efficiency_l_100km", value: Math.round(l100km * 100) / 100, unit: "L/100km" },
      { labelKey: "converter_fuel_efficiency_mpg_us", value: Math.round(235.215 / l100km * 100) / 100, unit: "mpg (US)" },
      { labelKey: "converter_fuel_efficiency_mpg_uk", value: Math.round(282.481 / l100km * 100) / 100, unit: "mpg (UK)" },
      { labelKey: "converter_fuel_efficiency_km_l", value: Math.round(100 / l100km * 100) / 100, unit: "km/L" },
    ];
  },
};

export const electricityCost: ConverterConfig = {
  slug: "electricity-cost-calculator",
  category: "everyday",
  icon: "🔌",
  titleKey: "converter_electricity_cost_title",
  descriptionKey: "converter_electricity_cost_description",
  inputs: [
    { id: "watts", type: "number", labelKey: "converter_electricity_cost_watts", min: 0, step: 10, defaultValue: 1000, unit: "W" },
    { id: "hoursPerDay", type: "number", labelKey: "converter_electricity_cost_hours_per_day", min: 0, max: 24, step: 0.5, defaultValue: 8 },
    { id: "pricePerKwh", type: "number", labelKey: "converter_electricity_cost_price_kwh", min: 0, step: 0.01, defaultValue: 0.12 },
  ],
  calculate: (inputs) => {
    const watts = Number(inputs.watts) || 0;
    const hpd = Number(inputs.hoursPerDay) || 0;
    const price = Number(inputs.pricePerKwh) || 0;
    const kwhPerDay = (watts * hpd) / 1000;
    const dailyCost = kwhPerDay * price;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    return [
      { labelKey: "converter_electricity_cost_kwh_day", value: Math.round(kwhPerDay * 100) / 100, unit: "kWh" },
      { labelKey: "converter_electricity_cost_daily_cost", value: Math.round(dailyCost * 100) / 100 },
      { labelKey: "converter_electricity_cost_monthly_cost", value: Math.round(monthlyCost * 100) / 100 },
      { labelKey: "converter_electricity_cost_yearly_cost", value: Math.round(yearlyCost * 100) / 100 },
    ];
  },
};

export const paperSize: ConverterConfig = {
  slug: "paper-size-reference",
  category: "everyday",
  icon: "📄",
  titleKey: "converter_paper_size_title",
  descriptionKey: "converter_paper_size_description",
  inputs: [
    { id: "size", type: "select", labelKey: "converter_paper_size_select_size", defaultValue: "A4", options: [
      { value: "A0", labelKey: "A0" },
      { value: "A1", labelKey: "A1" },
      { value: "A2", labelKey: "A2" },
      { value: "A3", labelKey: "A3" },
      { value: "A4", labelKey: "A4" },
      { value: "A5", labelKey: "A5" },
      { value: "A6", labelKey: "A6" },
      { value: "Letter", labelKey: "Letter" },
      { value: "Legal", labelKey: "Legal" },
      { value: "Tabloid", labelKey: "Tabloid" },
    ]},
  ],
  calculate: (inputs) => {
    const size = String(inputs.size || "A4");
    const sizes: Record<string, { mm: [number, number]; in: [number, number] }> = {
      A0: { mm: [841, 1189], in: [33.1, 46.8] },
      A1: { mm: [594, 841], in: [23.4, 33.1] },
      A2: { mm: [420, 594], in: [16.5, 23.4] },
      A3: { mm: [297, 420], in: [11.7, 16.5] },
      A4: { mm: [210, 297], in: [8.3, 11.7] },
      A5: { mm: [148, 210], in: [5.8, 8.3] },
      A6: { mm: [105, 148], in: [4.1, 5.8] },
      Letter: { mm: [216, 279], in: [8.5, 11] },
      Legal: { mm: [216, 356], in: [8.5, 14] },
      Tabloid: { mm: [279, 432], in: [11, 17] },
    };
    const s = sizes[size] || sizes.A4;
    return [
      { labelKey: "converter_paper_size_mm", value: `${s.mm[0]} × ${s.mm[1]}`, unit: "mm" },
      { labelKey: "converter_paper_size_inches", value: `${s.in[0]} × ${s.in[1]}`, unit: "in" },
      { labelKey: "converter_paper_size_cm", value: `${(s.mm[0] / 10).toFixed(1)} × ${(s.mm[1] / 10).toFixed(1)}`, unit: "cm" },
    ];
  },
};

export const runningPace: ConverterConfig = {
  slug: "running-pace-converter",
  category: "everyday",
  icon: "🏃",
  titleKey: "converter_running_pace_title",
  descriptionKey: "converter_running_pace_description",
  inputs: [
    { id: "minutes", type: "number", labelKey: "converter_running_pace_minutes", min: 0, max: 59, step: 1, defaultValue: 5 },
    { id: "seconds", type: "number", labelKey: "converter_running_pace_seconds", min: 0, max: 59, step: 1, defaultValue: 30 },
    { id: "unit", type: "switcher", labelKey: "converter_running_pace_pace_unit", defaultValue: "km", options: [
      { value: "km", labelKey: "converter_running_pace_per_km" },
      { value: "mile", labelKey: "converter_running_pace_per_mile" },
    ]},
  ],
  calculate: (inputs) => {
    const min = Number(inputs.minutes) || 0;
    const sec = Number(inputs.seconds) || 0;
    const unit = String(inputs.unit || "km");
    const totalSec = min * 60 + sec;
    let secPerKm: number, secPerMile: number;
    if (unit === "km") { secPerKm = totalSec; secPerMile = totalSec * 1.60934; }
    else { secPerMile = totalSec; secPerKm = totalSec / 1.60934; }
    const kmH = secPerKm > 0 ? 3600 / secPerKm : 0;
    const mph = secPerMile > 0 ? 3600 / secPerMile : 0;
    const fmtPace = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
    const fiveKTime = secPerKm * 5;
    const tenKTime = secPerKm * 10;
    const marathonTime = secPerKm * 42.195;
    const fmtTime = (s: number) => {
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sc = Math.round(s % 60);
      return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sc).padStart(2, "0")}` : `${m}:${String(sc).padStart(2, "0")}`;
    };
    return [
      { labelKey: "converter_running_pace_per_km", value: fmtPace(secPerKm), unit: "min/km" },
      { labelKey: "converter_running_pace_per_mile", value: fmtPace(secPerMile), unit: "min/mi" },
      { labelKey: "converter_running_pace_speed_kmh", value: Math.round(kmH * 100) / 100, unit: "km/h" },
      { labelKey: "converter_running_pace_speed_mph", value: Math.round(mph * 100) / 100, unit: "mph" },
      { labelKey: "converter_running_pace_five_k", value: fmtTime(fiveKTime) },
      { labelKey: "converter_running_pace_ten_k", value: fmtTime(tenKTime) },
      { labelKey: "converter_running_pace_marathon", value: fmtTime(marathonTime) },
    ];
  },
};

export const everydayConverters = [shoeSize, clothingSize, cookingMeasure, readingTime, fuelEfficiency, electricityCost, paperSize, runningPace];
