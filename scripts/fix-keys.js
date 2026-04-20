const fs = require('fs');
const path = require('path');

const files = [
  'src/app/[lang]/[slug]/converter-page-client.tsx',
  'src/app/[lang]/page.tsx',
  'src/components/converter-card.tsx',
  'src/converters/animal-age/index.ts',
  'src/converters/date-time/index.ts',
  'src/converters/digital-tech/index.ts',
  'src/converters/everyday/index.ts',
  'src/converters/finance/index.ts',
  'src/converters/fun/index.ts',
  'src/converters/health/index.ts',
  'src/converters/math-numbers/index.ts',
  'src/converters/space-science/index.ts',
  'src/converters/types.ts',
  'src/lib/seo.ts',
];

let totalReplacements = 0;
for (const file of files) {
  const fp = path.resolve(file);
  if (fs.existsSync(fp) === false) continue;
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;
  content = content.replace(/"(converter|common|category|site)(\.[\w]+)+"/g, (match) => {
    return match.replace(/\./g, '_');
  });
  if (content !== original) {
    fs.writeFileSync(fp, content, 'utf8');
    const count = (original.match(/"(converter|common|category|site)(\.[\w]+)+"/g) || []).length;
    totalReplacements += count;
    console.log(file + ': ' + count + ' replacements');
  }
}
console.log('Total: ' + totalReplacements);
