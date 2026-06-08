import { promises as fs } from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { localesProvider, languageCodes } from "../src/lib/locales";

const ROOT = path.resolve(__dirname, "..");
const FONT_CACHE = path.join(ROOT, "scripts", ".font-cache");
const OUT_DIR = path.join(ROOT, "public", "og");
const LOGO_PATH = path.join(ROOT, "public", "icon.svg");

const WIDTH = 1200;
const HEIGHT = 630;

// Font selection per language script
const FONT_FAMILY: Record<string, string> = {
  ar: "Noto Kufi Arabic",
  zh: "Noto Sans SC",
  ja: "Noto Sans JP",
  ko: "Noto Sans KR",
  th: "Noto Sans Thai",
  hi: "Noto Sans Devanagari",
};
const DEFAULT_FAMILY = "Noto Sans";

// Google Fonts v1 API + Wget UA returns one un-subsetted TTF per @font-face.
// Subsets are critical for CJK / non-Latin fonts — default returns a tiny placeholder.
const FONT_FAMILIES: Record<string, { name: string; subset: string }> = {
  "Noto Sans": {
    name: "Noto+Sans",
    subset: "latin,latin-ext,cyrillic,cyrillic-ext,greek,vietnamese",
  },
  "Noto Kufi Arabic": { name: "Noto+Kufi+Arabic", subset: "arabic" },
  "Noto Sans SC": { name: "Noto+Sans+SC", subset: "chinese-simplified" },
  "Noto Sans JP": { name: "Noto+Sans+JP", subset: "japanese" },
  "Noto Sans KR": { name: "Noto+Sans+KR", subset: "korean" },
  "Noto Sans Thai": { name: "Noto+Sans+Thai", subset: "thai" },
  "Noto Sans Devanagari": { name: "Noto+Sans+Devanagari", subset: "devanagari" },
};

function cssUrl(family: string, weight: number, subset: string): string {
  return `https://fonts.googleapis.com/css?family=${family}:${weight}&subset=${subset}`;
}

const TTF_UA = "Wget/1.21.3";

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

async function fetchFontTtf(family: string, weight: number, subset: string, cacheKey: string): Promise<Buffer> {
  await ensureDir(FONT_CACHE);
  const cachePath = path.join(FONT_CACHE, `${cacheKey}.ttf`);
  try {
    return await fs.readFile(cachePath);
  } catch {
    // not cached
  }
  const url = cssUrl(family, weight, subset);
  const cssRes = await fetch(url, { headers: { "User-Agent": TTF_UA } });
  const css = await cssRes.text();
  const match = css.match(/url\((https:\/\/[^)]+\.ttf)\)/);
  if (!match) {
    throw new Error(`No TTF url for ${family}:${weight}\n${css.slice(0, 400)}`);
  }
  const fontRes = await fetch(match[1]);
  const buf = Buffer.from(await fontRes.arrayBuffer());
  await fs.writeFile(cachePath, buf);
  return buf;
}

type LoadedFont = {
  name: string;
  data: Buffer;
  weight: 400 | 700;
  style: "normal";
};

async function loadFonts(): Promise<Map<string, LoadedFont[]>> {
  const map = new Map<string, LoadedFont[]>();
  for (const [family, cfg] of Object.entries(FONT_FAMILIES)) {
    const slug = family.replace(/\s+/g, "-").toLowerCase();
    const [regular, bold] = await Promise.all([
      fetchFontTtf(cfg.name, 400, cfg.subset, `${slug}-400`),
      fetchFontTtf(cfg.name, 700, cfg.subset, `${slug}-700`),
    ]);
    map.set(family, [
      { name: family, data: regular, weight: 400, style: "normal" },
      { name: family, data: bold, weight: 700, style: "normal" },
    ]);
    console.log(`  ${family} loaded (${regular.length + bold.length} bytes)`);
  }
  return map;
}

// Twemoji SVG lookup — converts an emoji string into a hex codepoint sequence.
function emojiCodepoints(emoji: string): string {
  const codepoints: string[] = [];
  for (const ch of emoji) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    // Twemoji omits variation selector U+FE0F in filenames for most emoji
    if (cp === 0xfe0f) continue;
    codepoints.push(cp.toString(16));
  }
  return codepoints.join("-");
}

const twemojiCache = new Map<string, string>();

