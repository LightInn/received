import { Story } from "@/models/Story";

export interface Character {
  id: string;
  story: Story;
  name: string;
  description?: string;
  picture: string;
  color: string;
  created: string;
  updated: string;
}
