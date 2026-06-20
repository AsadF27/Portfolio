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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d16" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7fd" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Sets the theme before first paint (no flash). Defaults to dark.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme', t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={GeistSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="grain" aria-hidden />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
