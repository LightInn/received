// Table pour les points de vue disponibles dans chaque chapitre
export const PointOfViewSchema = pgTable("points_of_view", {
  chapterId: uuid("chapter_id")
    .references(() => ChapterSchema.id)
    .notNull(),
  characterId: uuid("character_id")
    .references(() => CharacterSchema.id)
    .notNull(),
  id: uuid().primaryKey().defaultRandom().notNull(),
});

// Table de suivi des chapitres lus par utilisateur
export const UserReadChapterSchema = pgTable(
  "user_read_chapters",
  {
    chapterId: uuid("chapter_id")
      .references(() => ChapterSchema.id)
      .notNull(),
    readAt: timestamp("read_at").defaultNow().notNull(),
    userId: uuid("user_id")
      .references(() => UserSchema.id)
      .notNull(),
    // Définition de la clé primaire multiple
  },
  (table) => {
    return {
      id: primaryKey({ columns: [table.userId, table.chapterId] }),
    };
  },
);

// Table des commentaires
export const CommentSchema = pgTable("comments", {
  content: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  id: uuid().primaryKey().defaultRandom().notNull(),
  storyId: uuid("story_id")
    .references(() => StorySchema.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => UserSchema.id)
    .notNull(),
});

export const commentRelations = relations(CommentSchema, ({ one }) => ({
  story: one(StorySchema, {
    fields: [CommentSchema.storyId],
    references: [StorySchema.id],
  }),
  user: one(UserSchema, {
    fields: [CommentSchema.userId],
    references: [UserSchema.id],
  }),
}));

// Table des achats de chapitres
export const PurchaseSchema = pgTable("purchases", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
  storyId: uuid("story_id")
    .references(() => StorySchema.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => UserSchema.id)
    .notNull(),
});

// table des reviews
export const ReviewSchema = pgTable("reviews", {
  content: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  id: uuid().primaryKey().defaultRandom().notNull(),
  rating: integer().notNull(),
  storyId: uuid("story_id")
    .references(() => StorySchema.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => UserSchema.id)
    .notNull(),
});
