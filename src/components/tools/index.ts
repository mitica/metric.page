import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ToolKey } from "@/converters/types";

export interface ToolProps {
  lang: string;
}

export const toolRegistry: Record<ToolKey, ComponentType<ToolProps>> = {
  "qr-generator": dynamic(() => import("./qr-generator/qr-generator")),
  "image-format-converter": dynamic(
    () => import("./image-format-converter/image-format-converter"),
  ),
  "image-compressor": dynamic(() => import("./image-compressor/image-compressor")),
};
