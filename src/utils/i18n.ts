import { type Locale } from "@/i18n-config";

/**
 * Generates a localized path name by replacing the locale segment in the pathname.
 * 
 * @param pathname - The current URL pathname.
 * @param locale - The target locale to redirect to.
 * @returns The newly constructed pathname with the target locale.
 */
export function getRedirectedPathName(pathname: string, locale: Locale): string {
  if (!pathname) return "/";
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/");
}

/**
 * Formats a year string or number according to the locale.
 * For Arabic, it uses the Arabic numbering system.
 *
 * @param year - The year to format.
 * @param lang - The current locale.
 * @returns The formatted year string.
 */
export function formatYear(year: string | number, lang: string): string {
  return Number(year).toLocaleString(lang, {
    numberingSystem: lang === "ar" ? "arab" : "latn",
    useGrouping: false,
  });
}
