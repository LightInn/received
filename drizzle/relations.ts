import { relations } from "drizzle-orm/relations";
import { stories, comments, users, conversations, chapters, pointsOfView, characters, messages, purchases, reviews, userReadChapters } from "./schema";

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

export const storiesRelations = relations(stories, ({one, many}) => ({
	comments: many(comments),
	conversations: many(conversations),
	characters: many(characters),
	user: one(users, {
		fields: [stories.authorId],
		references: [users.id]
	}),
	purchases: many(purchases),
	reviews: many(reviews),
	chapters: many(chapters),
}));

export const usersRelations = relations(users, ({many}) => ({
	comments: many(comments),
	stories: many(stories),
	purchases: many(purchases),
	reviews: many(reviews),
	userReadChapters: many(userReadChapters),
}));

export const conversationsRelations = relations(conversations, ({one, many}) => ({
	story: one(stories, {
		fields: [conversations.storyId],
		references: [stories.id]
	}),
	chapter: one(chapters, {
		fields: [conversations.chapterId],
		references: [chapters.id]
	}),
	messages: many(messages),
}));

export const chaptersRelations = relations(chapters, ({one, many}) => ({
	conversations: many(conversations),
	pointsOfViews: many(pointsOfView),
	messages: many(messages),
	story: one(stories, {
		fields: [chapters.storyId],
		references: [stories.id]
	}),
	userReadChapters: many(userReadChapters),
}));

export const pointsOfViewRelations = relations(pointsOfView, ({one}) => ({
	chapter: one(chapters, {
		fields: [pointsOfView.chapterId],
		references: [chapters.id]
	}),
	character: one(characters, {
		fields: [pointsOfView.characterId],
		references: [characters.id]
	}),
}));

export const charactersRelations = relations(characters, ({one, many}) => ({
	pointsOfViews: many(pointsOfView),
	story: one(stories, {
		fields: [characters.storyId],
		references: [stories.id]
	}),
	messages: many(messages),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	chapter: one(chapters, {
		fields: [messages.chapterId],
		references: [chapters.id]
	}),
	conversation: one(conversations, {
		fields: [messages.conversationId],
		references: [conversations.id]
	}),
	character: one(characters, {
		fields: [messages.senderId],
		references: [characters.id]
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

export const reviewsRelations = relations(reviews, ({one}) => ({
	story: one(stories, {
		fields: [reviews.storyId],
		references: [stories.id]
	}),
	user: one(users, {
		fields: [reviews.userId],
		references: [users.id]
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