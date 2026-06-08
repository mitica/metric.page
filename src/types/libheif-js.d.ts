// Minimal local types for the high-level browser API. The package ships
// emscripten-generated low-level bindings (`libheif-wasm/libheif.d.ts`) that
// don't describe HeifDecoder, which is what we actually use here.
declare module "libheif-js/wasm-bundle" {
  interface HeifImage {
    get_width(): number;
    get_height(): number;
    display(
      target: ImageData,
      cb: (filled: ImageData | null) => void,
    ): void;
  }
  interface HeifDecoder {
    decode(buffer: Uint8Array): HeifImage[];
  }
  interface LibHeif {
    HeifDecoder: new () => HeifDecoder;
  }
  const libheif: LibHeif;
  export default libheif;
}
