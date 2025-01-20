import { MessageSchema } from "@/db/schema";

type MessageBase = typeof MessageSchema.$inferSelect;

export interface Message extends MessageBase {
  supertype?: boolean;
}
