import { ConverterConfig } from "../types";

export const colorConverter: ConverterConfig = {
  slug: "color-converter",
  category: "digital-tech",
  icon: "🎨",
  titleKey: "converter_color_title",
  descriptionKey: "converter_color_description",
  inputs: [
    { id: "hex", type: "text", labelKey: "converter_color_hex_input", defaultValue: "#0A84FF" },
  ],
  calculate: (inputs) => {
    let hex = String(inputs.hex || "").replace("#", "").trim();
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) return [{ labelKey: "converter_color_result", value: "-" }];
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // RGB to HSL
    const rN = r / 255, gN = g / 255, bN = b / 255;
    const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rN: h = ((gN - bN) / d + (gN < bN ? 6 : 0)) / 6; break;
        case gN: h = ((bN - rN) / d + 2) / 6; break;
        case bN: h = ((rN - gN) / d + 4) / 6; break;
      }
    }
    return [
      { labelKey: "converter_color_hex", value: `#${hex.toUpperCase()}` },
      { labelKey: "converter_color_rgb", value: `rgb(${r}, ${g}, ${b})` },
      { labelKey: "converter_color_hsl", value: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)` },
      { labelKey: "converter_color_css_rgb", value: `${r} ${g} ${b}` },
    ];
  },
};

export const downloadTime: ConverterConfig = {
  slug: "download-time-calculator",
  category: "digital-tech",
  icon: "⬇️",
  titleKey: "converter_download_time_title",
  descriptionKey: "converter_download_time_description",
  inputs: [
    { id: "fileSize", type: "number", labelKey: "converter_download_time_file_size", min: 0, step: 0.1, defaultValue: 4.7, unitOptions: [
      { value: "GB", labelKey: "common_unit_gb", multiplier: 1 },
      { value: "MB", labelKey: "common_unit_mb", multiplier: 1 / 1024, step: 1 },
      { value: "TB", labelKey: "common_unit_tb", multiplier: 1024, step: 0.01 },
    ] },
    { id: "speed", type: "number", labelKey: "converter_download_time_speed", min: 0.1, step: 0.1, defaultValue: 100, unitOptions: [
      { value: "Mbps", labelKey: "common_unit_mbps", multiplier: 1 },
      { value: "Gbps", labelKey: "common_unit_gbps", multiplier: 1000, step: 0.01 },
    ] },
  ],
  calculate: (inputs) => {
    const sizeGB = Number(inputs.fileSize) || 0;
    const speedMbps = Number(inputs.speed) || 1;
    const sizeMb = sizeGB * 8 * 1024;
    const seconds = sizeMb / speedMbps;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);
    return [
      { labelKey: "converter_download_time_result", value: parts.join(" ") },
      { labelKey: "converter_download_time_total_seconds", value: Math.round(seconds) },
    ];
  },
};

export const screenPPI: ConverterConfig = {
  slug: "screen-ppi-calculator",
  category: "digital-tech",
  icon: "🖥️",
  titleKey: "converter_screen_ppi_title",
  descriptionKey: "converter_screen_ppi_description",
  inputs: [
    { id: "widthPx", type: "number", labelKey: "converter_screen_ppi_width_px", min: 1, step: 1, defaultValue: 2560 },
    { id: "heightPx", type: "number", labelKey: "converter_screen_ppi_height_px", min: 1, step: 1, defaultValue: 1440 },
    { id: "diagonal", type: "number", labelKey: "converter_screen_ppi_diagonal", min: 1, step: 0.1, defaultValue: 27, unit: "common_unit_in" },
  ],
  calculate: (inputs) => {
    const w = Number(inputs.widthPx) || 0;
    const h = Number(inputs.heightPx) || 0;
    const d = Number(inputs.diagonal) || 1;
    const diagonalPx = Math.sqrt(w * w + h * h);
    const ppi = diagonalPx / d;
    const dotPitch = 25.4 / ppi;
    return [
      { labelKey: "converter_screen_ppi_result_ppi", value: Math.round(ppi * 10) / 10, unit: "common_unit_ppi" },
      { labelKey: "converter_screen_ppi_dot_pitch", value: Math.round(dotPitch * 1000) / 1000, unit: "common_unit_mm" },
      { labelKey: "converter_screen_ppi_total_pixels", value: (w * h / 1000000).toFixed(2), unit: "common_unit_mp" },
    ];
  },
};

export const aspectRatio: ConverterConfig = {
  slug: "aspect-ratio-calculator",
  category: "digital-tech",
  icon: "📐",
  titleKey: "converter_aspect_ratio_title",
  descriptionKey: "converter_aspect_ratio_description",
  inputs: [
    { id: "width", type: "number", labelKey: "converter_aspect_ratio_width", min: 1, step: 1, defaultValue: 1920 },
    { id: "height", type: "number", labelKey: "converter_aspect_ratio_height", min: 1, step: 1, defaultValue: 1080 },
  ],
  calculate: (inputs) => {
    const w = Number(inputs.width) || 1;
    const h = Number(inputs.height) || 1;
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(w, h);
    return [
      { labelKey: "converter_aspect_ratio_ratio", value: `${w / g}:${h / g}` },
      { labelKey: "converter_aspect_ratio_decimal", value: Math.round((w / h) * 1000) / 1000 },
    ];
  },
};

export const dataStorage: ConverterConfig = {
  slug: "data-storage-converter",
  category: "digital-tech",
  icon: "💾",
  titleKey: "converter_data_storage_title",
  descriptionKey: "converter_data_storage_description",
  inputs: [
    { id: "value", type: "number", labelKey: "converter_data_storage_input_value", min: 0, step: 0.01, defaultValue: 1 },
    { id: "unit", type: "select", labelKey: "converter_data_storage_input_unit", defaultValue: "GB", options: [
      { value: "B", labelKey: "converter_data_storage_bytes" },
      { value: "KB", labelKey: "converter_data_storage_kb" },
      { value: "MB", labelKey: "converter_data_storage_mb" },
      { value: "GB", labelKey: "converter_data_storage_gb" },
      { value: "TB", labelKey: "converter_data_storage_tb" },
      { value: "PB", labelKey: "converter_data_storage_pb" },
    ]},
  ],
  calculate: (inputs) => {
    const value = Number(inputs.value) || 0;
    const unit = String(inputs.unit || "GB");
    const toBytes: Record<string, number> = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4, PB: 1024 ** 5 };
    const bytes = value * (toBytes[unit] || 1);
    const format = (b: number, u: string) => {
      const val = b / (toBytes[u] || 1);
      return val >= 1 ? val.toLocaleString("en", { maximumFractionDigits: 4 }) : val.toExponential(3);
    };
    return [
      { labelKey: "converter_data_storage_bytes", value: format(bytes, "B"), unit: "common_unit_bytes" },
      { labelKey: "converter_data_storage_kb", value: format(bytes, "KB"), unit: "common_unit_kb" },
      { labelKey: "converter_data_storage_mb", value: format(bytes, "MB"), unit: "common_unit_mb" },
      { labelKey: "converter_data_storage_gb", value: format(bytes, "GB"), unit: "common_unit_gb" },
      { labelKey: "converter_data_storage_tb", value: format(bytes, "TB"), unit: "common_unit_tb" },
      { labelKey: "converter_data_storage_pb", value: format(bytes, "PB"), unit: "common_unit_pb" },
    ];
  },
};

export const bandwidth: ConverterConfig = {
  slug: "bandwidth-calculator",
  category: "digital-tech",
  icon: "📶",
  titleKey: "converter_bandwidth_title",
  descriptionKey: "converter_bandwidth_description",
  inputs: [
    { id: "speed", type: "number", labelKey: "converter_bandwidth_speed", min: 0.1, step: 0.1, defaultValue: 100, unit: "common_unit_mbps" },
  ],
  calculate: (inputs) => {
    const mbps = Number(inputs.speed) || 0;
    const mbytes = mbps / 8;
    const gbPerHour = (mbytes * 3600) / 1024;
    return [
      { labelKey: "converter_bandwidth_mbps", value: mbps, unit: "common_unit_mbps" },
      { labelKey: "converter_bandwidth_mbytes_s", value: Math.round(mbytes * 100) / 100, unit: "common_unit_mb_s" },
      { labelKey: "converter_bandwidth_gb_hour", value: Math.round(gbPerHour * 100) / 100, unit: "common_unit_gb_h" },
      { labelKey: "converter_bandwidth_gb_minute", value: Math.round(gbPerHour / 60 * 1000) / 1000, unit: "common_unit_gb_min" },
    ];
  },
};

export const megapixel: ConverterConfig = {
  slug: "megapixel-calculator",
  category: "digital-tech",
  icon: "📷",
  titleKey: "converter_megapixel_title",
  descriptionKey: "converter_megapixel_description",
  inputs: [
    { id: "width", type: "number", labelKey: "converter_aspect_ratio_width", min: 1, step: 1, defaultValue: 4032 },
    { id: "height", type: "number", labelKey: "converter_aspect_ratio_height", min: 1, step: 1, defaultValue: 3024 },
  ],
  calculate: (inputs) => {
    const w = Number(inputs.width) || 0;
    const h = Number(inputs.height) || 0;
    const mp = (w * h) / 1000000;
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(w, h);
    const fileSize4k = (w * h * 3) / (1024 * 1024); // Uncompressed RGB
    const fileSizeJpeg = fileSize4k / 10; // ~10:1 compression
    return [
      { labelKey: "converter_megapixel_result", value: Math.round(mp * 10) / 10, unit: "common_unit_mp" },
      { labelKey: "converter_aspect_ratio_ratio", value: `${w / g}:${h / g}` },
      { labelKey: "converter_megapixel_uncompressed", value: Math.round(fileSize4k * 10) / 10, unit: "common_unit_mb" },
      { labelKey: "converter_megapixel_jpeg_approx", value: Math.round(fileSizeJpeg * 10) / 10, unit: "common_unit_mb" },
    ];
  },
};

export const cidrCalculator: ConverterConfig = {
  slug: "cidr-calculator",
  category: "digital-tech",
  icon: "🌐",
  titleKey: "converter_cidr_title",
  descriptionKey: "converter_cidr_description",
  inputs: [
    { id: "ip", type: "text", labelKey: "converter_cidr_ip_input", defaultValue: "192.168.1.0" },
    { id: "prefix", type: "number", labelKey: "converter_cidr_prefix_input", min: 0, max: 32, step: 1, defaultValue: 24 },
  ],
  calculate: (inputs) => {
    const ipStr = String(inputs.ip || "").trim();
    const prefix = Math.max(0, Math.min(32, Math.floor(Number(inputs.prefix) || 0)));

    const parts = ipStr.split(".");
    if (parts.length !== 4) return [{ labelKey: "converter_cidr_invalid", value: ipStr || "-" }];
    let ipNum = 0;
    for (const p of parts) {
      if (!/^\d{1,3}$/.test(p)) return [{ labelKey: "converter_cidr_invalid", value: ipStr }];
      const v = parseInt(p, 10);
      if (v < 0 || v > 255) return [{ labelKey: "converter_cidr_invalid", value: ipStr }];
      ipNum = ipNum * 256 + v;
    }
    ipNum = ipNum >>> 0;

    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const wildcard = (~mask) >>> 0;
    const network = (ipNum & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const total = prefix === 0 ? 4294967296 : Math.pow(2, 32 - prefix);
    const usable = prefix >= 31 ? total : total - 2;
    const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
    const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;

    const toStr = (n: number) =>
      [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");

    const firstOctet = (network >>> 24) & 0xff;
    let classKey: string;
    if (firstOctet < 128) classKey = "converter_cidr_class_a";
    else if (firstOctet < 192) classKey = "converter_cidr_class_b";
    else if (firstOctet < 224) classKey = "converter_cidr_class_c";
    else if (firstOctet < 240) classKey = "converter_cidr_class_d";
    else classKey = "converter_cidr_class_e";

    const inBlock = (a: number, b: number, c: number, d: number, p: number) => {
      const blockIp = ((a * 256 + b) * 256 + c) * 256 + d;
      const blockMask = p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0;
      return (ipNum & blockMask) === (blockIp & blockMask) >>> 0;
    };
    let typeKey: string;
    if (inBlock(127, 0, 0, 0, 8)) typeKey = "converter_cidr_type_loopback";
    else if (inBlock(10, 0, 0, 0, 8) || inBlock(172, 16, 0, 0, 12) || inBlock(192, 168, 0, 0, 16))
      typeKey = "converter_cidr_type_private";
    else if (inBlock(169, 254, 0, 0, 16)) typeKey = "converter_cidr_type_link_local";
    else if (inBlock(192, 0, 2, 0, 24) || inBlock(198, 51, 100, 0, 24) || inBlock(203, 0, 113, 0, 24))
      typeKey = "converter_cidr_type_documentation";
    else if (firstOctet >= 224 && firstOctet < 240) typeKey = "converter_cidr_type_multicast";
    else if (firstOctet >= 240) typeKey = "converter_cidr_type_reserved";
    else typeKey = "converter_cidr_type_public";

    return [
      { labelKey: "converter_cidr_cidr_notation", value: `${toStr(network)}/${prefix}` },
      { labelKey: "converter_cidr_network", value: toStr(network) },
      { labelKey: "converter_cidr_broadcast", value: toStr(broadcast) },
      { labelKey: "converter_cidr_subnet_mask", value: toStr(mask) },
      { labelKey: "converter_cidr_wildcard_mask", value: toStr(wildcard) },
      { labelKey: "converter_cidr_first_host", value: toStr(firstHost) },
      { labelKey: "converter_cidr_last_host", value: toStr(lastHost) },
      { labelKey: "converter_cidr_total_addresses", value: total.toLocaleString("en") },
      { labelKey: "converter_cidr_usable_hosts", value: usable.toLocaleString("en") },
      { labelKey: "converter_cidr_ip_class", value: classKey },
      { labelKey: "converter_cidr_ip_type", value: typeKey },
    ];
  },
};

export const digitalTechConverters = [colorConverter, downloadTime, screenPPI, aspectRatio, dataStorage, bandwidth, megapixel, cidrCalculator];
