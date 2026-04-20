import { LocalesKey } from "@/lib/locales/generated-locales";
import { ConverterConfig, InputField } from "../types";

// Conversion helpers
const lbToKg = (lb: number) => lb * 0.453592;
const inToCm = (inches: number) => inches * 2.54;
const kgToLb = (kg: number) => kg / 0.453592;

const unitSystemInput: InputField = {
  id: "unitSystem",
  type: "switcher",
  labelKey: "common_units",
  defaultValue: "metric",
  options: [
    { value: "metric", labelKey: "common_metric" },
    { value: "imperial", labelKey: "common_imperial" },
  ],
};

function getWeight(inputs: Record<string, string | number>): number {
  const v = Number(inputs.weight) || 0;
  return inputs.unitSystem === "imperial" ? lbToKg(v) : v;
}

function getHeight(inputs: Record<string, string | number>): number {
  const v = Number(inputs.height) || 0;
  return inputs.unitSystem === "imperial" ? inToCm(v) : v;
}

function weightUnit(inputs: Record<string, string | number>) {
  return inputs.unitSystem === "imperial"
    ? ("common_unit_lb" as const)
    : ("common_unit_kg" as const);
}

function formatWeight(
  kg: number,
  inputs: Record<string, string | number>,
): number {
  return inputs.unitSystem === "imperial"
    ? Math.round(kgToLb(kg) * 10) / 10
    : Math.round(kg * 10) / 10;
}

export const bmiCalculator: ConverterConfig = {
  slug: "bmi-calculator",
  category: "health",
  icon: "⚖️",
  titleKey: "converter_bmi_title",
  descriptionKey: "converter_bmi_description",
  inputs: [
    unitSystemInput,
    {
      id: "weight",
      type: "number",
      labelKey: "converter_bmi_weight_label",
      min: 1,
      max: 500,
      step: 0.1,
      defaultValue: 70,
      unit: "common_unit_kg",
    },
    {
      id: "height",
      type: "number",
      labelKey: "converter_bmi_height_label",
      min: 50,
      max: 300,
      step: 1,
      defaultValue: 170,
      unit: "common_unit_cm",
    },
  ],
  calculate: (inputs) => {
    const weight = getWeight(inputs);
    const heightCm = getHeight(inputs);
    const heightM = heightCm / 100;
    if (heightM <= 0 || weight <= 0)
      return [{ labelKey: "converter_bmi_result_label", value: 0 }];
    const bmi = weight / (heightM * heightM);
    let category: LocalesKey = "converter_bmi_normal";
    if (bmi < 18.5) category = "converter_bmi_underweight";
    else if (bmi < 25) category = "converter_bmi_normal";
    else if (bmi < 30) category = "converter_bmi_overweight";
    else category = "converter_bmi_obese";
    return [
      {
        labelKey: "converter_bmi_result_label",
        value: Math.round(bmi * 10) / 10,
      },
      { labelKey: "converter_bmi_category_label", value: category },
    ];
  },
};

