import type { Metadata } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://machiilabs.com"),
  title: {
    default: "Mach II Labs",
    template: "%s · Mach II Labs",
  },
  description:
    "Independent Mac software lab. First release: 15CE Flasher — guided firmware flashing for the Collector’s Edition.",
  openGraph: {
    title: "Mach II Labs",
    description:
      "Independent Mac software lab. First release: 15CE Flasher for Mac.",
    url: "https://machiilabs.com",
    siteName: "Mach II Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mach II Labs",
    description:
      "Independent Mac software lab. First release: 15CE Flasher for Mac.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrument.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
