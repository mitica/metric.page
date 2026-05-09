const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en.json'), 'utf8'));
const ro = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/ro.json'), 'utf8'));

const enKeys = new Set(Object.keys(en));
const roKeys = new Set(Object.keys(ro));

const missingInRo = [...enKeys].filter(k => !roKeys.has(k));
const missingInEn = [...roKeys].filter(k => !enKeys.has(k));

console.log('Keys missing in ro.json:', missingInRo);
console.log('Keys missing in en.json:', missingInEn);
