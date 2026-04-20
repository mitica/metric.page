import { ConverterConfig } from "../types";

export const compoundInterest: ConverterConfig = {
  slug: "compound-interest-calculator",
  category: "finance",
  icon: "📈",
  titleKey: "converter_compound_interest_title",
  descriptionKey: "converter_compound_interest_description",
  inputs: [
    { id: "principal", type: "number", labelKey: "converter_compound_interest_principal", min: 0, step: 100, defaultValue: 10000 },
    { id: "rate", type: "number", labelKey: "converter_compound_interest_rate", min: 0, max: 100, step: 0.1, defaultValue: 5, unit: "common_unit_percent" },
    { id: "years", type: "number", labelKey: "converter_compound_interest_years", min: 1, max: 100, step: 1, defaultValue: 10 },
    { id: "compound", type: "select", labelKey: "converter_compound_interest_frequency", defaultValue: "12", options: [
      { value: "1", labelKey: "converter_compound_interest_annually" },
      { value: "4", labelKey: "converter_compound_interest_quarterly" },
      { value: "12", labelKey: "converter_compound_interest_monthly" },
      { value: "365", labelKey: "converter_compound_interest_daily" },
    ]},
  ],
  calculate: (inputs) => {
    const p = Number(inputs.principal) || 0;
    const r = (Number(inputs.rate) || 0) / 100;
    const t = Number(inputs.years) || 0;
    const n = Number(inputs.compound) || 12;
    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;
    return [
      { labelKey: "converter_compound_interest_final_amount", value: Math.round(amount * 100) / 100 },
      { labelKey: "converter_compound_interest_total_interest", value: Math.round(interest * 100) / 100 },
      { labelKey: "converter_compound_interest_growth", value: `${Math.round((interest / p) * 10000) / 100}%` },
    ];
  },
};

export const mortgage: ConverterConfig = {
  slug: "mortgage-calculator",
  category: "finance",
  icon: "🏠",
  titleKey: "converter_mortgage_title",
  descriptionKey: "converter_mortgage_description",
  inputs: [
    { id: "principal", type: "number", labelKey: "converter_mortgage_loan_amount", min: 0, step: 1000, defaultValue: 300000 },
    { id: "rate", type: "number", labelKey: "converter_mortgage_interest_rate", min: 0, max: 30, step: 0.1, defaultValue: 3.5, unit: "common_unit_percent" },
    { id: "years", type: "number", labelKey: "converter_mortgage_loan_term", min: 1, max: 50, step: 1, defaultValue: 30 },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.principal) || 0;
    const annualRate = (Number(inputs.rate) || 0) / 100;
    const years = Number(inputs.years) || 1;
    const monthlyRate = annualRate / 12;
    const n = years * 12;
    let monthly: number;
    if (monthlyRate === 0) monthly = p / n;
    else monthly = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const total = monthly * n;
    const totalInterest = total - p;
    return [
      { labelKey: "converter_mortgage_monthly_payment", value: Math.round(monthly * 100) / 100 },
      { labelKey: "converter_mortgage_total_payment", value: Math.round(total * 100) / 100 },
      { labelKey: "converter_mortgage_total_interest", value: Math.round(totalInterest * 100) / 100 },
    ];
  },
};

export const loanRepayment: ConverterConfig = {
  slug: "loan-repayment-calculator",
  category: "finance",
  icon: "🏦",
  titleKey: "converter_loan_repayment_title",
  descriptionKey: "converter_loan_repayment_description",
  inputs: [
    { id: "principal", type: "number", labelKey: "converter_mortgage_loan_amount", min: 0, step: 100, defaultValue: 25000 },
    { id: "rate", type: "number", labelKey: "converter_mortgage_interest_rate", min: 0, max: 50, step: 0.1, defaultValue: 6.5, unit: "common_unit_percent" },
    { id: "monthly", type: "number", labelKey: "converter_loan_repayment_monthly_payment", min: 1, step: 10, defaultValue: 500 },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.principal) || 0;
    const annualRate = (Number(inputs.rate) || 0) / 100;
    const monthly = Number(inputs.monthly) || 1;
    const monthlyRate = annualRate / 12;
    if (monthlyRate === 0) {
      const months = Math.ceil(p / monthly);
      return [
        { labelKey: "converter_loan_repayment_months_to_payoff", value: months },
        { labelKey: "converter_loan_repayment_total_paid", value: Math.round(monthly * months * 100) / 100 },
        { labelKey: "converter_compound_interest_total_interest", value: 0 },
      ];
    }
    if (monthly <= p * monthlyRate) return [{ labelKey: "converter_loan_repayment_months_to_payoff", value: "converter_loan_repayment_never" }];
    const months = Math.ceil(-Math.log(1 - (p * monthlyRate) / monthly) / Math.log(1 + monthlyRate));
    const total = monthly * months;
    return [
      { labelKey: "converter_loan_repayment_months_to_payoff", value: months },
      { labelKey: "converter_loan_repayment_years", value: Math.round(months / 12 * 10) / 10 },
      { labelKey: "converter_loan_repayment_total_paid", value: Math.round(total * 100) / 100 },
      { labelKey: "converter_compound_interest_total_interest", value: Math.round((total - p) * 100) / 100 },
    ];
  },
};

