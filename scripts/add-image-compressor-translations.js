// One-shot: insert the image-compressor converter translations into every
// locale file. Safe to re-run: existing values are preserved.

const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "..", "locales");

const KEYS = [
  "converter_image_compressor_title",
  "converter_image_compressor_description",
  "compress_privacy_notice",
  "compress_format_keep",
  "compress_resize_max_width",
  "compress_resize_off",
  "image_compressing",
];

// Appends after the previous final files-media key. Anchor is the last existing
// key in every locale (see add-files-media-translations.js).
const ANCHOR = "image_converting";

const T = {
  en: {
    converter_image_compressor_title: "Image Compressor — Reduce JPG, PNG, WebP File Size",
    converter_image_compressor_description:
      "Compress JPG, PNG, HEIC and WebP images in your browser. Shrink photos up to 90%% — no upload, no signup, 100%% private.",
    compress_privacy_notice: "Images are compressed in your browser. Nothing is uploaded.",
    compress_format_keep: "Keep original",
    compress_resize_max_width: "Max width (px)",
    compress_resize_off: "No resize",
    image_compressing: "Compressing…",
  },
  es: {
    converter_image_compressor_title: "Compresor de Imágenes — Reducir JPG, PNG, WebP",
    converter_image_compressor_description:
      "Comprime imágenes JPG, PNG, HEIC y WebP en tu navegador. Reduce fotos hasta un 90%% — sin subir, sin registro, 100%% privado.",
    compress_privacy_notice: "Las imágenes se comprimen en tu navegador. Nada se sube.",
    compress_format_keep: "Mantener original",
    compress_resize_max_width: "Ancho máximo (px)",
    compress_resize_off: "Sin redimensionar",
    image_compressing: "Comprimiendo…",
  },
  fr: {
    converter_image_compressor_title: "Compresseur d'Images — Réduire JPG, PNG, WebP",
    converter_image_compressor_description:
      "Compressez vos images JPG, PNG, HEIC et WebP dans votre navigateur. Réduisez vos photos jusqu'à 90%% — sans envoi, sans inscription, 100%% privé.",
    compress_privacy_notice: "Les images sont compressées dans votre navigateur. Rien n'est envoyé.",
    compress_format_keep: "Garder l'original",
    compress_resize_max_width: "Largeur max (px)",
    compress_resize_off: "Pas de redimensionnement",
    image_compressing: "Compression…",
  },
  de: {
    converter_image_compressor_title: "Bildkompressor — JPG, PNG, WebP verkleinern",
    converter_image_compressor_description:
      "Komprimiere JPG-, PNG-, HEIC- und WebP-Bilder direkt im Browser. Verkleinere Fotos um bis zu 90%% — kein Upload, keine Anmeldung, 100%% privat.",
    compress_privacy_notice: "Bilder werden in deinem Browser komprimiert. Nichts wird hochgeladen.",
    compress_format_keep: "Original behalten",
    compress_resize_max_width: "Max. Breite (px)",
    compress_resize_off: "Keine Größenänderung",
    image_compressing: "Komprimiere…",
  },
  pt: {
    converter_image_compressor_title: "Compressor de Imagens — Reduzir JPG, PNG, WebP",
    converter_image_compressor_description:
      "Comprima imagens JPG, PNG, HEIC e WebP no seu navegador. Reduza fotos em até 90%% — sem upload, sem cadastro, 100%% privado.",
    compress_privacy_notice: "As imagens são comprimidas no seu navegador. Nada é enviado.",
    compress_format_keep: "Manter original",
    compress_resize_max_width: "Largura máx (px)",
    compress_resize_off: "Sem redimensionar",
    image_compressing: "Comprimindo…",
  },
  it: {
    converter_image_compressor_title: "Compressore Immagini — Ridurre JPG, PNG, WebP",
    converter_image_compressor_description:
      "Comprimi immagini JPG, PNG, HEIC e WebP nel browser. Riduci le foto fino al 90%% — senza caricamento, senza registrazione, 100%% privato.",
    compress_privacy_notice: "Le immagini vengono compresse nel browser. Nulla viene caricato.",
    compress_format_keep: "Mantieni originale",
    compress_resize_max_width: "Larghezza max (px)",
    compress_resize_off: "Nessun ridimensionamento",
    image_compressing: "Compressione…",
  },
  nl: {
    converter_image_compressor_title: "Afbeeldingscompressor — JPG, PNG, WebP verkleinen",
    converter_image_compressor_description:
      "Comprimeer JPG-, PNG-, HEIC- en WebP-afbeeldingen in je browser. Verklein foto's tot 90%% — geen upload, geen aanmelding, 100%% privé.",
    compress_privacy_notice: "Afbeeldingen worden in je browser gecomprimeerd. Niets wordt geüpload.",
    compress_format_keep: "Origineel behouden",
    compress_resize_max_width: "Max breedte (px)",
    compress_resize_off: "Niet schalen",
    image_compressing: "Comprimeren…",
  },
  pl: {
    converter_image_compressor_title: "Kompresor Obrazów — Zmniejsz JPG, PNG, WebP",
    converter_image_compressor_description:
      "Kompresuj obrazy JPG, PNG, HEIC i WebP w przeglądarce. Zmniejsz zdjęcia nawet o 90%% — bez przesyłania, bez rejestracji, 100%% prywatnie.",
    compress_privacy_notice: "Obrazy są kompresowane w przeglądarce. Nic nie jest wysyłane.",
    compress_format_keep: "Zachowaj oryginał",
    compress_resize_max_width: "Maks. szerokość (px)",
    compress_resize_off: "Bez zmiany rozmiaru",
    image_compressing: "Kompresowanie…",
  },
  ro: {
    converter_image_compressor_title: "Compresor de Imagini — Reduce JPG, PNG, WebP",
    converter_image_compressor_description:
      "Comprimă imagini JPG, PNG, HEIC și WebP în browser. Redu fotografiile cu până la 90%% — fără încărcare, fără cont, 100%% privat.",
    compress_privacy_notice: "Imaginile sunt comprimate în browser. Nimic nu se încarcă.",
    compress_format_keep: "Păstrează originalul",
    compress_resize_max_width: "Lățime max (px)",
    compress_resize_off: "Fără redimensionare",
    image_compressing: "Se comprimă…",
  },
  sv: {
    converter_image_compressor_title: "Bildkomprimerare — Minska JPG, PNG, WebP",
    converter_image_compressor_description:
      "Komprimera JPG-, PNG-, HEIC- och WebP-bilder i din webbläsare. Minska foton upp till 90%% — ingen uppladdning, ingen registrering, 100%% privat.",
    compress_privacy_notice: "Bilderna komprimeras i din webbläsare. Inget laddas upp.",
    compress_format_keep: "Behåll original",
    compress_resize_max_width: "Max bredd (px)",
    compress_resize_off: "Ingen storleksändring",
    image_compressing: "Komprimerar…",
  },
  cs: {
    converter_image_compressor_title: "Kompresor Obrázků — Zmenšit JPG, PNG, WebP",
    converter_image_compressor_description:
      "Komprimujte obrázky JPG, PNG, HEIC a WebP v prohlížeči. Zmenšete fotografie až o 90%% — bez nahrávání, bez registrace, 100%% soukromě.",
    compress_privacy_notice: "Obrázky se komprimují ve vašem prohlížeči. Nic se nenahrává.",
    compress_format_keep: "Zachovat originál",
    compress_resize_max_width: "Max. šířka (px)",
    compress_resize_off: "Bez změny velikosti",
    image_compressing: "Komprimuji…",
  },
  uk: {
    converter_image_compressor_title: "Стискач Зображень — Зменшити JPG, PNG, WebP",
    converter_image_compressor_description:
      "Стискайте зображення JPG, PNG, HEIC і WebP у браузері. Зменшуйте фото до 90%% — без завантаження, без реєстрації, 100%% приватно.",
    compress_privacy_notice: "Зображення стискаються у вашому браузері. Нічого не завантажується.",
    compress_format_keep: "Зберегти оригінал",
    compress_resize_max_width: "Макс. ширина (px)",
    compress_resize_off: "Без зміни розміру",
    image_compressing: "Стиснення…",
  },
  tr: {
    converter_image_compressor_title: "Resim Sıkıştırıcı — JPG, PNG, WebP Boyutunu Düşür",
    converter_image_compressor_description:
      "JPG, PNG, HEIC ve WebP resimlerini tarayıcında sıkıştır. Fotoğrafları %90'a kadar küçült — yükleme yok, kayıt yok, %100 gizli.",
    compress_privacy_notice: "Resimler tarayıcında sıkıştırılır. Hiçbir şey yüklenmez.",
    compress_format_keep: "Orijinali koru",
    compress_resize_max_width: "Maks. genişlik (px)",
    compress_resize_off: "Yeniden boyutlandırma yok",
    image_compressing: "Sıkıştırılıyor…",
  },
  ru: {
    converter_image_compressor_title: "Сжатие Изображений — Уменьшить JPG, PNG, WebP",
    converter_image_compressor_description:
      "Сжимайте изображения JPG, PNG, HEIC и WebP в браузере. Уменьшайте фото до 90%% — без загрузки, без регистрации, 100%% конфиденциально.",
    compress_privacy_notice: "Изображения сжимаются в вашем браузере. Ничего не загружается.",
    compress_format_keep: "Сохранить оригинал",
    compress_resize_max_width: "Макс. ширина (px)",
    compress_resize_off: "Без изменения размера",
    image_compressing: "Сжатие…",
  },
  ja: {
    converter_image_compressor_title: "画像圧縮 — JPG・PNG・WebPサイズを縮小",
    converter_image_compressor_description:
      "JPG、PNG、HEIC、WebP画像をブラウザで圧縮。最大90%%まで縮小 — アップロード不要、登録不要、100%%プライベート。",
    compress_privacy_notice: "画像はブラウザで圧縮されます。何もアップロードされません。",
    compress_format_keep: "元の形式を維持",
    compress_resize_max_width: "最大幅 (px)",
    compress_resize_off: "リサイズなし",
    image_compressing: "圧縮中…",
  },
  ko: {
    converter_image_compressor_title: "이미지 압축기 — JPG, PNG, WebP 용량 줄이기",
    converter_image_compressor_description:
      "JPG, PNG, HEIC, WebP 이미지를 브라우저에서 압축. 사진을 최대 90%%까지 줄이세요 — 업로드 없음, 가입 없음, 100%% 비공개.",
    compress_privacy_notice: "이미지는 브라우저에서 압축됩니다. 아무것도 업로드되지 않습니다.",
    compress_format_keep: "원본 유지",
    compress_resize_max_width: "최대 너비 (px)",
    compress_resize_off: "크기 변경 안 함",
    image_compressing: "압축 중…",
  },
  zh: {
    converter_image_compressor_title: "图片压缩 — 减小 JPG、PNG、WebP 文件大小",
    converter_image_compressor_description:
      "在浏览器中压缩 JPG、PNG、HEIC 和 WebP 图片。照片可缩小高达 90%% — 无需上传，无需注册，100%% 私密。",
    compress_privacy_notice: "图片在您的浏览器中压缩，不会上传任何内容。",
    compress_format_keep: "保持原格式",
    compress_resize_max_width: "最大宽度 (像素)",
    compress_resize_off: "不调整大小",
    image_compressing: "压缩中…",
  },
  hi: {
    converter_image_compressor_title: "इमेज कंप्रेसर — JPG, PNG, WebP का साइज़ कम करें",
    converter_image_compressor_description:
      "ब्राउज़र में JPG, PNG, HEIC और WebP इमेज को कंप्रेस करें। फ़ोटो को 90%% तक छोटा करें — कोई अपलोड नहीं, कोई साइन-अप नहीं, 100%% प्राइवेट।",
    compress_privacy_notice: "इमेज आपके ब्राउज़र में कंप्रेस होती हैं। कुछ भी अपलोड नहीं होता।",
    compress_format_keep: "मूल रखें",
    compress_resize_max_width: "अधिकतम चौड़ाई (px)",
    compress_resize_off: "साइज़ न बदलें",
    image_compressing: "कंप्रेस हो रहा है…",
  },
  ar: {
    converter_image_compressor_title: "ضاغط الصور — تقليل حجم JPG وPNG وWebP",
    converter_image_compressor_description:
      "اضغط صور JPG وPNG وHEIC وWebP في متصفحك. قلّص الصور حتى 90٪ — بدون رفع، بدون تسجيل، خصوصية 100٪.",
    compress_privacy_notice: "تتم معالجة الصور في متصفّحك. لا يتم رفع أي شيء.",
    compress_format_keep: "إبقاء الأصلي",
    compress_resize_max_width: "أقصى عرض (بكسل)",
    compress_resize_off: "بدون تغيير الحجم",
    image_compressing: "جاري الضغط…",
  },
  th: {
    converter_image_compressor_title: "บีบอัดรูปภาพ — ลดขนาดไฟล์ JPG, PNG, WebP",
    converter_image_compressor_description:
      "บีบอัดรูปภาพ JPG, PNG, HEIC และ WebP ในเบราว์เซอร์ ลดขนาดรูปได้สูงสุด 90%% — ไม่ต้องอัปโหลด ไม่ต้องสมัคร ส่วนตัว 100%%",
    compress_privacy_notice: "ภาพถูกบีบอัดในเบราว์เซอร์ของคุณ ไม่มีการอัปโหลด",
    compress_format_keep: "เก็บรูปแบบเดิม",
    compress_resize_max_width: "ความกว้างสูงสุด (px)",
    compress_resize_off: "ไม่ปรับขนาด",
    image_compressing: "กำลังบีบอัด…",
  },
  vi: {
    converter_image_compressor_title: "Nén Ảnh — Giảm Kích Thước JPG, PNG, WebP",
    converter_image_compressor_description:
      "Nén ảnh JPG, PNG, HEIC và WebP ngay trên trình duyệt. Giảm ảnh tới 90%% — không tải lên, không đăng ký, riêng tư 100%%.",
    compress_privacy_notice: "Ảnh được nén trong trình duyệt. Không có gì được tải lên.",
    compress_format_keep: "Giữ định dạng gốc",
    compress_resize_max_width: "Chiều rộng tối đa (px)",
    compress_resize_off: "Không thay đổi kích thước",
    image_compressing: "Đang nén…",
  },
  id: {
    converter_image_compressor_title: "Kompresor Gambar — Kurangi Ukuran JPG, PNG, WebP",
    converter_image_compressor_description:
      "Kompres gambar JPG, PNG, HEIC, dan WebP di browser. Perkecil foto hingga 90%% — tanpa unggah, tanpa daftar, 100%% privat.",
    compress_privacy_notice: "Gambar dikompresi di browser. Tidak ada yang diunggah.",
    compress_format_keep: "Pertahankan asli",
    compress_resize_max_width: "Lebar maks (px)",
    compress_resize_off: "Tanpa ubah ukuran",
    image_compressing: "Mengompresi…",
  },
};

