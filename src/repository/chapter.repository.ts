// chapterRepository.ts

"use server";
import { db } from "../db";
import { ChapterSchema } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { Chapter } from "@/models/Chapter";

// Création d'un chapitre
export async function createChapter(
  data: Partial<Chapter>,
): Promise<string | null> {
  try {
    if (!data.title) throw new Error("Title is required");
    if (!data.storyId) throw new Error("Story ID is required");

    const result = await db
      .insert(ChapterSchema)
      .values({
        title: data.title,
        storyId: data.storyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ insertedId: ChapterSchema.id }); // Récupère l'ID du chapitre créé

    return result[0]?.insertedId;
  } catch (error) {
    console.error("Error creating chapter:", error);
    return null;
  }
}

// Récupération d'un chapitre par ID
export async function getChapterById(
  chapterId: string,
): Promise<Partial<Chapter> | null> {
  try {
    const chapter = await db.query.ChapterSchema.findFirst({
      where: eq(ChapterSchema.id, chapterId),
    });

    return chapter
      ? {
          id: chapter.id,
          title: chapter.title,
          storyId: chapter.storyId,
          isDraft: chapter.isDraft,
          createdAt: chapter.createdAt,
          updatedAt: chapter.updatedAt,
        }
      : null;
  } catch (error) {
    console.error("Error fetching chapter by ID:", error);
    return null;
  }
}

// Mise à jour d'un chapitre
export async function updateChapter(
  chapterId: string,
  data: Partial<Chapter>,
): Promise<boolean> {
  try {
    const result = await db
      .update(ChapterSchema)
      .set({
        title: data.title,
        isDraft: data.isDraft,
        updatedAt: new Date(),
      })
      .where(eq(ChapterSchema.id, chapterId));

    return result.rowCount == null ? false : result.rowCount > 0;
  } catch (error) {
    console.error("Error updating chapter:", error);
    return false;
  }
}

// Suppression d'un chapitre
export async function deleteChapter(chapterId: string): Promise<boolean> {
  try {
    const result = await db
      .delete(ChapterSchema)
      .where(eq(ChapterSchema.id, chapterId));
    return result.rowCount == null ? false : result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return false;
  }
}

// Récupération des chapitres d'une histoire donnée
export async function getChaptersByStoryId(
  storyId: string,
): Promise<Partial<Chapter>[]> {
  try {
    const chapters = await db
      .select()
      .from(ChapterSchema)
      .where(eq(ChapterSchema.storyId, storyId))
      .orderBy(ChapterSchema.createdAt); // Trie par l'ordre des chapitres

    return chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      storyId: chapter.storyId,
      isDraft: chapter.isDraft,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching chapters by story ID:", error);
    return [];
  }
}

// Incrémentation des vues pour un chapitre
// export async function incrementChapterViews(chapterId: string): Promise<void> {
//     try {
//         await db
//             .update(ChapterSchema)
//             .set({
//                 views: sql<number>`views
//                 + 1`,
//             })
//             .where(eq(ChapterSchema.id, chapterId));
//     } catch (error) {
//         console.error("Error incrementing chapter views:", error);
//     }
// }

// Récupération de tous les chapitres (sans filtre)
export async function getAllChapters(): Promise<Partial<Chapter>[]> {
  try {
    const chapters = await db.select().from(ChapterSchema);

    return chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      storyId: chapter.storyId,
      isDraft: chapter.isDraft,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching all chapters:", error);
    return [];
  }
}
