// One-shot: insert the pdf-merge converter translations into every locale
// file. Safe to re-run: existing values are preserved.

const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "..", "locales");

const KEYS = [
  "converter_pdf_merge_title",
  "converter_pdf_merge_description",
  "pdf_privacy_notice",
  "pdf_drop_label",
  "pdf_drop_hint",
  "pdf_pages_count",
  "pdf_merge_summary",
  "pdf_merge_button",
  "pdf_merging",
  "pdf_loading",
  "pdf_invalid",
  "pdf_remove",
  "pdf_move_up",
  "pdf_move_down",
];

// Anchor to the last image-compressor key so pdf-merge translations land in a
// predictable spot inside every locale file.
const ANCHOR = "image_compressing";

// "%d" placeholders are sprintf-ts tokens consumed by localizy. Literal "%"
// must be escaped to "%%" — see scripts/fix-percent-escaping.js.
const T = {
  en: {
    converter_pdf_merge_title: "Merge PDF Files — Combine Multiple PDFs in Browser",
    converter_pdf_merge_description:
      "Merge multiple PDF files into one document, instantly in your browser. Reorder pages, no upload, no signup, 100%% private.",
    pdf_privacy_notice: "PDFs are merged in your browser. Nothing is uploaded.",
    pdf_drop_label: "Drop PDFs here or click to choose",
    pdf_drop_hint: "PDF files only — add 2 or more to merge",
    pdf_pages_count: "%d pages",
    pdf_merge_summary: "%d files · %d pages",
    pdf_merge_button: "Merge & download PDF",
    pdf_merging: "Merging…",
    pdf_loading: "Loading…",
    pdf_invalid: "Not a valid PDF",
    pdf_remove: "Remove",
    pdf_move_up: "Move up",
    pdf_move_down: "Move down",
  },
  es: {
    converter_pdf_merge_title: "Unir PDF — Combina Varios PDF en el Navegador",
    converter_pdf_merge_description:
      "Une varios archivos PDF en un único documento, al instante en tu navegador. Reordena páginas, sin subir, sin registro, 100%% privado.",
    pdf_privacy_notice: "Los PDF se unen en tu navegador. Nada se sube.",
    pdf_drop_label: "Suelta los PDF aquí o haz clic para elegir",
    pdf_drop_hint: "Solo archivos PDF — añade 2 o más para unir",
    pdf_pages_count: "%d páginas",
    pdf_merge_summary: "%d archivos · %d páginas",
    pdf_merge_button: "Unir y descargar PDF",
    pdf_merging: "Uniendo…",
    pdf_loading: "Cargando…",
    pdf_invalid: "PDF no válido",
    pdf_remove: "Eliminar",
    pdf_move_up: "Mover arriba",
    pdf_move_down: "Mover abajo",
  },
  fr: {
    converter_pdf_merge_title: "Fusionner PDF — Combiner Plusieurs PDF en Ligne",
    converter_pdf_merge_description:
      "Fusionnez plusieurs fichiers PDF en un seul document, instantanément dans votre navigateur. Réorganisez les pages, sans envoi, sans inscription, 100%% privé.",
    pdf_privacy_notice: "Les PDF sont fusionnés dans votre navigateur. Rien n'est envoyé.",
    pdf_drop_label: "Déposez les PDF ici ou cliquez pour choisir",
    pdf_drop_hint: "Fichiers PDF uniquement — ajoutez-en 2 ou plus",
    pdf_pages_count: "%d pages",
    pdf_merge_summary: "%d fichiers · %d pages",
    pdf_merge_button: "Fusionner et télécharger le PDF",
    pdf_merging: "Fusion…",
    pdf_loading: "Chargement…",
    pdf_invalid: "PDF invalide",
    pdf_remove: "Supprimer",
    pdf_move_up: "Monter",
    pdf_move_down: "Descendre",
  },
  de: {
    converter_pdf_merge_title: "PDF zusammenführen — Mehrere PDFs im Browser kombinieren",
    converter_pdf_merge_description:
      "Füge mehrere PDF-Dateien zu einem Dokument zusammen — direkt im Browser. Seiten neu anordnen, kein Upload, keine Anmeldung, 100%% privat.",
    pdf_privacy_notice: "PDFs werden in deinem Browser zusammengeführt. Nichts wird hochgeladen.",
    pdf_drop_label: "PDFs hier ablegen oder klicken zum Auswählen",
    pdf_drop_hint: "Nur PDF-Dateien — füge 2 oder mehr zum Zusammenführen hinzu",
    pdf_pages_count: "%d Seiten",
    pdf_merge_summary: "%d Dateien · %d Seiten",
    pdf_merge_button: "PDF zusammenführen & herunterladen",
    pdf_merging: "Zusammenführen…",
    pdf_loading: "Lade…",
    pdf_invalid: "Ungültiges PDF",
    pdf_remove: "Entfernen",
    pdf_move_up: "Nach oben",
    pdf_move_down: "Nach unten",
  },
  pt: {
    converter_pdf_merge_title: "Juntar PDF — Combinar Vários PDFs no Navegador",
    converter_pdf_merge_description:
      "Junte vários arquivos PDF em um único documento, instantaneamente no navegador. Reordene páginas, sem upload, sem cadastro, 100%% privado.",
    pdf_privacy_notice: "Os PDFs são juntados no seu navegador. Nada é enviado.",
    pdf_drop_label: "Arraste os PDFs aqui ou clique para escolher",
    pdf_drop_hint: "Apenas arquivos PDF — adicione 2 ou mais para juntar",
    pdf_pages_count: "%d páginas",
    pdf_merge_summary: "%d arquivos · %d páginas",
    pdf_merge_button: "Juntar e baixar PDF",
    pdf_merging: "Juntando…",
    pdf_loading: "Carregando…",
    pdf_invalid: "PDF inválido",
    pdf_remove: "Remover",
    pdf_move_up: "Mover para cima",
    pdf_move_down: "Mover para baixo",
  },
  it: {
    converter_pdf_merge_title: "Unisci PDF — Combina Più PDF nel Browser",
    converter_pdf_merge_description:
      "Unisci più file PDF in un unico documento, istantaneamente nel browser. Riordina le pagine, senza caricamento, senza registrazione, 100%% privato.",
    pdf_privacy_notice: "I PDF vengono uniti nel browser. Nulla viene caricato.",
    pdf_drop_label: "Trascina i PDF qui o clicca per scegliere",
    pdf_drop_hint: "Solo file PDF — aggiungine 2 o più per unirli",
    pdf_pages_count: "%d pagine",
    pdf_merge_summary: "%d file · %d pagine",
    pdf_merge_button: "Unisci e scarica PDF",
    pdf_merging: "Unione…",
    pdf_loading: "Caricamento…",
    pdf_invalid: "PDF non valido",
    pdf_remove: "Rimuovi",
    pdf_move_up: "Sposta su",
    pdf_move_down: "Sposta giù",
  },
  nl: {
    converter_pdf_merge_title: "PDF Samenvoegen — Combineer Meerdere PDFs in Browser",
    converter_pdf_merge_description:
      "Voeg meerdere PDF-bestanden samen tot één document, direct in je browser. Pagina's herordenen, geen upload, geen aanmelding, 100%% privé.",
    pdf_privacy_notice: "PDFs worden in je browser samengevoegd. Niets wordt geüpload.",
    pdf_drop_label: "Sleep PDFs hierheen of klik om te kiezen",
    pdf_drop_hint: "Alleen PDF-bestanden — voeg er 2 of meer toe",
    pdf_pages_count: "%d pagina's",
    pdf_merge_summary: "%d bestanden · %d pagina's",
    pdf_merge_button: "PDF samenvoegen & downloaden",
    pdf_merging: "Samenvoegen…",
    pdf_loading: "Laden…",
    pdf_invalid: "Ongeldige PDF",
    pdf_remove: "Verwijderen",
    pdf_move_up: "Omhoog",
    pdf_move_down: "Omlaag",
  },
  pl: {
    converter_pdf_merge_title: "Łączenie PDF — Połącz Wiele PDF w Przeglądarce",
    converter_pdf_merge_description:
      "Połącz wiele plików PDF w jeden dokument, natychmiast w przeglądarce. Zmień kolejność stron, bez przesyłania, bez rejestracji, 100%% prywatnie.",
    pdf_privacy_notice: "PDFy są łączone w przeglądarce. Nic nie jest wysyłane.",
    pdf_drop_label: "Upuść PDFy tutaj lub kliknij, aby wybrać",
    pdf_drop_hint: "Tylko pliki PDF — dodaj 2 lub więcej do połączenia",
    pdf_pages_count: "%d stron",
    pdf_merge_summary: "%d plików · %d stron",
    pdf_merge_button: "Połącz i pobierz PDF",
    pdf_merging: "Łączenie…",
    pdf_loading: "Ładowanie…",
    pdf_invalid: "Nieprawidłowy PDF",
    pdf_remove: "Usuń",
    pdf_move_up: "W górę",
    pdf_move_down: "W dół",
  },
  ro: {
    converter_pdf_merge_title: "Îmbinare PDF — Combină Mai Multe PDF în Browser",
    converter_pdf_merge_description:
      "Îmbină mai multe fișiere PDF într-un singur document, instant în browser. Reordonează paginile, fără încărcare, fără cont, 100%% privat.",
    pdf_privacy_notice: "PDF-urile sunt îmbinate în browser. Nimic nu se încarcă.",
    pdf_drop_label: "Trage PDF-urile aici sau apasă pentru a alege",
    pdf_drop_hint: "Doar fișiere PDF — adaugă 2 sau mai multe pentru a îmbina",
    pdf_pages_count: "%d pagini",
    pdf_merge_summary: "%d fișiere · %d pagini",
    pdf_merge_button: "Îmbină și descarcă PDF",
    pdf_merging: "Se îmbină…",
    pdf_loading: "Se încarcă…",
    pdf_invalid: "PDF invalid",
    pdf_remove: "Elimină",
    pdf_move_up: "Mută sus",
    pdf_move_down: "Mută jos",
  },
  sv: {
    converter_pdf_merge_title: "Slå ihop PDF — Kombinera flera PDFer i webbläsaren",
    converter_pdf_merge_description:
      "Slå ihop flera PDF-filer till ett dokument, direkt i din webbläsare. Ordna om sidor, ingen uppladdning, ingen registrering, 100%% privat.",
    pdf_privacy_notice: "PDFer slås ihop i din webbläsare. Inget laddas upp.",
    pdf_drop_label: "Släpp PDFer här eller klicka för att välja",
    pdf_drop_hint: "Endast PDF-filer — lägg till 2 eller fler",
    pdf_pages_count: "%d sidor",
    pdf_merge_summary: "%d filer · %d sidor",
    pdf_merge_button: "Slå ihop & ladda ner PDF",
    pdf_merging: "Slår ihop…",
    pdf_loading: "Laddar…",
    pdf_invalid: "Ogiltig PDF",
    pdf_remove: "Ta bort",
    pdf_move_up: "Flytta upp",
    pdf_move_down: "Flytta ner",
  },
  cs: {
    converter_pdf_merge_title: "Sloučit PDF — Spojit Více PDF v Prohlížeči",
    converter_pdf_merge_description:
      "Sloučte více PDF souborů do jednoho dokumentu, okamžitě v prohlížeči. Změňte pořadí stránek, bez nahrávání, bez registrace, 100%% soukromě.",
    pdf_privacy_notice: "PDF se slučují ve vašem prohlížeči. Nic se nenahrává.",
    pdf_drop_label: "Přetáhněte PDF sem nebo klikněte pro výběr",
    pdf_drop_hint: "Pouze PDF soubory — přidejte 2 nebo více pro sloučení",
    pdf_pages_count: "%d stran",
    pdf_merge_summary: "%d souborů · %d stran",
    pdf_merge_button: "Sloučit a stáhnout PDF",
    pdf_merging: "Slučování…",
    pdf_loading: "Načítání…",
    pdf_invalid: "Neplatný PDF",
    pdf_remove: "Odebrat",
    pdf_move_up: "Posunout nahoru",
    pdf_move_down: "Posunout dolů",
  },
  uk: {
    converter_pdf_merge_title: "Об'єднати PDF — Поєднайте Кілька PDF у Браузері",
    converter_pdf_merge_description:
      "Об'єднайте кілька PDF-файлів в один документ, миттєво у вашому браузері. Змінюйте порядок сторінок, без завантаження, без реєстрації, 100%% приватно.",
    pdf_privacy_notice: "PDF об'єднуються у вашому браузері. Нічого не завантажується.",
    pdf_drop_label: "Перетягніть PDF сюди або натисніть, щоб обрати",
    pdf_drop_hint: "Лише PDF-файли — додайте 2 або більше для об'єднання",
    pdf_pages_count: "%d сторінок",
    pdf_merge_summary: "%d файлів · %d сторінок",
    pdf_merge_button: "Об'єднати та завантажити PDF",
    pdf_merging: "Об'єднання…",
    pdf_loading: "Завантаження…",
    pdf_invalid: "Недійсний PDF",
    pdf_remove: "Видалити",
    pdf_move_up: "Вгору",
    pdf_move_down: "Вниз",
  },
  tr: {
    converter_pdf_merge_title: "PDF Birleştir — Birden Fazla PDF'yi Tarayıcıda Birleştir",
    converter_pdf_merge_description:
      "Birden fazla PDF dosyasını tek bir belgede birleştir, anında tarayıcında. Sayfaları yeniden sırala, yükleme yok, kayıt yok, %%100 gizli.",
    pdf_privacy_notice: "PDF'ler tarayıcında birleştirilir. Hiçbir şey yüklenmez.",
    pdf_drop_label: "PDF'leri buraya bırak veya seçmek için tıkla",
    pdf_drop_hint: "Yalnızca PDF dosyaları — birleştirmek için 2 veya daha fazla ekle",
    pdf_pages_count: "%d sayfa",
    pdf_merge_summary: "%d dosya · %d sayfa",
    pdf_merge_button: "PDF'yi birleştir ve indir",
    pdf_merging: "Birleştiriliyor…",
    pdf_loading: "Yükleniyor…",
    pdf_invalid: "Geçersiz PDF",
    pdf_remove: "Kaldır",
    pdf_move_up: "Yukarı",
    pdf_move_down: "Aşağı",
  },
  ru: {
    converter_pdf_merge_title: "Объединение PDF — Соединить Несколько PDF в Браузере",
    converter_pdf_merge_description:
      "Объединяйте несколько PDF-файлов в один документ мгновенно в вашем браузере. Меняйте порядок страниц, без загрузки, без регистрации, 100%% конфиденциально.",
    pdf_privacy_notice: "PDF объединяются в вашем браузере. Ничего не загружается.",
    pdf_drop_label: "Перетащите PDF сюда или нажмите для выбора",
    pdf_drop_hint: "Только PDF-файлы — добавьте 2 или больше для объединения",
    pdf_pages_count: "%d страниц",
    pdf_merge_summary: "%d файлов · %d страниц",
    pdf_merge_button: "Объединить и скачать PDF",
    pdf_merging: "Объединение…",
    pdf_loading: "Загрузка…",
    pdf_invalid: "Недопустимый PDF",
    pdf_remove: "Удалить",
    pdf_move_up: "Вверх",
    pdf_move_down: "Вниз",
  },
  ja: {
    converter_pdf_merge_title: "PDF結合 — 複数のPDFをブラウザで統合",
    converter_pdf_merge_description:
      "複数のPDFファイルを1つの文書に結合 — ブラウザで瞬時に。ページの並べ替え可能、アップロード不要、登録不要、100%%プライベート。",
    pdf_privacy_notice: "PDFはブラウザで結合されます。何もアップロードされません。",
    pdf_drop_label: "ここにPDFをドロップまたはクリックして選択",
    pdf_drop_hint: "PDFファイルのみ — 2つ以上を追加して結合",
    pdf_pages_count: "%dページ",
    pdf_merge_summary: "%dファイル · %dページ",
    pdf_merge_button: "PDFを結合してダウンロード",
    pdf_merging: "結合中…",
    pdf_loading: "読み込み中…",
    pdf_invalid: "無効なPDF",
    pdf_remove: "削除",
    pdf_move_up: "上へ移動",
    pdf_move_down: "下へ移動",
  },
  ko: {
    converter_pdf_merge_title: "PDF 병합 — 여러 PDF를 브라우저에서 합치기",
    converter_pdf_merge_description:
      "여러 PDF 파일을 하나의 문서로 병합 — 브라우저에서 즉시. 페이지 재정렬 가능, 업로드 없음, 가입 없음, 100%% 비공개.",
    pdf_privacy_notice: "PDF는 브라우저에서 병합됩니다. 아무것도 업로드되지 않습니다.",
    pdf_drop_label: "PDF를 여기에 놓거나 클릭해서 선택하세요",
    pdf_drop_hint: "PDF 파일만 — 2개 이상 추가하여 병합",
    pdf_pages_count: "%d페이지",
    pdf_merge_summary: "%d파일 · %d페이지",
    pdf_merge_button: "PDF 병합 및 다운로드",
    pdf_merging: "병합 중…",
    pdf_loading: "불러오는 중…",
    pdf_invalid: "유효하지 않은 PDF",
    pdf_remove: "제거",
    pdf_move_up: "위로",
    pdf_move_down: "아래로",
  },
  zh: {
    converter_pdf_merge_title: "PDF 合并 — 在浏览器中合并多个 PDF",
    converter_pdf_merge_description:
      "将多个 PDF 文件合并为一个文档，在浏览器中即刻完成。重新排序页面，无需上传，无需注册，100%% 私密。",
    pdf_privacy_notice: "PDF 在您的浏览器中合并，不会上传任何内容。",
    pdf_drop_label: "拖放 PDF 到此处或点击选择",
    pdf_drop_hint: "仅限 PDF 文件 — 添加 2 个或更多以合并",
    pdf_pages_count: "%d 页",
    pdf_merge_summary: "%d 个文件 · %d 页",
    pdf_merge_button: "合并并下载 PDF",
    pdf_merging: "合并中…",
    pdf_loading: "加载中…",
    pdf_invalid: "无效的 PDF",
    pdf_remove: "移除",
    pdf_move_up: "上移",
    pdf_move_down: "下移",
  },
  hi: {
    converter_pdf_merge_title: "PDF मर्ज करें — ब्राउज़र में कई PDF संयोजित करें",
    converter_pdf_merge_description:
      "कई PDF फ़ाइलों को एक दस्तावेज़ में मर्ज करें — तुरंत अपने ब्राउज़र में। पेज क्रम बदलें, कोई अपलोड नहीं, कोई साइन-अप नहीं, 100%% प्राइवेट।",
    pdf_privacy_notice: "PDF आपके ब्राउज़र में मर्ज होती हैं। कुछ भी अपलोड नहीं होता।",
    pdf_drop_label: "यहाँ PDF छोड़ें या चुनने के लिए क्लिक करें",
    pdf_drop_hint: "केवल PDF फ़ाइलें — मर्ज करने के लिए 2 या अधिक जोड़ें",
    pdf_pages_count: "%d पेज",
    pdf_merge_summary: "%d फ़ाइलें · %d पेज",
    pdf_merge_button: "PDF मर्ज करें और डाउनलोड करें",
    pdf_merging: "मर्ज हो रहा है…",
    pdf_loading: "लोड हो रहा है…",
    pdf_invalid: "अमान्य PDF",
    pdf_remove: "हटाएँ",
    pdf_move_up: "ऊपर ले जाएँ",
    pdf_move_down: "नीचे ले जाएँ",
  },
  ar: {
    converter_pdf_merge_title: "دمج PDF — اجمع عدة ملفات PDF في المتصفّح",
    converter_pdf_merge_description:
      "ادمج عدة ملفات PDF في مستند واحد — فورًا في متصفّحك. أعد ترتيب الصفحات، بدون رفع، بدون تسجيل، خصوصية 100٪.",
    pdf_privacy_notice: "تتم معالجة ملفات PDF في متصفّحك. لا يتم رفع أي شيء.",
    pdf_drop_label: "أفلت ملفات PDF هنا أو انقر للاختيار",
    pdf_drop_hint: "ملفات PDF فقط — أضف 2 أو أكثر للدمج",
    pdf_pages_count: "%d صفحات",
    pdf_merge_summary: "%d ملفات · %d صفحات",
    pdf_merge_button: "ادمج ونزّل PDF",
    pdf_merging: "جاري الدمج…",
    pdf_loading: "جاري التحميل…",
    pdf_invalid: "PDF غير صالح",
    pdf_remove: "إزالة",
    pdf_move_up: "تحريك لأعلى",
    pdf_move_down: "تحريك لأسفل",
  },
  th: {
    converter_pdf_merge_title: "รวม PDF — รวมหลายไฟล์ PDF ในเบราว์เซอร์",
    converter_pdf_merge_description:
      "รวมหลายไฟล์ PDF เป็นเอกสารเดียว ทันทีในเบราว์เซอร์ จัดเรียงหน้าใหม่ได้ ไม่ต้องอัปโหลด ไม่ต้องสมัคร ส่วนตัว 100%%",
    pdf_privacy_notice: "ไฟล์ PDF จะถูกรวมในเบราว์เซอร์ของคุณ ไม่มีการอัปโหลด",
    pdf_drop_label: "ปล่อยไฟล์ PDF ที่นี่หรือคลิกเพื่อเลือก",
    pdf_drop_hint: "เฉพาะไฟล์ PDF — เพิ่ม 2 ไฟล์ขึ้นไปเพื่อรวม",
    pdf_pages_count: "%d หน้า",
    pdf_merge_summary: "%d ไฟล์ · %d หน้า",
    pdf_merge_button: "รวมและดาวน์โหลด PDF",
    pdf_merging: "กำลังรวม…",
    pdf_loading: "กำลังโหลด…",
    pdf_invalid: "PDF ไม่ถูกต้อง",
    pdf_remove: "ลบ",
    pdf_move_up: "เลื่อนขึ้น",
    pdf_move_down: "เลื่อนลง",
  },
  vi: {
    converter_pdf_merge_title: "Ghép PDF — Gộp Nhiều PDF Ngay Trong Trình Duyệt",
    converter_pdf_merge_description:
      "Gộp nhiều tệp PDF thành một tài liệu, ngay lập tức trong trình duyệt. Sắp xếp lại trang, không tải lên, không đăng ký, riêng tư 100%%.",
    pdf_privacy_notice: "PDF được gộp trong trình duyệt. Không có gì được tải lên.",
    pdf_drop_label: "Thả PDF vào đây hoặc nhấn để chọn",
    pdf_drop_hint: "Chỉ tệp PDF — thêm 2 tệp trở lên để gộp",
    pdf_pages_count: "%d trang",
    pdf_merge_summary: "%d tệp · %d trang",
    pdf_merge_button: "Gộp và tải xuống PDF",
    pdf_merging: "Đang gộp…",
    pdf_loading: "Đang tải…",
    pdf_invalid: "PDF không hợp lệ",
    pdf_remove: "Xóa",
    pdf_move_up: "Lên",
    pdf_move_down: "Xuống",
  },
  id: {
    converter_pdf_merge_title: "Gabung PDF — Satukan Beberapa PDF di Browser",
    converter_pdf_merge_description:
      "Gabungkan beberapa file PDF menjadi satu dokumen, langsung di browser. Atur ulang halaman, tanpa unggah, tanpa daftar, 100%% privat.",
    pdf_privacy_notice: "PDF digabungkan di browser. Tidak ada yang diunggah.",
    pdf_drop_label: "Letakkan PDF di sini atau klik untuk memilih",
    pdf_drop_hint: "Hanya file PDF — tambahkan 2 atau lebih untuk digabung",
    pdf_pages_count: "%d halaman",
    pdf_merge_summary: "%d berkas · %d halaman",
    pdf_merge_button: "Gabung & unduh PDF",
    pdf_merging: "Menggabungkan…",
    pdf_loading: "Memuat…",
    pdf_invalid: "PDF tidak valid",
    pdf_remove: "Hapus",
    pdf_move_up: "Ke atas",
    pdf_move_down: "Ke bawah",
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
