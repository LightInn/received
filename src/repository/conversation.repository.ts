// conversationRepository.ts

"use server";
import { Conversation } from "@/models/conversation";
import { eq, sql } from "drizzle-orm";

import { db } from "../db";
import { CharacterSchema, ConversationSchema, StorySchema } from "../db/schema";

// Création d'une conversation
export async function createConversation(
  data: Partial<Conversation>,
): Promise<null | string> {
  try {
    if (!data.storyId) throw new Error("Story ID is required");
    if (!data.title) throw new Error("Title is required");

    const result = await db
      .insert(ConversationSchema)
      .values({
        createdAt: new Date(),
        participants: data.participants, // Liste des ID des personnages participants
        storyId: data.storyId,
        title: data.title,
      })
      .returning({ insertedId: ConversationSchema.id });

    return result[0]?.insertedId;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
}

// Suppression d'une conversation
export async function deleteConversation(
  conversationId: string,
): Promise<boolean> {
  try {
    const result = await db
      .delete(ConversationSchema)
      .where(eq(ConversationSchema.id, conversationId));
    return result.rowCount == null ? false : result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return false;
  }
}

// Récupération de toutes les conversations
export async function getAllConversations(): Promise<Conversation[]> {
  try {
    const conversations = await db.select().from(ConversationSchema);

    return conversations.map((conversation) => ({
      createdAt: conversation.createdAt,
      id: conversation.id,
      participants: conversation.participants,
      storyId: conversation.storyId,
      title: conversation.title,
    }));
  } catch (error) {
    console.error("Error fetching all conversations:", error);
    return [];
  }
}

// Récupération d'une conversation par ID
export async function getConversationById(
  conversationId: string,
): Promise<Conversation | null> {
  try {
    const conversation = await db
      .select()
      .from(ConversationSchema)
      .where(eq(ConversationSchema.id, conversationId))
      .single();

    return conversation
      ? {
          createdAt: conversation.createdAt,
          id: conversation.id,
          participants: conversation.participants,
          storyId: conversation.storyId,
          title: conversation.title,
        }
      : null;
  } catch (error) {
    console.error("Error fetching conversation by ID:", error);
    return null;
  }
}

// Récupération des conversations par participant (ID du personnage)
export async function getConversationsByParticipant(
  participantId: string,
): Promise<Conversation[]> {
  try {
    const conversations = await db
      .select({
        id: ConversationSchema.id,
        participants: ConversationSchema.participants,
        storyId: ConversationSchema.storyId,
        title: ConversationSchema.title,
      })
      .from(ConversationSchema)
      .where(
        sql`ARRAY[${participantId}] <@ ${ConversationSchema.participants}`,
      );

    return conversations.map((conversation) => ({
      createdAt: conversation.createdAt,
      id: conversation.id,
      participants: conversation.participants,
      storyId: conversation.storyId,
      title: conversation.title,
    }));
  } catch (error) {
    console.error("Error fetching conversations by participant:", error);
    return [];
  }
}

// Récupération des conversations par histoire
export async function getConversationsByStory(
  storyId: string,
): Promise<Conversation[]> {
  try {
    const conversations = await db
      .select({
        id: ConversationSchema.id,
        participants: ConversationSchema.participants,
        title: ConversationSchema.title,
      })
      .from(ConversationSchema)
      .where(eq(ConversationSchema.storyId, storyId));

    return conversations.map((conversation) => ({
      createdAt: conversation.createdAt,
      id: conversation.id,
      participants: conversation.participants,
      storyId,
      title: conversation.title,
    }));
  } catch (error) {
    console.error("Error fetching conversations by story:", error);
    return [];
  }
}

// Mise à jour d'une conversation
export async function updateConversation(
  conversationId: string,
  data: Partial<Conversation>,
): Promise<boolean> {
  try {
    const result = await db
      .update(ConversationSchema)
      .set({
        participants: data.participants,
        title: data.title,
        updatedAt: new Date(),
      })
      .where(eq(ConversationSchema.id, conversationId));

    return result.rowCount == null ? false : result.rowCount > 0;
  } catch (error) {
    console.error("Error updating conversation:", error);
    return false;
  }
}
