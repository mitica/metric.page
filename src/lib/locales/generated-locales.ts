
import { Locales, Translator, TranslatorOptions } from 'localizy';

export class LocalizyLocalesProvider<T extends LocalizyLocales = LocalizyLocales> {
    private translator: Translator
    private localesMap: { [lang: string]: T } = {}

    constructor(options: TranslatorOptions) {
        this.translator = new Translator(options);
    }

    lang(lang: string) {
        if (!this.localesMap[lang]) {
            this.localesMap[lang] = this.createInstance(this.translator.locales(lang)) as T;
        }

        return this.localesMap[lang];
    }

    protected createInstance(t: Locales): T {
        return new LocalizyLocales(t) as T;
    }
}

export class LocalizyLocales {
    protected __locales: Locales
    constructor(locales: Locales) {
        this.__locales = locales;
    }

    s(key: LocalesKey, ...args: any[]) {
        return this.v(key, args);
    }

    v(key: LocalesKey, args?: any[]) {
        return this.__locales.t(key, args);
    }
    

    site_title() {
        return this.v('site_title');
    }

    site_description() {
        return this.v('site_description');
    }

    common_results() {
        return this.v('common_results');
    }

    common_back() {
        return this.v('common_back');
    }

    common_open() {
        return this.v('common_open');
    }

    common_calculate() {
        return this.v('common_calculate');
    }

    common_reset() {
        return this.v('common_reset');
    }

    common_select_language() {
        return this.v('common_select_language');
    }

    common_go_to_converter(_p1: number) {
        return this.v('common_go_to_converter', Array.from(arguments));
    }

    common_yes() {
        return this.v('common_yes');
    }

    common_no() {
        return this.v('common_no');
    }

    common_minutes() {
        return this.v('common_minutes');
    }

    common_hours() {
        return this.v('common_hours');
    }

    common_human_years() {
        return this.v('common_human_years');
    }

    common_kcal_day() {
        return this.v('common_kcal_day');
    }

    common_sunday() {
        return this.v('common_sunday');
    }

    common_monday() {
        return this.v('common_monday');
    }

    common_tuesday() {
        return this.v('common_tuesday');
    }

    common_wednesday() {
        return this.v('common_wednesday');
    }

    common_thursday() {
        return this.v('common_thursday');
    }

    common_friday() {
        return this.v('common_friday');
    }

    common_saturday() {
        return this.v('common_saturday');
    }

    category_animal_age() {
        return this.v('category_animal_age');
    }

    category_health() {
        return this.v('category_health');
    }

    category_space_science() {
        return this.v('category_space_science');
    }

    category_date_time() {
        return this.v('category_date_time');
    }

    category_math_numbers() {
        return this.v('category_math_numbers');
    }

    category_digital_tech() {
        return this.v('category_digital_tech');
    }

    category_finance() {
        return this.v('category_finance');
    }

    category_everyday() {
        return this.v('category_everyday');
    }

    category_fun() {
        return this.v('category_fun');
    }

    converter_common_gender() {
        return this.v('converter_common_gender');
    }

    converter_common_male() {
        return this.v('converter_common_male');
    }

    converter_common_female() {
        return this.v('converter_common_female');
    }

    converter_common_age() {
        return this.v('converter_common_age');
    }

    converter_cat_years_title() {
        return this.v('converter_cat_years_title');
    }

    converter_cat_years_description() {
        return this.v('converter_cat_years_description');
    }

    converter_cat_years_input_label() {
        return this.v('converter_cat_years_input_label');
    }

    converter_cat_years_result_label() {
        return this.v('converter_cat_years_result_label');
    }

    converter_dog_years_title() {
        return this.v('converter_dog_years_title');
    }

    converter_dog_years_description() {
        return this.v('converter_dog_years_description');
    }

    converter_dog_years_input_label() {
        return this.v('converter_dog_years_input_label');
    }

    converter_dog_years_result_label() {
        return this.v('converter_dog_years_result_label');
    }

    converter_dog_years_size_label() {
        return this.v('converter_dog_years_size_label');
    }

    converter_dog_years_size_small() {
        return this.v('converter_dog_years_size_small');
    }

    converter_dog_years_size_medium() {
        return this.v('converter_dog_years_size_medium');
    }

    converter_dog_years_size_large() {
        return this.v('converter_dog_years_size_large');
    }

    converter_horse_years_title() {
        return this.v('converter_horse_years_title');
    }

    converter_horse_years_description() {
        return this.v('converter_horse_years_description');
    }

    converter_horse_years_input_label() {
        return this.v('converter_horse_years_input_label');
    }

    converter_horse_years_result_label() {
        return this.v('converter_horse_years_result_label');
    }

    converter_rabbit_years_title() {
        return this.v('converter_rabbit_years_title');
    }

    converter_rabbit_years_description() {
        return this.v('converter_rabbit_years_description');
    }

    converter_rabbit_years_input_label() {
        return this.v('converter_rabbit_years_input_label');
    }

    converter_rabbit_years_result_label() {
        return this.v('converter_rabbit_years_result_label');
    }

    converter_hamster_years_title() {
        return this.v('converter_hamster_years_title');
    }

    converter_hamster_years_description() {
        return this.v('converter_hamster_years_description');
    }

    converter_hamster_years_input_label() {
        return this.v('converter_hamster_years_input_label');
    }

    converter_hamster_years_result_label() {
        return this.v('converter_hamster_years_result_label');
    }

    converter_parrot_years_title() {
        return this.v('converter_parrot_years_title');
    }

    converter_parrot_years_description() {
        return this.v('converter_parrot_years_description');
    }

    converter_parrot_years_input_label() {
        return this.v('converter_parrot_years_input_label');
    }

    converter_parrot_years_result_label() {
        return this.v('converter_parrot_years_result_label');
    }

    converter_fish_years_title() {
        return this.v('converter_fish_years_title');
    }

    converter_fish_years_description() {
        return this.v('converter_fish_years_description');
    }

    converter_fish_years_input_label() {
        return this.v('converter_fish_years_input_label');
    }

    converter_fish_years_result_label() {
        return this.v('converter_fish_years_result_label');
    }

    converter_turtle_years_title() {
        return this.v('converter_turtle_years_title');
    }

    converter_turtle_years_description() {
        return this.v('converter_turtle_years_description');
    }

    converter_turtle_years_input_label() {
        return this.v('converter_turtle_years_input_label');
    }

    converter_turtle_years_result_label() {
        return this.v('converter_turtle_years_result_label');
    }

    converter_bmi_title() {
        return this.v('converter_bmi_title');
    }

    converter_bmi_description() {
        return this.v('converter_bmi_description');
    }

    converter_bmi_weight_label() {
        return this.v('converter_bmi_weight_label');
    }

    converter_bmi_height_label() {
        return this.v('converter_bmi_height_label');
    }

    converter_bmi_result_label() {
        return this.v('converter_bmi_result_label');
    }

    converter_bmi_category_label() {
        return this.v('converter_bmi_category_label');
    }

    converter_bmi_underweight() {
        return this.v('converter_bmi_underweight');
    }

    converter_bmi_normal() {
        return this.v('converter_bmi_normal');
    }

    converter_bmi_overweight() {
        return this.v('converter_bmi_overweight');
    }

    converter_bmi_obese() {
        return this.v('converter_bmi_obese');
    }

    converter_body_fat_title() {
        return this.v('converter_body_fat_title');
    }

    converter_body_fat_description() {
        return this.v('converter_body_fat_description');
    }

    converter_body_fat_waist() {
        return this.v('converter_body_fat_waist');
    }

    converter_body_fat_neck() {
        return this.v('converter_body_fat_neck');
    }

    converter_body_fat_hip() {
        return this.v('converter_body_fat_hip');
    }

    converter_body_fat_result_label() {
        return this.v('converter_body_fat_result_label');
    }

    converter_ideal_weight_title() {
        return this.v('converter_ideal_weight_title');
    }

    converter_ideal_weight_description() {
        return this.v('converter_ideal_weight_description');
    }

    converter_ideal_weight_robinson() {
        return this.v('converter_ideal_weight_robinson');
    }

    converter_ideal_weight_miller() {
        return this.v('converter_ideal_weight_miller');
    }

    converter_ideal_weight_devine() {
        return this.v('converter_ideal_weight_devine');
    }

    converter_ideal_weight_average() {
        return this.v('converter_ideal_weight_average');
    }

    converter_bmr_title() {
        return this.v('converter_bmr_title');
    }

    converter_bmr_description() {
        return this.v('converter_bmr_description');
    }

    converter_bmr_result_label() {
        return this.v('converter_bmr_result_label');
    }

    converter_tdee_title() {
        return this.v('converter_tdee_title');
    }