export const bodyFatCalculator: ConverterConfig = {
  slug: "body-fat-calculator",
  category: "health",
  icon: "📊",
  titleKey: "converter_body_fat_title",
  descriptionKey: "converter_body_fat_description",
  inputs: [
    unitSystemInput,
    {
      id: "gender",
      type: "switcher",
      labelKey: "converter_common_gender",
      defaultValue: "male",
      options: [
        { value: "male", labelKey: "converter_common_male" },
        { value: "female", labelKey: "converter_common_female" },
      ],
    },
    {
      id: "waist",
      type: "number",
      labelKey: "converter_body_fat_waist",
      min: 15,
      max: 80,
      step: 0.5,
      defaultValue: 85,
      unit: "common_unit_cm",
    },
    {
      id: "neck",
      type: "number",
      labelKey: "converter_body_fat_neck",
      min: 8,
      max: 30,
      step: 0.5,
      defaultValue: 38,
      unit: "common_unit_cm",
    },
    {
      id: "height",
      type: "number",
      labelKey: "converter_bmi_height_label",
      min: 40,
      max: 100,
      step: 1,
      defaultValue: 175,
      unit: "common_unit_cm",
    },
    {
      id: "hip",
      type: "number",
      labelKey: "converter_body_fat_hip",
      min: 20,
      max: 80,
      step: 0.5,
      defaultValue: 95,
      unit: "common_unit_cm",
    },
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender || "male");
    const isImperial = inputs.unitSystem === "imperial";
    const waist = isImperial
      ? inToCm(Number(inputs.waist) || 0)
      : Number(inputs.waist) || 0;
    const neck = isImperial
      ? inToCm(Number(inputs.neck) || 0)
      : Number(inputs.neck) || 0;
    const height = getHeight(inputs);
    const hip = isImperial
      ? inToCm(Number(inputs.hip) || 0)
      : Number(inputs.hip) || 0;
    if (waist <= neck || height <= 0)
      return [
        {
          labelKey: "converter_body_fat_result_label",
          value: 0,
          unit: "common_unit_percent",
        },
      ];
    let bf: number;
    if (gender === "male") {
      bf =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
    } else {
      bf =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height)) -
        450;
    }
    return [
      {
        labelKey: "converter_body_fat_result_label",
        value: Math.max(0, Math.round(bf * 10) / 10),
        unit: "common_unit_percent",
      },
    ];
  },
};

export const idealWeight: ConverterConfig = {
  slug: "ideal-weight-calculator",
  category: "health",
  icon: "🎯",
  titleKey: "converter_ideal_weight_title",
  descriptionKey: "converter_ideal_weight_description",
  inputs: [
    unitSystemInput,
    {
      id: "gender",
      type: "switcher",
      labelKey: "converter_common_gender",
      defaultValue: "male",
      options: [
        { value: "male", labelKey: "converter_common_male" },
        { value: "female", labelKey: "converter_common_female" },
      ],
    },
    {
      id: "height",
      type: "number",
      labelKey: "converter_bmi_height_label",
      min: 100,
      max: 250,
      step: 1,
      defaultValue: 175,
      unit: "common_unit_cm",
    },
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender || "male");
    const heightCm = getHeight(inputs);
    const heightIn = heightCm / 2.54;
    const over60 = Math.max(0, heightIn - 60);
    const robinson = gender === "male" ? 52 + 1.9 * over60 : 49 + 1.7 * over60;
    const miller =
      gender === "male" ? 56.2 + 1.41 * over60 : 53.1 + 1.36 * over60;
    const devine = gender === "male" ? 50 + 2.3 * over60 : 45.5 + 2.3 * over60;
    const avg = (robinson + miller + devine) / 3;
    const u = weightUnit(inputs);
    return [
      {
        labelKey: "converter_ideal_weight_robinson",
        value: formatWeight(robinson, inputs),
        unit: u,
      },
      {
        labelKey: "converter_ideal_weight_miller",
        value: formatWeight(miller, inputs),
        unit: u,
      },
      {
        labelKey: "converter_ideal_weight_devine",
        value: formatWeight(devine, inputs),
        unit: u,
      },
      {
        labelKey: "converter_ideal_weight_average",
        value: formatWeight(avg, inputs),
        unit: u,
      },
    ];
  },
};

