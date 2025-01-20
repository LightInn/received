// messageRepository.ts

"use server";
import { db } from "../db";
import {
  MessageSchema,
  ConversationSchema,
  CharacterSchema,
} from "../db/schema";
import { sql, eq } from "drizzle-orm";
import { Message } from "@/models/message";

// Création d'un message
export async function createMessage(
  data: Partial<Message>,
): Promise<string | null> {
  try {
    if (!data.conversationId) throw new Error("Conversation ID is required");
    if (!data.authorId) throw new Error("Author ID is required");
    if (!data.content) throw new Error("Message content is required");

    const result = await db
      .insert(MessageSchema)
      .values({
        conversationId: data.conversationId,
        authorId: data.authorId,
        content: data.content,
        timestamp: data.timestamp || new Date(),
      })
      .returning({ insertedId: MessageSchema.id });

    return result[0]?.insertedId;
  } catch (error) {
    console.error("Error creating message:", error);
    return null;
  }
}

// Récupération d'un message par ID
export async function getMessageById(
  messageId: string,
): Promise<Message | null> {
  try {
    const message = await db
      .select()
      .from(MessageSchema)
      .where(eq(MessageSchema.id, messageId))
      .single();

    return message
      ? {
          id: message.id,
          conversationId: message.conversationId,
          authorId: message.authorId,
          content: message.content,
          timestamp: message.timestamp,
        }
      : null;
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    return null;
  }
}

// Mise à jour d'un message
export async function updateMessage(
  messageId: string,
  data: Partial<Message>,
): Promise<boolean> {
  try {
    const result = await db
      .update(MessageSchema)
      .set({
        content: data.content,
        timestamp: data.timestamp || new Date(),
      })
      .where(eq(MessageSchema.id, messageId));

    return result.rowCount == null ? false : result.rowCount > 0;
  } catch (error) {
    console.error("Error updating message:", error);
    return false;
  }
}

// Suppression d'un message
export async function deleteMessage(messageId: string): Promise<boolean> {
  try {
    const result = await db
      .delete(MessageSchema)
      .where(eq(MessageSchema.id, messageId));
    return result.rowCount == null ? false : result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting message:", error);
    return false;
  }
}

// Récupération de tous les messages d'une conversation
export async function getMessagesByConversation(
  conversationId: string,
): Promise<Message[]> {
  try {
    const messages = await db
      .select()
      .from(MessageSchema)
      .where(eq(MessageSchema.conversationId, conversationId))
      .orderBy(MessageSchema.timestamp);

    return messages.map((message) => ({
      id: message.id,
      conversationId: message.conversationId,
      authorId: message.authorId,
      content: message.content,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching messages by conversation:", error);
    return [];
  }
}

// Récupération de tous les messages d'un auteur
export async function getMessagesByAuthor(
  authorId: string,
): Promise<Message[]> {
  try {
    const messages = await db
      .select()
      .from(MessageSchema)
      .where(eq(MessageSchema.authorId, authorId))
      .orderBy(MessageSchema.timestamp);

    return messages.map((message) => ({
      id: message.id,
      conversationId: message.conversationId,
      authorId: message.authorId,
      content: message.content,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching messages by author:", error);
    return [];
  }
}

// Récupération de tous les messages
export async function getAllMessages(): Promise<Message[]> {
  try {
    const messages = await db.select().from(MessageSchema);

    return messages.map((message) => ({
      id: message.id,
      conversationId: message.conversationId,
      authorId: message.authorId,
      content: message.content,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching all messages:", error);
    return [];
  }
}
