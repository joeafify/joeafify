'use server';

import { Locale } from '@/i18n-config';
import config from '@payload-config';
import { getPayload } from 'payload';

export async function getProjects({
  page = 1,
  limit = 6,
  locale
}: {
  page?: number;
  limit?: number;
  locale: Locale;
}) {
  const payload = await getPayload({ config });

  try {
    const { docs, hasNextPage, totalDocs, totalPages } = await payload.find({
      collection: 'projects',
      locale,
      limit,
      page,
      depth: 1,
    });

    return {
      projects: docs,
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
