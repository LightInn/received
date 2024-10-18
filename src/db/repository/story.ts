'use server'
// import {db} from '..';
import {Chapter, Review, Story, User} from '../schema';
import {eq, sql} from 'drizzle-orm';
import {drizzle} from "drizzle-orm/node-postgres";

type StorySelect = typeof Story.$inferSelect;


// eslint-disable-next-line @typescript-eslint/no-unused-vars


const db = drizzle(process.env.DATABASE_URL!);


type StoryModel = {
    id: string;
    title: string;
    author: string;
    description: string;
    category: string;
    tags: string[];
    rating: number;
    reviews: number;
    views: number;
    chapters: number;
    lastUpdated: Date;
    estimatedReadTime: string;
};


// Fonction pour calculer le temps de lecture estimé
const calculateEstimatedReadTime = (chapterCount: number): string => {
    const minutesPerChapter = 5; // 5 minutes par chapitre comme base
    return `${chapterCount * minutesPerChapter} minutes`;
};


// Récupère les détails d'une histoire par son ID
export async function getStoryById(storyId: string): Promise<StoryModel> {
    try {

        console.log("start", storyId);
        // Construction de la requête principale
        const storyData = await db
            .select({
                id: Story.id,
                title: Story.title,
                author: User.username,
                description: Story.description,
                category: Story.category,
                rating: sql<number>`COALESCE(AVG(
                ${Review.rating}
                ),
                0
                )`, // Moyenne des notes
                reviews: sql<number>`COUNT(
                ${Review.id}
                )`, // Nombre de reviews
                views: sql<number>`SUM(
                ${Story.views}
                )`, // Somme des vues
                chapters: sql<number>`COUNT(
                ${Chapter.id}
                )`, // Nombre de chapitres
                lastUpdated: sql<Date>`MAX(
                ${Story.updatedAt}
                )`, // Dernière mise à jour
            })
            .from(Story)
            .leftJoin(User, eq(Story.authorId, User.id)) // Jointure avec User pour l'auteur
            .leftJoin(Chapter, eq(Chapter.storyId, Story.id)) // Jointure avec Chapter pour compter les chapitres
            .leftJoin(Review, eq(Review.storyId, Story.id)) // Jointure avec Review pour les notes et avis
            .where(eq(Story.id, storyId)) // Filtrer par ID de l'histoire
            .groupBy(Story.id, User.username, Story.description, Story.category, Story.updatedAt);

        console.log(storyData);

        // Vérification s'il y a un résultat
        if (!storyData || storyData.length === 0) {
            return null; // Retourne null si l'histoire n'est pas trouvée
        }

        // Transformation du résultat en StoryModel
        const story = storyData[0];

        console.log("retirn");
        return {
            id: story.id,
            title: story.title,
            author: story.author ?? 'Unknown', // Auteur inconnu si non trouvé
            description: story.description,
            category: story.category ?? 'New', // Catégorie générale si non définie
            tags: [], // Ajouté ici pour future implémentation des tags
            rating: story.rating,
            reviews: story.reviews,
            views: story.views,
            chapters: story.chapters,
            lastUpdated: story.lastUpdated,
            estimatedReadTime: calculateEstimatedReadTime(story.chapters), // Calcul du temps de lecture estimé
        };
    } catch (error) {
        console.error('Error fetching story by ID:', error);
        return null; // Retourne null en cas d'erreur
    }
}


// Récupère toutes les histoires
export async function getAllStories(): Promise<StorySelect[]> {
    return await db.select().from(Story);
}