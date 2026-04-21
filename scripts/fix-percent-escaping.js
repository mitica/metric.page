const fs = require('fs');
const path = require('path');

const keysToFix = [
  'common_unit_percent',
  'converter_caffeine_percent_limit',
  'converter_percentage_x_is_pct_of_y',
  'converter_retirement_monthly_income',
];

const dir = 'locales';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
let total = 0;

for (const file of files) {
  const fp = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let changed = false;
  for (const key of keysToFix) {
    if (data[key] && typeof data[key] === 'string') {
      // Replace lone % (not already %% and not valid sprintf specifiers like %d/%s etc.) with %%
      const fixed = data[key].replace(/%(?![%dsfiobxXeEgG])/g, '%%');
      if (fixed !== data[key]) {
        console.log(file + ' [' + key + ']: ' + JSON.stringify(data[key]) + ' -> ' + JSON.stringify(fixed));
        data[key] = fixed;
        changed = true;
        total++;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
  }
}
console.log('Done. Fixed ' + total + ' values.');
