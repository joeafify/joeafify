'use server';

import { Locale } from '@/i18n-config';
import config from '@payload-config';
import { getPayload } from 'payload';

export async function getJourneyItemsListing({
  locale
}: {
  locale: Locale;
}) {
  const payload = await getPayload({ config });
  try {
    const { docs } = await payload.find({
      collection: 'journey-items',
      locale,
      sort: '-startYear',
      depth: 1,
      limit: 100,
    });

    return docs;
  } catch (error) {
    console.error(error);
    return [];
  }
}
