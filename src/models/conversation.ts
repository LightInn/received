import { Chapter } from "@/models/Chapter";
import { Story } from "@/models/Story";

export interface Conversation {
  chapter: Chapter;
  created: string;
  id: string;
  story: Story;
  title: string;
  updated: string;
}
