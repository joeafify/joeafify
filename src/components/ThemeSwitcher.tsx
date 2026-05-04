"use client";

import { getCookie, setCookie } from "@/utils/cookies";
import { Laptop, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const THEME_COOKIE_KEY = "NEXT_THEME";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from cookies on mount
  useEffect(() => {
    const savedTheme = getCookie(THEME_COOKIE_KEY) as Theme | null;
    setTheme(savedTheme || "system");
    setMounted(true);
  }, []);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    let effectiveTheme: "light" | "dark" =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    // Update cookie
    setCookie(THEME_COOKIE_KEY, theme);

    // Update DOM
    if (effectiveTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme, mounted]);

  // Listen for system theme preference changes when in system mode
  useEffect(() => {
    if (theme !== "system" || !mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Trigger a re-render to apply the new system theme
      const html = document.documentElement;
      if (mediaQuery.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full flex items-center gap-4 p-4">
        <button
          onClick={() => handleThemeChange("light")}
          aria-label="Light theme"
          className={`glass w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            theme === "light"
              ? "bg-primary/20 text-primary border border-primary/50"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sun size={24} />
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          aria-label="Dark theme"
          className={`glass w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            theme === "dark"
              ? "bg-primary/20 text-primary border border-primary/50"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Moon size={24} />
        </button>
        <button
          onClick={() => handleThemeChange("system")}
          aria-label="System theme"
          className={`glass w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            theme === "system"
              ? "bg-primary/20 text-primary border border-primary/50"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Laptop size={24} />
        </button>
      </div>
    </div>
  );
}
