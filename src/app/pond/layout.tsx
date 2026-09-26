import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pond",
  description: "Private.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: "Pond",
    description: "Private.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Pond",
    description: "Private.",
    images: [],
  },
};

export default function PondLayout({ children }: { children: React.ReactNode }) {
  return children;
}
