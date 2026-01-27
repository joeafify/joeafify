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
}
