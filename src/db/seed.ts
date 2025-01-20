import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  UserSchema,
  StorySchema,
  ChapterSchema,
  ConversationSchema,
  CharacterSchema,
  MessageSchema,
  CommentSchema,
  PointOfViewSchema,
  PurchaseSchema,
  UserReadChapterSchema,
} from "./schema";
import { v4 as uuidv4 } from "uuid";

// Initialisation de la base de données
const db = drizzle(process.env.DATABASE_URL!);

type User = typeof UserSchema.$inferInsert;

async function main() {
  // Création d'utilisateurs
  const user1: User = {
    id: uuidv4(),
    username: "JohnDoe",
    email: "john.doe@example.com",
    password: "securepassword",
    createdAt: new Date(),
    updatedAt: new Date(),
    age: 19,
  };

  const user2: User = {
    id: uuidv4(),
    username: "JaneDoe",
    email: "jane.doe@example.com",
    password: "anotherpassword",
    createdAt: new Date(),
    updatedAt: new Date(),
    age: 15,
  };

  await db.insert(UserSchema).values([user1, user2]);
  console.log("Users created!");

  // Création d'une histoire
  const story: typeof StorySchema.$inferInsert = {
    id: uuidv4(),
    title: "Une histoire intrigante",
    authorId: user1.id ?? "",
    isDraft: false,
    likes: 10,
    views: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
    category: "marvelous",
  };

  await db.insert(StorySchema).values(story);
  console.log("Story created!");

  // Création de chapitres
  const chapter1: typeof ChapterSchema.$inferInsert = {
    id: uuidv4(),
    storyId: story.id ?? "",
    title: "Chapitre 1 : Le début",
    isDraft: false,
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const chapter2: typeof ChapterSchema.$inferInsert = {
    id: uuidv4(),
    storyId: story.id ?? "",
    title: "Chapitre 2 : Le mystère s'épaissit",
    isDraft: false,
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(ChapterSchema).values([chapter1, chapter2]);
  console.log("Chapters created!");

  // conversation
  const conversation1: typeof ConversationSchema.$inferInsert = {
    id: uuidv4(),
    title: "Une conversation",
    storyId: story.id ?? "",
    chapterId: chapter1.id ?? "",
  };

  await db.insert(ConversationSchema).values([conversation1]);

  const characters1: typeof CharacterSchema.$inferInsert = {
    id: uuidv4(),
    name: "JohnDoe",
    description: "",
    storyId: story.id ?? "",
  };
  await db.insert(CharacterSchema).values([characters1]);

  // Création de messages
  const message1: typeof MessageSchema.$inferInsert = {
    conversationId: conversation1.id ?? "",
    senderId: characters1.id ?? "",
    id: uuidv4(),
    chapterId: chapter1.id ?? "",
    content: "C'est le début de quelque chose...",
    timestamp: new Date(),
  };

  const message2: typeof MessageSchema.$inferInsert = {
    conversationId: conversation1.id ?? "",
    senderId: characters1.id ?? "",
    id: uuidv4(),
    chapterId: chapter1.id ?? "",

    content: "Je suis prête pour la suite !",
    timestamp: new Date(),
  };

  await db.insert(MessageSchema).values([message1, message2]);
  console.log("Messages created!");

  // Création de commentaires
  const comment1: typeof CommentSchema.$inferInsert = {
    id: uuidv4(),
    storyId: story.id ?? "",
    userId: user2.id ?? "",
    content: "J'adore cette histoire, vivement la suite !",
    createdAt: new Date(),
  };

  await db.insert(CommentSchema).values(comment1);
  console.log("Comments created!");

  // Création de points de vue
  const pov1: typeof PointOfViewSchema.$inferInsert = {
    characterId: characters1.id ?? "",
    id: uuidv4(),
    chapterId: chapter1.id ?? "",
  };

  const pov2: typeof PointOfViewSchema.$inferInsert = {
    id: uuidv4(),
    chapterId: chapter2.id ?? "",
    characterId: characters1.id ?? "",
  };

  await db.insert(PointOfViewSchema).values([pov1, pov2]);
  console.log("Points of View created!");

  // Simuler un achat de chapitres
  const purchase: typeof PurchaseSchema.$inferInsert = {
    id: uuidv4(),
    userId: user1.id ?? "",
    storyId: story.id ?? "",
    purchasedAt: new Date(),
  };

  await db.insert(PurchaseSchema).values(purchase);
  console.log("Purchase recorded!");

  // Suivi des chapitres lus
  const userReadChapter: typeof UserReadChapterSchema.$inferInsert = {
    userId: user1.id ?? "",
    chapterId: chapter1.id ?? "",
    readAt: new Date(),
  };

  await db.insert(UserReadChapterSchema).values(userReadChapter);
  console.log("User read chapter recorded!");
}

// Exécuter la fonction principale
main().catch((err) => {
  console.error("Error during seeding:", err);
});
