import { Chapter } from "@/models/Chapter";
import { Conversation } from "@/models/conversation";
import { Character } from "@/models/character";

export interface Message {
  id: string;
  chapter: Chapter;
  conversation: Conversation;
  sender: Character;
  content: string;
  datetime: string;
  media: string;
  created: string;
  updated: string;
}
