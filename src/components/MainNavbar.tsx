"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { Grid2X2, Home, Send, User } from "lucide-react";

interface NavbarProps {
  dict: {
    nav: {
      home: string;
      about: string;
      journey: string; // was projects in icons but text says Work? mapping...
      contact: string;
    };
  };
}

export default function MainNavbar({ dict }: NavbarProps) {
  const sections = ["home", "about", "projects", "contact"];

  const active = useActiveSection(sections);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="glass px-6 py-3 rounded-full flex items-center gap-8 shadow-2xl">
        <a className="flex flex-col items-center gap-1 group" href="#home">
          <Home
            className={`${active === "home" ? "text-ocean-light" : "text-slate-400"} group-hover:text-primary transition-colors`}
          />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
            {dict.nav.home}
          </span>
        </a>
        <a className="flex flex-col items-center gap-1 group" href="#about">
          <User
            className={`${active === "about" ? "text-ocean-light" : "text-slate-400"} group-hover:text-primary transition-colors`}
          />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
            {dict.nav.about}
          </span>
        </a>
        <a className="flex flex-col items-center gap-1 group" href="#projects">
          <Grid2X2
            className={`${active === "projects" ? "text-ocean-light" : "text-slate-400"} group-hover:text-primary transition-colors`}
          />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
            {dict.nav.journey}
          </span>
        </a>
        <a className="flex flex-col items-center gap-1 group" href="#contact">
          <Send
            className={`${active === "contact" ? "text-ocean-light" : "text-slate-400"} group-hover:text-primary transition-colors`}
          />
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
            {dict.nav.contact}
          </span>
        </a>
      </div>
    </nav>
  );
}
