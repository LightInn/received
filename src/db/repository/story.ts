'use server'
// import {db} from '..';
import {Chapter, Review, Story, User} from '../schema';
import {eq, sql} from 'drizzle-orm';
import {drizzle} from "drizzle-orm/node-postgres";

type StorySelect = typeof Story.$inferSelect;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
type StoryModel = {
    id: string,
    title: string,
    author: string
    description: string,
    category: string,
    tags: string[],
    rating: number,
    reviews: number,
    views: number,
    chapters: number,
    lastUpdated: Date,
    estimatedReadTime: string
}


const db = drizzle(process.env.DATABASE_URL!);


// Récupère toutes les histoires en filtrant par id
export async function getStoryById(storyId: string): Promise<StoryModel> {
    return  await db
        .select({
            id: Story.id,
            title: Story.title,
            author: User.username,
            description: Story.description,
            category: Story.category,
            rating: sql<number>`COALESCE(AVG(${Review.rating}), 0)`,
            reviews: sql<number>`COUNT(${Review.id})`,
            views: sql<number>`SUM(${Story.views})`,
            chapters: sql<number>`COUNT(${Chapter.id})`,
            lastUpdated: sql<Date>`MAX(${Story.updatedAt})`,
            estimatedReadTime: sql<string>`CONCAT(COUNT(${Chapter.id}) * 5, ' minutes')`,
        })
        .from(Story)
        .leftJoin(User, Story.authorId.eq(User.id)) // Join avec User pour récupérer l'auteur
        .leftJoin(Chapter, Chapter.storyId.eq(Story.id)) // Join avec Chapter pour compter les chapitres
        .leftJoin(Review, Review.storyId.eq(Story.id)) // Join avec Review pour la note moyenne et le nombre de reviews
        .groupBy(
            Story.id,
            Story.title,
            User.username,
            Story.description,
            Story.category,
            Story.updatedAt
        );



    db.select().from(Story).where(eq(Story.id, storyId));
}

// Récupère toutes les histoires
export async function getAllStories(): Promise<StorySelect[]> {
    console.log('getAllStories');

    const stories : StorySelect[] = await db.select().from(Story);






    return  ;
}