    converter_tdee_description() {
        return this.v('converter_tdee_description');
    }

    converter_tdee_activity_label() {
        return this.v('converter_tdee_activity_label');
    }

    converter_tdee_sedentary() {
        return this.v('converter_tdee_sedentary');
    }

    converter_tdee_light() {
        return this.v('converter_tdee_light');
    }

    converter_tdee_moderate() {
        return this.v('converter_tdee_moderate');
    }

    converter_tdee_active() {
        return this.v('converter_tdee_active');
    }

    converter_tdee_very_active() {
        return this.v('converter_tdee_very_active');
    }

    converter_tdee_result_label() {
        return this.v('converter_tdee_result_label');
    }

    converter_tdee_bmr_label() {
        return this.v('converter_tdee_bmr_label');
    }

    converter_pregnancy_title() {
        return this.v('converter_pregnancy_title');
    }

    converter_pregnancy_description() {
        return this.v('converter_pregnancy_description');
    }

    converter_pregnancy_last_period() {
        return this.v('converter_pregnancy_last_period');
    }

    converter_pregnancy_due_date() {
        return this.v('converter_pregnancy_due_date');
    }

    converter_pregnancy_weeks_pregnant() {
        return this.v('converter_pregnancy_weeks_pregnant');
    }

    converter_pregnancy_days_remaining() {
        return this.v('converter_pregnancy_days_remaining');
    }

    converter_bac_title() {
        return this.v('converter_bac_title');
    }

    converter_bac_description() {
        return this.v('converter_bac_description');
    }

    converter_bac_drinks() {
        return this.v('converter_bac_drinks');
    }

    converter_bac_hours() {
        return this.v('converter_bac_hours');
    }

    converter_bac_result_label() {
        return this.v('converter_bac_result_label');
    }

    converter_bac_status() {
        return this.v('converter_bac_status');
    }

    converter_bac_sober() {
        return this.v('converter_bac_sober');
    }

    converter_bac_minimal() {
        return this.v('converter_bac_minimal');
    }

    converter_bac_buzzed() {
        return this.v('converter_bac_buzzed');
    }

    converter_bac_impaired() {
        return this.v('converter_bac_impaired');
    }

    converter_water_intake_title() {
        return this.v('converter_water_intake_title');
    }

    converter_water_intake_description() {
        return this.v('converter_water_intake_description');
    }

    converter_water_intake_result_label() {
        return this.v('converter_water_intake_result_label');
    }

    converter_water_intake_glasses() {
        return this.v('converter_water_intake_glasses');
    }

    converter_heart_rate_title() {
        return this.v('converter_heart_rate_title');
    }

    converter_heart_rate_description() {
        return this.v('converter_heart_rate_description');
    }

    converter_heart_rate_max_hr() {
        return this.v('converter_heart_rate_max_hr');
    }

    converter_heart_rate_zone1() {
        return this.v('converter_heart_rate_zone1');
    }

    converter_heart_rate_zone2() {
        return this.v('converter_heart_rate_zone2');
    }

    converter_heart_rate_zone3() {
        return this.v('converter_heart_rate_zone3');
    }

    converter_heart_rate_zone4() {
        return this.v('converter_heart_rate_zone4');
    }

    converter_heart_rate_zone5() {
        return this.v('converter_heart_rate_zone5');
    }

    converter_macro_title() {
        return this.v('converter_macro_title');
    }

    converter_macro_description() {
        return this.v('converter_macro_description');
    }

    converter_macro_calories_input() {
        return this.v('converter_macro_calories_input');
    }

    converter_macro_goal() {
        return this.v('converter_macro_goal');
    }

    converter_macro_balanced() {
        return this.v('converter_macro_balanced');
    }

    converter_macro_low_carb() {
        return this.v('converter_macro_low_carb');
    }

    converter_macro_high_protein() {
        return this.v('converter_macro_high_protein');
    }

    converter_macro_keto() {
        return this.v('converter_macro_keto');
    }

    converter_macro_protein() {
        return this.v('converter_macro_protein');
    }

    converter_macro_carbs() {
        return this.v('converter_macro_carbs');
    }

    converter_macro_fat() {
        return this.v('converter_macro_fat');
    }

    converter_weight_planets_title() {
        return this.v('converter_weight_planets_title');
    }

    converter_weight_planets_description() {
        return this.v('converter_weight_planets_description');
    }

    converter_weight_planets_mercury() {
        return this.v('converter_weight_planets_mercury');
    }

    converter_weight_planets_venus() {
        return this.v('converter_weight_planets_venus');
    }

    converter_weight_planets_mars() {
        return this.v('converter_weight_planets_mars');
    }

    converter_weight_planets_jupiter() {
        return this.v('converter_weight_planets_jupiter');
    }

    converter_weight_planets_saturn() {
        return this.v('converter_weight_planets_saturn');
    }

    converter_weight_planets_uranus() {
        return this.v('converter_weight_planets_uranus');
    }

    converter_weight_planets_neptune() {
        return this.v('converter_weight_planets_neptune');
    }

    converter_weight_planets_moon() {
        return this.v('converter_weight_planets_moon');
    }

    converter_weight_planets_pluto() {
        return this.v('converter_weight_planets_pluto');
    }

    converter_light_travel_title() {
        return this.v('converter_light_travel_title');
    }

    converter_light_travel_description() {
        return this.v('converter_light_travel_description');
    }

    converter_light_travel_distance() {
        return this.v('converter_light_travel_distance');
    }

    converter_light_travel_result_years() {
        return this.v('converter_light_travel_result_years');
    }

    converter_light_travel_result_days() {
        return this.v('converter_light_travel_result_days');
    }

    converter_light_travel_result_hours() {
        return this.v('converter_light_travel_result_hours');
    }

    converter_light_travel_result_minutes() {
        return this.v('converter_light_travel_result_minutes');
    }

    converter_light_travel_result_seconds() {
        return this.v('converter_light_travel_result_seconds');
    }

    converter_sound_distance_title() {
        return this.v('converter_sound_distance_title');
    }

    converter_sound_distance_description() {
        return this.v('converter_sound_distance_description');
    }

    converter_sound_distance_seconds_after() {
        return this.v('converter_sound_distance_seconds_after');
    }

    converter_sound_distance_temp() {
        return this.v('converter_sound_distance_temp');
    }

    converter_sound_distance_result_meters() {
        return this.v('converter_sound_distance_result_meters');
    }

    converter_sound_distance_result_km() {
        return this.v('converter_sound_distance_result_km');
    }

    converter_sound_distance_result_miles() {
        return this.v('converter_sound_distance_result_miles');
    }

    converter_sound_distance_speed() {
        return this.v('converter_sound_distance_speed');
    }

    converter_half_life_title() {
        return this.v('converter_half_life_title');
    }

    converter_half_life_description() {
        return this.v('converter_half_life_description');
    }

    converter_half_life_initial_amount() {
        return this.v('converter_half_life_initial_amount');
    }

    converter_half_life_half_life_period() {
        return this.v('converter_half_life_half_life_period');
    }

    converter_half_life_elapsed_time() {
        return this.v('converter_half_life_elapsed_time');
    }

    converter_half_life_remaining() {
        return this.v('converter_half_life_remaining');
    }

    converter_half_life_decayed() {
        return this.v('converter_half_life_decayed');
    }

    converter_half_life_half_lives_passed() {
        return this.v('converter_half_life_half_lives_passed');
    }

    converter_half_life_percent_remaining() {
        return this.v('converter_half_life_percent_remaining');
    }

    converter_star_distance_title() {
        return this.v('converter_star_distance_title');
    }

    converter_star_distance_description() {
        return this.v('converter_star_distance_description');
    }

    converter_star_distance_light_years() {
        return this.v('converter_star_distance_light_years');
    }

    converter_star_distance_km() {
        return this.v('converter_star_distance_km');
    }

    converter_star_distance_miles() {
        return this.v('converter_star_distance_miles');
    }

    converter_star_distance_au() {
        return this.v('converter_star_distance_au');
    }

    converter_star_distance_parsecs() {
        return this.v('converter_star_distance_parsecs');
    }

    converter_exact_age_title() {
        return this.v('converter_exact_age_title');
    }

    converter_exact_age_description() {
        return this.v('converter_exact_age_description');
    }

    converter_exact_age_birth_date() {
        return this.v('converter_exact_age_birth_date');
    }

    converter_exact_age_result() {
        return this.v('converter_exact_age_result');
    }

    converter_exact_age_years() {
        return this.v('converter_exact_age_years');
    }

    converter_exact_age_months() {
        return this.v('converter_exact_age_months');
    }

    converter_exact_age_days() {
        return this.v('converter_exact_age_days');
    }

