"use client";

import { getCookie } from "@/utils/cookies";
import { useEffect } from "react";

const COLOR_VARIANTS: Record<string, { primary: string; secondary: string }> = {
  ocean: { primary: "#6366f1", secondary: "#a855f7" },
  emerald: { primary: "#22c55e", secondary: "#06b6d4" },
  coral: { primary: "#ff7e67", secondary: "#f97316" },
};

/**
 * PreferenceLoader - Initializes theme and color preferences from cookies
 * Place this in your root layout to ensure preferences are loaded on app start
 */
export default function PreferenceLoader() {
  useEffect(() => {
    const pathname = window.location.pathname;
    const lang = pathname.split("/")[1];
    const html = document.documentElement;

    if (lang === "ar" || lang === "en") {
      html.lang = lang;
      html.dir = lang === "ar" ? "rtl" : "ltr";
    }

    // Load and apply color from cookie
    const savedColor = getCookie("NEXT_COLOR_VARIANT") || "ocean";
    const colorVariant = COLOR_VARIANTS[savedColor] || COLOR_VARIANTS.ocean;
    html.style.setProperty("--primary-color", colorVariant.primary);
    html.style.setProperty("--secondary-color", colorVariant.secondary);

    // Load and apply theme from cookie
    const savedTheme = getCookie("NEXT_THEME") || "system";
    const effectiveTheme =
      savedTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : (savedTheme as "light" | "dark");

    if (effectiveTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  return null;
}
