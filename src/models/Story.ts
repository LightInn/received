export interface Story {
  author?: string;
  category: string;
  chaptersNumber?: number;
  created: string;
  description?: string;
  //   ----

  draft: boolean;
  estimatedReadTime?: string; // Calculé en fonction des chapitres
  id: string;
  likes: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  title: string;
  updated: string;
  views: number;
}