export const bmrCalculator: ConverterConfig = {
  slug: "bmr-calculator",
  category: "health",
  icon: "🔥",
  titleKey: "converter_bmr_title",
  descriptionKey: "converter_bmr_description",
  inputs: [
    unitSystemInput,
    {
      id: "gender",
      type: "switcher",
      labelKey: "converter_common_gender",
      defaultValue: "male",
      options: [
        { value: "male", labelKey: "converter_common_male" },
        { value: "female", labelKey: "converter_common_female" },
      ],
    },
    {
      id: "weight",
      type: "number",
      labelKey: "converter_bmi_weight_label",
      min: 1,
      max: 300,
      step: 0.1,
      defaultValue: 70,
      unit: "common_unit_kg",
    },
    {
      id: "height",
      type: "number",
      labelKey: "converter_bmi_height_label",
      min: 50,
      max: 250,
      step: 1,
      defaultValue: 175,
      unit: "common_unit_cm",
    },
    {
      id: "age",
      type: "number",
      labelKey: "converter_common_age",
      min: 1,
      max: 120,
      step: 1,
      defaultValue: 30,
    },
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender || "male");
    const weight = getWeight(inputs);
    const height = getHeight(inputs);
    const age = Number(inputs.age) || 0;
    let bmr: number;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    return [
      {
        labelKey: "converter_bmr_result_label",
        value: Math.round(bmr),
        unit: "common_kcal_day",
      },
    ];
  },
};

export const tdeeCalculator: ConverterConfig = {
  slug: "tdee-calculator",
  category: "health",
  icon: "⚡",
  titleKey: "converter_tdee_title",
  descriptionKey: "converter_tdee_description",
  inputs: [
    unitSystemInput,
    {
      id: "gender",
      type: "switcher",
      labelKey: "converter_common_gender",
      defaultValue: "male",
      options: [
        { value: "male", labelKey: "converter_common_male" },
        { value: "female", labelKey: "converter_common_female" },
      ],
    },
    {
      id: "weight",
      type: "number",
      labelKey: "converter_bmi_weight_label",
      min: 1,
      max: 300,
      step: 0.1,
      defaultValue: 70,
      unit: "common_unit_kg",
    },
    {
      id: "height",
      type: "number",
      labelKey: "converter_bmi_height_label",
      min: 50,
      max: 250,
      step: 1,
      defaultValue: 175,
      unit: "common_unit_cm",
    },
    {
      id: "age",
      type: "number",
      labelKey: "converter_common_age",
      min: 1,
      max: 120,
      step: 1,
      defaultValue: 30,
    },
    {
      id: "activity",
      type: "select",
      labelKey: "converter_tdee_activity_label",
      defaultValue: "moderate",
      options: [
        { value: "sedentary", labelKey: "converter_tdee_sedentary" },
        { value: "light", labelKey: "converter_tdee_light" },
        { value: "moderate", labelKey: "converter_tdee_moderate" },
        { value: "active", labelKey: "converter_tdee_active" },
        { value: "very_active", labelKey: "converter_tdee_very_active" },
      ],
    },
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender || "male");
    const weight = getWeight(inputs);
    const height = getHeight(inputs);
    const age = Number(inputs.age) || 0;
    const activity = String(inputs.activity || "moderate");
    let bmr: number;
    if (gender === "male")
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    else bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    const tdee = bmr * (multipliers[activity] || 1.55);
    return [
      {
        labelKey: "converter_tdee_result_label",
        value: Math.round(tdee),
        unit: "common_kcal_day",
      },
      {
        labelKey: "converter_tdee_bmr_label",
        value: Math.round(bmr),
        unit: "common_kcal_day",
      },
    ];
  },
};

export const pregnancyDueDate: ConverterConfig = {
  slug: "pregnancy-due-date",
  category: "health",
  icon: "🤰",
  titleKey: "converter_pregnancy_title",
  descriptionKey: "converter_pregnancy_description",
  inputs: [
    {
      id: "lastPeriod",
      type: "date",
      labelKey: "converter_pregnancy_last_period",
      defaultValue: "",
    },
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.lastPeriod || "");
    if (!dateStr)
      return [{ labelKey: "converter_pregnancy_due_date", value: "-" }];
    const lmp = new Date(dateStr);
    if (isNaN(lmp.getTime()))
      return [{ labelKey: "converter_pregnancy_due_date", value: "-" }];
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);
    const now = new Date();
    const diffDays = Math.floor(
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    const weeksPregnant = Math.floor(
      (now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24 * 7),
    );
    return [
      {
        labelKey: "converter_pregnancy_due_date",
        value: dueDate.toISOString().split("T")[0],
      },
      {
        labelKey: "converter_pregnancy_weeks_pregnant",
        value: Math.max(0, weeksPregnant),
      },
      {
        labelKey: "converter_pregnancy_days_remaining",
        value: Math.max(0, diffDays),
      },
    ];
  },
};

