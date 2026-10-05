import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import FloatingButtons from "./components/FloatingButtons";
import CustomCursor from "./components/helper/CustomCursor";
import { ThemeProvider, themeInitScript } from "./components/ThemeProvider";

import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // avoids invisible-text flash while the font loads
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL("https://umaarahmed.dev"),
  title: {
    default: "Umaar Ahmed — Full Stack Developer",
    template: "%s | Umaar Ahmed",
  },
  description:
    "Portfolio of Umaar Ahmed — Full Stack Developer specialising in Next.js, React and Node.js. Building fast, scalable and user-centric web applications.",
  keywords: [
    "Umaar Ahmed",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Umaar Ahmed" }],
  openGraph: {
    title: "Umaar Ahmed — Full Stack Developer",
    description:
      "Full Stack Developer specialising in Next.js, React and Node.js.",
    type: "website",
    locale: "en_US",
    images: ["/new.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Umaar Ahmed — Full Stack Developer",
    description:
      "Full Stack Developer specialising in Next.js, React and Node.js.",
    images: ["/new.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint → no flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.className} ${inter.variable}`} suppressHydrationWarning>

        {/* ⭐ EXTRA SHOOTING STARS (In div se globals.scss ki animations trigger hongi) */}
        <div className="star-extra" aria-hidden="true" />
        <div className="star-reverse" aria-hidden="true" />

        {/* 1. Cursor ko yahan rakha taake wo sabse upar ho */}
        <CustomCursor />

        <ToastContainer />

        <ThemeProvider>
          <main className="relative mx-auto min-h-screen w-full max-w-[92rem] px-4 text-[var(--ink)] sm:px-6 lg:px-10">
            <Navbar />
            {children}
          </main>

          <Footer />
          <FloatingButtons />
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GTM && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      )}
    </html>
  );
}