import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a84ff",
};

export const metadata: Metadata = {
  title: {
    default: "metric.page — Smart Converters & Calculators",
    template: "%s | metric.page",
  },
  description:
    "Free online converters and calculators. Convert cat years, calculate BMI, compound interest, and 60+ more tools in 22 languages.",
  metadataBase: new URL("https://metric.page"),
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Metric Page",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
