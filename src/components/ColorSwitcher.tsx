"use client";

import { getCookie, setCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";

type ColorVariant = "ocean" | "emerald" | "coral";

interface ColorPair {
  id: ColorVariant;
  label: string;
  primary: string;
  secondary: string;
}

const COLOR_VARIANTS: ColorPair[] = [
  {
    id: "ocean",
    label: "Ocean",
    primary: "#6366f1",
    secondary: "#a855f7",
  },
  {
    id: "emerald",
    label: "Emerald",
    primary: "#22c55e",
    secondary: "#06b6d4",
  },
  {
    id: "coral",
    label: "Coral",
    primary: "#ff7e67",
    secondary: "#f97316",
  },
];

const COLOR_VARIANT_COOKIE_KEY = "NEXT_COLOR_VARIANT";

export default function ColorSwitcher() {
  const [variant, setVariant] = useState<ColorVariant>("ocean");
  const [mounted, setMounted] = useState(false);

  // Initialize variant from cookies on mount
  useEffect(() => {
    const savedVariant = getCookie(COLOR_VARIANT_COOKIE_KEY) as ColorVariant | null;
    setVariant(savedVariant || "ocean");
    setMounted(true);
  }, []);

  // Apply color pair to DOM whenever it changes
  useEffect(() => {
    if (!mounted) return;

    const selectedVariant = COLOR_VARIANTS.find((opt) => opt.id === variant);
    if (!selectedVariant) return;

    const html = document.documentElement;

    // Update cookie
    setCookie(COLOR_VARIANT_COOKIE_KEY, variant);

    // Update CSS variables for both primary and secondary colors
    html.style.setProperty("--primary-color", selectedVariant.primary);
    html.style.setProperty("--secondary-color", selectedVariant.secondary);
  }, [variant, mounted]);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4 p-4">
      {COLOR_VARIANTS.map((option) => (
        <button
          key={option.id}
          onClick={() => setVariant(option.id)}
          aria-label={`${option.label} color variant`}
          className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer shrink-0 relative ${
            variant === option.id
              ? "border-white scale-110"
              : "border-white/20 hover:border-white/40"
          }`}
          title={option.label}
        >
          <div
            className="absolute inset-0 rounded-full bg-linear-to-r"
            style={{
              background: `linear-gradient(to right, ${option.primary}, ${option.secondary})`,
            }}
          />
        </button>
      ))}
    </div>
  );
}