export const bacCalculator: ConverterConfig = {
  slug: "bac-calculator",
  category: "health",
  icon: "🍺",
  titleKey: "converter_bac_title",
  descriptionKey: "converter_bac_description",
  inputs: [
    unitSystemInput,
    {
      id: "gender",
      type: "switcher",
      labelKey: "converter_common_gender",
      defaultValue: "male",
      options: [
        { value: "male", labelKey: "converter_common_male" },
        { value: "female", labelKey: "converter_common_female" },
      ],
    },
    {
      id: "weight",
      type: "number",
      labelKey: "converter_bmi_weight_label",
      min: 30,
      max: 500,
      step: 0.5,
      defaultValue: 75,
      unit: "common_unit_kg",
    },
    {
      id: "drinks",
      type: "number",
      labelKey: "converter_bac_drinks",
      min: 0,
      max: 30,
      step: 0.5,
      defaultValue: 2,
    },
    {
      id: "hours",
      type: "number",
      labelKey: "converter_bac_hours",
      min: 0,
      max: 24,
      step: 0.5,
      defaultValue: 1,
    },
  ],
  calculate: (inputs) => {
    const gender = String(inputs.gender || "male");
    const weight = getWeight(inputs);
    const drinks = Number(inputs.drinks) || 0;
    const hours = Number(inputs.hours) || 0;
    const r = gender === "male" ? 0.68 : 0.55;
    const alcoholGrams = drinks * 14;
    const bac = Math.max(
      0,
      (alcoholGrams / (weight * 1000 * r)) * 100 - 0.015 * hours,
    );
    let status = "converter_bac_sober";
    if (bac >= 0.08) status = "converter_bac_impaired";
    else if (bac >= 0.04) status = "converter_bac_buzzed";
    else if (bac > 0) status = "converter_bac_minimal";
    return [
      {
        labelKey: "converter_bac_result_label",
        value: Math.round(bac * 1000) / 1000,
        unit: "common_unit_percent",
      },
      { labelKey: "converter_bac_status", value: status },
    ];
  },
};

export const waterIntake: ConverterConfig = {
  slug: "water-intake-calculator",
  category: "health",
  icon: "💧",
  titleKey: "converter_water_intake_title",
  descriptionKey: "converter_water_intake_description",
  inputs: [
    unitSystemInput,
    {
      id: "weight",
      type: "number",
      labelKey: "converter_bmi_weight_label",
      min: 20,
      max: 500,
      step: 0.5,
      defaultValue: 70,
      unit: "common_unit_kg",
    },
    {
      id: "activity",
      type: "select",
      labelKey: "converter_tdee_activity_label",
      defaultValue: "moderate",
      options: [
        { value: "sedentary", labelKey: "converter_tdee_sedentary" },
        { value: "moderate", labelKey: "converter_tdee_moderate" },
        { value: "active", labelKey: "converter_tdee_active" },
      ],
    },
  ],
  calculate: (inputs) => {
    const weight = getWeight(inputs);
    const activity = String(inputs.activity || "moderate");
    const base = weight * 0.033;
    const multipliers: Record<string, number> = {
      sedentary: 1,
      moderate: 1.2,
      active: 1.5,
    };
    const liters = base * (multipliers[activity] || 1.2);
    const isImperial = inputs.unitSystem === "imperial";
    return [
      {
        labelKey: "converter_water_intake_result_label",
        value: isImperial
          ? Math.round(liters * 33.814 * 10) / 10
          : Math.round(liters * 100) / 100,
        unit: isImperial ? "common_unit_fl_oz" : "common_unit_l",
      },
      {
        labelKey: "converter_water_intake_glasses",
        value: Math.round(liters / 0.25),
      },
    ];
  },
};

