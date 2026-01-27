// hooks/useActiveSection.ts
import { useEffect, useState } from "react";

/**
 * Hook to observe active section in viewport
 * @param sectionIds Array of section ids to observe
 * @param options IntersectionObserver options
 * @returns Active section id
 * @example
 * ```tsx
 * const active = useActiveSection(
 *   ["home", "about", "projects", "contact"],
 *   { rootMargin: "-50% 0px -50% 0px"}
 * ); // returns "home" | "about" | "projects" | "contact" | null
 * ```
 */

export function useActiveSection(
  sectionIds: string[],
  options: IntersectionObserverInit = {
    rootMargin: "-50% 0px -50% 0px", // Detects element in the top-center viewport
  },
  stopFlag: boolean = false
) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (stopFlag) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, options, stopFlag]);

  return active;
}
