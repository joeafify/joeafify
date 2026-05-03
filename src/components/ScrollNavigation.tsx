"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { LucideIcon, Settings } from "lucide-react";
import { useState } from "react";
import SettingsModal from "./SettingsModal";

interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
}

interface ScrollNavigationProps {
  items: NavItem[];
  showSettings?: boolean;
  dict: {
    nav: {
      settings: string;
    };
    settings: {
      language: {
        title: string;
      };
      theme: {
        title: string;
        light: string;
        dark: string;
        system: string;
      };
      color: {
        title: string;
      };
    };
  };
}

export default function ScrollNavigation({
  items,
  showSettings = true,
  dict,
}: ScrollNavigationProps) {
  const sectionIds = items.map((item) => item.id);
  const active = useActiveSection(sectionIds);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <a key={item.id} className="flex flex-col items-center gap-1 group" href={item.href}>
              <Icon
                className={`${
                  isActive ? "text-ocean-light" : "text-slate-400"
                } group-hover:text-primary transition-colors w-5 h-5`}
              />
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}

        {showSettings && (
          <>
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              aria-haspopup="dialog"
              aria-expanded={isSettingsOpen}
              aria-controls="settings-modal"
            >
              <Settings className="text-slate-400 group-hover:text-primary transition-colors w-5 h-5" />
              <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                {dict.nav.settings}
              </span>
            </button>
            <SettingsModal dict={dict} open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
          </>
        )}
      </div>
    </nav>
  );
}
