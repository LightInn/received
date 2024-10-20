import {
  pgTable,
  unique,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  foreignKey,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    nsfw: boolean().default(false).notNull(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      usersUsernameUnique: unique("users_username_unique").on(table.username),
      usersEmailUnique: unique("users_email_unique").on(table.email),
    };
  },
);

export const conversations = pgTable(
  "conversations",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    storyId: uuid().notNull(),
    chapterId: uuid().notNull(),
    title: varchar({ length: 255 }).notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      conversationsStoryIdStoriesIdFk: foreignKey({
        columns: [table.storyId],
        foreignColumns: [stories.id],
        name: "conversations_storyId_stories_id_fk",
      }),
      conversationsChapterIdChaptersIdFk: foreignKey({
        columns: [table.chapterId],
        foreignColumns: [chapters.id],
        name: "conversations_chapterId_chapters_id_fk",
      }),
    };
  },
);

export const purchases = pgTable(
  "purchases",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid().notNull(),
    storyId: uuid().notNull(),
    purchasedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      purchasesUserIdUsersIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "purchases_userId_users_id_fk",
      }),
      purchasesStoryIdStoriesIdFk: foreignKey({
        columns: [table.storyId],
        foreignColumns: [stories.id],
        name: "purchases_storyId_stories_id_fk",
      }),
    };
  },
);

export const characters = pgTable(
  "characters",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    storyId: uuid().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    picture: varchar({ length: 255 }),
    color: varchar({ length: 255 }),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      charactersStoryIdStoriesIdFk: foreignKey({
        columns: [table.storyId],
        foreignColumns: [stories.id],
        name: "characters_storyId_stories_id_fk",
      }),
    };
  },
);

export const messages = pgTable(
  "messages",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    chapterId: uuid().notNull(),
    conversationId: uuid().notNull(),
    senderId: uuid().notNull(),
    content: text().notNull(),
    timestamp: timestamp({ mode: "string" }).notNull(),
    mediaUrl: varchar({ length: 255 }),
  },
  (table) => {
    return {
      messagesChapterIdChaptersIdFk: foreignKey({
        columns: [table.chapterId],
        foreignColumns: [chapters.id],
        name: "messages_chapterId_chapters_id_fk",
      }),
      messagesConversationIdConversationsIdFk: foreignKey({
        columns: [table.conversationId],
        foreignColumns: [conversations.id],
        name: "messages_conversationId_conversations_id_fk",
      }),
      messagesSenderIdCharactersIdFk: foreignKey({
        columns: [table.senderId],
        foreignColumns: [characters.id],
        name: "messages_senderId_characters_id_fk",
      }),
    };
  },
);

export const stories = pgTable(
  "stories",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    title: varchar({ length: 255 }).notNull(),
    authorId: uuid().notNull(),
    isDraft: boolean().default(true).notNull(),
    likes: integer().default(0),
    views: integer().default(0),
    description: text().default("").notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      storiesAuthorIdUsersIdFk: foreignKey({
        columns: [table.authorId],
        foreignColumns: [users.id],
        name: "stories_authorId_users_id_fk",
      }),
    };
  },
);

export const chapters = pgTable(
  "chapters",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    storyId: uuid().notNull(),
    title: varchar({ length: 255 }).notNull(),
    isDraft: boolean().default(true).notNull(),
    releaseDate: timestamp({ mode: "string" }),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      chaptersStoryIdStoriesIdFk: foreignKey({
        columns: [table.storyId],
        foreignColumns: [stories.id],
        name: "chapters_storyId_stories_id_fk",
      }),
    };
  },
);

export const comments = pgTable(
  "comments",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    storyId: uuid().notNull(),
    userId: uuid().notNull(),
    content: text().notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      commentsStoryIdStoriesIdFk: foreignKey({
        columns: [table.storyId],
        foreignColumns: [stories.id],
        name: "comments_storyId_stories_id_fk",
      }),
      commentsUserIdUsersIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "comments_userId_users_id_fk",
      }),
    };
  },
);

export const pointsOfView = pgTable(
  "points_of_view",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    chapterId: uuid().notNull(),
    characterId: uuid().notNull(),
  },
  (table) => {
    return {
      pointsOfViewChapterIdChaptersIdFk: foreignKey({
        columns: [table.chapterId],
        foreignColumns: [chapters.id],
        name: "points_of_view_chapterId_chapters_id_fk",
      }),
      pointsOfViewCharacterIdCharactersIdFk: foreignKey({
        columns: [table.characterId],
        foreignColumns: [characters.id],
        name: "points_of_view_characterId_characters_id_fk",
      }),
    };
  },
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    storyId: uuid().notNull(),
    userId: uuid().notNull(),
    content: text().notNull(),
    rating: integer().notNull(),
    createdAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      reviewsStoryIdStoriesIdFk: foreignKey({
        columns: [table.storyId],
        foreignColumns: [stories.id],
        name: "reviews_storyId_stories_id_fk",
      }),
      reviewsUserIdUsersIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "reviews_userId_users_id_fk",
      }),
    };
  },
);

export const userReadChapters = pgTable(
  "user_read_chapters",
  {
    userId: uuid().notNull(),
    chapterId: uuid().notNull(),
    readAt: timestamp({ mode: "string" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      userReadChaptersUserIdUsersIdFk: foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "user_read_chapters_userId_users_id_fk",
      }),
      userReadChaptersChapterIdChaptersIdFk: foreignKey({
        columns: [table.chapterId],
        foreignColumns: [chapters.id],
        name: "user_read_chapters_chapterId_chapters_id_fk",
      }),
      userReadChaptersUserIdChapterIdPk: primaryKey({
        columns: [table.userId, table.chapterId],
        name: "user_read_chapters_userId_chapterId_pk",
      }),
    };
  },
);
