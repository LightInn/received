import {uuid, pgTable, varchar, boolean, timestamp, text, primaryKey, integer} from "drizzle-orm/pg-core";
import {relations} from 'drizzle-orm';

// Table des utilisateurs
export const User = pgTable("users", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    username: varchar({length: 255}).notNull().unique(),
    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const userRelations = relations(User, ({many}) => ({
    stories: many(Story),
    comments: many(Comment),
    purchases: many(Purchase),
    readChapters: many(UserReadChapter),
}));

// Table des histoires
export const Story = pgTable("stories", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    title: varchar({length: 255}).notNull(),
    authorId: uuid().references(() => User.id).notNull(),
    isDraft: boolean().default(true).notNull(),
    likes: integer().default(0),
    views: integer().default(0),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const storyRelations = relations(Story, ({one, many}) => ({
    author: one(User, {fields: [Story.authorId], references: [User.id]}),
    chapters: many(Chapter),
    comments: many(Comment),
    purchases: many(Purchase),
}));

// Table des chapitres
export const Chapter = pgTable("chapters", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid().references(() => Story.id).notNull(),
    title: varchar({length: 255}).notNull(),
    isDraft: boolean().default(true).notNull(),
    releaseDate: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
});

export const chapterRelations = relations(Chapter, ({one, many}) => ({
    story: one(Story, {fields: [Chapter.storyId], references: [Story.id]}),
    messages: many(Message),
    pointsOfView: many(PointOfView),
    readChapters: many(UserReadChapter),
}));

// Table des messages dans chaque chapitre
export const Message = pgTable("messages", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    chapterId: uuid().references(() => Chapter.id).notNull(),
    senderName: varchar({length: 255}).notNull(),
    content: text().notNull(),
    timestamp: timestamp().notNull(),
    mediaUrl: varchar({length: 255}), // Pour les images dans les messages
});

export const messageRelations = relations(Message, ({one}) => ({
    chapter: one(Chapter, {fields: [Message.chapterId], references: [Chapter.id]}),
}));

// Table pour les points de vue
export const PointOfView = pgTable("points_of_view", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    chapterId: uuid().references(() => Chapter.id).notNull(),
    characterName: varchar({length: 255}).notNull(),
});

export const pointOfViewRelations = relations(PointOfView, ({one}) => ({
    chapter: one(Chapter, {fields: [PointOfView.chapterId], references: [Chapter.id]}),
}));

// Table de suivi des chapitres lus par utilisateur
export const UserReadChapter = pgTable("user_read_chapters", {
    userId: uuid().references(() => User.id).notNull(),
    chapterId: uuid().references(() => Chapter.id).notNull(),
    readAt: timestamp().defaultNow().notNull(),
    // Définition de la clé primaire multiple
}, (table) => {
    return {
        id: primaryKey({columns: [table.userId, table.chapterId]}),
    };
});

export const userReadChapterRelations = relations(UserReadChapter, ({one}) => ({
    user: one(User, {fields: [UserReadChapter.userId], references: [User.id]}),
    chapter: one(Chapter, {fields: [UserReadChapter.chapterId], references: [Chapter.id]}),
}));

// Table des commentaires
export const Comment = pgTable("comments", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid().references(() => Story.id).notNull(),
    userId: uuid().references(() => User.id).notNull(),
    content: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});

export const commentRelations = relations(Comment, ({one}) => ({
    story: one(Story, {fields: [Comment.storyId], references: [Story.id]}),
    user: one(User, {fields: [Comment.userId], references: [User.id]}),
}));

// Table des achats de chapitres
export const Purchase = pgTable("purchases", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    userId: uuid().references(() => User.id).notNull(),
    storyId: uuid().references(() => Story.id).notNull(),
    purchasedAt: timestamp().defaultNow().notNull(),
});

export const purchaseRelations = relations(Purchase, ({one}) => ({
    user: one(User, {fields: [Purchase.userId], references: [User.id]}),
    story: one(Story, {fields: [Purchase.storyId], references: [Story.id]}),
}));
