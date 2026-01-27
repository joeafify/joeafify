export const dynamic = 'force-dynamic'

import Footer from "@/components/Footer";
import ConfigurationSwitcher from "@/components/ConfigurationSwitcher";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";
import type { Metadata } from "next"; 
import { Rubik, Space_Grotesk } from "next/font/google";
import "../../globals.css";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Joe Afify",
  description: "Joe Afify's personal portfolio",
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "arabic"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className="dark">
      <body
        className={`${lang === "ar" ? rubik.variable : spaceGrotesk.variable} antialiased font-display-${lang} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white`}
      >
        <ConfigurationSwitcher />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
