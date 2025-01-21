"use server";
import { Story } from "@/models/Story";
import pocketbaseClientInit from "@/repository/_pb";
import PocketBase from "pocketbase";

const pb = pocketbaseClientInit();

// Fonction utilitaire pour calculer le temps de lecture estimé
const calculateEstimatedReadTime = async (storyId: string): Promise<string> => {
  try {
    const chaptersCount = await pb.collection("chapters").getList(1, 1, {
      fields: "id",
      filter: `story = "${storyId}"`,
    });
    const minutesPerChapter = 5;
    return `${chaptersCount.totalItems * minutesPerChapter} minutes`;
  } catch (error) {
    console.error("Error calculating read time:", error);
    return "5 minutes"; // Valeur par défaut
  }
};

// Création d'une histoire
export async function createStory(
  data: Partial<Story>,
): Promise<null | string> {
  try {
    if (!data.title) throw new Error("Title is required");

    const record = await pb.collection("stories").create({
      category: data.category,
      description: data.description || "",
      draft: data.draft || true,
      likes: 0,
      tags: data.tags || "[]",
      title: data.title,
      views: 0,
    });

    return record.id;
  } catch (error) {
    console.error("Error creating story:", error);
    return null;
  }
}

// Suppression d'une histoire
export async function deleteStory(storyId: string): Promise<boolean> {
  try {
    await pb.collection("stories").delete(storyId);
    return true;
  } catch (error) {
    console.error("Error deleting story:", error);
    return false;
  }
}

// Récupération de toutes les histoires publiées
export async function getAllPublishedStories(): Promise<Story[]> {
  try {
    const records = await pb.collection("stories").getFullList({
      filter: "draft = false",
      sort: "-created",
    });

    return records.map((record) => ({
      category: record.category,
      created: record.created,
      description: record.description,
      draft: record.draft,
      id: record.id,
      likes: record.likes,
      tags: record.tags,
      title: record.title,
      updated: record.updated,
      views: record.views,
    }));
  } catch (error) {
    console.error("Error fetching all published stories:", error);
    return [];
  }
}

// Récupération des histoires par catégorie
export async function getStoriesByCategory(category: string): Promise<Story[]> {
  try {
    const records = await pb.collection("stories").getFullList({
      filter: `category = "${category}" && draft = false`,
      sort: "-created",
    });

    return records.map((record) => ({
      category: record.category,
      created: record.created,
      description: record.description,
      draft: record.draft,
      id: record.id,
      likes: record.likes,
      tags: record.tags,
      title: record.title,
      updated: record.updated,
      views: record.views,
    }));
  } catch (error) {
    console.error("Error fetching stories by category:", error);
    return [];
  }
}

// Récupération des histoires d'un utilisateur
export async function getStoriesByUser(userId: string): Promise<Story[]> {
  try {
    const records = await pb.collection("stories").getFullList({
      filter: `author = "${userId}"`,
      sort: "-created",
    });

    return records.map((record) => ({
      category: record.category,
      created: record.created,
      description: record.description,
      draft: record.draft,
      id: record.id,
      likes: record.likes,
      tags: record.tags,
      title: record.title,
      updated: record.updated,
      views: record.views,
    }));
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return [];
  }
}

// Récupération d'une histoire par ID avec statistiques
export async function getStoryById(storyId: string): Promise<null | Story> {
  try {
    const record = await pb.collection("stories").getOne(storyId, {
      expand: "author",
    });

    // Récupération des statistiques additionnelles
    const chaptersCount = await pb.collection("chapters").getList(1, 1, {
      fields: "id",
      filter: `story = "${storyId}"`,
    });

    const estimatedTime = await calculateEstimatedReadTime(storyId);

    return {
      category: record.category,
      chaptersNumber: chaptersCount.totalItems,
      created: record.created,
      description: record.description,
      draft: record.draft,
      estimatedReadTime: estimatedTime,
      id: record.id,
      likes: record.likes,
      tags: record.tags,
      title: record.title,
      updated: record.updated,
      views: record.views,
    };
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    return null;
  }
}

// Incrémentation des likes pour une histoire
export async function incrementStoryLikes(storyId: string): Promise<void> {
  try {
    const story = await pb.collection("stories").getOne(storyId);
    await pb.collection("stories").update(storyId, {
      likes: (story.likes || 0) + 1,
    });
  } catch (error) {
    console.error("Error incrementing story likes:", error);
  }
}

// Incrémentation des vues pour une histoire
export async function incrementStoryViews(storyId: string): Promise<void> {
  try {
    const story = await pb.collection("stories").getOne(storyId);
    await pb.collection("stories").update(storyId, {
      views: (story.views || 0) + 1,
    });
  } catch (error) {
    console.error("Error incrementing story views:", error);
  }
}

// Mise à jour d'une histoire
export async function updateStory(
  storyId: string,
  data: Partial<Story>,
): Promise<boolean> {
  try {
    const record = await pb.collection("stories").update(storyId, {
      category: data.category,
      description: data.description,
      draft: data.draft,
      tags: data.tags,
      title: data.title,
    });

    return !!record;
  } catch (error) {
    console.error("Error updating story:", error);
    return false;
  }
}
