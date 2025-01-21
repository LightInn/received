import { Chapter } from "@/models/Chapter";
import { Character } from "@/models/character";
import { Conversation } from "@/models/conversation";

export interface Message {
  chapter: Chapter;
  content: string;
  conversation: Conversation;
  created: string;
  datetime: string;
  id: string;
  media: string;
  sender: Character;
  updated: string;
}
