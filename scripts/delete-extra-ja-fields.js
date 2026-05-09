// delete-extra-ja-fields.js
// Usage: node delete-extra-ja-fields.js
// This script removes any keys from ja.json that are not present in en.json.

const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../locales/en.json');
const jaPath = path.join(__dirname, '../locales/ja.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ja = JSON.parse(fs.readFileSync(jaPath, 'utf8'));

const cleaned = {};
for (const key of Object.keys(en)) {
  if (Object.prototype.hasOwnProperty.call(ja, key)) {
    cleaned[key] = ja[key];
  } else {
    cleaned[key] = '';
  }
}

fs.writeFileSync(jaPath, JSON.stringify(cleaned, null, 2) + '\n');
console.log('ja.json cleaned: only keys from en.json are kept.');
