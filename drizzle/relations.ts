import { relations } from "drizzle-orm/relations";
import { users, stories, chapters, comments, messages, pointsOfView, purchases, userReadChapters } from "./schema";

export const storiesRelations = relations(stories, ({one, many}) => ({
	user: one(users, {
		fields: [stories.authorId],
		references: [users.id]
	}),
	chapters: many(chapters),
	comments: many(comments),
	purchases: many(purchases),
}));

export const usersRelations = relations(users, ({many}) => ({
	stories: many(stories),
	comments: many(comments),
	purchases: many(purchases),
	userReadChapters: many(userReadChapters),
}));

export const chaptersRelations = relations(chapters, ({one, many}) => ({
	story: one(stories, {
		fields: [chapters.storyId],
		references: [stories.id]
	}),
	messages: many(messages),
	pointsOfViews: many(pointsOfView),
	userReadChapters: many(userReadChapters),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	story: one(stories, {
		fields: [comments.storyId],
		references: [stories.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	chapter: one(chapters, {
		fields: [messages.chapterId],
		references: [chapters.id]
	}),
}));

export const pointsOfViewRelations = relations(pointsOfView, ({one}) => ({
	chapter: one(chapters, {
		fields: [pointsOfView.chapterId],
		references: [chapters.id]
	}),
}));

export const purchasesRelations = relations(purchases, ({one}) => ({
	user: one(users, {
		fields: [purchases.userId],
		references: [users.id]
	}),
	story: one(stories, {
		fields: [purchases.storyId],
		references: [stories.id]
	}),
}));

export const userReadChaptersRelations = relations(userReadChapters, ({one}) => ({
	user: one(users, {
		fields: [userReadChapters.userId],
		references: [users.id]
	}),
	chapter: one(chapters, {
		fields: [userReadChapters.chapterId],
		references: [chapters.id]
	}),
}));