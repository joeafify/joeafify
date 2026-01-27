import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { cookies } from "next/headers";
import { Rubik, Space_Grotesk } from "next/font/google";
import './globals.css';

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

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value as Locale) || "en";
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className="dark">
      <body className={`${lang === "ar" ? rubik.variable : spaceGrotesk.variable} antialiased font-display-${lang} bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white`}>
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-ocean-light/10 rounded-full blur-[150px]"></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>
          <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
            <div className="mb-12 relative floating-island">
              <div className="w-64 h-24 bg-linear-to-b from-slate-800 to-ocean-dark rounded-[100%] absolute -bottom-4 left-1/2 -translate-x-1/2 blur-2xl opacity-50"></div>
              <div className="relative flex flex-col items-center">
                <div className="w-80 h-4 bg-linear-to-r from-transparent via-primary/40 to-transparent blur-sm mb-8 broken-bridge"></div>
                <h1 className="text-9xl font-black neon-flicker text-white tracking-tighter mb-4">
                  {dict.not_found.title}
                </h1>
                <div className="absolute -top-10 -left-10 w-2 h-2 bg-ocean-light rounded-full shadow-[0_0_10px_#38bdf8]"></div>
                <div className="absolute top-20 -right-12 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#6c2bee]"></div>
                <div className="absolute -bottom-4 left-0 w-1.5 h-1.5 bg-ocean-light rounded-full shadow-[0_0_8px_#38bdf8]"></div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
                {dict.not_found.subtitle_part1}{" "}
                <span className="text-gradient">{dict.not_found.subtitle_gradient}</span>
                <br />
                {dict.not_found.subtitle_part2}
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
                {dict.not_found.description}
              </p>
              <div className="pt-8">
                <a
                  className="inline-flex items-center justify-center bg-primary text-white font-black uppercase tracking-widest px-12 py-5 rounded-lg hover:bg-primary/80 transition-all glow-hover transform hover:scale-105 group"
                  href="/"
                  aria-label={dict.not_found.back_home}
                  title={dict.not_found.back_home}
                  rel="noopener noreferrer"
                  target="_self"
                >
                  {dict.not_found.back_home}
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent"></div>
          </div>
        </main>
      </body>
    </html>
  );
}
