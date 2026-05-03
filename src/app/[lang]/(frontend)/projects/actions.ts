'use server';

import { Locale } from '@/i18n-config';
import { Media } from '@/payload-types';
import { getBlurredDataUrls } from '@/utils/getBase64';
import config from '@payload-config';
import { getPayload } from 'payload';

export async function getProjects({
  page = 1,
  limit = 6,
  locale
}: {
  page?: number;
  limit?: number;
  locale: Locale | string;
}) {
  const payload = await getPayload({ config });

  try {
    const { docs, hasNextPage, totalDocs, totalPages } = await payload.find({
      collection: 'projects',
      locale: locale as Locale,
      limit,
      page,
      depth: 1,
    });

    const projectsWithBlur = await Promise.all(docs.map(async (project) => {
      if (project.image && typeof project.image !== 'number' && (project.image as Media).url) {
        const media = project.image as Media;
        try {
          const [processed] = await getBlurredDataUrls([{
            url: media.url!,
            alt: media.alt || '',
            blurredDataUrl: ''
          }]);
          return {
            ...project,
            image: {
              ...media,
              blurredDataUrl: processed.blurredDataUrl
            }
          };
        } catch (e) {
          console.error(`Failed to generate blur for project ${project.id}`, e);
          return project;
        }
      }
      return project;
    }));

    return {
      projects: projectsWithBlur,
      hasNextPage,
      totalDocs,
      totalPages,
    };
  } catch (error) {
    console.error(error);
    return {
      projects: [],
      hasNextPage: false,
      totalDocs: 0,
      totalPages: 0,
    };
  }
}

export async function getProjectBySlug({
  id,
  locale,
}: {
  id: string;
  locale: Locale;
}) {
  const payload = await getPayload({ config });

  try {
    const project = await payload.findByID({
      collection: 'projects',
      id,
      locale,
      depth: 1,
    });

    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
}
