const fs = require('fs');
const path = require('path');

// These converter_common_ keys that DON'T exist in en.json
// need to be mapped to their common_ equivalents
const mappings = {
  'converter_common_human_years': 'common_human_years',
  'converter_common_kcal_day': 'common_kcal_day',
  'converter_common_minutes': 'common_minutes',
  'converter_common_hours': 'common_hours',
  'converter_common_yes': 'common_yes',
  'converter_common_no': 'common_no',
  'converter_common_sunday': 'common_sunday',
  'converter_common_monday': 'common_monday',
  'converter_common_tuesday': 'common_tuesday',
  'converter_common_wednesday': 'common_wednesday',
  'converter_common_thursday': 'common_thursday',
  'converter_common_friday': 'common_friday',
  'converter_common_saturday': 'common_saturday',
};

const files = [
  'src/converters/animal-age/index.ts',
  'src/converters/health/index.ts',
  'src/converters/date-time/index.ts',
  'src/converters/everyday/index.ts',
  'src/converters/fun/index.ts',
];

for (const file of files) {
  const fp = path.resolve(file);
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;
  for (const [from, to] of Object.entries(mappings)) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('Fixed: ' + file);
  }
}
console.log('Done');
