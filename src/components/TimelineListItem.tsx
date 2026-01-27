import { formatYear } from "@/utils/i18n";
import { JourneyItem } from "@/payload-types";

export default function TimelineListItem({
  startMonth,
  startYear,
  endMonth,
  endYear,
  jobTitle,
  employer,
  responsibilities,
  tags,
  lang,
  dict,
  alignment
}: JourneyItem & { alignment: string; lang: string; dict: { journey: { present: string }; months: Record<string, string> } }) {
  const isLeft = alignment === "left";
  const colorClass = isLeft
    ? "text-ocean-light border-ocean-light/20"
    : "text-primary border-primary/20";
  const nodeBorderClass = isLeft ? "border-ocean-light" : "border-primary";

  // Use year as ID
  const id = `journey-${startYear}`;

  const startMonthDisplay = dict.months[startMonth] || startMonth;
  const endMonthDisplay = endMonth ? (dict.months[endMonth] || endMonth) : "";

  const formattedYears = `${startMonthDisplay} ${formatYear(startYear, lang)} - ${endYear ? `${endMonthDisplay} ${formatYear(endYear, lang)}` : dict.journey.present}`;

  return (
    <div
      id={id}
      className={`relative flex flex-col md:flex-row items-start justify-between mb-12 md:mb-32 group last:mb-12 scroll-mt-32`}
    >
      {/* Left Content (Desktop Only for 'Left' items) */}
      <div
        className={`w-full md:w-[45%] pl-12 md:pl-0 pr-0 md:pr-12 text-left md:text-right ${isLeft ? "block" : "hidden md:block md:invisible"}`}
      >
        {isLeft && (
          <>
            <div className={`inline-block px-3 py-1 mb-3 glass rounded-full border ${colorClass}`}>
              <span
                className={`text-xs font-bold tracking-widest ${isLeft ? "text-ocean-light" : "text-primary"}`}
              >
                {formattedYears}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{jobTitle}</h3>
            {responsibilities && <p className="text-slate-400 text-sm mb-4 leading-relaxed">{responsibilities}</p>}
            {responsibilities && responsibilities.length > 0 && (
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {responsibilities}
              </p>
            )}
            <div className={`flex gap-2 justify-start ${lang === "ar" ? "md:justify-start" : "md:justify-end"} flex-wrap`}>
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs bg-white/5 px-2 py-1 rounded-full border-2 ${index % 2 === 0 ? "text-primary border-primary/20" : "text-ocean-light border-ocean-light/20"}`}
                >
                  {tag?.name?.toLocaleUpperCase()}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Center Node */}
      <div
        className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-ocean-dark border-4 ${nodeBorderClass} glow-node z-20 top-0 md:top-auto`}
      ></div>

      {/* Right Content (Desktop for 'Right' items, All items on Mobile) */}
      <div
        className={`w-full md:w-[45%] pl-12 md:pl-12 text-left ${!isLeft ? "block" : "hidden md:block md:invisible"}`}
      >
        {/* On mobile, we render the 'Left' item content here too so it appears on the right side */}
        {(!isLeft || (isLeft && "block md:hidden")) && (
          <>
            {/* Duplicate content logic for mobile 'left' items shown on right, or normal right items */}
            <div className={`inline-block px-3 py-1 mb-3 glass rounded-full border ${colorClass}`}>
              <span
                className={`text-xs font-bold tracking-widest ${!isLeft ? "text-primary" : "text-ocean-light"}`}
              >
                {formattedYears}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{jobTitle}</h3>
            {responsibilities && <p className="text-slate-400 text-sm mb-4 leading-relaxed">{responsibilities}</p>}
            {responsibilities && responsibilities.length > 0 && (
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {responsibilities}
              </p>
            )}
            <div className={`flex gap-2 justify-start ${lang === "ar" ? "md:justify-end" : "md:justify-start"} flex-wrap`}>
              {tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs bg-white/5 px-2 py-1 rounded-full border-2 ${index % 2 === 0 ? "text-primary border-primary/20" : "text-ocean-light border-ocean-light/20"}`}
                >
                  {tag?.name?.toLocaleUpperCase()}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