function rebuildWithInsertedKeys(originalJson, translations) {
  const out = {};
  let inserted = false;
  for (const [key, value] of Object.entries(originalJson)) {
    out[key] = value;
    if (key === ANCHOR) {
      for (const newKey of KEYS) {
        if (Object.prototype.hasOwnProperty.call(originalJson, newKey)) continue;
        if (!Object.prototype.hasOwnProperty.call(translations, newKey)) continue;
        out[newKey] = translations[newKey];
      }
      inserted = true;
    }
  }
  // Fallback if anchor was missing — append to end.
  if (!inserted) {
    for (const newKey of KEYS) {
      if (Object.prototype.hasOwnProperty.call(originalJson, newKey)) continue;
      if (Object.prototype.hasOwnProperty.call(translations, newKey)) {
        out[newKey] = translations[newKey];
      }
    }
  }
  return out;
}

let added = 0;
let skipped = 0;
for (const file of fs.readdirSync(LOCALES_DIR)) {
  if (!file.endsWith(".json")) continue;
  const lang = file.replace(/\.json$/, "");
  if (!T[lang]) {
    console.warn(`No translations defined for ${lang}, skipping`);
    skipped++;
    continue;
  }
  const filePath = path.join(LOCALES_DIR, file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const updated = rebuildWithInsertedKeys(json, T[lang]);

  const before = Object.keys(json).length;
  const after = Object.keys(updated).length;
  if (after === before) {
    console.log(`${lang}: already up to date`);
    continue;
  }

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2) + "\n", "utf8");
  console.log(`${lang}: added ${after - before} keys`);
  added++;
}

console.log(`\nDone: ${added} files updated, ${skipped} skipped`);
