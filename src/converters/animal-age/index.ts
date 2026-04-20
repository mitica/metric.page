import { ConverterConfig } from "../types";

export const catYears: ConverterConfig = {
  slug: "cat-years",
  category: "animal-age",
  icon: "🐱",
  titleKey: "converter_cat_years_title",
  descriptionKey: "converter_cat_years_description",
  inputs: [
    {
      id: "catAge",
      type: "number",
      labelKey: "converter_cat_years_input_label",
      min: 0,
      max: 30,
      step: 0.5,
      defaultValue: 3,
    },
  ],
  calculate: (inputs) => {
    const catAge = Number(inputs.catAge) || 0;
    let humanAge: number;
    if (catAge <= 0) humanAge = 0;
    else if (catAge <= 1) humanAge = 15 * catAge;
    else if (catAge <= 2) humanAge = 15 + 9 * (catAge - 1);
    else humanAge = 24 + 4 * (catAge - 2);
    return [
      { labelKey: "converter_cat_years_result_label", value: Math.round(humanAge * 10) / 10, unit: "common_human_years" },
    ];
  },
};

export const dogYears: ConverterConfig = {
  slug: "dog-years",
  category: "animal-age",
  icon: "🐕",
  titleKey: "converter_dog_years_title",
  descriptionKey: "converter_dog_years_description",
  inputs: [
    {
      id: "dogAge",
      type: "number",
      labelKey: "converter_dog_years_input_label",
      min: 0,
      max: 25,
      step: 0.5,
      defaultValue: 5,
    },
    {
      id: "size",
      type: "select",
      labelKey: "converter_dog_years_size_label",
      defaultValue: "medium",
      options: [
        { value: "small", labelKey: "converter_dog_years_size_small" },
        { value: "medium", labelKey: "converter_dog_years_size_medium" },
        { value: "large", labelKey: "converter_dog_years_size_large" },
      ],
    },
  ],
  calculate: (inputs) => {
    const dogAge = Number(inputs.dogAge) || 0;
    const size = String(inputs.size || "medium");
    const rates: Record<string, number[]> = {
      small: [15, 9, 4],
      medium: [15, 9, 5],
      large: [15, 9, 6],
    };
    const r = rates[size] || rates.medium;
    let humanAge: number;
    if (dogAge <= 0) humanAge = 0;
    else if (dogAge <= 1) humanAge = r[0] * dogAge;
    else if (dogAge <= 2) humanAge = r[0] + r[1] * (dogAge - 1);
    else humanAge = r[0] + r[1] + r[2] * (dogAge - 2);
    return [
      { labelKey: "converter_dog_years_result_label", value: Math.round(humanAge * 10) / 10, unit: "common_human_years" },
    ];
  },
};

export const horseYears: ConverterConfig = {
  slug: "horse-years",
  category: "animal-age",
  icon: "🐴",
  titleKey: "converter_horse_years_title",
  descriptionKey: "converter_horse_years_description",
  inputs: [
    { id: "horseAge", type: "number", labelKey: "converter_horse_years_input_label", min: 0, max: 40, step: 0.5, defaultValue: 5 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.horseAge) || 0;
    let human: number;
    if (age <= 0) human = 0;
    else if (age <= 1) human = 6.5 * age;
    else if (age <= 2) human = 6.5 + 6.5 * (age - 1);
    else if (age <= 3) human = 13 + 5 * (age - 2);
    else if (age <= 4) human = 18 + 2.5 * (age - 3);
    else human = 20.5 + 2.5 * (age - 4);
    return [{ labelKey: "converter_horse_years_result_label", value: Math.round(human * 10) / 10, unit: "common_human_years" }];
  },
};

export const rabbitYears: ConverterConfig = {
  slug: "rabbit-years",
  category: "animal-age",
  icon: "🐰",
  titleKey: "converter_rabbit_years_title",
  descriptionKey: "converter_rabbit_years_description",
  inputs: [
    { id: "rabbitAge", type: "number", labelKey: "converter_rabbit_years_input_label", min: 0, max: 15, step: 0.5, defaultValue: 3 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.rabbitAge) || 0;
    let human: number;
    if (age <= 0) human = 0;
    else if (age <= 1) human = 21 * age;
    else human = 21 + 8 * (age - 1);
    return [{ labelKey: "converter_rabbit_years_result_label", value: Math.round(human * 10) / 10, unit: "common_human_years" }];
  },
};

export const hamsterYears: ConverterConfig = {
  slug: "hamster-years",
  category: "animal-age",
  icon: "🐹",
  titleKey: "converter_hamster_years_title",
  descriptionKey: "converter_hamster_years_description",
  inputs: [
    { id: "hamsterAge", type: "number", labelKey: "converter_hamster_years_input_label", min: 0, max: 5, step: 0.25, defaultValue: 1 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.hamsterAge) || 0;
    const human = age * 26;
    return [{ labelKey: "converter_hamster_years_result_label", value: Math.round(human * 10) / 10, unit: "common_human_years" }];
  },
};

export const parrotYears: ConverterConfig = {
  slug: "parrot-years",
  category: "animal-age",
  icon: "🦜",
  titleKey: "converter_parrot_years_title",
  descriptionKey: "converter_parrot_years_description",
  inputs: [
    { id: "parrotAge", type: "number", labelKey: "converter_parrot_years_input_label", min: 0, max: 80, step: 1, defaultValue: 10 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.parrotAge) || 0;
    // Large parrots live ~80 years, roughly 1:1 with humans
    const human = age <= 1 ? age * 3 : 3 + (age - 1) * 1;
    return [{ labelKey: "converter_parrot_years_result_label", value: Math.round(human * 10) / 10, unit: "common_human_years" }];
  },
};

export const fishYears: ConverterConfig = {
  slug: "fish-years",
  category: "animal-age",
  icon: "🐟",
  titleKey: "converter_fish_years_title",
  descriptionKey: "converter_fish_years_description",
  inputs: [
    { id: "fishAge", type: "number", labelKey: "converter_fish_years_input_label", min: 0, max: 20, step: 0.5, defaultValue: 2 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.fishAge) || 0;
    const human = age * 5;
    return [{ labelKey: "converter_fish_years_result_label", value: Math.round(human * 10) / 10, unit: "common_human_years" }];
  },
};

export const turtleYears: ConverterConfig = {
  slug: "turtle-years",
  category: "animal-age",
  icon: "🐢",
  titleKey: "converter_turtle_years_title",
  descriptionKey: "converter_turtle_years_description",
  inputs: [
    { id: "turtleAge", type: "number", labelKey: "converter_turtle_years_input_label", min: 0, max: 200, step: 1, defaultValue: 20 },
  ],
  calculate: (inputs) => {
    const age = Number(inputs.turtleAge) || 0;
    // Turtles live ~150 years, roughly 0.5:1 with humans
    const human = age * 0.5;
    return [{ labelKey: "converter_turtle_years_result_label", value: Math.round(human * 10) / 10, unit: "common_human_years" }];
  },
};

export const animalAgeConverters = [catYears, dogYears, horseYears, rabbitYears, hamsterYears, parrotYears, fishYears, turtleYears];