async function fetchEmojiSvg(emoji: string): Promise<string | null> {
  const code = emojiCodepoints(emoji);
  if (!code) return null;
  if (twemojiCache.has(code)) return twemojiCache.get(code)!;
  const cacheFile = path.join(FONT_CACHE, `emoji-${code}.svg`);
  try {
    const cached = await fs.readFile(cacheFile, "utf8");
    twemojiCache.set(code, cached);
    return cached;
  } catch {
    // fetch
  }
  const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! emoji not found: ${emoji} (${code})`);
    return null;
  }
  const svg = await res.text();
  await fs.writeFile(cacheFile, svg, "utf8");
  twemojiCache.set(code, svg);
  return svg;
}

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function template({
  emojiDataUri,
  logoDataUri,
  title,
  fontFamily,
}: {
  emojiDataUri: string | null;
  logoDataUri: string;
  title: string;
  fontFamily: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #131326 50%, #0a1428 100%)",
        fontFamily,
        padding: "60px 80px",
        position: "relative",
      }}
    >
      {emojiDataUri ? (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          src={emojiDataUri}
          width={220}
          height={220}
          style={{ marginBottom: 40 }}
        />
      ) : (
        <div style={{ height: 220, marginBottom: 40 }} />
      )}
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "#ffffff",
          textAlign: "center",
          lineHeight: 1.15,
          maxWidth: 1000,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 32,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logoDataUri} width={40} height={40} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#ffffff", fontWeight: 700 }}>metric</span>
          <span style={{ color: "#0a84ff", fontWeight: 400 }}>.page</span>
        </div>
      </div>
    </div>
  );
}

async function main() {
  const startedAt = Date.now();

  const { allConverters } = await import("../src/converters/registry");

  // Positional args are converter slugs to render. No args → render all.
  // Usage: pnpm og                       (all converters, all languages)
  //        pnpm og image-to-pdf          (one slug)
  //        pnpm og image-to-pdf pdf-merge (multiple slugs)
  const slugFilter = process.argv.slice(2);
  const knownSlugs = new Set(allConverters.map((c) => c.slug));
  const unknown = slugFilter.filter((s) => !knownSlugs.has(s));
  if (unknown.length) {
    console.error(`Unknown slug(s): ${unknown.join(", ")}`);
    process.exit(1);
  }
  const converters = slugFilter.length
    ? allConverters.filter((c) => slugFilter.includes(c.slug))
    : allConverters;
  if (slugFilter.length) {
    console.log(`Filter: ${slugFilter.join(", ")} (${converters.length} converters)`);
  }

  console.log("Loading fonts…");
  const fontMap = await loadFonts();
  console.log(`  ${fontMap.size} font families ready.`);

  await ensureDir(OUT_DIR);

  const logoSvg = await fs.readFile(LOGO_PATH, "utf8");
  const logoDataUri = svgToDataUri(logoSvg);

  let count = 0;
  const total = converters.length * languageCodes.length;

  for (const lang of languageCodes) {
    const langDir = path.join(OUT_DIR, lang);
    await ensureDir(langDir);
    // Satori has a known bug with Arabic GSUB (substFormat: 3) shaping.
    // Fall back to English title for ar/ — og:title metadata is still localized.
    const renderLang = lang === "ar" ? "en" : lang;
    const family = FONT_FAMILY[renderLang] ?? DEFAULT_FAMILY;
    const fonts = [
      ...(fontMap.get(family) ?? []),
      ...(fontMap.get(DEFAULT_FAMILY) ?? []),
    ];
    const t = localesProvider.lang(renderLang);

    for (const converter of converters) {
      const title = t.v(converter.titleKey);
      const outPath = path.join(langDir, `${converter.slug}.png`);

      try {
        const emojiSvg = await fetchEmojiSvg(converter.icon);
        const emojiDataUri = emojiSvg ? svgToDataUri(emojiSvg) : null;

        const svg = await satori(
          template({ emojiDataUri, logoDataUri, title, fontFamily: family }),
          {
            width: WIDTH,
            height: HEIGHT,
            fonts,
          },
        );

        const png = new Resvg(svg, {
          background: "transparent",
          fitTo: { mode: "width", value: WIDTH },
        })
          .render()
          .asPng();

        await fs.writeFile(outPath, png);
      } catch (err) {
        console.warn(
          `  ! failed ${lang}/${converter.slug}: ${(err as Error).message}`,
        );
      }
      count++;
      if (count % 100 === 0 || count === total) {
        console.log(`  ${count}/${total}`);
      }
    }
  }

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(
    `Done. ${count} images in ${elapsed}s. Output: ${path.relative(ROOT, OUT_DIR)}/`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
