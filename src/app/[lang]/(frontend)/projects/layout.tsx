import { getRedirectedPathName } from "@/utils/i18n";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ProjectsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <>
    <header className="relative z-20 py-8 px-6 md:px-20 max-w-[1600px] mx-auto flex justify-between items-center">
      <Link
        href={getRedirectedPathName("/", lang)}
        className="flex items-center gap-2 group text-slate-400 hover:text-white transition-colors"
      >
        {lang === "en" ? (
          <ArrowLeft className="material-symbols-outlined text-sm" />
        ) : (
          <ArrowRight className="material-symbols-outlined text-sm" />
        )}
        <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
      </Link>
      <div className="text-right">
        <h1 className="text-2xl font-black text-gradient uppercase tracking-tighter">
          {/* TODO: Add title */}
        </h1>
      </div>
    </header>
    {children}
  </>;
}