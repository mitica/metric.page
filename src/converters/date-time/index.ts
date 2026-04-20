import { ConverterConfig } from "../types";

export const exactAge: ConverterConfig = {
  slug: "exact-age-calculator",
  category: "date-time",
  icon: "🎂",
  titleKey: "converter_exact_age_title",
  descriptionKey: "converter_exact_age_description",
  inputs: [
    { id: "birthDate", type: "date", labelKey: "converter_exact_age_birth_date", defaultValue: "" },
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.birthDate || "");
    if (!dateStr) return [{ labelKey: "converter_exact_age_result", value: "-" }];
    const birth = new Date(dateStr);
    const now = new Date();
    if (isNaN(birth.getTime())) return [{ labelKey: "converter_exact_age_result", value: "-" }];
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    return [
      { labelKey: "converter_exact_age_years", value: years },
      { labelKey: "converter_exact_age_months", value: months },
      { labelKey: "converter_exact_age_days", value: days },
      { labelKey: "converter_exact_age_total_days", value: totalDays.toLocaleString() },
      { labelKey: "converter_exact_age_total_weeks", value: totalWeeks.toLocaleString() },
      { labelKey: "converter_exact_age_total_hours", value: totalHours.toLocaleString() },
    ];
  },
};

export const daysBetween: ConverterConfig = {
  slug: "days-between-dates",
  category: "date-time",
  icon: "📆",
  titleKey: "converter_days_between_title",
  descriptionKey: "converter_days_between_description",
  inputs: [
    { id: "startDate", type: "date", labelKey: "converter_days_between_start_date", defaultValue: "" },
    { id: "endDate", type: "date", labelKey: "converter_days_between_end_date", defaultValue: "" },
  ],
  calculate: (inputs) => {
    const start = new Date(String(inputs.startDate || ""));
    const end = new Date(String(inputs.endDate || ""));
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return [{ labelKey: "converter_days_between_result", value: "-" }];
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.round(days / 30.44 * 10) / 10;
    const years = Math.round(days / 365.25 * 100) / 100;
    return [
      { labelKey: "converter_days_between_result_days", value: days.toLocaleString() },
      { labelKey: "converter_days_between_result_weeks", value: weeks.toLocaleString() },
      { labelKey: "converter_days_between_result_months", value: months },
      { labelKey: "converter_days_between_result_years", value: years },
    ];
  },
};

export const unixTimestamp: ConverterConfig = {
  slug: "unix-timestamp-converter",
  category: "date-time",
  icon: "🕐",
  titleKey: "converter_unix_timestamp_title",
  descriptionKey: "converter_unix_timestamp_description",
  inputs: [
    { id: "timestamp", type: "number", labelKey: "converter_unix_timestamp_input_label", min: 0, max: 99999999999, step: 1, defaultValue: 1672531200 },
  ],
  calculate: (inputs) => {
    const ts = Number(inputs.timestamp) || 0;
    // Auto-detect seconds vs milliseconds
    const ms = ts > 1e11 ? ts : ts * 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return [{ labelKey: "converter_unix_timestamp_result", value: "-" }];
    return [
      { labelKey: "converter_unix_timestamp_utc", value: date.toUTCString() },
      { labelKey: "converter_unix_timestamp_iso", value: date.toISOString() },
      { labelKey: "converter_unix_timestamp_local", value: date.toLocaleString() },
      { labelKey: "converter_unix_timestamp_seconds", value: Math.floor(ms / 1000) },
      { labelKey: "converter_unix_timestamp_milliseconds", value: ms },
    ];
  },
};

export const dayOfWeek: ConverterConfig = {
  slug: "day-of-week-finder",
  category: "date-time",
  icon: "📅",
  titleKey: "converter_day_of_week_title",
  descriptionKey: "converter_day_of_week_description",
  inputs: [
    { id: "date", type: "date", labelKey: "converter_day_of_week_input_date", defaultValue: "" },
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.date || "");
    if (!dateStr) return [{ labelKey: "converter_day_of_week_result", value: "-" }];
    const date = new Date(dateStr + "T12:00:00");
    if (isNaN(date.getTime())) return [{ labelKey: "converter_day_of_week_result", value: "-" }];
    const days = ["common_sunday", "common_monday", "common_tuesday", "common_wednesday", "common_thursday", "common_friday", "common_saturday"];
    const dayNum = date.getDay();
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const weekOfYear = Math.ceil(dayOfYear / 7);
    return [
      { labelKey: "converter_day_of_week_result", value: days[dayNum] },
      { labelKey: "converter_day_of_week_day_of_year", value: dayOfYear },
      { labelKey: "converter_day_of_week_week_of_year", value: weekOfYear },
    ];
  },
};

