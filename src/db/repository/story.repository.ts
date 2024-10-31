"use server";
import {db} from '..';
import {ChapterSchema, ReviewSchema, StorySchema, UserSchema} from "../schema";
import {eq, sql} from "drizzle-orm";
import {Story} from "@/models/Story";


// Fonction utilitaire pour calculer le temps de lecture estimé
const calculateEstimatedReadTime = (chapterCount: number): string => {
    const minutesPerChapter = 5; // Hypothèse de 5 minutes de lecture par chapitre
    return `${chapterCount * minutesPerChapter} minutes`;
};

// Création d'une histoire
export async function createStory(data: Partial<Story>): Promise<string | null> {
    try {

        if (!data.title) throw new Error("Title is required");
        if (!data.authorId) throw new Error("Author ID is required");


        const result = await db
            .insert(StorySchema)
            .values({
                title: data.title,
                authorId: data.authorId,
                description: data.description,
                category: data.category,
                isDraft: data.isDraft,
                tags: data.tags,
            })
            .returning({insertedId: StorySchema.id}); // Récupère l'ID de l'histoire créée

        return result[0]?.insertedId;
    } catch (error) {
        console.error("Error creating story:", error);
        return null;
    }
}

// Récupération d'une histoire par ID
export async function getStoryById(storyId: string): Promise<Partial<Story> | null> {
    try {
        const storyData = await db
            .select({
                id: StorySchema.id,
                title: StorySchema.title,
                author: UserSchema.username,
                description: StorySchema.description,
                category: StorySchema.category,
                tags: StorySchema.tags,
                rating: sql<number>`COALESCE(AVG(
                ${ReviewSchema.rating}
                ),
                0
                )`,
                reviews: sql<number>`COUNT(
                ${ReviewSchema.id}
                )`,
                views: sql<number>`SUM(
                ${StorySchema.views}
                )`,
                chapters: sql<number>`COUNT(
                ${ChapterSchema.id}
                )`,
                updatedAt: StorySchema.updatedAt,
                createdAt: StorySchema.createdAt

            })
            .from(StorySchema)
            .leftJoin(UserSchema, eq(StorySchema.authorId, UserSchema.id))
            .leftJoin(ChapterSchema, eq(ChapterSchema.storyId, StorySchema.id))
            .leftJoin(ReviewSchema, eq(ReviewSchema.storyId, StorySchema.id))
            .where(eq(StorySchema.id, storyId))
            .groupBy(StorySchema.id, UserSchema.username, StorySchema.description, StorySchema.category, StorySchema.updatedAt);

        if (!storyData || storyData.length === 0) return null;

        const story = storyData[0];
        return {
            authorId: "",
            isDraft: false,
            id: story.id,
            title: story.title,
            author: story.author ?? "Unknown",
            description: story.description,
            category: story.category ?? "New",
            tags: story.tags ?? JSON.parse("[]"),
            rating: story.rating,
            reviews: story.reviews,
            views: story.views,
            chapters: story.chapters,
            updatedAt: story.updatedAt,
            createdAt: story.createdAt,
            estimatedReadTime: calculateEstimatedReadTime(story.chapters)
        };
    } catch (error) {
        console.error("Error fetching story by ID:", error);
        return null;
    }
}

// Mise à jour d'une histoire
export async function updateStory(storyId: string, data: Partial<Story>): Promise<boolean> {
    try {
        const result = await db
            .update(StorySchema)
            .set({
                title: data.title,
                description: data.description,
                category: data.category,
                isDraft: data.isDraft,
                tags: data.tags,
                updatedAt: new Date(),
            })
            .where(eq(StorySchema.id, storyId));

        return result.rowCount == null ? false : result.rowCount > 0;
    } catch (error) {
        console.error("Error updating story:", error);
        return false;
    }
}

// Suppression d'une histoire
export async function deleteStory(storyId: string): Promise<boolean> {
    try {
        const result = await db.delete(StorySchema).where(eq(StorySchema.id, storyId));
        return result.rowCount == null ? false : result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting story:", error);
        return false;
    }
}

// Récupération des histoires par catégorie
export async function getStoriesByCategory(category: string): Promise<Story[]> {
    try {
        return await db.select().from(StorySchema).where(eq(StorySchema.category, category));
    } catch (error) {
        console.error("Error fetching stories by category:", error);
        return [];
    }
}

// Incrémentation des vues pour une histoire
export async function incrementStoryViews(storyId: string): Promise<void> {
    try {
        await db
            .update(StorySchema)
            .set({
                views: sql<number>`views
                + 1`
            })
            .where(eq(StorySchema.id, storyId));
    } catch (error) {
        console.error("Error incrementing story views:", error);
    }
}

// Récupération de toutes les histoires
export async function getAllStories(): Promise<Story[]> {
    try {
        return await db.select().from(StorySchema);
    } catch (error) {
        console.error("Error fetching all stories:", error);
        return [];
    }
}
