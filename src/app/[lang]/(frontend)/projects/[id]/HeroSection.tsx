"use client";

import { Media } from "@/payload-types";
import { Code, Rocket } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

interface HeroSectionProps {
  project: any;
  dict: any;
  livePreview?: string;
  sourceCode?: string;
}

export function HeroSection({ project, dict, livePreview, sourceCode }: HeroSectionProps) {
  return (
    <motion.section
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden"
      id="hero"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 z-0">
        {project.image && typeof project.image === "object" && (
          <Image
            src={(project.image as Media).url || ""}
            alt={(project.image as Media).alt ?? project.title}
            fill
            className="object-cover opacity-40 blur-sm scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-background-dark/20 via-background-dark/50 to-background-dark/90"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          className="inline-block px-4 py-1.5 mb-6 glass rounded-full border border-ocean-light/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-ocean-light">
            Case Study: {project.title}
          </span>
        </motion.div>
        <motion.h1
          className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8 dark:text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-gradient">{project.title}</span>
        </motion.h1>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {livePreview && (
            <a
              href={livePreview}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 glow-hover flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              {dict.project_details.hero.live_demo}
            </a>
          )}
          {sourceCode && (
            <a
              href={sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="glass text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2"
            >
              <Code className="w-5 h-5" />
              {dict.project_details.hero.view_code}
            </a>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
