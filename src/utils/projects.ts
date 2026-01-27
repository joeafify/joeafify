import { PROJECTS } from "@/data";
import { Project } from "@/interfaces";

/**
 * Simulates an API call to fetch projects with pagination.
 * @param page The page number (1-indexed)
 * @param limit The number of items per page
 * @returns A promise that resolves to an object containing projects and metadata
 */
export async function getProjects(page: number, limit: number): Promise<{
  projects: Project[];
  hasMore: boolean;
  total: number;
}> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProjects = PROJECTS.slice(startIndex, endIndex);

  return {
    projects: paginatedProjects,
    hasMore: endIndex < PROJECTS.length,
    total: PROJECTS.length,
  };
}