export const heartRateZones: ConverterConfig = {
  slug: "heart-rate-zones",
  category: "health",
  icon: "❤️",
  titleKey: "converter_heart_rate_title",
  descriptionKey: "converter_heart_rate_description",
  inputs: [
    {
      id: "age",
      type: "number",
      labelKey: "converter_common_age",
      min: 10,
      max: 100,
      step: 1,
      defaultValue: 30,
    },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.age) || 30;
    const maxHR = 220 - age;
    return [
      {
        labelKey: "converter_heart_rate_max_hr",
        value: maxHR,
        unit: "common_unit_bpm",
      },
      {
        labelKey: "converter_heart_rate_zone1",
        value: `${Math.round(maxHR * 0.5)}-${Math.round(maxHR * 0.6)}`,
        unit: "common_unit_bpm",
      },
      {
        labelKey: "converter_heart_rate_zone2",
        value: `${Math.round(maxHR * 0.6)}-${Math.round(maxHR * 0.7)}`,
        unit: "common_unit_bpm",
      },
      {
        labelKey: "converter_heart_rate_zone3",
        value: `${Math.round(maxHR * 0.7)}-${Math.round(maxHR * 0.8)}`,
        unit: "common_unit_bpm",
      },
      {
        labelKey: "converter_heart_rate_zone4",
        value: `${Math.round(maxHR * 0.8)}-${Math.round(maxHR * 0.9)}`,
        unit: "common_unit_bpm",
      },
      {
        labelKey: "converter_heart_rate_zone5",
        value: `${Math.round(maxHR * 0.9)}-${maxHR}`,
        unit: "common_unit_bpm",
      },
    ];
  },
};

export const macroCalculator: ConverterConfig = {
  slug: "macro-calculator",
  category: "health",
  icon: "🥗",
  titleKey: "converter_macro_title",
  descriptionKey: "converter_macro_description",
  inputs: [
    {
      id: "calories",
      type: "number",
      labelKey: "converter_macro_calories_input",
      min: 500,
      max: 10000,
      step: 50,
      defaultValue: 2000,
      unit: "common_unit_kcal",
    },
    {
      id: "goal",
      type: "select",
      labelKey: "converter_macro_goal",
      defaultValue: "balanced",
      options: [
        { value: "balanced", labelKey: "converter_macro_balanced" },
        { value: "low_carb", labelKey: "converter_macro_low_carb" },
        { value: "high_protein", labelKey: "converter_macro_high_protein" },
        { value: "keto", labelKey: "converter_macro_keto" },
      ],
    },
  ],
  calculate: (inputs) => {
    const calories = Number(inputs.calories) || 2000;
    const goal = String(inputs.goal || "balanced");
    const splits: Record<string, [number, number, number]> = {
      balanced: [0.3, 0.4, 0.3],
      low_carb: [0.4, 0.25, 0.35],
      high_protein: [0.4, 0.3, 0.3],
      keto: [0.25, 0.05, 0.7],
    };
    const [protein, carbs, fat] = splits[goal] || splits.balanced;
    return [
      {
        labelKey: "converter_macro_protein",
        value: Math.round((calories * protein) / 4),
        unit: "common_unit_g",
      },
      {
        labelKey: "converter_macro_carbs",
        value: Math.round((calories * carbs) / 4),
        unit: "common_unit_g",
      },
      {
        labelKey: "converter_macro_fat",
        value: Math.round((calories * fat) / 9),
        unit: "common_unit_g",
      },
    ];
  },
};

export const healthConverters = [
  bmiCalculator,
  bodyFatCalculator,
  idealWeight,
  bmrCalculator,
  tdeeCalculator,
  pregnancyDueDate,
  bacCalculator,
  waterIntake,
  heartRateZones,
  macroCalculator,
];
