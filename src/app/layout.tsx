import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "metric.page — Smart Converters & Calculators",
    template: "%s | metric.page",
  },
  description:
    "Free online converters and calculators. Convert cat years, calculate BMI, compound interest, and 60+ more tools in 22 languages.",
  metadataBase: new URL("https://metric.page"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
