// Quick test for converter calculation correctness
// Run with: node --import tsx/esm --tsconfig tsconfig.json scripts/test-converters.js

async function main() {
  const mod = await import('../src/converters/registry');
  const allConverters = mod.allConverters || mod.default?.allConverters;
  
  if (!allConverters) {
    console.log('Module exports:', Object.keys(mod));
    throw new Error('Could not find allConverters export');
  }
  let passed = 0;
  let failed = 0;
  const errors = [];

  for (const converter of allConverters) {
    try {
      // Build default inputs
      const inputs = {};
      for (const field of converter.inputs) {
        inputs[field.id] = field.defaultValue ?? (field.type === 'date' ? '2000-01-01' : field.type === 'text' ? 'test' : 0);
      }

      const results = converter.calculate(inputs);

      // Basic sanity checks
      if (!Array.isArray(results)) {
        throw new Error(`Expected array, got ${typeof results}`);
      }
      if (results.length === 0) {
        throw new Error('Empty results array');
      }
      for (const r of results) {
        if (!r.labelKey) throw new Error('Missing labelKey in result');
        if (r.value === undefined || r.value === null) throw new Error(`Missing value for ${r.labelKey}`);
        if (typeof r.value === 'number' && isNaN(r.value)) throw new Error(`NaN value for ${r.labelKey}`);
        if (typeof r.value === 'number' && !isFinite(r.value)) throw new Error(`Infinite value for ${r.labelKey}`);
      }

      passed++;
    } catch (e) {
      failed++;
      errors.push(`❌ ${converter.slug}: ${e.message}`);
    }
  }

  console.log(`\nConverter Test Results: ${passed}/${passed + failed} passed\n`);
  if (errors.length > 0) {
    console.log('Failures:');
    errors.forEach(e => console.log(e));
    process.exit(1);
  }
}

main();
