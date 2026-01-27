import JOURNEY_ITEMS from "@/data/journey-items";
import { TimelineItem } from "@/interfaces";

/**
 * Simulates an API call to fetch journey items.
 * @returns A promise that resolves to a list of journey items
 */
export async function getJourneyItems(): Promise<TimelineItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return JOURNEY_ITEMS;
}
