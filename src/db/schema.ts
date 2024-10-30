import {boolean, integer, pgTable, primaryKey, text, timestamp, uuid, varchar,} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {json} from "drizzle-orm/pg-core/columns/json";

// Table des utilisateurs
export const UserSchema = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar({length: 255}).notNull().unique(),
    email: varchar({length: 255}).notNull().unique(),
    age: integer().notNull(),
    nsfw: boolean().default(false).notNull(),
    password: varchar({length: 255}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(UserSchema, ({many}) => ({
    stories: many(StorySchema),
    comments: many(CommentSchema),
    purchases: many(PurchaseSchema),
    readChapters: many(UserReadChapterSchema),
}));

// Table des histoires
export const StorySchema = pgTable("stories", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 255}).notNull(),
    authorId: uuid("author_id")
        .references(() => UserSchema.id)
        .notNull(),
    isDraft: boolean("is_draft").default(true).notNull(),
    likes: integer().default(0),
    views: integer().default(0),
    description: text().default("").notNull(),
    category: varchar({length: 255}),
    tags: json().default([]).$type<JSON>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const storyRelations = relations(StorySchema, ({one, many}) => ({
    author: one(UserSchema, {fields: [StorySchema.authorId], references: [UserSchema.id]}),
    chapters: many(ChapterSchema),
    comments: many(CommentSchema),
    purchases: many(PurchaseSchema),
}));

// Table des chapitres
export const ChapterSchema = pgTable("chapters", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid("story_id")
        .references(() => StorySchema.id)
        .notNull(),
    title: varchar({length: 255}).notNull(),
    isDraft: boolean("is_draft").default(true).notNull(),
    releaseDate: timestamp("release_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chapterRelations = relations(ChapterSchema, ({one, many}) => ({
    story: one(StorySchema, {fields: [ChapterSchema.storyId], references: [StorySchema.id]}),
    messages: many(MessageSchema),
    pointsOfView: many(PointOfViewSchema),
    readChapters: many(UserReadChapterSchema),
}));
// personnages
export const CharacterSchema = pgTable("characters", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid("story_id")
        .references(() => StorySchema.id)
        .notNull(),
    name: varchar({length: 255}).notNull(),
    description: text().notNull(),
    picture: varchar({length: 255}),
    color: varchar({length: 255}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// conversations
export const ConversationSchema = pgTable("conversations", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid("story_id")
        .references(() => StorySchema.id)
        .notNull(),
    chapterId: uuid("chapter_id")
        .references(() => ChapterSchema.id)
        .notNull(),
    title: varchar({length: 255}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Table des messages dans chaque conversation
export const MessageSchema = pgTable("messages", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    chapterId: uuid("chapter_id")
        .references(() => ChapterSchema.id)
        .notNull(),
    conversationId: uuid("conversation_id")
        .references(() => ConversationSchema.id)
        .notNull(),
    // sender character
    senderId: uuid("sender_id")
        .references(() => CharacterSchema.id)
        .notNull(),
    content: text().notNull(),
    timestamp: timestamp().notNull(),
    mediaUrl: varchar("media_url", {length: 255}), // Pour les images dans les messages
});

export const messageRelations = relations(MessageSchema, ({one}) => ({
    chapter: one(ChapterSchema, {
        fields: [MessageSchema.chapterId],
        references: [ChapterSchema.id],
    }),
}));

// Table pour les points de vue disponibles dans chaque chapitre
export const PointOfViewSchema = pgTable("points_of_view", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    chapterId: uuid("chapter_id")
        .references(() => ChapterSchema.id)
        .notNull(),
    characterId: uuid("character_id")
        .references(() => CharacterSchema.id)
        .notNull(),
});

export const pointOfViewRelations = relations(PointOfViewSchema, ({one}) => ({
    chapter: one(ChapterSchema, {
        fields: [PointOfViewSchema.chapterId],
        references: [ChapterSchema.id],
    }),
}));

// Table de suivi des chapitres lus par utilisateur
export const UserReadChapterSchema = pgTable(
    "user_read_chapters",
    {
        userId: uuid("user_id")
            .references(() => UserSchema.id)
            .notNull(),
        chapterId: uuid("chapter_id")
            .references(() => ChapterSchema.id)
            .notNull(),
        readAt: timestamp("read_at").defaultNow().notNull(),
        // Définition de la clé primaire multiple
    },
    (table) => {
        return {
            id: primaryKey({columns: [table.userId, table.chapterId]}),
        };
    },
);

export const userReadChapterRelations = relations(
    UserReadChapterSchema,
    ({one}) => ({
        user: one(UserSchema, {
            fields: [UserReadChapterSchema.userId],
            references: [UserSchema.id],
        }),
        chapter: one(ChapterSchema, {
            fields: [UserReadChapterSchema.chapterId],
            references: [ChapterSchema.id],
        }),
    }),
);

// Table des commentaires
export const CommentSchema = pgTable("comments", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid("story_id")
        .references(() => StorySchema.id)
        .notNull(),
    userId: uuid("user_id")
        .references(() => UserSchema.id)
        .notNull(),
    content: text().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commentRelations = relations(CommentSchema, ({one}) => ({
    story: one(StorySchema, {fields: [CommentSchema.storyId], references: [StorySchema.id]}),
    user: one(UserSchema, {fields: [CommentSchema.userId], references: [UserSchema.id]}),
}));

// Table des achats de chapitres
export const PurchaseSchema = pgTable("purchases", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
        .references(() => UserSchema.id)
        .notNull(),
    storyId: uuid("story_id")
        .references(() => StorySchema.id)
        .notNull(),
    purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
});

export const purchaseRelations = relations(PurchaseSchema, ({one}) => ({
    user: one(UserSchema, {fields: [PurchaseSchema.userId], references: [UserSchema.id]}),
    story: one(StorySchema, {fields: [PurchaseSchema.storyId], references: [StorySchema.id]}),
}));

// table des reviews
export const ReviewSchema = pgTable("reviews", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    storyId: uuid("story_id")
        .references(() => StorySchema.id)
        .notNull(),
    userId: uuid("user_id")
        .references(() => UserSchema.id)
        .notNull(),
    content: text().notNull(),
    rating: integer().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
