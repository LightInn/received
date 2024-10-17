import { pgTable, foreignKey, uuid, varchar, boolean, integer, timestamp, text, unique, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const stories = pgTable("stories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: varchar({ length: 255 }).notNull(),
	authorId: uuid().notNull(),
	isDraft: boolean().default(true).notNull(),
	likes: integer().default(0),
	views: integer().default(0),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		storiesAuthorIdUsersIdFk: foreignKey({
			columns: [table.authorId],
			foreignColumns: [users.id],
			name: "stories_authorId_users_id_fk"
		}),
	}
});

export const chapters = pgTable("chapters", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	storyId: uuid().notNull(),
	title: varchar({ length: 255 }).notNull(),
	isDraft: boolean().default(true).notNull(),
	releaseDate: timestamp({ mode: 'string' }),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		chaptersStoryIdStoriesIdFk: foreignKey({
			columns: [table.storyId],
			foreignColumns: [stories.id],
			name: "chapters_storyId_stories_id_fk"
		}),
	}
});

export const comments = pgTable("comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	storyId: uuid().notNull(),
	userId: uuid().notNull(),
	content: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		commentsStoryIdStoriesIdFk: foreignKey({
			columns: [table.storyId],
			foreignColumns: [stories.id],
			name: "comments_storyId_stories_id_fk"
		}),
		commentsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_userId_users_id_fk"
		}),
	}
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersUsernameUnique: unique("users_username_unique").on(table.username),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const messages = pgTable("messages", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	chapterId: uuid().notNull(),
	senderName: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	timestamp: timestamp({ mode: 'string' }).notNull(),
	mediaUrl: varchar({ length: 255 }),
},
(table) => {
	return {
		messagesChapterIdChaptersIdFk: foreignKey({
			columns: [table.chapterId],
			foreignColumns: [chapters.id],
			name: "messages_chapterId_chapters_id_fk"
		}),
	}
});

export const pointsOfView = pgTable("points_of_view", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	chapterId: uuid().notNull(),
	characterName: varchar({ length: 255 }).notNull(),
},
(table) => {
	return {
		pointsOfViewChapterIdChaptersIdFk: foreignKey({
			columns: [table.chapterId],
			foreignColumns: [chapters.id],
			name: "points_of_view_chapterId_chapters_id_fk"
		}),
	}
});

export const purchases = pgTable("purchases", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid().notNull(),
	storyId: uuid().notNull(),
	purchasedAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		purchasesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "purchases_userId_users_id_fk"
		}),
		purchasesStoryIdStoriesIdFk: foreignKey({
			columns: [table.storyId],
			foreignColumns: [stories.id],
			name: "purchases_storyId_stories_id_fk"
		}),
	}
});

export const userReadChapters = pgTable("user_read_chapters", {
	userId: uuid().notNull(),
	chapterId: uuid().notNull(),
	readAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userReadChaptersUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_read_chapters_userId_users_id_fk"
		}),
		userReadChaptersChapterIdChaptersIdFk: foreignKey({
			columns: [table.chapterId],
			foreignColumns: [chapters.id],
			name: "user_read_chapters_chapterId_chapters_id_fk"
		}),
		userReadChaptersUserIdChapterIdPk: primaryKey({ columns: [table.userId, table.chapterId], name: "user_read_chapters_userId_chapterId_pk"}),
	}
});
