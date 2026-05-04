import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { getRedirectedPathName } from "@/utils/i18n";
import { SerializedEditorState, SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Home,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "../actions";
import { HeroSection } from "./HeroSection";
import ScrollNavigation from "@/components/ScrollNavigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: Locale; id: string }>;
}) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const project = await getProjectBySlug({ id, locale: lang });

  if (!project) {
    notFound();
  }

  // Helper for RTL
  const isRtl = lang === "ar";

  const projectNavItems = [
    {
      id: "hero",
      href: "#hero",
      label: dict.project_details.nav.intro,
      icon: Home,
    },
    {
      id: "overview",
      href: "#overview",
      label: dict.project_details.nav.details,
      icon: FileText,
    },
    {
      id: "stack",
      href: "#stack",
      label: dict.project_details.nav.stack,
      icon: Layers,
    },
    {
      id: "gallery",
      href: "#gallery",
      label: dict.project_details.nav.gallery,
      icon: ImageIcon,
    },
  ];

  return (
    <div className="relative">
      {/* Scroll Navigation */}
      <ScrollNavigation dict={dict} items={projectNavItems} showSettings={false} />

      <HeroSection
        project={project}
        dict={dict}
        livePreview={project.livePreview || ""}
        sourceCode={project.sourceCode || ""}
      />

      {/* Overview Section */}
      {(project.challenge || project.solution) && (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5" id="overview">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-black mb-8 dark:text-white">
                {dict.project_details.overview.challenge}
              </h2>
              <RichText
                className="text-slate-400 leading-relaxed mb-6 font-light italic"
                data={project.challenge as SerializedEditorState<SerializedLexicalNode>}
              />
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl font-black mb-8 dark:text-white">
                {dict.project_details.overview.solution}
              </h2>
              <RichText
                className="text-lg text-slate-300 leading-relaxed mb-8"
                data={project.solution as SerializedEditorState<SerializedLexicalNode>}
              />
              {project.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {project.highlights.map((highlight: any, idx: number) => (
                    <div key={idx} className="p-6 glass rounded-2xl">
                      <h4 className="font-bold text-white mb-2">{highlight.title}</h4>
                      <p className="text-sm text-slate-400">{highlight.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Section */}
      {project.techStack && (
        <section className="py-24 bg-ocean-dark/20 overflow-hidden" id="stack">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-4">
                {dict.project_details.stack.badge}
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {project.techStack?.map((item: any, idx: number) => (
                <span
                  key={idx}
                  className="glass px-4 py-2 rounded-full text-white font-medium hover:text-primary hover:border-primary transition-all cursor-default"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {project.features && (
        <section className="py-24 px-6 max-w-7xl mx-auto" id="features">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className={isRtl ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
              <div className="relative rounded-3xl overflow-hidden glass aspect-video shadow-2xl">
                {project.image && typeof project.image === "object" && (
                  <Image
                    src={(project.image as any).url || ""}
                    alt="Feature Showcase"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <div className={isRtl ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
              <h2 className="text-4xl font-black mb-8 dark:text-white">
                {dict.project_details.features.title}
              </h2>
              <ul className="space-y-6">
                {project.features?.map((feature: any, idx: number) => (
                  <li key={idx} className="flex gap-4 text-start">
                    <CheckCircle2 className="w-6 h-6 text-ocean-light mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 border-t border-white/5" id="gallery">
          <div className="px-6 max-w-7xl mx-auto mb-12">
            <h2 className="text-4xl font-black dark:text-white mb-2">
              {dict.project_details.gallery.title}
            </h2>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">
              {dict.project_details.gallery.subtitle}
            </p>
          </div>
          <div className="flex overflow-x-auto gap-8 px-6 pb-8 custom-scrollbar scroll-smooth no-scrollbar">
            {project.gallery?.map(({ id, image }: any) => (
              <div
                key={id}
                className="flex-none w-[80vw] md:w-150 aspect-16/10 glass rounded-2xl overflow-hidden shadow-2xl group relative"
              >
                <Image
                  key={id}
                  src={image.url || ""}
                  alt={`UI Shot ${id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-linear-to-t from-primary/10 to-transparent">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black mb-6 text-white">{dict.project_details.cta.title}</h2>
          <p className="text-slate-400 mb-10">{dict.project_details.cta.description}</p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href={getRedirectedPathName("/#contact", lang)}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold glow-hover hover:scale-105 transition-all"
            >
              {dict.project_details.cta.start_project}
            </Link>
            <Link
              href={getRedirectedPathName("/#projects", lang)}
              className="text-white font-bold flex items-center gap-2 hover:text-ocean-light transition-colors"
            >
              {dict.project_details.cta.back_portfolio}
              {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
