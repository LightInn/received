// messageRepository.ts

"use server";
import { Message } from "@/models/message";
import { eq, sql } from "drizzle-orm";

import { db } from "../db";
import {
  CharacterSchema,
  ConversationSchema,
  MessageSchema,
} from "../db/schema";

// Création d'un message
export async function createMessage(
  data: Partial<Message>,
): Promise<null | string> {
  try {
    if (!data.conversationId) throw new Error("Conversation ID is required");
    if (!data.authorId) throw new Error("Author ID is required");
    if (!data.content) throw new Error("Message content is required");

    const result = await db
      .insert(MessageSchema)
      .values({
        authorId: data.authorId,
        content: data.content,
        conversationId: data.conversationId,
        timestamp: data.timestamp || new Date(),
      })
      .returning({ insertedId: MessageSchema.id });

    return result[0]?.insertedId;
  } catch (error) {
    console.error("Error creating message:", error);
    return null;
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

// Récupération de tous les messages
export async function getAllMessages(): Promise<Message[]> {
  try {
    const messages = await db.select().from(MessageSchema);

    return messages.map((message) => ({
      authorId: message.authorId,
      content: message.content,
      conversationId: message.conversationId,
      id: message.id,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching all messages:", error);
    return [];
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
          authorId: message.authorId,
          content: message.content,
          conversationId: message.conversationId,
          id: message.id,
          timestamp: message.timestamp,
        }
      : null;
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    return null;
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
      authorId: message.authorId,
      content: message.content,
      conversationId: message.conversationId,
      id: message.id,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching messages by author:", error);
    return [];
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
      authorId: message.authorId,
      content: message.content,
      conversationId: message.conversationId,
      id: message.id,
      timestamp: message.timestamp,
    }));
  } catch (error) {
    console.error("Error fetching messages by conversation:", error);
    return [];
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
