import { Story } from "@/models/Story";

export interface Chapter {
  id: string;
  title: string;
  story: Story;
  draft: boolean;
  release: string;
  created: string;
  updated: string;
}