    converter_exact_age_total_days() {
        return this.v('converter_exact_age_total_days');
    }

    converter_exact_age_total_weeks() {
        return this.v('converter_exact_age_total_weeks');
    }

    converter_exact_age_total_hours() {
        return this.v('converter_exact_age_total_hours');
    }

    converter_days_between_title() {
        return this.v('converter_days_between_title');
    }

    converter_days_between_description() {
        return this.v('converter_days_between_description');
    }

    converter_days_between_start_date() {
        return this.v('converter_days_between_start_date');
    }

    converter_days_between_end_date() {
        return this.v('converter_days_between_end_date');
    }

    converter_days_between_result() {
        return this.v('converter_days_between_result');
    }

    converter_days_between_result_days() {
        return this.v('converter_days_between_result_days');
    }

    converter_days_between_result_weeks() {
        return this.v('converter_days_between_result_weeks');
    }

    converter_days_between_result_months() {
        return this.v('converter_days_between_result_months');
    }

    converter_days_between_result_years() {
        return this.v('converter_days_between_result_years');
    }

    converter_unix_timestamp_title() {
        return this.v('converter_unix_timestamp_title');
    }

    converter_unix_timestamp_description() {
        return this.v('converter_unix_timestamp_description');
    }

    converter_unix_timestamp_input_label() {
        return this.v('converter_unix_timestamp_input_label');
    }

    converter_unix_timestamp_result() {
        return this.v('converter_unix_timestamp_result');
    }

    converter_unix_timestamp_utc() {
        return this.v('converter_unix_timestamp_utc');
    }

    converter_unix_timestamp_iso() {
        return this.v('converter_unix_timestamp_iso');
    }

    converter_unix_timestamp_local() {
        return this.v('converter_unix_timestamp_local');
    }

    converter_unix_timestamp_seconds() {
        return this.v('converter_unix_timestamp_seconds');
    }

    converter_unix_timestamp_milliseconds() {
        return this.v('converter_unix_timestamp_milliseconds');
    }

    converter_day_of_week_title() {
        return this.v('converter_day_of_week_title');
    }

    converter_day_of_week_description() {
        return this.v('converter_day_of_week_description');
    }

    converter_day_of_week_input_date() {
        return this.v('converter_day_of_week_input_date');
    }

    converter_day_of_week_result() {
        return this.v('converter_day_of_week_result');
    }

    converter_day_of_week_day_of_year() {
        return this.v('converter_day_of_week_day_of_year');
    }

    converter_day_of_week_week_of_year() {
        return this.v('converter_day_of_week_week_of_year');
    }

    converter_how_old_title() {
        return this.v('converter_how_old_title');
    }

    converter_how_old_description() {
        return this.v('converter_how_old_description');
    }

    converter_how_old_result() {
        return this.v('converter_how_old_result');
    }

    converter_how_old_months() {
        return this.v('converter_how_old_months');
    }

    converter_how_old_weeks() {
        return this.v('converter_how_old_weeks');
    }

    converter_how_old_days() {
        return this.v('converter_how_old_days');
    }

    converter_how_old_hours() {
        return this.v('converter_how_old_hours');
    }

    converter_how_old_minutes() {
        return this.v('converter_how_old_minutes');
    }

    converter_how_old_seconds() {
        return this.v('converter_how_old_seconds');
    }

    converter_weeks_until_title() {
        return this.v('converter_weeks_until_title');
    }

    converter_weeks_until_description() {
        return this.v('converter_weeks_until_description');
    }

    converter_weeks_until_target_date() {
        return this.v('converter_weeks_until_target_date');
    }

    converter_weeks_until_result() {
        return this.v('converter_weeks_until_result');
    }

    converter_weeks_until_result_weeks() {
        return this.v('converter_weeks_until_result_weeks');
    }

    converter_weeks_until_result_days() {
        return this.v('converter_weeks_until_result_days');
    }

    converter_weeks_until_total_days() {
        return this.v('converter_weeks_until_total_days');
    }

    converter_leap_year_title() {
        return this.v('converter_leap_year_title');
    }

    converter_leap_year_description() {
        return this.v('converter_leap_year_description');
    }

    converter_leap_year_year() {
        return this.v('converter_leap_year_year');
    }

    converter_leap_year_result() {
        return this.v('converter_leap_year_result');
    }

    converter_leap_year_days_in_year() {
        return this.v('converter_leap_year_days_in_year');
    }

    converter_leap_year_next_leap() {
        return this.v('converter_leap_year_next_leap');
    }

    converter_leap_year_prev_leap() {
        return this.v('converter_leap_year_prev_leap');
    }

    converter_roman_numeral_title() {
        return this.v('converter_roman_numeral_title');
    }

    converter_roman_numeral_description() {
        return this.v('converter_roman_numeral_description');
    }

    converter_roman_numeral_input_number() {
        return this.v('converter_roman_numeral_input_number');
    }

    converter_roman_numeral_result() {
        return this.v('converter_roman_numeral_result');
    }

    converter_base_converter_title() {
        return this.v('converter_base_converter_title');
    }

    converter_base_converter_description() {
        return this.v('converter_base_converter_description');
    }

    converter_base_converter_input_decimal() {
        return this.v('converter_base_converter_input_decimal');
    }

    converter_base_converter_binary() {
        return this.v('converter_base_converter_binary');
    }

    converter_base_converter_octal() {
        return this.v('converter_base_converter_octal');
    }

    converter_base_converter_decimal() {
        return this.v('converter_base_converter_decimal');
    }

    converter_base_converter_hex() {
        return this.v('converter_base_converter_hex');
    }

    converter_percentage_title() {
        return this.v('converter_percentage_title');
    }

    converter_percentage_description() {
        return this.v('converter_percentage_description');
    }

    converter_percentage_percent() {
        return this.v('converter_percentage_percent');
    }

    converter_percentage_of_value() {
        return this.v('converter_percentage_of_value');
    }

    converter_percentage_result_value() {
        return this.v('converter_percentage_result_value');
    }

    converter_percentage_x_is_pct_of_y() {
        return this.v('converter_percentage_x_is_pct_of_y');
    }

    converter_percentage_increase() {
        return this.v('converter_percentage_increase');
    }

    converter_percentage_decrease() {
        return this.v('converter_percentage_decrease');
    }

    converter_fraction_decimal_title() {
        return this.v('converter_fraction_decimal_title');
    }

    converter_fraction_decimal_description() {
        return this.v('converter_fraction_decimal_description');
    }

    converter_fraction_decimal_numerator() {
        return this.v('converter_fraction_decimal_numerator');
    }

    converter_fraction_decimal_denominator() {
        return this.v('converter_fraction_decimal_denominator');
    }

    converter_fraction_decimal_result() {
        return this.v('converter_fraction_decimal_result');
    }

    converter_fraction_decimal_decimal() {
        return this.v('converter_fraction_decimal_decimal');
    }

    converter_fraction_decimal_percentage() {
        return this.v('converter_fraction_decimal_percentage');
    }

    converter_fraction_decimal_simplified() {
        return this.v('converter_fraction_decimal_simplified');
    }

    converter_scientific_notation_title() {
        return this.v('converter_scientific_notation_title');
    }

    converter_scientific_notation_description() {
        return this.v('converter_scientific_notation_description');
    }

    converter_scientific_notation_input_number() {
        return this.v('converter_scientific_notation_input_number');
    }

    converter_scientific_notation_result() {
        return this.v('converter_scientific_notation_result');
    }

    converter_scientific_notation_scientific() {
        return this.v('converter_scientific_notation_scientific');
    }

    converter_scientific_notation_engineering() {
        return this.v('converter_scientific_notation_engineering');
    }

    converter_scientific_notation_decimal() {
        return this.v('converter_scientific_notation_decimal');
    }

    converter_gcd_lcm_title() {
        return this.v('converter_gcd_lcm_title');
    }

    converter_gcd_lcm_description() {
        return this.v('converter_gcd_lcm_description');
    }

    converter_gcd_lcm_number_a() {
        return this.v('converter_gcd_lcm_number_a');
    }

    converter_gcd_lcm_number_b() {
        return this.v('converter_gcd_lcm_number_b');
    }

    converter_gcd_lcm_gcd() {
        return this.v('converter_gcd_lcm_gcd');
    }

    converter_gcd_lcm_lcm() {
        return this.v('converter_gcd_lcm_lcm');
    }

    converter_any_base_title() {
        return this.v('converter_any_base_title');
    }

    converter_any_base_description() {
        return this.v('converter_any_base_description');
    }

    converter_any_base_input_value() {
        return this.v('converter_any_base_input_value');
    }

    converter_any_base_from_base() {
        return this.v('converter_any_base_from_base');
    }

