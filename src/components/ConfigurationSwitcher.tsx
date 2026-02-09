"use client";

import { i18n, type Locale } from "@/i18n-config";
import { getRedirectedPathName } from "@/utils/i18n";
import { Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ConfigurationSwitcher() {
  const pathname = usePathname();

  return null;

  return (
    <nav className={`fixed top-0 ${pathname?.split("/")[1] === "ar" ? "left-38" : "right-38"} w-full z-60 py-6 px-6 md:px-20 flex justify-between items-center pointer-events-none`}>
      <div className="pointer-events-auto"></div>
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="glass px-1.5 py-1.5 rounded-full flex items-center gap-1 text-[11px] font-sans font-semibold tracking-wider uppercase">
          {i18n.locales.map((locale) => {
            const currentLocale = pathname?.split("/")[1] as Locale;
            const isActive = currentLocale === locale;
            return (
              <Link
                key={locale}
                href={getRedirectedPathName(pathname || "/", locale)}
                onClick={() => {
                  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
                  window.history.replaceState(null, "", getRedirectedPathName(pathname || "/", locale));
                }}
                className={`px-2 py-0.5 rounded-full transition-all ${isActive ? "bg-primary text-white" : "text-slate-400 hover:text-white"
                  }`}
              >
                {locale === "en" ? "EN" : "AR"}
              </Link>
            );
          })}
        </div>
        <button className="glass w-10 h-10 rounded-full flex items-center justify-center text-ocean-light hover:text-white transition-all theme-glow border border-ocean-light/20 cursor-pointer">
          <Sun className="w-5 h-5 text-[20px]" />
        </button>
      </div>
    </nav>
  );
}
