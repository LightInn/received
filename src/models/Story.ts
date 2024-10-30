// models/storyModel.ts

export type Story = {
    id: string;
    title: string;
    authorId: string;
    author?: string; // Optionnel, récupéré en join avec l'utilisateur
    description: string;
    category: string;
    tags: JSON;
    isDraft: boolean;
    rating?: number; // Optionnel, calculé en fonction des avis
    reviews?: number; // Nombre de reviews, calculé
    views?: number; // Nombre de vues, calculé
    chapters?: number; // Nombre de chapitres, calculé
    lastUpdated?: Date; // Optionnel, date de dernière mise à jour
    estimatedReadTime?: string; // Calculé en fonction des chapitres
};