    converter_any_base_to_base() {
        return this.v('converter_any_base_to_base');
    }

    converter_any_base_result() {
        return this.v('converter_any_base_result');
    }

    converter_color_title() {
        return this.v('converter_color_title');
    }

    converter_color_description() {
        return this.v('converter_color_description');
    }

    converter_color_hex_input() {
        return this.v('converter_color_hex_input');
    }

    converter_color_result() {
        return this.v('converter_color_result');
    }

    converter_color_hex() {
        return this.v('converter_color_hex');
    }

    converter_color_rgb() {
        return this.v('converter_color_rgb');
    }

    converter_color_hsl() {
        return this.v('converter_color_hsl');
    }

    converter_color_css_rgb() {
        return this.v('converter_color_css_rgb');
    }

    converter_download_time_title() {
        return this.v('converter_download_time_title');
    }

    converter_download_time_description() {
        return this.v('converter_download_time_description');
    }

    converter_download_time_file_size() {
        return this.v('converter_download_time_file_size');
    }

    converter_download_time_speed() {
        return this.v('converter_download_time_speed');
    }

    converter_download_time_result() {
        return this.v('converter_download_time_result');
    }

    converter_download_time_total_seconds() {
        return this.v('converter_download_time_total_seconds');
    }

    converter_screen_ppi_title() {
        return this.v('converter_screen_ppi_title');
    }

    converter_screen_ppi_description() {
        return this.v('converter_screen_ppi_description');
    }

    converter_screen_ppi_width_px() {
        return this.v('converter_screen_ppi_width_px');
    }

    converter_screen_ppi_height_px() {
        return this.v('converter_screen_ppi_height_px');
    }

    converter_screen_ppi_diagonal() {
        return this.v('converter_screen_ppi_diagonal');
    }

    converter_screen_ppi_result_ppi() {
        return this.v('converter_screen_ppi_result_ppi');
    }

    converter_screen_ppi_dot_pitch() {
        return this.v('converter_screen_ppi_dot_pitch');
    }

    converter_screen_ppi_total_pixels() {
        return this.v('converter_screen_ppi_total_pixels');
    }

    converter_aspect_ratio_title() {
        return this.v('converter_aspect_ratio_title');
    }

    converter_aspect_ratio_description() {
        return this.v('converter_aspect_ratio_description');
    }

    converter_aspect_ratio_width() {
        return this.v('converter_aspect_ratio_width');
    }

    converter_aspect_ratio_height() {
        return this.v('converter_aspect_ratio_height');
    }

    converter_aspect_ratio_ratio() {
        return this.v('converter_aspect_ratio_ratio');
    }

    converter_aspect_ratio_decimal() {
        return this.v('converter_aspect_ratio_decimal');
    }

    converter_data_storage_title() {
        return this.v('converter_data_storage_title');
    }

    converter_data_storage_description() {
        return this.v('converter_data_storage_description');
    }

    converter_data_storage_input_value() {
        return this.v('converter_data_storage_input_value');
    }

    converter_data_storage_input_unit() {
        return this.v('converter_data_storage_input_unit');
    }

    converter_data_storage_bytes() {
        return this.v('converter_data_storage_bytes');
    }

    converter_data_storage_kb() {
        return this.v('converter_data_storage_kb');
    }

    converter_data_storage_mb() {
        return this.v('converter_data_storage_mb');
    }

    converter_data_storage_gb() {
        return this.v('converter_data_storage_gb');
    }

    converter_data_storage_tb() {
        return this.v('converter_data_storage_tb');
    }

    converter_data_storage_pb() {
        return this.v('converter_data_storage_pb');
    }

    converter_bandwidth_title() {
        return this.v('converter_bandwidth_title');
    }

    converter_bandwidth_description() {
        return this.v('converter_bandwidth_description');
    }

    converter_bandwidth_speed() {
        return this.v('converter_bandwidth_speed');
    }

    converter_bandwidth_mbps() {
        return this.v('converter_bandwidth_mbps');
    }

    converter_bandwidth_mbytes_s() {
        return this.v('converter_bandwidth_mbytes_s');
    }

    converter_bandwidth_gb_hour() {
        return this.v('converter_bandwidth_gb_hour');
    }

    converter_bandwidth_gb_minute() {
        return this.v('converter_bandwidth_gb_minute');
    }

    converter_megapixel_title() {
        return this.v('converter_megapixel_title');
    }

    converter_megapixel_description() {
        return this.v('converter_megapixel_description');
    }

    converter_megapixel_result() {
        return this.v('converter_megapixel_result');
    }

    converter_megapixel_uncompressed() {
        return this.v('converter_megapixel_uncompressed');
    }

    converter_megapixel_jpeg_approx() {
        return this.v('converter_megapixel_jpeg_approx');
    }

    converter_compound_interest_title() {
        return this.v('converter_compound_interest_title');
    }

    converter_compound_interest_description() {
        return this.v('converter_compound_interest_description');
    }

    converter_compound_interest_principal() {
        return this.v('converter_compound_interest_principal');
    }

    converter_compound_interest_rate() {
        return this.v('converter_compound_interest_rate');
    }

    converter_compound_interest_years() {
        return this.v('converter_compound_interest_years');
    }

    converter_compound_interest_frequency() {
        return this.v('converter_compound_interest_frequency');
    }

    converter_compound_interest_annually() {
        return this.v('converter_compound_interest_annually');
    }

    converter_compound_interest_quarterly() {
        return this.v('converter_compound_interest_quarterly');
    }

    converter_compound_interest_monthly() {
        return this.v('converter_compound_interest_monthly');
    }

    converter_compound_interest_daily() {
        return this.v('converter_compound_interest_daily');
    }

    converter_compound_interest_final_amount() {
        return this.v('converter_compound_interest_final_amount');
    }

    converter_compound_interest_total_interest() {
        return this.v('converter_compound_interest_total_interest');
    }

    converter_compound_interest_growth() {
        return this.v('converter_compound_interest_growth');
    }

    converter_mortgage_title() {
        return this.v('converter_mortgage_title');
    }

    converter_mortgage_description() {
        return this.v('converter_mortgage_description');
    }

    converter_mortgage_loan_amount() {
        return this.v('converter_mortgage_loan_amount');
    }

    converter_mortgage_interest_rate() {
        return this.v('converter_mortgage_interest_rate');
    }

    converter_mortgage_loan_term() {
        return this.v('converter_mortgage_loan_term');
    }

    converter_mortgage_monthly_payment() {
        return this.v('converter_mortgage_monthly_payment');
    }

    converter_mortgage_total_payment() {
        return this.v('converter_mortgage_total_payment');
    }

    converter_mortgage_total_interest() {
        return this.v('converter_mortgage_total_interest');
    }

    converter_loan_repayment_title() {
        return this.v('converter_loan_repayment_title');
    }

    converter_loan_repayment_description() {
        return this.v('converter_loan_repayment_description');
    }

    converter_loan_repayment_monthly_payment() {
        return this.v('converter_loan_repayment_monthly_payment');
    }

    converter_loan_repayment_months_to_payoff() {
        return this.v('converter_loan_repayment_months_to_payoff');
    }

    converter_loan_repayment_years() {
        return this.v('converter_loan_repayment_years');
    }

    converter_loan_repayment_total_paid() {
        return this.v('converter_loan_repayment_total_paid');
    }

    converter_loan_repayment_never() {
        return this.v('converter_loan_repayment_never');
    }

    converter_salary_hourly_title() {
        return this.v('converter_salary_hourly_title');
    }

    converter_salary_hourly_description() {
        return this.v('converter_salary_hourly_description');
    }

    converter_salary_hourly_annual_salary() {
        return this.v('converter_salary_hourly_annual_salary');
    }

    converter_salary_hourly_hours_per_week() {
        return this.v('converter_salary_hourly_hours_per_week');
    }

    converter_salary_hourly_weeks_per_year() {
        return this.v('converter_salary_hourly_weeks_per_year');
    }

    converter_salary_hourly_hourly() {
        return this.v('converter_salary_hourly_hourly');
    }

    converter_salary_hourly_daily() {
        return this.v('converter_salary_hourly_daily');
    }

    converter_salary_hourly_weekly() {
        return this.v('converter_salary_hourly_weekly');
    }

    converter_salary_hourly_biweekly() {
        return this.v('converter_salary_hourly_biweekly');
    }

    converter_salary_hourly_monthly() {
        return this.v('converter_salary_hourly_monthly');
    }

    converter_tip_title() {
        return this.v('converter_tip_title');
    }

    converter_tip_description() {
        return this.v('converter_tip_description');
    }

    converter_tip_bill_amount() {
        return this.v('converter_tip_bill_amount');
    }

