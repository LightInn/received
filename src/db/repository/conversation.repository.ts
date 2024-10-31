// conversationRepository.ts

"use server";
import { db } from '..';
import { ConversationSchema, StorySchema, CharacterSchema } from "../schema";
import { sql, eq } from "drizzle-orm";
import { Conversation } from "@/models/Conversation";

// Création d'une conversation
export async function createConversation(data: Partial<Conversation>): Promise<string | null> {
    try {
        if (!data.storyId) throw new Error("Story ID is required");
        if (!data.title) throw new Error("Title is required");

        const result = await db
            .insert(ConversationSchema)
            .values({
                storyId: data.storyId,
                title: data.title,
                participants: data.participants,  // Liste des ID des personnages participants
                createdAt: new Date(),
            })
            .returning({ insertedId: ConversationSchema.id });

        return result[0]?.insertedId;
    } catch (error) {
        console.error("Error creating conversation:", error);
        return null;
    }
}

// Récupération d'une conversation par ID
export async function getConversationById(conversationId: string): Promise<Conversation | null> {
    try {
        const conversation = await db
            .select()
            .from(ConversationSchema)
            .where(eq(ConversationSchema.id, conversationId))
            .single();

        return conversation ? {
            id: conversation.id,
            storyId: conversation.storyId,
            title: conversation.title,
            participants: conversation.participants,
            createdAt: conversation.createdAt,
        } : null;
    } catch (error) {
        console.error("Error fetching conversation by ID:", error);
        return null;
    }
}

// Mise à jour d'une conversation
export async function updateConversation(conversationId: string, data: Partial<Conversation>): Promise<boolean> {
    try {
        const result = await db
            .update(ConversationSchema)
            .set({
                title: data.title,
                participants: data.participants,
                updatedAt: new Date(),
            })
            .where(eq(ConversationSchema.id, conversationId));

        return result.rowCount == null ? false : result.rowCount > 0;
    } catch (error) {
        console.error("Error updating conversation:", error);
        return false;
    }
}

// Suppression d'une conversation
export async function deleteConversation(conversationId: string): Promise<boolean> {
    try {
        const result = await db.delete(ConversationSchema).where(eq(ConversationSchema.id, conversationId));
        return result.rowCount == null ? false : result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting conversation:", error);
        return false;
    }
}

// Récupération des conversations par histoire
export async function getConversationsByStory(storyId: string): Promise<Conversation[]> {
    try {
        const conversations = await db
            .select({
                id: ConversationSchema.id,
                title: ConversationSchema.title,
                participants: ConversationSchema.participants,
            })
            .from(ConversationSchema)
            .where(eq(ConversationSchema.storyId, storyId));

        return conversations.map(conversation => ({
            id: conversation.id,
            storyId,
            title: conversation.title,
            participants: conversation.participants,
            createdAt: conversation.createdAt,
        }));
    } catch (error) {
        console.error("Error fetching conversations by story:", error);
        return [];
    }
}

// Récupération des conversations par participant (ID du personnage)
export async function getConversationsByParticipant(participantId: string): Promise<Conversation[]> {
    try {
        const conversations = await db
            .select({
                id: ConversationSchema.id,
                storyId: ConversationSchema.storyId,
                title: ConversationSchema.title,
                participants: ConversationSchema.participants,
            })
            .from(ConversationSchema)
            .where(sql`ARRAY[${participantId}] <@ ${ConversationSchema.participants}`);

        return conversations.map(conversation => ({
            id: conversation.id,
            storyId: conversation.storyId,
            title: conversation.title,
            participants: conversation.participants,
            createdAt: conversation.createdAt,
        }));
    } catch (error) {
        console.error("Error fetching conversations by participant:", error);
        return [];
    }
}

// Récupération de toutes les conversations
export async function getAllConversations(): Promise<Conversation[]> {
    try {
        const conversations = await db.select().from(ConversationSchema);

        return conversations.map(conversation => ({
            id: conversation.id,
            storyId: conversation.storyId,
            title: conversation.title,
            participants: conversation.participants,
            createdAt: conversation.createdAt,
        }));
    } catch (error) {
        console.error("Error fetching all conversations:", error);
        return [];
    }
}
