'use client';

import SquareLoader from '@/components/SquareLoader';
import { Locale } from '@/i18n-config';
import { Media, Project, TechStack } from '@/payload-types';
import { getRedirectedPathName } from '@/utils/i18n';
import { Cuboid } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getProjects } from './actions';

interface ProjectWithBlur extends Omit<Project, 'image'> {
  image: number | (Media & { blurredDataUrl?: string });
}

interface ProjectsListProps {
  initialProjects: Project[];
  initialHasNextPage: boolean;
  locale: Locale | string;
}

export default function ProjectsList({
  initialProjects,
  initialHasNextPage,
  locale
}: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          loadMoreProjects();
        }
      },
      {
        threshold: 0,
        rootMargin: '200px'
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, isLoading]);

  const loadMoreProjects = async () => {
    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const result = await getProjects({
        page: nextPage,
        limit: 6,
        locale
      });

      setProjects((prev) => [...prev, ...result.projects]);
      setPage(nextPage);
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      console.error('Error loading more projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const { id, title, description, image, techStack } = project;
          return (
            <Link
              href={getRedirectedPathName(`/projects/${id}`, locale)}
              key={id}
              className="group relative aspect-square rounded-xl overflow-hidden glass border-white/5 flex flex-col"
            >
              <div className="h-full w-full relative">
                {(image as Media)?.url ? (
                  <Image
                    src={(image as Media).url!}
                    alt={(image as Media)?.alt ?? title}
                    width={(image as Media)?.width ?? 0}
                    height={(image as Media)?.height ?? 0}
                    placeholder={(image as any).blurredDataUrl ? "blur" : "empty"}
                    blurDataURL={(image as any).blurredDataUrl}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-slate-900">
                    <Cuboid className="text-slate-700 w-24 h-24" />
                  </div>
                )}

                <div className="absolute inset-0 bg-ocean-dark/80 opacity-40 group-hover:opacity-20 transition-opacity"></div>

                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-background-dark via-background-dark/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {techStack?.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="text-[9px] px-2 py-0.5 rounded-full border border-ocean-light/30 bg-ocean-light/10 text-ocean-light font-bold uppercase tracking-widest"
                      >
                        {(item as TechStack).name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                  <p className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto transition-all duration-300">
                    {/* {description} */}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {hasNextPage && (
        <div ref={observerTarget} className="mt-12 mb-12 flex justify-center h-10 items-center">
          {isLoading ? (
            <SquareLoader text='Loading more projects' className='mt-6' />
          ) : (
            <div className="w-1 h-1" />
          )}
        </div>
      )}

      {projects.length === 0 && !isLoading && (
        <div className="text-center mt-24 text-slate-500 font-light">
          No projects found in the collection. Add some in the <a href="/admin" className="text-primary hover:underline">admin panel</a>!
        </div>
      )}
    </>
  );
}