    converter_tip_tip_percent() {
        return this.v('converter_tip_tip_percent');
    }

    converter_tip_split_between() {
        return this.v('converter_tip_split_between');
    }

    converter_tip_tip_amount() {
        return this.v('converter_tip_tip_amount');
    }

    converter_tip_total() {
        return this.v('converter_tip_total');
    }

    converter_tip_per_person() {
        return this.v('converter_tip_per_person');
    }

    converter_tip_tip_per_person() {
        return this.v('converter_tip_tip_per_person');
    }

    converter_inflation_title() {
        return this.v('converter_inflation_title');
    }

    converter_inflation_description() {
        return this.v('converter_inflation_description');
    }

    converter_inflation_amount() {
        return this.v('converter_inflation_amount');
    }

    converter_inflation_rate() {
        return this.v('converter_inflation_rate');
    }

    converter_inflation_future_cost() {
        return this.v('converter_inflation_future_cost');
    }

    converter_inflation_purchasing_power() {
        return this.v('converter_inflation_purchasing_power');
    }

    converter_inflation_lost_value() {
        return this.v('converter_inflation_lost_value');
    }

    converter_retirement_title() {
        return this.v('converter_retirement_title');
    }

    converter_retirement_description() {
        return this.v('converter_retirement_description');
    }

    converter_retirement_current_age() {
        return this.v('converter_retirement_current_age');
    }

    converter_retirement_retire_age() {
        return this.v('converter_retirement_retire_age');
    }

    converter_retirement_current_savings() {
        return this.v('converter_retirement_current_savings');
    }

    converter_retirement_monthly_contribution() {
        return this.v('converter_retirement_monthly_contribution');
    }

    converter_retirement_return_rate() {
        return this.v('converter_retirement_return_rate');
    }

    converter_retirement_total_savings() {
        return this.v('converter_retirement_total_savings');
    }

    converter_retirement_total_contributed() {
        return this.v('converter_retirement_total_contributed');
    }

    converter_retirement_total_interest() {
        return this.v('converter_retirement_total_interest');
    }

    converter_retirement_monthly_income() {
        return this.v('converter_retirement_monthly_income');
    }

    converter_simple_interest_title() {
        return this.v('converter_simple_interest_title');
    }

    converter_simple_interest_description() {
        return this.v('converter_simple_interest_description');
    }

    converter_simple_interest_interest() {
        return this.v('converter_simple_interest_interest');
    }

    converter_simple_interest_total() {
        return this.v('converter_simple_interest_total');
    }

    converter_shoe_size_title() {
        return this.v('converter_shoe_size_title');
    }

    converter_shoe_size_description() {
        return this.v('converter_shoe_size_description');
    }

    converter_shoe_size_us_size() {
        return this.v('converter_shoe_size_us_size');
    }

    converter_shoe_size_us() {
        return this.v('converter_shoe_size_us');
    }

    converter_shoe_size_eu() {
        return this.v('converter_shoe_size_eu');
    }

    converter_shoe_size_uk() {
        return this.v('converter_shoe_size_uk');
    }

    converter_shoe_size_jp_cm() {
        return this.v('converter_shoe_size_jp_cm');
    }

    converter_clothing_size_title() {
        return this.v('converter_clothing_size_title');
    }

    converter_clothing_size_description() {
        return this.v('converter_clothing_size_description');
    }

    converter_clothing_size_us_size() {
        return this.v('converter_clothing_size_us_size');
    }

    converter_clothing_size_us_uk_result() {
        return this.v('converter_clothing_size_us_uk_result');
    }

    converter_clothing_size_eu() {
        return this.v('converter_clothing_size_eu');
    }

    converter_clothing_size_uk() {
        return this.v('converter_clothing_size_uk');
    }

    converter_clothing_size_it() {
        return this.v('converter_clothing_size_it');
    }

    converter_clothing_size_chest() {
        return this.v('converter_clothing_size_chest');
    }

    converter_cooking_title() {
        return this.v('converter_cooking_title');
    }

    converter_cooking_description() {
        return this.v('converter_cooking_description');
    }

    converter_cooking_input_value() {
        return this.v('converter_cooking_input_value');
    }

    converter_cooking_input_unit() {
        return this.v('converter_cooking_input_unit');
    }

    converter_cooking_cup() {
        return this.v('converter_cooking_cup');
    }

    converter_cooking_tbsp() {
        return this.v('converter_cooking_tbsp');
    }

    converter_cooking_tsp() {
        return this.v('converter_cooking_tsp');
    }

    converter_cooking_ml() {
        return this.v('converter_cooking_ml');
    }

    converter_cooking_fl_oz() {
        return this.v('converter_cooking_fl_oz');
    }

    converter_reading_time_title() {
        return this.v('converter_reading_time_title');
    }

    converter_reading_time_description() {
        return this.v('converter_reading_time_description');
    }

    converter_reading_time_word_count() {
        return this.v('converter_reading_time_word_count');
    }

    converter_reading_time_speed() {
        return this.v('converter_reading_time_speed');
    }

    converter_reading_time_slow() {
        return this.v('converter_reading_time_slow');
    }

    converter_reading_time_average() {
        return this.v('converter_reading_time_average');
    }

    converter_reading_time_fast() {
        return this.v('converter_reading_time_fast');
    }

    converter_reading_time_result() {
        return this.v('converter_reading_time_result');
    }

    converter_reading_time_speaking_time() {
        return this.v('converter_reading_time_speaking_time');
    }

    converter_reading_time_pages() {
        return this.v('converter_reading_time_pages');
    }

    converter_fuel_efficiency_title() {
        return this.v('converter_fuel_efficiency_title');
    }

    converter_fuel_efficiency_description() {
        return this.v('converter_fuel_efficiency_description');
    }

    converter_fuel_efficiency_input_value() {
        return this.v('converter_fuel_efficiency_input_value');
    }

    converter_fuel_efficiency_input_unit() {
        return this.v('converter_fuel_efficiency_input_unit');
    }

    converter_fuel_efficiency_result() {
        return this.v('converter_fuel_efficiency_result');
    }

    converter_fuel_efficiency_l_100km() {
        return this.v('converter_fuel_efficiency_l_100km');
    }

    converter_fuel_efficiency_mpg_us() {
        return this.v('converter_fuel_efficiency_mpg_us');
    }

    converter_fuel_efficiency_mpg_uk() {
        return this.v('converter_fuel_efficiency_mpg_uk');
    }

    converter_fuel_efficiency_km_l() {
        return this.v('converter_fuel_efficiency_km_l');
    }

    converter_electricity_cost_title() {
        return this.v('converter_electricity_cost_title');
    }

    converter_electricity_cost_description() {
        return this.v('converter_electricity_cost_description');
    }

    converter_electricity_cost_watts() {
        return this.v('converter_electricity_cost_watts');
    }

    converter_electricity_cost_hours_per_day() {
        return this.v('converter_electricity_cost_hours_per_day');
    }

    converter_electricity_cost_price_kwh() {
        return this.v('converter_electricity_cost_price_kwh');
    }

    converter_electricity_cost_kwh_day() {
        return this.v('converter_electricity_cost_kwh_day');
    }

    converter_electricity_cost_daily_cost() {
        return this.v('converter_electricity_cost_daily_cost');
    }

    converter_electricity_cost_monthly_cost() {
        return this.v('converter_electricity_cost_monthly_cost');
    }

    converter_electricity_cost_yearly_cost() {
        return this.v('converter_electricity_cost_yearly_cost');
    }

    converter_paper_size_title() {
        return this.v('converter_paper_size_title');
    }

    converter_paper_size_description() {
        return this.v('converter_paper_size_description');
    }

    converter_paper_size_select_size() {
        return this.v('converter_paper_size_select_size');
    }

    converter_paper_size_mm() {
        return this.v('converter_paper_size_mm');
    }

    converter_paper_size_inches() {
        return this.v('converter_paper_size_inches');
    }

    converter_paper_size_cm() {
        return this.v('converter_paper_size_cm');
    }

    converter_running_pace_title() {
        return this.v('converter_running_pace_title');
    }

    converter_running_pace_description() {
        return this.v('converter_running_pace_description');
    }

    converter_running_pace_minutes() {
        return this.v('converter_running_pace_minutes');
    }

    converter_running_pace_seconds() {
        return this.v('converter_running_pace_seconds');
    }

    converter_running_pace_pace_unit() {
        return this.v('converter_running_pace_pace_unit');
    }

    converter_running_pace_per_km() {
        return this.v('converter_running_pace_per_km');
    }

    converter_running_pace_per_mile() {
        return this.v('converter_running_pace_per_mile');
    }

    converter_running_pace_speed_kmh() {
        return this.v('converter_running_pace_speed_kmh');
    }

