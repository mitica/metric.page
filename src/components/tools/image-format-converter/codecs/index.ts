export type OutputFormat = "jpg" | "png" | "webp";

export interface DecodedImage {
  width: number;
  height: number;
  // Drawable source for a 2D canvas. Either an ImageBitmap (native decode)
  // or an ImageData (HEIC path, via libheif).
  source: ImageBitmap | ImageData;
}

const NATIVE_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/avif",
]);

export function isHeic(file: File): boolean {
  const name = file.name.toLowerCase();
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

export function isSupportedInput(file: File): boolean {
  return isHeic(file) || NATIVE_MIME.has(file.type) || file.type.startsWith("image/");
}

export async function decode(file: File): Promise<DecodedImage> {
  if (isHeic(file)) {
    const { decodeHeic } = await import("./heic");
    const data = await decodeHeic(file);
    return { width: data.width, height: data.height, source: data };
  }
  const bitmap = await createImageBitmap(file);
  return { width: bitmap.width, height: bitmap.height, source: bitmap };
}

const MIME: Record<OutputFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export function extensionFor(format: OutputFormat): string {
  return format === "jpg" ? "jpg" : format;
}

export async function encode(
  decoded: DecodedImage,
  format: OutputFormat,
  quality: number,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = decoded.width;
  canvas.height = decoded.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  if (decoded.source instanceof ImageData) {
    ctx.putImageData(decoded.source, 0, 0);
  } else {
    ctx.drawImage(decoded.source, 0, 0);
  }

  const mime = MIME[format];
  // PNG ignores quality; pass it anyway — browsers tolerate it.
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error(`Failed to encode ${format}`))),
      mime,
      quality,
    );
  });
}
