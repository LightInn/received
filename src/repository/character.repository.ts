// // characterRepository.ts
//
// "use server";
// import { db } from "../db";
// import { CharacterSchema, StorySchema } from "../db/schema";
// import { sql, eq } from "drizzle-orm";
// import { Character } from "@/models/character";
//
// // Création d'un personnage
// export async function createCharacter(
//   data: Partial<Character>,
// ): Promise<string | null> {
//   try {
//     if (!data.name) throw new Error("Character name is required");
//     if (!data.storyId) throw new Error("Story ID is required");
//
//     const result = await db
//       .insert(CharacterSchema)
//       .values({
//         name: data.name,
//         storyId: data.storyId,
//         description: data.description,
//         role: data.role,
//         imageUrl: data.imageUrl,
//         createdAt: new Date(),
//       })
//       .returning({ insertedId: CharacterSchema.id });
//
//     return result[0]?.insertedId;
//   } catch (error) {
//     console.error("Error creating character:", error);
//     return null;
//   }
// }
//
// // Récupération d'un personnage par ID
// export async function getCharacterById(
//   characterId: string,
// ): Promise<Character | null> {
//   try {
//     const character = await db
//       .select()
//       .from(CharacterSchema)
//       .where(eq(CharacterSchema.id, characterId))
//       .single();
//
//     return character
//       ? {
//           id: character.id,
//           name: character.name,
//           storyId: character.storyId,
//           description: character.description,
//           role: character.role,
//           imageUrl: character.imageUrl,
//           createdAt: character.createdAt,
//         }
//       : null;
//   } catch (error) {
//     console.error("Error fetching character by ID:", error);
//     return null;
//   }
// }
//
// // Mise à jour d'un personnage
// export async function updateCharacter(
//   characterId: string,
//   data: Partial<Character>,
// ): Promise<boolean> {
//   try {
//     const result = await db
//       .update(CharacterSchema)
//       .set({
//         name: data.name,
//         description: data.description,
//         role: data.role,
//         imageUrl: data.imageUrl,
//         updatedAt: new Date(),
//       })
//       .where(eq(CharacterSchema.id, characterId));
//
//     return result.rowCount == null ? false : result.rowCount > 0;
//   } catch (error) {
//     console.error("Error updating character:", error);
//     return false;
//   }
// }
//
// // Suppression d'un personnage
// export async function deleteCharacter(characterId: string): Promise<boolean> {
//   try {
//     const result = await db
//       .delete(CharacterSchema)
//       .where(eq(CharacterSchema.id, characterId));
//     return result.rowCount == null ? false : result.rowCount > 0;
//   } catch (error) {
//     console.error("Error deleting character:", error);
//     return false;
//   }
// }
//
// // Récupération des personnages par histoire
// export async function getCharactersByStory(
//   storyId: string,
// ): Promise<Character[]> {
//   try {
//     const characters = await db
//       .select({
//         id: CharacterSchema.id,
//         name: CharacterSchema.name,
//         description: CharacterSchema.description,
//         role: CharacterSchema.role,
//         imageUrl: CharacterSchema.imageUrl,
//       })
//       .from(CharacterSchema)
//       .where(eq(CharacterSchema.storyId, storyId));
//
//     return characters.map((character) => ({
//       id: character.id,
//       name: character.name,
//       storyId,
//       description: character.description,
//       role: character.role,
//       imageUrl: character.imageUrl,
//       createdAt: character.createdAt,
//     }));
//   } catch (error) {
//     console.error("Error fetching characters by story:", error);
//     return [];
//   }
// }
//
// // Récupération de tous les personnages
// export async function getAllCharacters(): Promise<Character[]> {
//   try {
//     const characters = await db.select().from(CharacterSchema);
//
//     return characters.map((character) => ({
//       id: character.id,
//       name: character.name,
//       storyId: character.storyId,
//       description: character.description,
//       role: character.role,
//       imageUrl: character.imageUrl,
//       createdAt: character.createdAt,
//     }));
//   } catch (error) {
//     console.error("Error fetching all characters:", error);
//     return [];
//   }
// }
