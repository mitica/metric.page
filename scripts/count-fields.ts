async function main() {
  const mod = await import('../src/converters/registry');
  const allConverters = mod.allConverters;
  for (const c of allConverters) {
    const inputs: Record<string, string | number> = {};
    for (const f of c.inputs) inputs[f.id] = f.defaultValue ?? (f.type === 'date' ? '2000-01-01' : 0);
    try {
      const r = c.calculate(inputs);
      if (r.length >= 4 || c.inputs.length >= 3) console.log(c.slug, 'inputs:', c.inputs.length, 'results:', r.length);
    } catch {}
  }
}
main();
