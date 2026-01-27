import { getDictionary } from "@/get-dictionary";
import type { Locale } from "@/i18n-config";
import { getRedirectedPathName } from "@/utils/i18n";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Code,
  Github,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
        id="home"
      >
        {/* Abstract Geometric Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-ocean-light/10 rounded-full blur-[150px]"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-6 glass rounded-full border border-primary/30">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              {dict.home.badge}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-6 dark:text-white">
            {dict.home.title_part1}{" "}
            <span className="text-gradient">{dict.home.title_gradient}</span>
            <br />
            {dict.home.title_part2}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-10 font-light leading-relaxed">
            {dict.home.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="bg-primary hover:bg-primary/80 text-white px-10 py-4 rounded-lg font-bold transition-all transform hover:scale-105 glow-hover flex items-center gap-2"
            >
              {dict.home.view_work}
              <ArrowDown />
            </a>
            <a
              href="#contact"
              className="glass text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all border border-white/10"
            >
              {dict.home.get_in_touch}
            </a>
          </div>
        </div>
      </section>
      {/* About Section - Asymmetric Layout */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto" id="about">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-15 items-center">
          <div className="md:col-span-5 relative group w-4/5 sm:w-full mx-auto">
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-xl -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="absolute -inset-5 border-2 border-ocean-light/20 rounded-xl -rotate-9 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative rounded-xl overflow-hidden bg-slate-800 aspect-4/5 shadow-2xl">
              <Image
                width={460}
                height={460}
                alt="Developer Portrait"
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                data-alt="Professional portrait of a developer in a studio"
                src="https://avatars.githubusercontent.com/u/62317463?v=4"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-xl shadow-xl hidden md:block">
              <p className="text-primary font-bold text-3xl">+{new Date().getFullYear() - 2018}</p>
              <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
                {dict.about.years_exp}
              </p>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight dark:text-white">
              {dict.about.title}{" "}
              <span className="text-ocean-light">{dict.about.title_highlight}</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">{dict.about.description}</p>
            <div className="grid grid-cols-2 gap-8 py-4">
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="text-primary" />
                  {dict.about.strategy_title}
                </h4>
                <p className="text-sm text-slate-500">{dict.about.strategy_desc}</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <Code className="text-primary" />
                  {dict.about.execution_title}
                </h4>
                <p className="text-sm text-slate-500">{dict.about.execution_desc}</p>
              </div>
            </div>
            <Link
              href={getRedirectedPathName(`/${lang}/journey`, lang)}
              className="w-fit border-b-2 border-primary text-primary font-bold pb-1 hover:text-ocean-light hover:border-ocean-light transition-all"
            >
              {dict.about.journey_link}
            </Link>
          </div>
        </div>
      </section>
      {/* Skills Section - Floating Cloud */}
      <section className="py-24 bg-ocean-dark/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-12">
            {dict.expertise.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Floating tags simulated with varied padding and glass effects */}
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              React.js
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              TypeScript
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              Next.js
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              Tailwind CSS
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              Three.js
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              UI/UX Design
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              GraphQL
            </span>
            <span className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default">
              Node.js
            </span>
          </div>
        </div>
      </section>
      {/* Projects Grid */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto" id="projects">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4 dark:text-white">
              {dict.projects.title}
            </h2>
            <p className="text-slate-400">{dict.projects.description}</p>
          </div>
          <Link className="group flex items-center gap-2 font-bold text-primary" href={getRedirectedPathName(`/${lang}/projects`, lang)}>
            {dict.projects.view_archive}
            {lang === "ar" ? (
              <ArrowLeft className="group-hover:translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Card 1 */}
          <div className="group relative aspect-video rounded-xl overflow-hidden glass">
            <img
              alt={dict.projects.project1.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv5vgpwV2Ig54gg-iPLGeB_pgkfRRTSjorODqZrID-SeeD3sMjVK2jPjhmHabJzcIZcr_2SmDoEukQUoawylM0vDEI8QSO-U4EZdRmh3f4bEVEe3VYhZyBo15ecVLJNGO2sPCBt1sG56E6Ue8mSU51oNgjrl1Fn6j9oTTHqN_5eyAN_ha7BWorSEmOAAMpFtRFh-twCZezR0TRICIUaHXTsxdeLvwAR1r2ofA3xNocFB3b7fTPvTNX0TvrxoNRHbAbCGhnL4nH-d1N"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/20 to-transparent opacity-80"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
              <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <span className="text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 uppercase tracking-widest font-bold">
                  React
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 uppercase tracking-widest font-bold">
                  D3.js
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dict.projects.project1.title}</h3>
              <p className="text-slate-300 text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                {dict.projects.project1.description}
              </p>
              <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                <Link2 className="text-white hover:text-primary cursor-pointer" />
                <Code className="text-white hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
          {/* Project Card 2 */}
          <div className="group relative aspect-video rounded-xl overflow-hidden glass">
            <img
              alt={dict.projects.project2.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgrfv9O7qlf-pLIZ0lPvW4xi5r0QVe1OXXrMZ9W0Bhug2pYlHuAzjfew7bvgKTwiP5XZICu7WsHlu3amkA506XMk-7FMXhjkrQP7hyV0HQJ6rZmgEDwf_D6j2WiQ24QVapd8BCEa4XJ8-v8pjq5NYjab4G3-h_56CnOTi3Is3u8LRwEkeo9MMPee89ob7bNPreQDv9w7u3X_Aq0QhMDTV6lz7lst8rWnTdJ0bNtRiUzoeCa6A5v2E-DmkjHbq0jS1wRlvcNZ8RMZUm"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/20 to-transparent opacity-80"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
              <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <span className="text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 uppercase tracking-widest font-bold">
                  Next.js
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded border border-white/20 bg-white/10 uppercase tracking-widest font-bold">
                  Stripe
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{dict.projects.project2.title}</h3>
              <p className="text-slate-300 text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity delay-150">
                {dict.projects.project2.description}
              </p>
              <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                <Link2 className="text-white hover:text-primary cursor-pointer" />
                <Code className="text-white hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-24 px-6 md:px-20 bg-ocean-dark/20" id="contact">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-black mb-6 dark:text-white">
              {dict.contact.title_part1} <br />
              <span className="text-gradient">{dict.contact.title_gradient}</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">{dict.contact.description}</p>
            <div className="flex gap-6 mb-12">
              <a
                className="w-14 h-14 glass rounded-lg flex items-center justify-center group hover:border-primary transition-all"
                href="https://github.com/joeafify"
              >
                <Github className="text-3xl group-hover:text-primary" />
              </a>
              <a
                className="w-14 h-14 glass rounded-lg flex items-center justify-center group hover:border-primary transition-all"
                href="mailto:joeafify@gmail.com"
              >
                <Mail className="text-3xl group-hover:text-primary" />
              </a>
              <a
                className="w-14 h-14 glass rounded-lg flex items-center justify-center group hover:border-primary transition-all"
                href="https://linkedin.com/in/joeafify"
              >
                <Linkedin className="text-3xl group-hover:text-primary" />
              </a>
            </div>
            <div className="p-6 glass rounded-xl inline-block">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                {dict.contact.location_label}
              </p>
              <p className="text-white font-medium flex items-center gap-2">
                <MapPin className="text-ocean-light text-3xl group-hover:text-primary" />
                {dict.contact.location_value}
              </p>
            </div>
          </div>
          <div>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {dict.contact.form.name_label}
                </label>
                <input
                  className="bg-white/5 border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white focus:outline-none p-4 transition-all"
                  placeholder={dict.contact.form.name_placeholder}
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {dict.contact.form.email_label}
                </label>
                <input
                  className="bg-white/5 border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white focus:outline-none p-4 transition-all"
                  placeholder={dict.contact.form.email_placeholder}
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {dict.contact.form.details_label}
                </label>
                <textarea
                  className="bg-white/5 border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-white focus:outline-none p-4 transition-all resize-none"
                  placeholder={dict.contact.form.details_placeholder}
                  rows={4}
                ></textarea>
              </div>
              <button
                className="bg-primary text-white font-black uppercase tracking-widest py-5 rounded-lg hover:bg-primary/80 transition-all glow-hover mt-4 cursor-pointer"
                type="submit"
              >
                {dict.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
