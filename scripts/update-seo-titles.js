// One-shot: overwrite the SEO titles for image-compressor and pdf-merge
// converters across all 22 locales. Existing scripts insert keys but never
// overwrite — this one is explicitly destructive on the two title keys.

const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "..", "locales");

const TITLES = {
  en: {
    converter_image_compressor_title:
      "Image Compressor — Compress JPG, PNG, WebP Online Free",
    converter_pdf_merge_title: "Merge PDF — Combine PDF Files Online, Free & Private",
  },
  es: {
    converter_image_compressor_title:
      "Compresor de Imágenes — Comprimir JPG, PNG, WebP Online Gratis",
    converter_pdf_merge_title: "Unir PDF — Combina Archivos PDF Online, Gratis y Privado",
  },
  fr: {
    converter_image_compressor_title:
      "Compresseur d'Images — Compresser JPG, PNG, WebP en Ligne Gratuit",
    converter_pdf_merge_title:
      "Fusionner PDF — Combiner des Fichiers PDF en Ligne, Gratuit",
  },
  de: {
    converter_image_compressor_title:
      "Bildkompressor — JPG, PNG, WebP Online Kostenlos Verkleinern",
    converter_pdf_merge_title: "PDF zusammenführen — PDF-Dateien Online Kostenlos Verbinden",
  },
  pt: {
    converter_image_compressor_title:
      "Compressor de Imagens — Comprimir JPG, PNG, WebP Online Grátis",
    converter_pdf_merge_title: "Juntar PDF — Combinar Arquivos PDF Online, Grátis e Privado",
  },
  it: {
    converter_image_compressor_title:
      "Compressore Immagini — Comprimi JPG, PNG, WebP Online Gratis",
    converter_pdf_merge_title: "Unisci PDF — Combina File PDF Online, Gratis e Privato",
  },
  nl: {
    converter_image_compressor_title:
      "Afbeeldingscompressor — JPG, PNG, WebP Online Gratis Verkleinen",
    converter_pdf_merge_title: "PDF Samenvoegen — Combineer PDF-bestanden Online, Gratis",
  },
  pl: {
    converter_image_compressor_title:
      "Kompresor Obrazów — Kompresuj JPG, PNG, WebP Online Za Darmo",
    converter_pdf_merge_title: "Łączenie PDF — Połącz Pliki PDF Online, Za Darmo i Prywatnie",
  },
  ro: {
    converter_image_compressor_title:
      "Compresor de Imagini — Comprimă JPG, PNG, WebP Online Gratis",
    converter_pdf_merge_title: "Îmbinare PDF — Combină Fișiere PDF Online, Gratis și Privat",
  },
  sv: {
    converter_image_compressor_title:
      "Bildkomprimerare — Komprimera JPG, PNG, WebP Online Gratis",
    converter_pdf_merge_title: "Slå ihop PDF — Kombinera PDF-filer Online, Gratis & Privat",
  },
  cs: {
    converter_image_compressor_title:
      "Kompresor Obrázků — Zmenšit JPG, PNG, WebP Online Zdarma",
    converter_pdf_merge_title: "Sloučit PDF — Spojit PDF Soubory Online, Zdarma a Soukromě",
  },
  uk: {
    converter_image_compressor_title:
      "Стискач Зображень — Стиснути JPG, PNG, WebP Онлайн Безкоштовно",
    converter_pdf_merge_title:
      "Об'єднати PDF — Поєднайте PDF Файли Онлайн, Безкоштовно",
  },
  tr: {
    converter_image_compressor_title:
      "Resim Sıkıştırıcı — JPG, PNG, WebP Online Ücretsiz Sıkıştır",
    converter_pdf_merge_title: "PDF Birleştir — PDF Dosyalarını Online Ücretsiz Birleştir",
  },
  ru: {
    converter_image_compressor_title:
      "Сжатие Изображений — Сжать JPG, PNG, WebP Онлайн Бесплатно",
    converter_pdf_merge_title: "Объединить PDF — Соединить PDF Файлы Онлайн Бесплатно",
  },
  ja: {
    converter_image_compressor_title: "画像圧縮 — JPG・PNG・WebPをオンラインで無料圧縮",
    converter_pdf_merge_title: "PDF結合 — PDFファイルをオンラインで無料結合",
  },
  ko: {
    converter_image_compressor_title: "이미지 압축기 — JPG, PNG, WebP 온라인 무료 압축",
    converter_pdf_merge_title: "PDF 병합 — PDF 파일 온라인 무료 합치기",
  },
  zh: {
    converter_image_compressor_title: "图片压缩 — 在线免费压缩 JPG、PNG、WebP",
    converter_pdf_merge_title: "PDF 合并 — 在线免费合并 PDF 文件",
  },
  hi: {
    converter_image_compressor_title:
      "इमेज कंप्रेसर — JPG, PNG, WebP ऑनलाइन मुफ़्त कंप्रेस करें",
    converter_pdf_merge_title: "PDF मर्ज — PDF फ़ाइलें ऑनलाइन मुफ़्त संयोजित करें",
  },
  ar: {
    converter_image_compressor_title: "ضاغط الصور — اضغط JPG وPNG وWebP أونلاين مجانًا",
    converter_pdf_merge_title: "دمج PDF — اجمع ملفات PDF أونلاين مجانًا",
  },
  th: {
    converter_image_compressor_title: "บีบอัดรูปภาพ — บีบอัด JPG, PNG, WebP ออนไลน์ฟรี",
    converter_pdf_merge_title: "รวม PDF — รวมไฟล์ PDF ออนไลน์ฟรี",
  },
  vi: {
    converter_image_compressor_title:
      "Nén Ảnh — Nén JPG, PNG, WebP Trực Tuyến Miễn Phí",
    converter_pdf_merge_title: "Ghép PDF — Gộp Tệp PDF Trực Tuyến, Miễn Phí",
  },
  id: {
    converter_image_compressor_title:
      "Kompresor Gambar — Kompres JPG, PNG, WebP Online Gratis",
    converter_pdf_merge_title: "Gabung PDF — Satukan File PDF Online, Gratis",
  },
};

let updated = 0;
for (const file of fs.readdirSync(LOCALES_DIR)) {
  if (!file.endsWith(".json")) continue;
  const lang = file.replace(/\.json$/, "");
  const titles = TITLES[lang];
  if (!titles) {
    console.warn(`No titles defined for ${lang}, skipping`);
    continue;
  }
  const filePath = path.join(LOCALES_DIR, file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let changed = false;
  for (const [key, value] of Object.entries(titles)) {
    if (json[key] !== value) {
      json[key] = value;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf8");
    console.log(`${lang}: updated`);
    updated++;
  } else {
    console.log(`${lang}: already up to date`);
  }
}
console.log(`\nDone: ${updated} files updated`);