export const salaryHourly: ConverterConfig = {
  slug: "salary-hourly-converter",
  category: "finance",
  icon: "💵",
  titleKey: "converter_salary_hourly_title",
  descriptionKey: "converter_salary_hourly_description",
  inputs: [
    { id: "salary", type: "number", labelKey: "converter_salary_hourly_annual_salary", min: 0, step: 1000, defaultValue: 60000 },
    { id: "hoursPerWeek", type: "number", labelKey: "converter_salary_hourly_hours_per_week", min: 1, max: 80, step: 1, defaultValue: 40 },
    { id: "weeksPerYear", type: "number", labelKey: "converter_salary_hourly_weeks_per_year", min: 1, max: 52, step: 1, defaultValue: 52 },
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.salary) || 0;
    const hpw = Number(inputs.hoursPerWeek) || 40;
    const wpy = Number(inputs.weeksPerYear) || 52;
    const hourly = salary / (hpw * wpy);
    const monthly = salary / 12;
    const biweekly = salary / 26;
    const weekly = salary / wpy;
    const daily = weekly / 5;
    return [
      { labelKey: "converter_salary_hourly_hourly", value: Math.round(hourly * 100) / 100 },
      { labelKey: "converter_salary_hourly_daily", value: Math.round(daily * 100) / 100 },
      { labelKey: "converter_salary_hourly_weekly", value: Math.round(weekly * 100) / 100 },
      { labelKey: "converter_salary_hourly_biweekly", value: Math.round(biweekly * 100) / 100 },
      { labelKey: "converter_salary_hourly_monthly", value: Math.round(monthly * 100) / 100 },
    ];
  },
};

