import { Story } from "@/models/Story";

export interface Character {
  color: string;
  created: string;
  description?: string;
  id: string;
  name: string;
  picture: string;
  story: Story;
  updated: string;
}
