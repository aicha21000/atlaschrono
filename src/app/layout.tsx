import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

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

export const metadata: Metadata = {
  title: "Premium Auto DZ | Showroom Voitures de Prestige & Occasion Récente",
  description: "Importation et vente de véhicules d'occasion de prestige (moins de 3 ans) en Algérie. Mercedes-Benz, BMW, Audi, Porsche. Transparence et garantie 100% certifiée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${jakarta.variable}`}>
      <body>
        <Navbar />
        <main id="main-content" className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
