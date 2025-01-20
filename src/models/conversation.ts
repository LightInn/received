import { ConversationSchema } from "@/db/schema";

type ConversationBase = typeof ConversationSchema.$inferSelect;

export interface Conversation extends ConversationBase {
  supertype?: boolean;
}