    converter_running_pace_speed_mph() {
        return this.v('converter_running_pace_speed_mph');
    }

    converter_running_pace_five_k() {
        return this.v('converter_running_pace_five_k');
    }

    converter_running_pace_ten_k() {
        return this.v('converter_running_pace_ten_k');
    }

    converter_running_pace_marathon() {
        return this.v('converter_running_pace_marathon');
    }

    converter_heartbeats_title() {
        return this.v('converter_heartbeats_title');
    }

    converter_heartbeats_description() {
        return this.v('converter_heartbeats_description');
    }

    converter_heartbeats_avg_bpm() {
        return this.v('converter_heartbeats_avg_bpm');
    }

    converter_heartbeats_total() {
        return this.v('converter_heartbeats_total');
    }

    converter_heartbeats_per_day() {
        return this.v('converter_heartbeats_per_day');
    }

    converter_heartbeats_per_year() {
        return this.v('converter_heartbeats_per_year');
    }

    converter_heartbeats_remaining_80() {
        return this.v('converter_heartbeats_remaining_80');
    }

    converter_breaths_title() {
        return this.v('converter_breaths_title');
    }

    converter_breaths_description() {
        return this.v('converter_breaths_description');
    }

    converter_breaths_total() {
        return this.v('converter_breaths_total');
    }

    converter_breaths_per_day() {
        return this.v('converter_breaths_per_day');
    }

    converter_breaths_liters_of_air() {
        return this.v('converter_breaths_liters_of_air');
    }

    converter_breaths_kg_of_air() {
        return this.v('converter_breaths_kg_of_air');
    }

    converter_hair_growth_title() {
        return this.v('converter_hair_growth_title');
    }

    converter_hair_growth_description() {
        return this.v('converter_hair_growth_description');
    }

    converter_hair_growth_months() {
        return this.v('converter_hair_growth_months');
    }

    converter_hair_growth_growth_cm() {
        return this.v('converter_hair_growth_growth_cm');
    }

    converter_hair_growth_growth_inches() {
        return this.v('converter_hair_growth_growth_inches');
    }

    converter_hair_growth_per_day() {
        return this.v('converter_hair_growth_per_day');
    }

    converter_caffeine_title() {
        return this.v('converter_caffeine_title');
    }

    converter_caffeine_description() {
        return this.v('converter_caffeine_description');
    }

    converter_caffeine_drink_type() {
        return this.v('converter_caffeine_drink_type');
    }

    converter_caffeine_coffee() {
        return this.v('converter_caffeine_coffee');
    }

    converter_caffeine_espresso() {
        return this.v('converter_caffeine_espresso');
    }

    converter_caffeine_tea() {
        return this.v('converter_caffeine_tea');
    }

    converter_caffeine_energy_drink() {
        return this.v('converter_caffeine_energy_drink');
    }

    converter_caffeine_cola() {
        return this.v('converter_caffeine_cola');
    }

    converter_caffeine_matcha() {
        return this.v('converter_caffeine_matcha');
    }

    converter_caffeine_cups_per_day() {
        return this.v('converter_caffeine_cups_per_day');
    }

    converter_caffeine_total_mg() {
        return this.v('converter_caffeine_total_mg');
    }

    converter_caffeine_safe_limit() {
        return this.v('converter_caffeine_safe_limit');
    }

    converter_caffeine_percent_limit() {
        return this.v('converter_caffeine_percent_limit');
    }

    converter_caffeine_half_life() {
        return this.v('converter_caffeine_half_life');
    }

    converter_typing_speed_title() {
        return this.v('converter_typing_speed_title');
    }

    converter_typing_speed_description() {
        return this.v('converter_typing_speed_description');
    }

    converter_typing_speed_wpm() {
        return this.v('converter_typing_speed_wpm');
    }

    converter_typing_speed_cpm() {
        return this.v('converter_typing_speed_cpm');
    }

    converter_typing_speed_words_hour() {
        return this.v('converter_typing_speed_words_hour');
    }

    converter_typing_speed_pages_hour() {
        return this.v('converter_typing_speed_pages_hour');
    }

    converter_typing_speed_level() {
        return this.v('converter_typing_speed_level');
    }

    converter_typing_speed_beginner() {
        return this.v('converter_typing_speed_beginner');
    }

    converter_typing_speed_intermediate() {
        return this.v('converter_typing_speed_intermediate');
    }

    converter_typing_speed_advanced() {
        return this.v('converter_typing_speed_advanced');
    }

    converter_typing_speed_professional() {
        return this.v('converter_typing_speed_professional');
    }
}

