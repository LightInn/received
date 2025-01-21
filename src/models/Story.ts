export interface Story {
  estimatedReadTime?: string; // Calculé en fonction des chapitres
  author?: string;
  rating?: number;
  reviews?: number;
  chapters?: number;
  //   ----

  id: string;
  title: string;
  description?: string;
  category: string;
  tags: string;
  likes: number;
  views: number;
  draft: boolean;
  created: string;
  updated: string;
}
