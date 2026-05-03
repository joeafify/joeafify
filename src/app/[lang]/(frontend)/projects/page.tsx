import ProjectsList from './ProjectsList';
import { getProjects } from './actions';

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: locale } = await params;

  const { projects: initialProjects, hasNextPage: initialHasNextPage } = await getProjects({
    page: 1,
    limit: 6,
    locale,
  });

  return (
    <>
      <main className="relative z-10 pt-32 pb-48 px-6 md:px-20 max-w-[1600px] mx-auto">
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white">Full Project <span
            className="text-gradient">Library</span></h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light">An extensive collection of experiments, production apps,
            and creative explorations. Designed for high-density browsing.</p>
        </div>

        <ProjectsList
          initialProjects={initialProjects}
          initialHasNextPage={initialHasNextPage}
          locale={locale}
        />
      </main>
    </>
  );
}