import { Story } from "@/models/Story";
import { Chapter } from "@/models/Chapter";

export interface Conversation {
  id: string;
  story: Story;
  chapter: Chapter;
  title: string;
  created: string;
  updated: string;
}
