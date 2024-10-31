// userRepository.ts

"use server";
import { db } from '..';
import { UserSchema, StorySchema, ReviewSchema } from "../schema";
import { sql, eq } from "drizzle-orm";
import { User } from "@/models/User";

// Création d'un utilisateur
export async function createUser(data: Partial<User>): Promise<string | null> {
    try {
        if (!data.username) throw new Error("Username is required");
        if (!data.email) throw new Error("Email is required");

        const result = await db
            .insert(UserSchema)
            .values({
                username: data.username,
                email: data.email,
                passwordHash: data.passwordHash,
                bio: data.bio,
                avatarUrl: data.avatarUrl,
                createdAt: new Date(),
            })
            .returning({ insertedId: UserSchema.id }); // Récupère l'ID de l'utilisateur créé

        return result[0]?.insertedId;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

// Récupération d'un utilisateur par ID
export async function getUserById(userId: string): Promise<User | null> {
    try {
        const user = await db
            .select()
            .from(UserSchema)
            .where(eq(UserSchema.id, userId))
            .single();

        return user ? {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
        } : null;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
}

// Mise à jour d'un utilisateur
export async function updateUser(userId: string, data: Partial<User>): Promise<boolean> {
    try {
        const result = await db
            .update(UserSchema)
            .set({
                username: data.username,
                email: data.email,
                bio: data.bio,
                avatarUrl: data.avatarUrl,
                updatedAt: new Date(),
            })
            .where(eq(UserSchema.id, userId));

        return result.rowCount == null ? false : result.rowCount > 0;
    } catch (error) {
        console.error("Error updating user:", error);
        return false;
    }
}

// Suppression d'un utilisateur
export async function deleteUser(userId: string): Promise<boolean> {
    try {
        const result = await db.delete(UserSchema).where(eq(UserSchema.id, userId));
        return result.rowCount == null ? false : result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
}

// Récupération des histoires écrites par un utilisateur
export async function getStoriesByUser(userId: string): Promise<any[]> {
    try {
        const stories = await db
            .select({
                id: StorySchema.id,
                title: StorySchema.title,
                description: StorySchema.description,
                createdAt: StorySchema.createdAt,
                views: StorySchema.views,
            })
            .from(StorySchema)
            .where(eq(StorySchema.authorId, userId));

        return stories;
    } catch (error) {
        console.error("Error fetching stories by user:", error);
        return [];
    }
}

// Récupération des reviews laissées par un utilisateur
export async function getReviewsByUser(userId: string): Promise<any[]> {
    try {
        const reviews = await db
            .select({
                id: ReviewSchema.id,
                storyId: ReviewSchema.storyId,
                rating: ReviewSchema.rating,
                comment: ReviewSchema.comment,
                createdAt: ReviewSchema.createdAt,
            })
            .from(ReviewSchema)
            .where(eq(ReviewSchema.userId, userId));

        return reviews;
    } catch (error) {
        console.error("Error fetching reviews by user:", error);
        return [];
    }
}

// Récupération de tous les utilisateurs
export async function getAllUsers(): Promise<User[]> {
    try {
        const users = await db.select().from(UserSchema);

        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
        }));
    } catch (error) {
        console.error("Error fetching all users:", error);
        return [];
    }
}

// Récupération d'un utilisateur par email
export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const user = await db
            .select()
            .from(UserSchema)
            .where(eq(UserSchema.email, email))
            .single();

        return user ? {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
        } : null;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
}
