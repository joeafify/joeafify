"use client";

import SquareLoader from "@/components/SquareLoader";
import TimelineListItem from "@/components/TimelineListItem";
import TimelineSidebar from "@/components/TimelineSidebar";
import { Locale } from "@/i18n-config";
import { JourneyItem } from "@/payload-types";
import { useState } from "react";

export default function JourneyClient({ lang, dict, initialItems }: { lang: Locale | string, dict: any, initialItems: JourneyItem[] }) {
  const transformedItems: JourneyItem[] = initialItems.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isCurrent: item.isCurrent,
    startMonth: item.startMonth,
    startYear: item.startYear,
    endMonth: item.endMonth || undefined,
    endYear: item.endYear || undefined,
    employer: item.employer,
    jobTitle: item.jobTitle,
    responsibilities: item.responsibilities,
    category: item.category,
    techStack: item.techStack,
  }));

  const [items] = useState<JourneyItem[]>(transformedItems);
  const [loading] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-150 h-150 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-175 h-175 bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-dots opacity-40"></div>
      </div>

      <main className="relative z-10 pt-32 pb-48 px-6 md:px-20 max-w-400 mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            The Path of <span className="text-primary">Creation.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A vertical odyssey through code and design, showcasing the milestones that shaped my
            career as a software engineer.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <SquareLoader text="Loading Journey" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 pb-32">
            {/* Timeline Content */}
            <div className="relative max-w-5xl mx-auto w-full">
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 timeline-line opacity-30"></div>
              <div
                className={`hidden absolute items-center justify-center -mb-12 p-2 bottom-0 md:left-1/2 -translate-x-1/2 w-max h-max bg-transparent text-secondary z-20 font-bold text-2xl md:flex`}
              >
                Start
              </div>
              {items.map((item, index) => (
                <TimelineListItem
                  key={index}
                  {...item}
                  alignment={index % 2 === 0 ? "left" : "right"}
                  lang={lang}
                  dict={dict}
                />
              ))}
            </div>

            {items.length > 1 && <TimelineSidebar items={items} lang={lang} />}
          </div>
        )}
      </main>
    </>
  );
}