export const tipCalculator: ConverterConfig = {
  slug: "tip-calculator",
  category: "finance",
  icon: "🧾",
  titleKey: "converter_tip_title",
  descriptionKey: "converter_tip_description",
  inputs: [
    { id: "bill", type: "number", labelKey: "converter_tip_bill_amount", min: 0, step: 0.5, defaultValue: 65 },
    { id: "tipPercent", type: "number", labelKey: "converter_tip_tip_percent", min: 0, max: 100, step: 1, defaultValue: 18, unit: "common_unit_percent" },
    { id: "people", type: "number", labelKey: "converter_tip_split_between", min: 1, max: 50, step: 1, defaultValue: 2 },
  ],
  calculate: (inputs) => {
    const bill = Number(inputs.bill) || 0;
    const tipPct = Number(inputs.tipPercent) || 0;
    const people = Number(inputs.people) || 1;
    const tipAmount = bill * (tipPct / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;
    return [
      { labelKey: "converter_tip_tip_amount", value: Math.round(tipAmount * 100) / 100 },
      { labelKey: "converter_tip_total", value: Math.round(total * 100) / 100 },
      { labelKey: "converter_tip_per_person", value: Math.round(perPerson * 100) / 100 },
      { labelKey: "converter_tip_tip_per_person", value: Math.round(tipPerPerson * 100) / 100 },
    ];
  },
};

export const inflation: ConverterConfig = {
  slug: "inflation-calculator",
  category: "finance",
  icon: "📉",
  titleKey: "converter_inflation_title",
  descriptionKey: "converter_inflation_description",
  inputs: [
    { id: "amount", type: "number", labelKey: "converter_inflation_amount", min: 0, step: 100, defaultValue: 1000 },
    { id: "rate", type: "number", labelKey: "converter_inflation_rate", min: 0, max: 50, step: 0.1, defaultValue: 3, unit: "common_unit_percent" },
    { id: "years", type: "number", labelKey: "converter_compound_interest_years", min: 1, max: 100, step: 1, defaultValue: 10 },
  ],
  calculate: (inputs) => {
    const amount = Number(inputs.amount) || 0;
    const rate = (Number(inputs.rate) || 0) / 100;
    const years = Number(inputs.years) || 0;
    const futureValue = amount * Math.pow(1 + rate, years);
    const purchasingPower = amount / Math.pow(1 + rate, years);
    const lostValue = amount - purchasingPower;
    return [
      { labelKey: "converter_inflation_future_cost", value: Math.round(futureValue * 100) / 100 },
      { labelKey: "converter_inflation_purchasing_power", value: Math.round(purchasingPower * 100) / 100 },
      { labelKey: "converter_inflation_lost_value", value: Math.round(lostValue * 100) / 100 },
    ];
  },
};

export const retirement: ConverterConfig = {
  slug: "retirement-savings-calculator",
  category: "finance",
  icon: "🏖️",
  titleKey: "converter_retirement_title",
  descriptionKey: "converter_retirement_description",
  inputs: [
    { id: "currentAge", type: "number", labelKey: "converter_retirement_current_age", min: 18, max: 80, step: 1, defaultValue: 30 },
    { id: "retireAge", type: "number", labelKey: "converter_retirement_retire_age", min: 30, max: 90, step: 1, defaultValue: 65 },
    { id: "currentSavings", type: "number", labelKey: "converter_retirement_current_savings", min: 0, step: 1000, defaultValue: 50000 },
    { id: "monthlyContribution", type: "number", labelKey: "converter_retirement_monthly_contribution", min: 0, step: 50, defaultValue: 500 },
    { id: "returnRate", type: "number", labelKey: "converter_retirement_return_rate", min: 0, max: 20, step: 0.1, defaultValue: 7, unit: "common_unit_percent" },
  ],
  calculate: (inputs) => {
    const years = Math.max(0, Number(inputs.retireAge) - Number(inputs.currentAge));
    const current = Number(inputs.currentSavings) || 0;
    const monthly = Number(inputs.monthlyContribution) || 0;
    const rate = (Number(inputs.returnRate) || 0) / 100;
    const monthlyRate = rate / 12;
    const months = years * 12;
    let total: number;
    if (monthlyRate === 0) total = current + monthly * months;
    else total = current * Math.pow(1 + monthlyRate, months) + monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalContributed = current + monthly * months;
    const totalInterest = total - totalContributed;
    return [
      { labelKey: "converter_retirement_total_savings", value: Math.round(total) },
      { labelKey: "converter_retirement_total_contributed", value: Math.round(totalContributed) },
      { labelKey: "converter_retirement_total_interest", value: Math.round(totalInterest) },
      { labelKey: "converter_retirement_monthly_income", value: Math.round(total / (25 * 12)) },
    ];
  },
};

export const simpleInterest: ConverterConfig = {
  slug: "simple-interest-calculator",
  category: "finance",
  icon: "🏛️",
  titleKey: "converter_simple_interest_title",
  descriptionKey: "converter_simple_interest_description",
  inputs: [
    { id: "principal", type: "number", labelKey: "converter_compound_interest_principal", min: 0, step: 100, defaultValue: 10000 },
    { id: "rate", type: "number", labelKey: "converter_compound_interest_rate", min: 0, max: 100, step: 0.1, defaultValue: 5, unit: "common_unit_percent" },
    { id: "years", type: "number", labelKey: "converter_compound_interest_years", min: 0, max: 100, step: 1, defaultValue: 5 },
  ],
  calculate: (inputs) => {
    const p = Number(inputs.principal) || 0;
    const r = (Number(inputs.rate) || 0) / 100;
    const t = Number(inputs.years) || 0;
    const interest = p * r * t;
    const total = p + interest;
    return [
      { labelKey: "converter_simple_interest_interest", value: Math.round(interest * 100) / 100 },
      { labelKey: "converter_simple_interest_total", value: Math.round(total * 100) / 100 },
    ];
  },
};

export const financeConverters = [compoundInterest, mortgage, loanRepayment, salaryHourly, tipCalculator, inflation, retirement, simpleInterest];
