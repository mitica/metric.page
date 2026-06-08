import { ConverterConfig } from "../types";

export const filesMediaConverters: ConverterConfig[] = [
  {
    slug: "qr-code-generator",
    category: "files-media",
    icon: "🔲",
    titleKey: "converter_qr_code_generator_title",
    descriptionKey: "converter_qr_code_generator_description",
    tool: "qr-generator",
    keywords: ["qr", "qr code", "wifi qr", "url qr", "barcode"],
  },
  {
    slug: "image-format-converter",
    category: "files-media",
    icon: "🖼️",
    titleKey: "converter_image_format_converter_title",
    descriptionKey: "converter_image_format_converter_description",
    tool: "image-format-converter",
    keywords: ["heic to jpg", "heic to png", "webp converter", "image converter", "png to jpg"],
  },
];