export type LocalesKey = 'site_title'
    | 'site_description'
    | 'common_results'
    | 'common_back'
    | 'common_open'
    | 'common_calculate'
    | 'common_reset'
    | 'common_select_language'
    | 'common_go_to_converter'
    | 'common_yes'
    | 'common_no'
    | 'common_minutes'
    | 'common_hours'
    | 'common_human_years'
    | 'common_kcal_day'
    | 'common_sunday'
    | 'common_monday'
    | 'common_tuesday'
    | 'common_wednesday'
    | 'common_thursday'
    | 'common_friday'
    | 'common_saturday'
    | 'category_animal_age'
    | 'category_health'
    | 'category_space_science'
    | 'category_date_time'
    | 'category_math_numbers'
    | 'category_digital_tech'
    | 'category_finance'
    | 'category_everyday'
    | 'category_fun'
    | 'converter_common_gender'
    | 'converter_common_male'
    | 'converter_common_female'
    | 'converter_common_age'
    | 'converter_cat_years_title'
    | 'converter_cat_years_description'
    | 'converter_cat_years_input_label'
    | 'converter_cat_years_result_label'
    | 'converter_dog_years_title'
    | 'converter_dog_years_description'
    | 'converter_dog_years_input_label'
    | 'converter_dog_years_result_label'
    | 'converter_dog_years_size_label'
    | 'converter_dog_years_size_small'
    | 'converter_dog_years_size_medium'
    | 'converter_dog_years_size_large'
    | 'converter_horse_years_title'
    | 'converter_horse_years_description'
    | 'converter_horse_years_input_label'
    | 'converter_horse_years_result_label'
    | 'converter_rabbit_years_title'
    | 'converter_rabbit_years_description'
    | 'converter_rabbit_years_input_label'
    | 'converter_rabbit_years_result_label'
    | 'converter_hamster_years_title'
    | 'converter_hamster_years_description'
    | 'converter_hamster_years_input_label'
    | 'converter_hamster_years_result_label'
    | 'converter_parrot_years_title'
    | 'converter_parrot_years_description'
    | 'converter_parrot_years_input_label'
    | 'converter_parrot_years_result_label'
    | 'converter_fish_years_title'
    | 'converter_fish_years_description'
    | 'converter_fish_years_input_label'
    | 'converter_fish_years_result_label'
    | 'converter_turtle_years_title'
    | 'converter_turtle_years_description'
    | 'converter_turtle_years_input_label'
    | 'converter_turtle_years_result_label'
    | 'converter_bmi_title'
    | 'converter_bmi_description'
    | 'converter_bmi_weight_label'
    | 'converter_bmi_height_label'
    | 'converter_bmi_result_label'
    | 'converter_bmi_category_label'
    | 'converter_bmi_underweight'
    | 'converter_bmi_normal'
    | 'converter_bmi_overweight'
    | 'converter_bmi_obese'
    | 'converter_body_fat_title'
    | 'converter_body_fat_description'
    | 'converter_body_fat_waist'
    | 'converter_body_fat_neck'
    | 'converter_body_fat_hip'
    | 'converter_body_fat_result_label'
    | 'converter_ideal_weight_title'
    | 'converter_ideal_weight_description'
    | 'converter_ideal_weight_robinson'
    | 'converter_ideal_weight_miller'
    | 'converter_ideal_weight_devine'
    | 'converter_ideal_weight_average'
    | 'converter_bmr_title'
    | 'converter_bmr_description'
    | 'converter_bmr_result_label'
    | 'converter_tdee_title'
    | 'converter_tdee_description'
    | 'converter_tdee_activity_label'
    | 'converter_tdee_sedentary'
    | 'converter_tdee_light'
    | 'converter_tdee_moderate'
    | 'converter_tdee_active'
    | 'converter_tdee_very_active'
    | 'converter_tdee_result_label'
    | 'converter_tdee_bmr_label'
    | 'converter_pregnancy_title'
    | 'converter_pregnancy_description'
    | 'converter_pregnancy_last_period'
    | 'converter_pregnancy_due_date'
    | 'converter_pregnancy_weeks_pregnant'
    | 'converter_pregnancy_days_remaining'
    | 'converter_bac_title'
    | 'converter_bac_description'
    | 'converter_bac_drinks'
    | 'converter_bac_hours'
    | 'converter_bac_result_label'
    | 'converter_bac_status'
    | 'converter_bac_sober'
    | 'converter_bac_minimal'
    | 'converter_bac_buzzed'
    | 'converter_bac_impaired'
    | 'converter_water_intake_title'
    | 'converter_water_intake_description'
    | 'converter_water_intake_result_label'
    | 'converter_water_intake_glasses'
    | 'converter_heart_rate_title'
    | 'converter_heart_rate_description'
    | 'converter_heart_rate_max_hr'
    | 'converter_heart_rate_zone1'
    | 'converter_heart_rate_zone2'
    | 'converter_heart_rate_zone3'
    | 'converter_heart_rate_zone4'
    | 'converter_heart_rate_zone5'
    | 'converter_macro_title'
    | 'converter_macro_description'
    | 'converter_macro_calories_input'
    | 'converter_macro_goal'
    | 'converter_macro_balanced'
    | 'converter_macro_low_carb'
    | 'converter_macro_high_protein'
    | 'converter_macro_keto'
    | 'converter_macro_protein'
    | 'converter_macro_carbs'
    | 'converter_macro_fat'
    | 'converter_weight_planets_title'
    | 'converter_weight_planets_description'
    | 'converter_weight_planets_mercury'
    | 'converter_weight_planets_venus'
    | 'converter_weight_planets_mars'
    | 'converter_weight_planets_jupiter'
    | 'converter_weight_planets_saturn'
    | 'converter_weight_planets_uranus'
    | 'converter_weight_planets_neptune'
    | 'converter_weight_planets_moon'
    | 'converter_weight_planets_pluto'
    | 'converter_light_travel_title'
    | 'converter_light_travel_description'
    | 'converter_light_travel_distance'
    | 'converter_light_travel_result_years'
    | 'converter_light_travel_result_days'
    | 'converter_light_travel_result_hours'
    | 'converter_light_travel_result_minutes'
    | 'converter_light_travel_result_seconds'
    | 'converter_sound_distance_title'
    | 'converter_sound_distance_description'
    | 'converter_sound_distance_seconds_after'
    | 'converter_sound_distance_temp'
    | 'converter_sound_distance_result_meters'
    | 'converter_sound_distance_result_km'
    | 'converter_sound_distance_result_miles'
    | 'converter_sound_distance_speed'
    | 'converter_half_life_title'
    | 'converter_half_life_description'
    | 'converter_half_life_initial_amount'
    | 'converter_half_life_half_life_period'
    | 'converter_half_life_elapsed_time'
    | 'converter_half_life_remaining'
    | 'converter_half_life_decayed'
    | 'converter_half_life_half_lives_passed'
    | 'converter_half_life_percent_remaining'
    | 'converter_star_distance_title'
    | 'converter_star_distance_description'
    | 'converter_star_distance_light_years'
    | 'converter_star_distance_km'
    | 'converter_star_distance_miles'
    | 'converter_star_distance_au'
    | 'converter_star_distance_parsecs'
    | 'converter_exact_age_title'
    | 'converter_exact_age_description'
    | 'converter_exact_age_birth_date'
    | 'converter_exact_age_result'
    | 'converter_exact_age_years'
    | 'converter_exact_age_months'
    | 'converter_exact_age_days'
    | 'converter_exact_age_total_days'
    | 'converter_exact_age_total_weeks'
    | 'converter_exact_age_total_hours'
    | 'converter_days_between_title'
    | 'converter_days_between_description'
    | 'converter_days_between_start_date'
    | 'converter_days_between_end_date'
    | 'converter_days_between_result'
    | 'converter_days_between_result_days'
    | 'converter_days_between_result_weeks'
    | 'converter_days_between_result_months'
    | 'converter_days_between_result_years'
    | 'converter_unix_timestamp_title'
    | 'converter_unix_timestamp_description'
    | 'converter_unix_timestamp_input_label'
    | 'converter_unix_timestamp_result'
    | 'converter_unix_timestamp_utc'
    | 'converter_unix_timestamp_iso'
    | 'converter_unix_timestamp_local'
    | 'converter_unix_timestamp_seconds'
    | 'converter_unix_timestamp_milliseconds'
    | 'converter_day_of_week_title'
    | 'converter_day_of_week_description'
    | 'converter_day_of_week_input_date'
    | 'converter_day_of_week_result'
    | 'converter_day_of_week_day_of_year'
    | 'converter_day_of_week_week_of_year'
    | 'converter_how_old_title'
    | 'converter_how_old_description'
    | 'converter_how_old_result'
    | 'converter_how_old_months'
    | 'converter_how_old_weeks'
    | 'converter_how_old_days'
    | 'converter_how_old_hours'
    | 'converter_how_old_minutes'
    | 'converter_how_old_seconds'
    | 'converter_weeks_until_title'
    | 'converter_weeks_until_description'
    | 'converter_weeks_until_target_date'
    | 'converter_weeks_until_result'
    | 'converter_weeks_until_result_weeks'
    | 'converter_weeks_until_result_days'
    | 'converter_weeks_until_total_days'
    | 'converter_leap_year_title'
    | 'converter_leap_year_description'
    | 'converter_leap_year_year'
    | 'converter_leap_year_result'
    | 'converter_leap_year_days_in_year'
    | 'converter_leap_year_next_leap'
    | 'converter_leap_year_prev_leap'
    | 'converter_roman_numeral_title'
    | 'converter_roman_numeral_description'
    | 'converter_roman_numeral_input_number'
    | 'converter_roman_numeral_result'
    | 'converter_base_converter_title'
    | 'converter_base_converter_description'
    | 'converter_base_converter_input_decimal'
    | 'converter_base_converter_binary'
    | 'converter_base_converter_octal'
    | 'converter_base_converter_decimal'
    | 'converter_base_converter_hex'
    | 'converter_percentage_title'
    | 'converter_percentage_description'
    | 'converter_percentage_percent'
    | 'converter_percentage_of_value'
    | 'converter_percentage_result_value'
    | 'converter_percentage_x_is_pct_of_y'
    | 'converter_percentage_increase'
    | 'converter_percentage_decrease'
    | 'converter_fraction_decimal_title'
    | 'converter_fraction_decimal_description'
    | 'converter_fraction_decimal_numerator'
    | 'converter_fraction_decimal_denominator'
    | 'converter_fraction_decimal_result'
    | 'converter_fraction_decimal_decimal'
    | 'converter_fraction_decimal_percentage'
    | 'converter_fraction_decimal_simplified'
    | 'converter_scientific_notation_title'
    | 'converter_scientific_notation_description'
    | 'converter_scientific_notation_input_number'
    | 'converter_scientific_notation_result'
    | 'converter_scientific_notation_scientific'
    | 'converter_scientific_notation_engineering'
    | 'converter_scientific_notation_decimal'
    | 'converter_gcd_lcm_title'
    | 'converter_gcd_lcm_description'
    | 'converter_gcd_lcm_number_a'
    | 'converter_gcd_lcm_number_b'
    | 'converter_gcd_lcm_gcd'
    | 'converter_gcd_lcm_lcm'
    | 'converter_any_base_title'
    | 'converter_any_base_description'
    | 'converter_any_base_input_value'
    | 'converter_any_base_from_base'
    | 'converter_any_base_to_base'
    | 'converter_any_base_result'
    | 'converter_color_title'
    | 'converter_color_description'
    | 'converter_color_hex_input'
    | 'converter_color_result'
    | 'converter_color_hex'
    | 'converter_color_rgb'
    | 'converter_color_hsl'
    | 'converter_color_css_rgb'
    | 'converter_download_time_title'
    | 'converter_download_time_description'
    | 'converter_download_time_file_size'
    | 'converter_download_time_speed'
    | 'converter_download_time_result'
    | 'converter_download_time_total_seconds'
    | 'converter_screen_ppi_title'
    | 'converter_screen_ppi_description'
    | 'converter_screen_ppi_width_px'
    | 'converter_screen_ppi_height_px'
    | 'converter_screen_ppi_diagonal'
    | 'converter_screen_ppi_result_ppi'
    | 'converter_screen_ppi_dot_pitch'
    | 'converter_screen_ppi_total_pixels'
    | 'converter_aspect_ratio_title'
    | 'converter_aspect_ratio_description'
    | 'converter_aspect_ratio_width'
    | 'converter_aspect_ratio_height'
    | 'converter_aspect_ratio_ratio'
    | 'converter_aspect_ratio_decimal'
    | 'converter_data_storage_title'
    | 'converter_data_storage_description'
    | 'converter_data_storage_input_value'
    | 'converter_data_storage_input_unit'
    | 'converter_data_storage_bytes'
    | 'converter_data_storage_kb'
    | 'converter_data_storage_mb'
    | 'converter_data_storage_gb'
    | 'converter_data_storage_tb'
    | 'converter_data_storage_pb'
    | 'converter_bandwidth_title'
    | 'converter_bandwidth_description'
    | 'converter_bandwidth_speed'
    | 'converter_bandwidth_mbps'
    | 'converter_bandwidth_mbytes_s'
    | 'converter_bandwidth_gb_hour'
    | 'converter_bandwidth_gb_minute'
    | 'converter_megapixel_title'
    | 'converter_megapixel_description'
    | 'converter_megapixel_result'
    | 'converter_megapixel_uncompressed'
    | 'converter_megapixel_jpeg_approx'
    | 'converter_compound_interest_title'
    | 'converter_compound_interest_description'
    | 'converter_compound_interest_principal'
    | 'converter_compound_interest_rate'
    | 'converter_compound_interest_years'
    | 'converter_compound_interest_frequency'
    | 'converter_compound_interest_annually'
    | 'converter_compound_interest_quarterly'
    | 'converter_compound_interest_monthly'
    | 'converter_compound_interest_daily'
    | 'converter_compound_interest_final_amount'
    | 'converter_compound_interest_total_interest'
    | 'converter_compound_interest_growth'
    | 'converter_mortgage_title'
    | 'converter_mortgage_description'
    | 'converter_mortgage_loan_amount'
    | 'converter_mortgage_interest_rate'
    | 'converter_mortgage_loan_term'
    | 'converter_mortgage_monthly_payment'
    | 'converter_mortgage_total_payment'
    | 'converter_mortgage_total_interest'
    | 'converter_loan_repayment_title'
    | 'converter_loan_repayment_description'
    | 'converter_loan_repayment_monthly_payment'
    | 'converter_loan_repayment_months_to_payoff'
    | 'converter_loan_repayment_years'
    | 'converter_loan_repayment_total_paid'
    | 'converter_loan_repayment_never'
    | 'converter_salary_hourly_title'
    | 'converter_salary_hourly_description'
    | 'converter_salary_hourly_annual_salary'
    | 'converter_salary_hourly_hours_per_week'
    | 'converter_salary_hourly_weeks_per_year'
    | 'converter_salary_hourly_hourly'
    | 'converter_salary_hourly_daily'
    | 'converter_salary_hourly_weekly'
    | 'converter_salary_hourly_biweekly'
    | 'converter_salary_hourly_monthly'
    | 'converter_tip_title'
    | 'converter_tip_description'
    | 'converter_tip_bill_amount'
    | 'converter_tip_tip_percent'
    | 'converter_tip_split_between'
    | 'converter_tip_tip_amount'
    | 'converter_tip_total'
    | 'converter_tip_per_person'
    | 'converter_tip_tip_per_person'
    | 'converter_inflation_title'
    | 'converter_inflation_description'
    | 'converter_inflation_amount'
    | 'converter_inflation_rate'
    | 'converter_inflation_future_cost'
    | 'converter_inflation_purchasing_power'
    | 'converter_inflation_lost_value'
    | 'converter_retirement_title'
    | 'converter_retirement_description'
    | 'converter_retirement_current_age'
    | 'converter_retirement_retire_age'
    | 'converter_retirement_current_savings'
    | 'converter_retirement_monthly_contribution'
    | 'converter_retirement_return_rate'
    | 'converter_retirement_total_savings'
    | 'converter_retirement_total_contributed'
    | 'converter_retirement_total_interest'
    | 'converter_retirement_monthly_income'
    | 'converter_simple_interest_title'
    | 'converter_simple_interest_description'
    | 'converter_simple_interest_interest'
    | 'converter_simple_interest_total'
    | 'converter_shoe_size_title'
    | 'converter_shoe_size_description'
    | 'converter_shoe_size_us_size'
    | 'converter_shoe_size_us'
    | 'converter_shoe_size_eu'
    | 'converter_shoe_size_uk'
    | 'converter_shoe_size_jp_cm'
    | 'converter_clothing_size_title'
    | 'converter_clothing_size_description'
    | 'converter_clothing_size_us_size'
    | 'converter_clothing_size_us_uk_result'
    | 'converter_clothing_size_eu'
    | 'converter_clothing_size_uk'
    | 'converter_clothing_size_it'
    | 'converter_clothing_size_chest'
    | 'converter_cooking_title'
    | 'converter_cooking_description'
    | 'converter_cooking_input_value'
    | 'converter_cooking_input_unit'
    | 'converter_cooking_cup'
    | 'converter_cooking_tbsp'
    | 'converter_cooking_tsp'
    | 'converter_cooking_ml'
    | 'converter_cooking_fl_oz'
    | 'converter_reading_time_title'
    | 'converter_reading_time_description'
    | 'converter_reading_time_word_count'
    | 'converter_reading_time_speed'
    | 'converter_reading_time_slow'
    | 'converter_reading_time_average'
    | 'converter_reading_time_fast'
    | 'converter_reading_time_result'
    | 'converter_reading_time_speaking_time'
    | 'converter_reading_time_pages'
    | 'converter_fuel_efficiency_title'
    | 'converter_fuel_efficiency_description'
    | 'converter_fuel_efficiency_input_value'
    | 'converter_fuel_efficiency_input_unit'
    | 'converter_fuel_efficiency_result'
    | 'converter_fuel_efficiency_l_100km'
    | 'converter_fuel_efficiency_mpg_us'
    | 'converter_fuel_efficiency_mpg_uk'
    | 'converter_fuel_efficiency_km_l'
    | 'converter_electricity_cost_title'
    | 'converter_electricity_cost_description'
    | 'converter_electricity_cost_watts'
    | 'converter_electricity_cost_hours_per_day'
    | 'converter_electricity_cost_price_kwh'
    | 'converter_electricity_cost_kwh_day'
    | 'converter_electricity_cost_daily_cost'
    | 'converter_electricity_cost_monthly_cost'
    | 'converter_electricity_cost_yearly_cost'
    | 'converter_paper_size_title'
    | 'converter_paper_size_description'
    | 'converter_paper_size_select_size'
    | 'converter_paper_size_mm'
    | 'converter_paper_size_inches'
    | 'converter_paper_size_cm'
    | 'converter_running_pace_title'
    | 'converter_running_pace_description'
    | 'converter_running_pace_minutes'
    | 'converter_running_pace_seconds'
    | 'converter_running_pace_pace_unit'
    | 'converter_running_pace_per_km'
    | 'converter_running_pace_per_mile'
    | 'converter_running_pace_speed_kmh'
    | 'converter_running_pace_speed_mph'
    | 'converter_running_pace_five_k'
    | 'converter_running_pace_ten_k'
    | 'converter_running_pace_marathon'
    | 'converter_heartbeats_title'
    | 'converter_heartbeats_description'
    | 'converter_heartbeats_avg_bpm'
    | 'converter_heartbeats_total'
    | 'converter_heartbeats_per_day'
    | 'converter_heartbeats_per_year'
    | 'converter_heartbeats_remaining_80'
    | 'converter_breaths_title'
    | 'converter_breaths_description'
    | 'converter_breaths_total'
    | 'converter_breaths_per_day'
    | 'converter_breaths_liters_of_air'
    | 'converter_breaths_kg_of_air'
    | 'converter_hair_growth_title'
    | 'converter_hair_growth_description'
    | 'converter_hair_growth_months'
    | 'converter_hair_growth_growth_cm'
    | 'converter_hair_growth_growth_inches'
    | 'converter_hair_growth_per_day'
    | 'converter_caffeine_title'
    | 'converter_caffeine_description'
    | 'converter_caffeine_drink_type'
    | 'converter_caffeine_coffee'
    | 'converter_caffeine_espresso'
    | 'converter_caffeine_tea'
    | 'converter_caffeine_energy_drink'
    | 'converter_caffeine_cola'
    | 'converter_caffeine_matcha'
    | 'converter_caffeine_cups_per_day'
    | 'converter_caffeine_total_mg'
    | 'converter_caffeine_safe_limit'
    | 'converter_caffeine_percent_limit'
    | 'converter_caffeine_half_life'
    | 'converter_typing_speed_title'
    | 'converter_typing_speed_description'
    | 'converter_typing_speed_wpm'
    | 'converter_typing_speed_cpm'
    | 'converter_typing_speed_words_hour'
    | 'converter_typing_speed_pages_hour'
    | 'converter_typing_speed_level'
    | 'converter_typing_speed_beginner'
    | 'converter_typing_speed_intermediate'
    | 'converter_typing_speed_advanced'
    | 'converter_typing_speed_professional';
