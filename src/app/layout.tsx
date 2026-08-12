import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CookieBanner from "@/components/CookieBanner/CookieBanner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

import { getLang, getDictionary } from "@/i18n/getLang";

export const metadata: Metadata = {
  title: "Atlas Chrono Cars | Importation Directe & Vente Auto",
  description: "Atlas Chrono Cars : Votre partenaire de confiance pour l'importation et la vente de véhicules d'occasion récents. Transparence, conformité et accompagnement sur-mesure.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();
  const dict = await getDictionary();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className={`${outfit.variable} ${jakarta.variable}`}>
      <body>
        <Navbar />
        <main id="main-content" className="main-content">
          {children}
        </main>
        <Footer />
        <CookieBanner dict={dict} />
      </body>
    </html>
  );
}
