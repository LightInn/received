import { CharacterSchema } from "@/db/schema";

type CharacterBase = typeof CharacterSchema.$inferSelect;

export interface Character extends CharacterBase {
  supertype?: boolean;
}
