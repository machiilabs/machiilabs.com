import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteAnalytics } from "@/components/site-analytics";
import "./globals.css";

// iOS wallet browsers inject this and throw before the page. The dev overlay
// would otherwise treat it as an app crash. Real errors still surface.
const IGNORE_INJECTED_WALLET_ERROR = `(function(){window.addEventListener("error",function(event){var message=String((event&&event.message)||(event.error&&event.error.message)||"");if(message.indexOf("ethereum")===-1&&message.indexOf("selectedAddress")===-1)return;event.preventDefault();event.stopImmediatePropagation();},true);})();`;

const inter = localFont({
  src: [
    {
      path: "./fonts/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const instrument = localFont({
  src: "./fonts/InstrumentSansVariable.woff2",
  weight: "100 900",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://machiilabs.com"),
  title: {
    default: "Mach II Labs",
    template: "%s · Mach II Labs",
  },
  description:
    "Independent Mac software lab. Skagway 1.5 — free Mac video organizer. Also: 15CE Flasher for HP 15c Collector’s Edition.",
  openGraph: {
    title: "Mach II Labs — Skagway 1.5",
    description:
      "Skagway 1.5 converts natively unplayable files into playable copies. Many video formats are supported. Free Mac video organizer for the files already on your drives.",
    url: "https://machiilabs.com",
    siteName: "Mach II Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/skagway/og.jpg",
        width: 1200,
        height: 630,
        alt: "Skagway — Free Mac video organizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mach II Labs — Skagway 1.5",
    description:
      "Skagway 1.5 converts natively unplayable files into playable copies. Many video formats are supported.",
    images: ["/skagway/og.jpg"],
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
      className={`${inter.variable} ${instrument.variable} h-full`}
    >
      {process.env.NODE_ENV === "development" ? (
        <head>
          <script
            dangerouslySetInnerHTML={{ __html: IGNORE_INJECTED_WALLET_ERROR }}
          />
        </head>
      ) : null}
      <body className="min-h-full">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
