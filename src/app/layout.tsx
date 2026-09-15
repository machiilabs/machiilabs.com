import type { Metadata } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    "Independent Mac software lab. Skagway 1.1 — free Mac video organizer. Also: 15CE Flasher for HP 15c Collector’s Edition.",
  openGraph: {
    title: "Mach II Labs — Skagway 1.1",
    description:
      "Skagway 1.1 is out: collect clips while you browse, List hover preview, and more. Free Mac video organizer for the files already on your drives.",
    url: "https://machiilabs.com",
    siteName: "Mach II Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/skagway/product.png",
        width: 1200,
        height: 630,
        alt: "Skagway — Mac video organizer and library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mach II Labs — Skagway 1.1",
    description:
      "Skagway 1.1 is out: collect clips while you browse, List hover preview, and more.",
    images: ["/skagway/product.png"],
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
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
