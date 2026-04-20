import { ConverterConfig } from "../types";

const lbToKg = (lb: number) => lb * 0.453592;
const kgToLb = (kg: number) => kg / 0.453592;

export const weightOnPlanets: ConverterConfig = {
  slug: "weight-on-planets",
  category: "space-science",
  icon: "🪐",
  titleKey: "converter_weight_planets_title",
  descriptionKey: "converter_weight_planets_description",
  inputs: [
    { id: "unitSystem", type: "select", labelKey: "common_units", defaultValue: "metric", options: [
      { value: "metric", labelKey: "common_metric" },
      { value: "imperial", labelKey: "common_imperial" },
    ]},
    { id: "weight", type: "number", labelKey: "converter_bmi_weight_label", min: 1, max: 500, step: 0.1, defaultValue: 70, unit: "kg" },
  ],
  calculate: (inputs) => {
    const raw = Number(inputs.weight) || 70;
    const isImperial = inputs.unitSystem === "imperial";
    const weightKg = isImperial ? lbToKg(raw) : raw;
    const unit = isImperial ? "lb" : "kg";
    const gravity: Record<string, number> = {
      mercury: 0.378, venus: 0.907, mars: 0.377, jupiter: 2.36, saturn: 0.916, uranus: 0.889, neptune: 1.12, moon: 0.166, pluto: 0.071,
    };
    return Object.entries(gravity).map(([planet, g]) => {
      const result = weightKg * g;
      return {
        labelKey: `converter_weight_planets_${planet}`,
        value: Math.round((isImperial ? kgToLb(result) : result) * 100) / 100,
        unit,
      };
    });
  },
};

export const lightTravelTime: ConverterConfig = {
  slug: "light-travel-time",
  category: "space-science",
  icon: "💡",
  titleKey: "converter_light_travel_title",
  descriptionKey: "converter_light_travel_description",
  inputs: [
    { id: "distance", type: "number", labelKey: "converter_light_travel_distance", min: 0, max: 1e15, step: 1, defaultValue: 384400, unitOptions: [
      { value: "km", labelKey: "km", multiplier: 1 },
      { value: "miles", labelKey: "miles", multiplier: 1.60934, step: 1 },
    ] },
  ],
  calculate: (inputs) => {
    const km = Number(inputs.distance) || 0;
    const speedOfLight = 299792.458; // km/s
    const seconds = km / speedOfLight;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const years = days / 365.25;
    if (years >= 1) return [
      { labelKey: "converter_light_travel_result_years", value: Math.round(years * 1000) / 1000 },
      { labelKey: "converter_light_travel_result_days", value: Math.round(days * 100) / 100 },
    ];
    if (days >= 1) return [
      { labelKey: "converter_light_travel_result_days", value: Math.round(days * 100) / 100 },
      { labelKey: "converter_light_travel_result_hours", value: Math.round(hours * 100) / 100 },
    ];
    if (hours >= 1) return [
      { labelKey: "converter_light_travel_result_hours", value: Math.round(hours * 100) / 100 },
      { labelKey: "converter_light_travel_result_minutes", value: Math.round(minutes * 100) / 100 },
    ];
    return [
      { labelKey: "converter_light_travel_result_seconds", value: Math.round(seconds * 1000) / 1000 },
    ];
  },
};

export const soundDistance: ConverterConfig = {
  slug: "speed-of-sound-distance",
  category: "space-science",
  icon: "🔊",
  titleKey: "converter_sound_distance_title",
  descriptionKey: "converter_sound_distance_description",
  inputs: [
    { id: "seconds", type: "number", labelKey: "converter_sound_distance_seconds_after", min: 0, max: 100, step: 0.1, defaultValue: 3 },
    { id: "tempC", type: "number", labelKey: "converter_sound_distance_temp", min: -40, max: 50, step: 1, defaultValue: 20, unit: "°C" },
  ],
  calculate: (inputs) => {
    const seconds = Number(inputs.seconds) || 0;
    const tempC = Number(inputs.tempC) || 20;
    const speed = 331.3 + 0.606 * tempC; // m/s
    const distanceM = speed * seconds;
    const distanceKm = distanceM / 1000;
    const distanceMi = distanceKm * 0.621371;
    return [
      { labelKey: "converter_sound_distance_result_meters", value: Math.round(distanceM * 10) / 10, unit: "m" },
      { labelKey: "converter_sound_distance_result_km", value: Math.round(distanceKm * 100) / 100, unit: "km" },
      { labelKey: "converter_sound_distance_result_miles", value: Math.round(distanceMi * 100) / 100, unit: "mi" },
      { labelKey: "converter_sound_distance_speed", value: Math.round(speed * 10) / 10, unit: "m/s" },
    ];
  },
};

export const halfLife: ConverterConfig = {
  slug: "radioactive-half-life",
  category: "space-science",
  icon: "☢️",
  titleKey: "converter_half_life_title",
  descriptionKey: "converter_half_life_description",
  inputs: [
    { id: "initial", type: "number", labelKey: "converter_half_life_initial_amount", min: 0, max: 1e12, step: 1, defaultValue: 1000, unit: "g" },
    { id: "halfLife", type: "number", labelKey: "converter_half_life_half_life_period", min: 0.001, max: 1e10, step: 0.1, defaultValue: 5730 },
    { id: "elapsed", type: "number", labelKey: "converter_half_life_elapsed_time", min: 0, max: 1e12, step: 1, defaultValue: 10000 },
  ],
  calculate: (inputs) => {
    const initial = Number(inputs.initial) || 0;
    const hl = Number(inputs.halfLife) || 1;
    const elapsed = Number(inputs.elapsed) || 0;
    const remaining = initial * Math.pow(0.5, elapsed / hl);
    const decayed = initial - remaining;
    const halfLives = elapsed / hl;
    return [
      { labelKey: "converter_half_life_remaining", value: Math.round(remaining * 1000) / 1000, unit: "g" },
      { labelKey: "converter_half_life_decayed", value: Math.round(decayed * 1000) / 1000, unit: "g" },
      { labelKey: "converter_half_life_half_lives_passed", value: Math.round(halfLives * 100) / 100 },
      { labelKey: "converter_half_life_percent_remaining", value: Math.round((remaining / initial) * 10000) / 100, unit: "%" },
    ];
  },
};

export const starDistance: ConverterConfig = {
  slug: "star-distance-converter",
  category: "space-science",
  icon: "⭐",
  titleKey: "converter_star_distance_title",
  descriptionKey: "converter_star_distance_description",
  inputs: [
    { id: "lightYears", type: "number", labelKey: "converter_star_distance_light_years", min: 0, max: 1e12, step: 0.01, defaultValue: 4.24 },
  ],
  calculate: (inputs) => {
    const ly = Number(inputs.lightYears) || 0;
    const km = ly * 9.461e12;
    const miles = km * 0.621371;
    const au = ly * 63241.077;
    const parsecs = ly * 0.306601;
    return [
      { labelKey: "converter_star_distance_km", value: km.toExponential(3) },
      { labelKey: "converter_star_distance_miles", value: miles.toExponential(3) },
      { labelKey: "converter_star_distance_au", value: Math.round(au * 100) / 100 },
      { labelKey: "converter_star_distance_parsecs", value: Math.round(parsecs * 1000) / 1000 },
    ];
  },
};

export const spaceScienceConverters = [weightOnPlanets, lightTravelTime, soundDistance, halfLife, starDistance];
