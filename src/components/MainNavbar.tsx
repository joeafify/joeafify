"use client";

import ScrollNavigation from "@/components/ScrollNavigation";
import { Grid2X2, Home, Send, User } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  dict: {
    nav: {
      home: string;
      about: string;
      journey: string;
      contact: string;
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

export default function MainNavbar({ dict }: NavbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    {
      id: "home",
      href: "#home",
      label: dict.nav.home,
      icon: Home,
    },
    {
      id: "about",
      href: "#about",
      label: dict.nav.about,
      icon: User,
    },
    {
      id: "projects",
      href: "#projects",
      label: dict.nav.journey,
      icon: Grid2X2,
    },
    {
      id: "contact",
      href: "#contact",
      label: dict.nav.contact,
      icon: Send,
    },
  ];

  return (
    <>
      <ScrollNavigation items={navItems} dict={dict} />
    </>
  );
}
