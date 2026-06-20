import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";

const description =
  "Asad Faridi builds enterprise AI systems that turn weeks of manual work into seconds — RAG assistants, GPU-accelerated vision and microservices portals, shipped to production.";

export const metadata: Metadata = {
  metadataBase: new URL("https://asadfaridi.dev"),
  title: "Asad Faridi — Enterprise AI & Digital Transformation Engineer",
  description,
  keywords: [
    "Asad Faridi",
    "AI Engineer",
    "RAG",
    "Digital Transformation",
    "Fourth Partner Energy",
    "Next.js",
    "FastAPI",
    "Computer Vision",
  ],
  authors: [{ name: "Asad Faridi" }],
  openGraph: {
    title: "Asad Faridi — Enterprise AI & Digital Transformation Engineer",
    description,
    type: "website",
    images: ["/pro.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="grain" aria-hidden />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
