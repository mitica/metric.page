<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# metric.page

Multilingual static converter/calculator site. See [README.md](README.md) and [TECH.md](TECH.md) for product and stack overview.

## Stack

- Next.js 16.2.4 (App Router) — exported as a static site (`output: "export"` in [next.config.ts](next.config.ts))
- React 19, TypeScript 5 (strict), Tailwind CSS 4
- [localizy](https://www.npmjs.com/package/localizy) for typed i18n
- pnpm (workspace configured, see [pnpm-workspace.yaml](pnpm-workspace.yaml))

## Commands

```bash
pnpm dev        # local dev server on 0.0.0.0:3000
pnpm build      # static export to out/
pnpm lint       # eslint
pnpm locales    # regenerate src/lib/locales/generated-locales.ts from locales/*.json
```

## Hard constraints (static export)

- **No server runtime.** No API routes, no Route Handlers, no Server Actions, no `revalidate`, no `dynamic = "force-dynamic"`, no middleware, no `next/image` optimization (`images.unoptimized: true`). Anything requiring a server will fail the build.
- **All routes must be statically generable.** Dynamic segments (`[lang]`, `[slug]`) must implement `generateStaticParams`.
- **Trailing slashes** are on — internal links should reflect this.

## Layout

- [src/app/[lang]/[slug]/](src/app/[lang]/[slug]/) — per-language, per-converter page
- [src/components/](src/components/) — UI (converter card, input, list, header/footer, PWA register)
- [src/converters/](src/converters/) — one folder per category; each exports an array of `ConverterConfig`. Aggregated in [registry.ts](src/converters/registry.ts).
- [src/lib/locales/](src/lib/locales/) — locale provider + generated types
- [locales/](locales/) — source-of-truth JSON per language (22 langs)
- Path alias: `@/*` → `src/*`

## Adding or editing a converter

1. Add/modify the `ConverterConfig` in the matching category folder under [src/converters/](src/converters/). Shape is in [types.ts](src/converters/types.ts).
2. If the array is new, re-export it from [registry.ts](src/converters/registry.ts).
3. Every `labelKey` / `titleKey` / `descriptionKey` must exist in [locales/en.json](locales/en.json) (English is the fallback — see [provider.ts](src/lib/locales/provider.ts)) and ideally in all other locales.
4. After editing locale JSON files, run `pnpm locales` to regenerate the typed key union. **Do not hand-edit `src/lib/locales/generated-locales.ts`** — it is generated.
5. Smoke-check with `npx tsx scripts/test-converters.js` if math changed.

## Locale gotchas

- Missing keys silently fall back to English (`throwUndefinedKey: false`), so TypeScript is the main safety net — keep `pnpm locales` current.
- Helper scripts for locale maintenance live in [scripts/](scripts/) (`diff-locale-keys.js`, `fix-keys.js`, `fix-percent-escaping.js`, etc.). Prefer these over ad-hoc edits across 22 files.

## Don't

- Don't commit `.next/`, `out/`, or `node_modules/`.
- Don't introduce server-only Next.js features (see constraints above).
- Don't add a dependency without checking it works under static export.
- Don't bypass typed locale keys with string casts — fix the locale data instead.
