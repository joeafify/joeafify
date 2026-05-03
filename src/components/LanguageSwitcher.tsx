"use client";

import { i18n, type Locale } from "@/i18n-config";
import { getRedirectedPathName } from "@/utils/i18n";
import { Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      <div className="px-3 py-3 flex items-center gap-4 text-[18px] font-sans font-semibold tracking-wider uppercase">
        {i18n.locales.map((locale) => {
          const currentLocale = pathname?.split("/")[1] as Locale;
          const isActive = currentLocale === locale;
          return (
            <Link
              key={locale}
              href={getRedirectedPathName(pathname || "/", locale)}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
                window.history.replaceState(
                  null,
                  "",
                  getRedirectedPathName(pathname || "/", locale)
                );
              }}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                isActive ? "bg-primary text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {locale === "en" ? "EN" : "AR"}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
