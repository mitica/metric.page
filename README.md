# metric.page

metric.page is a multilingual converter and calculator web app built with Next.js App Router.

- 66 converter tools across 9 categories
- Static export ready (`output: "export"`)
- Localized UI with locale keys and generated locale types
- PWA-ready manifest + icons + service worker registration

## Stack

- Next.js 16.2.4
- React 19
- TypeScript 5
- Tailwind CSS 4
- localizy (`locales` -> generated typed locale file)

## Features

- Fast static pages suitable for CDN hosting
- Strongly typed converter schema (`ConverterConfig`, `InputField`, `ResultField`)
- Locale-key-driven labels, units, titles, and descriptions
- Category grouping and slug-based converter routing
- PWA assets:
	- `public/manifest.webmanifest`
	- `public/icon-192.png`
	- `public/icon-512.png`
	- `public/icon-maskable-512.png`
	- `public/apple-touch-icon.png`
	- `public/sw.js`

## Project Structure

```text
src/
	app/
		[lang]/
			[slug]/
	components/
	converters/
		animal-age/
		health/
		space-science/
		date-time/
		math-numbers/
		digital-tech/
		finance/
		everyday/
		fun/
		registry.ts
		types.ts
	lib/
		locales/

locales/
public/
scripts/
```

## Development

Install dependencies:

```bash
pnpm install
```

Start dev server:

```bash
pnpm dev
```

The app runs on:

- `http://localhost:3000`
- `http://0.0.0.0:3000` (LAN access)

## Scripts

```bash
pnpm dev        # Run local development server
pnpm build      # Production build + static export output
pnpm start      # Start production server (when applicable)
pnpm lint       # ESLint
pnpm locales    # Regenerate typed locale bindings
```

Optional converter smoke test:

```bash
npx tsx scripts/test-converters.js
```

## Localization

Locale files live under `locales/`.

To regenerate the typed locale accessor file:

```bash
pnpm locales
```

This writes:

- `src/lib/locales/generated-locales.ts`

## Build and Deploy

Create a production build:

```bash
pnpm build
```

Because the project uses static export (`next.config.ts` -> `output: "export"`), deploy the generated `out/` directory to static hosting.

## PWA Notes

The project includes manifest metadata and icon sets for installability. On local testing, PWA install behavior depends on browser rules and caching.

If icon/manifest changes do not appear immediately:

- hard refresh
- clear site data
- reopen the tab/browser

## Troubleshooting

- If dev cache gets corrupted:

```bash
rm -rf .next && pnpm dev
```

- If port conflicts occur, stop existing Next.js processes and restart dev.
