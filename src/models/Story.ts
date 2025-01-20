import { StorySchema } from "@/db/schema";

type StoryBase = typeof StorySchema.$inferSelect;

export interface Story extends StoryBase {
  supertype?: boolean;
  estimatedReadTime?: string; // Calculé en fonction des chapitres
  author?: string;
  rating?: number;
  reviews?: number;
  chapters?: number;
}
