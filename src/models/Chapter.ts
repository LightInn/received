import { Story } from "@/models/Story";

export interface Chapter {
  created: string;
  draft: boolean;
  id: string;
  release: string;
  story: Story;
  title: string;
  updated: string;
}
