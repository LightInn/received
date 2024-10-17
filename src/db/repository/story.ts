'use server'
// import {db} from '..';
import {Story} from '../schema';
import {eq} from 'drizzle-orm';
import {drizzle} from "drizzle-orm/node-postgres";

type StorySelect = typeof Story.$inferSelect;

const db = drizzle(process.env.DATABASE_URL!);


// Récupère toutes les histoires en filtrant par id
export async function getStoryById(storyId: string): Promise<StorySelect[]> {
    return db.select().from(Story).where(eq(Story.id, storyId));
}

// Récupère toutes les histoires
export async function getAllStories(): Promise<StorySelect[]> {


    return db.select().from(Story);
}