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
      id: primaryKey({ columns: [table.userId, table.chapterId] }),
    };
  },
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
  userId: uuid("user_id")
    .references(() => UserSchema.id)
    .notNull(),
  storyId: uuid("story_id")
    .references(() => StorySchema.id)
    .notNull(),
  purchasedAt: timestamp("purchased_at").defaultNow().notNull(),
});

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
