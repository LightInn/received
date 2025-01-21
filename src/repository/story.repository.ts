"use server";
import PocketBase from 'pocketbase';
import { Story } from "@/models/Story";
import pocketbaseClientInit from "@/repository/_pb";

const pb = pocketbaseClientInit();

// Fonction utilitaire pour calculer le temps de lecture estimé
const calculateEstimatedReadTime = async (storyId: string): Promise<string> => {
    try {
        const chaptersCount = await pb.collection('chapters').getList(1, 1, {
            filter: `story = "${storyId}"`,
            fields: 'id'
        });
        const minutesPerChapter = 5;
        return `${chaptersCount.totalItems * minutesPerChapter} minutes`;
    } catch (error) {
        console.error("Error calculating read time:", error);
        return "5 minutes"; // Valeur par défaut
    }
};

// Création d'une histoire
export async function createStory(data: Partial<Story>): Promise<string | null> {
    try {
        if (!data.title) throw new Error("Title is required");

        const record = await pb.collection('stories').create({
            title: data.title,
            description: data.description || '',
            category: data.category,
            tags: data.tags || '[]',
            draft: data.draft || true,
            likes: 0,
            views: 0
        });

        return record.id;
    } catch (error) {
        console.error("Error creating story:", error);
        return null;
    }
}

// Récupération d'une histoire par ID avec statistiques
export async function getStoryById(storyId: string): Promise<Partial<Story> | null> {
    try {
        const record = await pb.collection('stories').getOne(storyId, {
            expand: 'author'
        });

        // Récupération des statistiques additionnelles
        const chaptersCount = await pb.collection('chapters').getList(1, 1, {
            filter: `story = "${storyId}"`,
            fields: 'id'
        });

        const estimatedTime = await calculateEstimatedReadTime(storyId);

        return {
            id: record.id,
            title: record.title,
            description: record.description,
            category: record.category,
            tags: record.tags,
            likes: record.likes,
            views: record.views,
            draft: record.draft,
            created: record.created,
            updated: record.updated,
            estimatedReadTime: estimatedTime
        };
    } catch (error) {
        console.error("Error fetching story by ID:", error);
        return null;
    }
}

// Mise à jour d'une histoire
export async function updateStory(storyId: string, data: Partial<Story>): Promise<boolean> {
    try {
        const record = await pb.collection('stories').update(storyId, {
            title: data.title,
            description: data.description,
            category: data.category,
            tags: data.tags,
            draft: data.draft
        });

        return !!record;
    } catch (error) {
        console.error("Error updating story:", error);
        return false;
    }
}

// Suppression d'une histoire
export async function deleteStory(storyId: string): Promise<boolean> {
    try {
        await pb.collection('stories').delete(storyId);
        return true;
    } catch (error) {
        console.error("Error deleting story:", error);
        return false;
    }
}

// Récupération des histoires par catégorie
export async function getStoriesByCategory(category: string): Promise<Story[]> {
    try {
        const records = await pb.collection('stories').getFullList({
            filter: `category = "${category}" && draft = false`,
            sort: '-created'
        });

        return records.map(record => ({
            id: record.id,
            title: record.title,
            description: record.description,
            category: record.category,
            tags: record.tags,
            likes: record.likes,
            views: record.views,
            draft: record.draft,
            created: record.created,
            updated: record.updated
        }));
    } catch (error) {
        console.error("Error fetching stories by category:", error);
        return [];
    }
}

// Incrémentation des vues pour une histoire
export async function incrementStoryViews(storyId: string): Promise<void> {
    try {
        const story = await pb.collection('stories').getOne(storyId);
        await pb.collection('stories').update(storyId, {
            views: (story.views || 0) + 1
        });
    } catch (error) {
        console.error("Error incrementing story views:", error);
    }
}

// Incrémentation des likes pour une histoire
export async function incrementStoryLikes(storyId: string): Promise<void> {
    try {
        const story = await pb.collection('stories').getOne(storyId);
        await pb.collection('stories').update(storyId, {
            likes: (story.likes || 0) + 1
        });
    } catch (error) {
        console.error("Error incrementing story likes:", error);
    }
}

// Récupération de toutes les histoires publiées
export async function getAllPublishedStories(): Promise<Story[]> {
    try {
        const records = await pb.collection('stories').getFullList({
            filter: 'draft = false',
            sort: '-created'
        });

        return records.map(record => ({
            id: record.id,
            title: record.title,
            description: record.description,
            category: record.category,
            tags: record.tags,
            likes: record.likes,
            views: record.views,
            draft: record.draft,
            created: record.created,
            updated: record.updated
        }));
    } catch (error) {
        console.error("Error fetching all published stories:", error);
        return [];
    }
}

// Récupération des histoires d'un utilisateur
export async function getStoriesByUser(userId: string): Promise<Story[]> {
    try {
        const records = await pb.collection('stories').getFullList({
            filter: `author = "${userId}"`,
            sort: '-created'
        });

        return records.map(record => ({
            id: record.id,
            title: record.title,
            description: record.description,
            category: record.category,
            tags: record.tags,
            likes: record.likes,
            views: record.views,
            draft: record.draft,
            created: record.created,
            updated: record.updated
        }));
    } catch (error) {
        console.error("Error fetching user stories:", error);
        return [];
    }
}