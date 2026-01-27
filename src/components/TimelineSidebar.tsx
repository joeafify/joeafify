"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { TimelineItem } from "@/interfaces";
import { formatYear } from "@/utils/i18n";

interface TimelineSidebarProps {
  items: TimelineItem[];
  lang: string;
}

export default function TimelineSidebar({ items, lang }: TimelineSidebarProps) {
  // Generate section IDs to observe
  const sectionIds = items.map((item) => `journey-${item.startYear}`);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const activeSection = useActiveSection(
    sectionIds,
    {
      rootMargin: "-20% 0px -60% 0px", // Detects element in the top-center viewport
      threshold: 0.1,
    },
    !isDesktop
  );

  if (!isDesktop) return null;

  return (
    <div className="sticky top-32 h-fit ml-8">
      <div
        className={`flex flex-col gap-2 items-end relative rounded-xl border-3 ${sectionIds.findIndex((id) => id === activeSection) % 2 === 0 ? "border-ocean-light/20" : "border-primary/20"} p-2`}
      >
        {items.map((item, index) => {
          const id = `journey-${item.startYear}`;
          const isActive = activeSection === id;

          return (
            <a
              key={index}
              href={`#${id}`}
              className={`group w-full justify-center flex items-center gap-4 px-4 py-2 transition-all rounded-lg duration-300 cursor-pointer ${isActive
                ? index % 2 === 0
                  ? "bg-ocean-light scale-105 "
                  : "bg-primary scale-105 "
                : "bg-transparent text-white hover:bg-white/5"
                } `}
            >
              <span
                className={`text-sm font-mono tracking-widest ${isActive ? "font-extrabold" : "font-bold"}`}
              >
                {formatYear(item.startYear, lang)}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
