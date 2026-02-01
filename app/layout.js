import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/footer";
import Navbar from "./components/navbar";
import FloatingButtons from "./components/FloatingButtons";
import CustomCursor from "./components/helper/CustomCursor";

import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Umaar Ahmed - Software Developer",
  description: "This is the portfolio of Umaar Ahmed...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        
        {/* ⭐ EXTRA SHOOTING STARS (In div se globals.scss ki animations trigger hongi) */}
        <div className="star-extra"></div>
        <div className="star-reverse"></div>

        {/* 1. Cursor ko yahan rakha taake wo sabse upar ho */}
        <CustomCursor /> 
        
        <ToastContainer />

        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
        </main>

        <Footer />
        <FloatingButtons />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}