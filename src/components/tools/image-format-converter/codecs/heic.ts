// libheif-js loaded lazily — only when an actual HEIC file is dropped.
// `wasm-bundle` inlines the WASM binary so we don't need to ship a separate asset.

let libheifPromise: Promise<typeof import("libheif-js/wasm-bundle").default> | null = null;

function loadLibheif() {
  libheifPromise ??= import("libheif-js/wasm-bundle").then((mod) => mod.default);
  return libheifPromise;
}

export async function decodeHeic(file: File): Promise<ImageData> {
  const libheif = await loadLibheif();
  const buffer = new Uint8Array(await file.arrayBuffer());
  const decoder = new libheif.HeifDecoder();
  const images = decoder.decode(buffer);
  if (!images.length) throw new Error("HEIC file has no images");

  const image = images[0];
  const width = image.get_width();
  const height = image.get_height();

  // Allocate a target ImageData and let libheif fill it via its async callback.
  const target = new ImageData(width, height);
  await new Promise<void>((resolve, reject) => {
    image.display(target, (filled) => {
      if (!filled) reject(new Error("HEIF decoding failed"));
      else resolve();
    });
  });
  return target;
}
