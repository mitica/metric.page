// One-shot: insert the image-to-pdf converter translations into every locale
// file. Safe to re-run: existing values are preserved.

const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "..", "locales");

const KEYS = [
  "converter_image_to_pdf_title",
  "converter_image_to_pdf_description",
  "img2pdf_privacy_notice",
  "img2pdf_drop_label",
  "img2pdf_drop_hint",
  "img2pdf_page_size_label",
  "img2pdf_page_fit",
  "img2pdf_page_a4",
  "img2pdf_page_letter",
  "img2pdf_loading",
  "img2pdf_summary",
  "img2pdf_build_button",
  "img2pdf_building",
];

// Anchor to the last pdf-merge key.
const ANCHOR = "pdf_move_down";

// "%d" is a sprintf-ts token; literal "%" must be escaped to "%%".
// "A4" and "Letter" are paper-size standards and not localized.
const T = {
  en: {
    converter_image_to_pdf_title: "Image to PDF — Convert JPG, PNG, HEIC to PDF Online Free",
    converter_image_to_pdf_description:
      "Convert JPG, PNG, HEIC and WebP images to a single PDF, instantly in your browser. Combine photos, no upload, no signup, 100%% private.",
    img2pdf_privacy_notice: "Images are converted in your browser. Nothing is uploaded.",
    img2pdf_drop_label: "Drop images here or click to choose",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — add one or more",
    img2pdf_page_size_label: "Page size",
    img2pdf_page_fit: "Fit to image",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Loading…",
    img2pdf_summary: "%d images → 1 PDF",
    img2pdf_build_button: "Create & download PDF",
    img2pdf_building: "Creating PDF…",
  },
  es: {
    converter_image_to_pdf_title: "Imagen a PDF — Convertir JPG, PNG, HEIC a PDF Online Gratis",
    converter_image_to_pdf_description:
      "Convierte imágenes JPG, PNG, HEIC y WebP a un único PDF, al instante en tu navegador. Combina fotos, sin subir, sin registro, 100%% privado.",
    img2pdf_privacy_notice: "Las imágenes se convierten en tu navegador. Nada se sube.",
    img2pdf_drop_label: "Suelta imágenes aquí o haz clic para elegir",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — añade una o más",
    img2pdf_page_size_label: "Tamaño de página",
    img2pdf_page_fit: "Ajustar a imagen",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Carta",
    img2pdf_loading: "Cargando…",
    img2pdf_summary: "%d imágenes → 1 PDF",
    img2pdf_build_button: "Crear y descargar PDF",
    img2pdf_building: "Creando PDF…",
  },
  fr: {
    converter_image_to_pdf_title: "Image en PDF — Convertir JPG, PNG, HEIC en PDF en Ligne",
    converter_image_to_pdf_description:
      "Convertissez vos images JPG, PNG, HEIC et WebP en un seul PDF, instantanément dans votre navigateur. Combinez vos photos, sans envoi, sans inscription, 100%% privé.",
    img2pdf_privacy_notice: "Les images sont converties dans votre navigateur. Rien n'est envoyé.",
    img2pdf_drop_label: "Déposez vos images ici ou cliquez pour choisir",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — ajoutez-en une ou plusieurs",
    img2pdf_page_size_label: "Taille de page",
    img2pdf_page_fit: "Ajuster à l'image",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Chargement…",
    img2pdf_summary: "%d images → 1 PDF",
    img2pdf_build_button: "Créer et télécharger le PDF",
    img2pdf_building: "Création du PDF…",
  },
  de: {
    converter_image_to_pdf_title: "Bild zu PDF — JPG, PNG, HEIC zu PDF Online Kostenlos",
    converter_image_to_pdf_description:
      "Konvertiere JPG-, PNG-, HEIC- und WebP-Bilder in eine einzige PDF — direkt im Browser. Fotos kombinieren, kein Upload, keine Anmeldung, 100%% privat.",
    img2pdf_privacy_notice: "Bilder werden in deinem Browser konvertiert. Nichts wird hochgeladen.",
    img2pdf_drop_label: "Bilder hier ablegen oder klicken zum Auswählen",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — eines oder mehrere hinzufügen",
    img2pdf_page_size_label: "Seitengröße",
    img2pdf_page_fit: "An Bild anpassen",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Lade…",
    img2pdf_summary: "%d Bilder → 1 PDF",
    img2pdf_build_button: "PDF erstellen & herunterladen",
    img2pdf_building: "PDF wird erstellt…",
  },
  pt: {
    converter_image_to_pdf_title: "Imagem para PDF — Converter JPG, PNG, HEIC para PDF Online",
    converter_image_to_pdf_description:
      "Converta imagens JPG, PNG, HEIC e WebP em um único PDF, instantaneamente no navegador. Combine fotos, sem upload, sem cadastro, 100%% privado.",
    img2pdf_privacy_notice: "As imagens são convertidas no navegador. Nada é enviado.",
    img2pdf_drop_label: "Arraste imagens aqui ou clique para escolher",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — adicione uma ou mais",
    img2pdf_page_size_label: "Tamanho da página",
    img2pdf_page_fit: "Ajustar à imagem",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Carta",
    img2pdf_loading: "Carregando…",
    img2pdf_summary: "%d imagens → 1 PDF",
    img2pdf_build_button: "Criar e baixar PDF",
    img2pdf_building: "Criando PDF…",
  },
  it: {
    converter_image_to_pdf_title: "Immagine a PDF — Converti JPG, PNG, HEIC in PDF Online",
    converter_image_to_pdf_description:
      "Converti immagini JPG, PNG, HEIC e WebP in un unico PDF, istantaneamente nel browser. Combina foto, senza caricamento, senza registrazione, 100%% privato.",
    img2pdf_privacy_notice: "Le immagini vengono convertite nel browser. Nulla viene caricato.",
    img2pdf_drop_label: "Trascina le immagini qui o clicca per scegliere",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — aggiungi una o più",
    img2pdf_page_size_label: "Dimensione pagina",
    img2pdf_page_fit: "Adatta all'immagine",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Caricamento…",
    img2pdf_summary: "%d immagini → 1 PDF",
    img2pdf_build_button: "Crea e scarica PDF",
    img2pdf_building: "Creazione PDF…",
  },
  nl: {
    converter_image_to_pdf_title: "Afbeelding naar PDF — JPG, PNG, HEIC naar PDF Online Gratis",
    converter_image_to_pdf_description:
      "Converteer JPG-, PNG-, HEIC- en WebP-afbeeldingen naar één PDF, direct in je browser. Combineer foto's, geen upload, geen aanmelding, 100%% privé.",
    img2pdf_privacy_notice: "Afbeeldingen worden in je browser geconverteerd. Niets wordt geüpload.",
    img2pdf_drop_label: "Sleep afbeeldingen hierheen of klik om te kiezen",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — voeg er een of meer toe",
    img2pdf_page_size_label: "Paginagrootte",
    img2pdf_page_fit: "Aanpassen aan afbeelding",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Laden…",
    img2pdf_summary: "%d afbeeldingen → 1 PDF",
    img2pdf_build_button: "PDF maken & downloaden",
    img2pdf_building: "PDF maken…",
  },
  pl: {
    converter_image_to_pdf_title: "Obraz do PDF — Konwertuj JPG, PNG, HEIC do PDF Online",
    converter_image_to_pdf_description:
      "Konwertuj obrazy JPG, PNG, HEIC i WebP do jednego PDF, natychmiast w przeglądarce. Łącz zdjęcia, bez przesyłania, bez rejestracji, 100%% prywatnie.",
    img2pdf_privacy_notice: "Obrazy są konwertowane w przeglądarce. Nic nie jest wysyłane.",
    img2pdf_drop_label: "Upuść obrazy tutaj lub kliknij, aby wybrać",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — dodaj jeden lub więcej",
    img2pdf_page_size_label: "Rozmiar strony",
    img2pdf_page_fit: "Dopasuj do obrazu",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Ładowanie…",
    img2pdf_summary: "%d obrazów → 1 PDF",
    img2pdf_build_button: "Utwórz i pobierz PDF",
    img2pdf_building: "Tworzenie PDF…",
  },
  ro: {
    converter_image_to_pdf_title: "Imagine în PDF — Convertește JPG, PNG, HEIC în PDF Online",
    converter_image_to_pdf_description:
      "Convertește imagini JPG, PNG, HEIC și WebP într-un singur PDF, instant în browser. Combină fotografii, fără încărcare, fără cont, 100%% privat.",
    img2pdf_privacy_notice: "Imaginile sunt convertite în browser. Nimic nu se încarcă.",
    img2pdf_drop_label: "Trage imaginile aici sau apasă pentru a alege",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — adaugă una sau mai multe",
    img2pdf_page_size_label: "Dimensiune pagină",
    img2pdf_page_fit: "Potrivire pe imagine",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Se încarcă…",
    img2pdf_summary: "%d imagini → 1 PDF",
    img2pdf_build_button: "Creează și descarcă PDF",
    img2pdf_building: "Se creează PDF…",
  },
  sv: {
    converter_image_to_pdf_title: "Bild till PDF — Konvertera JPG, PNG, HEIC till PDF Online",
    converter_image_to_pdf_description:
      "Konvertera JPG-, PNG-, HEIC- och WebP-bilder till en PDF, direkt i din webbläsare. Kombinera foton, ingen uppladdning, ingen registrering, 100%% privat.",
    img2pdf_privacy_notice: "Bilderna konverteras i din webbläsare. Inget laddas upp.",
    img2pdf_drop_label: "Släpp bilder här eller klicka för att välja",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — lägg till en eller flera",
    img2pdf_page_size_label: "Sidstorlek",
    img2pdf_page_fit: "Anpassa till bild",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Laddar…",
    img2pdf_summary: "%d bilder → 1 PDF",
    img2pdf_build_button: "Skapa & ladda ner PDF",
    img2pdf_building: "Skapar PDF…",
  },
  cs: {
    converter_image_to_pdf_title: "Obrázek do PDF — Převést JPG, PNG, HEIC do PDF Online",
    converter_image_to_pdf_description:
      "Převeďte obrázky JPG, PNG, HEIC a WebP do jediného PDF, okamžitě v prohlížeči. Kombinujte fotografie, bez nahrávání, bez registrace, 100%% soukromě.",
    img2pdf_privacy_notice: "Obrázky se převádějí ve vašem prohlížeči. Nic se nenahrává.",
    img2pdf_drop_label: "Přetáhněte obrázky sem nebo klikněte pro výběr",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — přidejte jeden nebo více",
    img2pdf_page_size_label: "Velikost stránky",
    img2pdf_page_fit: "Přizpůsobit obrázku",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Načítání…",
    img2pdf_summary: "%d obrázků → 1 PDF",
    img2pdf_build_button: "Vytvořit a stáhnout PDF",
    img2pdf_building: "Vytváření PDF…",
  },
  uk: {
    converter_image_to_pdf_title: "Зображення в PDF — Конвертуй JPG, PNG, HEIC у PDF Онлайн",
    converter_image_to_pdf_description:
      "Конвертуйте зображення JPG, PNG, HEIC і WebP в один PDF, миттєво у вашому браузері. Об'єднуйте фото, без завантаження, без реєстрації, 100%% приватно.",
    img2pdf_privacy_notice: "Зображення конвертуються у вашому браузері. Нічого не завантажується.",
    img2pdf_drop_label: "Перетягніть зображення сюди або натисніть, щоб обрати",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — додайте одне або більше",
    img2pdf_page_size_label: "Розмір сторінки",
    img2pdf_page_fit: "За розміром зображення",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Завантаження…",
    img2pdf_summary: "%d зображень → 1 PDF",
    img2pdf_build_button: "Створити та завантажити PDF",
    img2pdf_building: "Створення PDF…",
  },
  tr: {
    converter_image_to_pdf_title: "Resim PDF Yap — JPG, PNG, HEIC'i PDF'e Online Ücretsiz Dönüştür",
    converter_image_to_pdf_description:
      "JPG, PNG, HEIC ve WebP resimlerini tek bir PDF'e dönüştür, anında tarayıcında. Fotoğrafları birleştir, yükleme yok, kayıt yok, %%100 gizli.",
    img2pdf_privacy_notice: "Resimler tarayıcında dönüştürülür. Hiçbir şey yüklenmez.",
    img2pdf_drop_label: "Resimleri buraya bırak veya seçmek için tıkla",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — bir veya daha fazla ekle",
    img2pdf_page_size_label: "Sayfa boyutu",
    img2pdf_page_fit: "Resme sığdır",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Yükleniyor…",
    img2pdf_summary: "%d resim → 1 PDF",
    img2pdf_build_button: "PDF oluştur ve indir",
    img2pdf_building: "PDF oluşturuluyor…",
  },
  ru: {
    converter_image_to_pdf_title: "Изображение в PDF — Конвертировать JPG, PNG, HEIC в PDF Онлайн",
    converter_image_to_pdf_description:
      "Конвертируйте изображения JPG, PNG, HEIC и WebP в один PDF мгновенно в вашем браузере. Объединяйте фото, без загрузки, без регистрации, 100%% конфиденциально.",
    img2pdf_privacy_notice: "Изображения конвертируются в вашем браузере. Ничего не загружается.",
    img2pdf_drop_label: "Перетащите изображения сюда или нажмите для выбора",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — добавьте одно или больше",
    img2pdf_page_size_label: "Размер страницы",
    img2pdf_page_fit: "По размеру изображения",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Загрузка…",
    img2pdf_summary: "%d изображений → 1 PDF",
    img2pdf_build_button: "Создать и скачать PDF",
    img2pdf_building: "Создание PDF…",
  },
  ja: {
    converter_image_to_pdf_title: "画像をPDFに — JPG・PNG・HEICをPDFにオンライン無料変換",
    converter_image_to_pdf_description:
      "JPG、PNG、HEIC、WebP画像を1つのPDFに変換 — ブラウザで瞬時に。写真を結合、アップロード不要、登録不要、100%%プライベート。",
    img2pdf_privacy_notice: "画像はブラウザで変換されます。何もアップロードされません。",
    img2pdf_drop_label: "ここに画像をドロップまたはクリックして選択",
    img2pdf_drop_hint: "JPG、PNG、HEIC、WebP — 1つ以上を追加",
    img2pdf_page_size_label: "ページサイズ",
    img2pdf_page_fit: "画像に合わせる",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "レター",
    img2pdf_loading: "読み込み中…",
    img2pdf_summary: "%d枚の画像 → 1つのPDF",
    img2pdf_build_button: "PDFを作成してダウンロード",
    img2pdf_building: "PDF作成中…",
  },
  ko: {
    converter_image_to_pdf_title: "이미지를 PDF로 — JPG, PNG, HEIC를 PDF로 온라인 무료 변환",
    converter_image_to_pdf_description:
      "JPG, PNG, HEIC, WebP 이미지를 하나의 PDF로 변환 — 브라우저에서 즉시. 사진 결합, 업로드 없음, 가입 없음, 100%% 비공개.",
    img2pdf_privacy_notice: "이미지는 브라우저에서 변환됩니다. 아무것도 업로드되지 않습니다.",
    img2pdf_drop_label: "이미지를 여기에 놓거나 클릭해서 선택하세요",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — 하나 이상 추가",
    img2pdf_page_size_label: "페이지 크기",
    img2pdf_page_fit: "이미지에 맞춤",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "레터",
    img2pdf_loading: "불러오는 중…",
    img2pdf_summary: "%d개 이미지 → 1개 PDF",
    img2pdf_build_button: "PDF 만들고 다운로드",
    img2pdf_building: "PDF 만드는 중…",
  },
  zh: {
    converter_image_to_pdf_title: "图片转 PDF — 在线免费将 JPG、PNG、HEIC 转为 PDF",
    converter_image_to_pdf_description:
      "将 JPG、PNG、HEIC 和 WebP 图片转换为单个 PDF — 在浏览器中即刻完成。合并照片，无需上传，无需注册，100%% 私密。",
    img2pdf_privacy_notice: "图片在您的浏览器中转换，不会上传任何内容。",
    img2pdf_drop_label: "拖放图片到此处或点击选择",
    img2pdf_drop_hint: "JPG、PNG、HEIC、WebP — 添加一张或多张",
    img2pdf_page_size_label: "页面大小",
    img2pdf_page_fit: "适应图片",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "加载中…",
    img2pdf_summary: "%d 张图片 → 1 个 PDF",
    img2pdf_build_button: "创建并下载 PDF",
    img2pdf_building: "正在创建 PDF…",
  },
  hi: {
    converter_image_to_pdf_title: "इमेज से PDF — JPG, PNG, HEIC को PDF में ऑनलाइन मुफ़्त बदलें",
    converter_image_to_pdf_description:
      "JPG, PNG, HEIC और WebP इमेज को एक PDF में बदलें — तुरंत अपने ब्राउज़र में। फ़ोटो संयोजित करें, कोई अपलोड नहीं, कोई साइन-अप नहीं, 100%% प्राइवेट।",
    img2pdf_privacy_notice: "इमेज आपके ब्राउज़र में बदली जाती हैं। कुछ भी अपलोड नहीं होता।",
    img2pdf_drop_label: "यहाँ इमेज छोड़ें या चुनने के लिए क्लिक करें",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — एक या अधिक जोड़ें",
    img2pdf_page_size_label: "पेज साइज़",
    img2pdf_page_fit: "इमेज पर फ़िट",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "लोड हो रहा है…",
    img2pdf_summary: "%d इमेज → 1 PDF",
    img2pdf_build_button: "PDF बनाएँ और डाउनलोड करें",
    img2pdf_building: "PDF बना रहा है…",
  },
  ar: {
    converter_image_to_pdf_title: "صورة إلى PDF — حوّل JPG وPNG وHEIC إلى PDF أونلاين مجانًا",
    converter_image_to_pdf_description:
      "حوّل صور JPG وPNG وHEIC وWebP إلى ملف PDF واحد — فورًا في متصفّحك. اجمع الصور، بدون رفع، بدون تسجيل، خصوصية 100٪.",
    img2pdf_privacy_notice: "تتم معالجة الصور في متصفّحك. لا يتم رفع أي شيء.",
    img2pdf_drop_label: "أفلت الصور هنا أو انقر للاختيار",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — أضف صورة أو أكثر",
    img2pdf_page_size_label: "حجم الصفحة",
    img2pdf_page_fit: "ملاءمة الصورة",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "جاري التحميل…",
    img2pdf_summary: "%d صور → ملف PDF واحد",
    img2pdf_build_button: "أنشئ ونزّل PDF",
    img2pdf_building: "جاري إنشاء PDF…",
  },
  th: {
    converter_image_to_pdf_title: "รูปภาพเป็น PDF — แปลง JPG, PNG, HEIC เป็น PDF ออนไลน์ฟรี",
    converter_image_to_pdf_description:
      "แปลงรูปภาพ JPG, PNG, HEIC และ WebP เป็น PDF เดียว ทันทีในเบราว์เซอร์ รวมรูปได้ ไม่ต้องอัปโหลด ไม่ต้องสมัคร ส่วนตัว 100%%",
    img2pdf_privacy_notice: "รูปภาพถูกแปลงในเบราว์เซอร์ของคุณ ไม่มีการอัปโหลด",
    img2pdf_drop_label: "ปล่อยรูปภาพที่นี่หรือคลิกเพื่อเลือก",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — เพิ่มหนึ่งรูปหรือมากกว่า",
    img2pdf_page_size_label: "ขนาดหน้ากระดาษ",
    img2pdf_page_fit: "พอดีกับรูป",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "กำลังโหลด…",
    img2pdf_summary: "%d รูป → 1 PDF",
    img2pdf_build_button: "สร้างและดาวน์โหลด PDF",
    img2pdf_building: "กำลังสร้าง PDF…",
  },
  vi: {
    converter_image_to_pdf_title: "Ảnh sang PDF — Chuyển JPG, PNG, HEIC sang PDF Trực Tuyến Miễn Phí",
    converter_image_to_pdf_description:
      "Chuyển ảnh JPG, PNG, HEIC và WebP sang một tệp PDF, ngay lập tức trong trình duyệt. Gộp ảnh, không tải lên, không đăng ký, riêng tư 100%%.",
    img2pdf_privacy_notice: "Ảnh được chuyển đổi trong trình duyệt. Không có gì được tải lên.",
    img2pdf_drop_label: "Thả ảnh vào đây hoặc nhấn để chọn",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — thêm một hoặc nhiều",
    img2pdf_page_size_label: "Khổ giấy",
    img2pdf_page_fit: "Vừa với ảnh",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Đang tải…",
    img2pdf_summary: "%d ảnh → 1 PDF",
    img2pdf_build_button: "Tạo và tải PDF",
    img2pdf_building: "Đang tạo PDF…",
  },
  id: {
    converter_image_to_pdf_title: "Gambar ke PDF — Konversi JPG, PNG, HEIC ke PDF Online Gratis",
    converter_image_to_pdf_description:
      "Konversi gambar JPG, PNG, HEIC, dan WebP menjadi satu PDF, langsung di browser. Gabung foto, tanpa unggah, tanpa daftar, 100%% privat.",
    img2pdf_privacy_notice: "Gambar dikonversi di browser. Tidak ada yang diunggah.",
    img2pdf_drop_label: "Letakkan gambar di sini atau klik untuk memilih",
    img2pdf_drop_hint: "JPG, PNG, HEIC, WebP — tambahkan satu atau lebih",
    img2pdf_page_size_label: "Ukuran halaman",
    img2pdf_page_fit: "Sesuaikan ke gambar",
    img2pdf_page_a4: "A4",
    img2pdf_page_letter: "Letter",
    img2pdf_loading: "Memuat…",
    img2pdf_summary: "%d gambar → 1 PDF",
    img2pdf_build_button: "Buat & unduh PDF",
    img2pdf_building: "Membuat PDF…",
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