export const howOldAmI: ConverterConfig = {
  slug: "how-old-am-i",
  category: "date-time",
  icon: "⏰",
  titleKey: "converter_how_old_title",
  descriptionKey: "converter_how_old_description",
  inputs: [
    { id: "birthDate", type: "date", labelKey: "converter_exact_age_birth_date", defaultValue: "" },
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.birthDate || "");
    if (!dateStr) return [{ labelKey: "converter_how_old_result", value: "-" }];
    const birth = new Date(dateStr);
    const now = new Date();
    if (isNaN(birth.getTime())) return [{ labelKey: "converter_how_old_result", value: "-" }];
    const diffMs = now.getTime() - birth.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.floor(totalDays / 30.44);
    return [
      { labelKey: "converter_how_old_months", value: totalMonths.toLocaleString() },
      { labelKey: "converter_how_old_weeks", value: totalWeeks.toLocaleString() },
      { labelKey: "converter_how_old_days", value: totalDays.toLocaleString() },
      { labelKey: "converter_how_old_hours", value: totalHours.toLocaleString() },
      { labelKey: "converter_how_old_minutes", value: totalMinutes.toLocaleString() },
      { labelKey: "converter_how_old_seconds", value: totalSeconds.toLocaleString() },
    ];
  },
};

export const weeksUntil: ConverterConfig = {
  slug: "weeks-until-date",
  category: "date-time",
  icon: "🗓️",
  titleKey: "converter_weeks_until_title",
  descriptionKey: "converter_weeks_until_description",
  inputs: [
    { id: "targetDate", type: "date", labelKey: "converter_weeks_until_target_date", defaultValue: "" },
  ],
  calculate: (inputs) => {
    const dateStr = String(inputs.targetDate || "");
    if (!dateStr) return [{ labelKey: "converter_weeks_until_result", value: "-" }];
    const target = new Date(dateStr);
    const now = new Date();
    if (isNaN(target.getTime())) return [{ labelKey: "converter_weeks_until_result", value: "-" }];
    const diffMs = target.getTime() - now.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return [
      { labelKey: "converter_weeks_until_result_weeks", value: weeks },
      { labelKey: "converter_weeks_until_result_days", value: remainingDays },
      { labelKey: "converter_weeks_until_total_days", value: days },
    ];
  },
};

export const leapYear: ConverterConfig = {
  slug: "leap-year-checker",
  category: "date-time",
  icon: "🔄",
  titleKey: "converter_leap_year_title",
  descriptionKey: "converter_leap_year_description",
  inputs: [
    { id: "year", type: "number", labelKey: "converter_leap_year_year", min: 1, max: 9999, step: 1, defaultValue: 2024 },
  ],
  calculate: (inputs) => {
    const year = Number(inputs.year) || 2024;
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    // Find next leap year
    let next = year + 1;
    while (!((next % 4 === 0 && next % 100 !== 0) || next % 400 === 0)) next++;
    // Find previous leap year
    let prev = year - 1;
    while (!((prev % 4 === 0 && prev % 100 !== 0) || prev % 400 === 0)) prev--;
    return [
      { labelKey: "converter_leap_year_result", value: isLeap ? "common_yes" : "common_no" },
      { labelKey: "converter_leap_year_days_in_year", value: isLeap ? 366 : 365 },
      { labelKey: "converter_leap_year_next_leap", value: next },
      { labelKey: "converter_leap_year_prev_leap", value: prev },
    ];
  },
};

export const dateTimeConverters = [exactAge, daysBetween, unixTimestamp, dayOfWeek, howOldAmI, weeksUntil, leapYear];
