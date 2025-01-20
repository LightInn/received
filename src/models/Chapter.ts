import { ChapterSchema } from "@/db/schema";

type ChapterBase = typeof ChapterSchema.$inferSelect;

export interface Chapter extends ChapterBase {
  supertype?: boolean;
}
