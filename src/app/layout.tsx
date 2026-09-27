import type { Metadata } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import { SiteAnalytics } from "@/components/site-analytics";
import "./globals.css";

// iOS wallet browsers inject this and throw before the page. The dev overlay
// would otherwise treat it as an app crash. Real errors still surface.
const IGNORE_INJECTED_WALLET_ERROR = `(function(){window.addEventListener("error",function(event){var message=String((event&&event.message)||(event.error&&event.error.message)||"");if(message.indexOf("ethereum")===-1&&message.indexOf("selectedAddress")===-1)return;event.preventDefault();event.stopImmediatePropagation();},true);})();`;

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
    "Independent Mac software lab. Skagway 1.3 is coming soon. Free Mac video organizer. Also: 15CE Flasher for HP 15c Collector’s Edition.",
  openGraph: {
    title: "Mach II Labs — Skagway 1.3 coming soon",
    description:
      "Skagway 1.3 is coming soon: Storyboard view, hide the Inspector, collected sets, and a rolodex-style scroll index. Free Mac video organizer for the files already on your drives.",
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
    title: "Mach II Labs — Skagway 1.3 coming soon",
    description:
      "Skagway 1.3 is coming soon: Storyboard view, hide the Inspector, collected sets, and a rolodex-style scroll index.",
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
