/**
 * TimelineItem interface
 * @property {string} startYear - The start year of the timeline item
 * @property {string} endYear - The end year of the timeline item
 * @property {string} title - The title of the timeline item
 * @property {string} description - The description of the timeline item
 * @property {string[]} tags - The tags of the timeline item
 * @property {'left' | 'right'} alignment - The alignment of the timeline item
 */
export interface TimelineItem {
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  employer?: string;
  job_title: string;
  description?: string;
  responsibilities?: string;
  tags?: string[];
  alignment?: "left" | "right";
}

/**
 * Project interface
 * @property {string} id - The id of the project
 * @property {string} title - The title of the project
 * @property {string} description - The description of the project
 * @property {string[]} tags - The tags of the project
 * @property {string} image - The image of the project
 * @property {string} language - The language of the project
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  language: string;
}
