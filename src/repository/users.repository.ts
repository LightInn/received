"use server";
import pb from "@/repository/_pb";
import { User } from "@/models/User";

// Création d'un utilisateur
export async function createUser(data: Partial<User>): Promise<string | null> {
  try {
    if (!data.username) throw new Error("Username is required");
    if (!data.email) throw new Error("Email is required");

    const record = await pb.collection("users").create({
      username: data.username,
      email: data.email,
      clerk_id: data.clerk_id, // Assuming clerk_id is used as the main ID
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      onborded: false, // Default value
    });

    return record.id;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

//
//
// // Récupération d'un utilisateur par ID
// export async function getUserById(userId: string): Promise<User | null> {
//     try {
//         const record = await pb.collection('users').getOne(userId);
//
//         return record ? {
//             id: record.id,
//             username: record.username,
//             email: record.email,
//             bio: record.bio,
//             avatarUrl: record.avatarUrl,
//             createdAt: new Date(record.created)
//         } : null;
//     } catch (error) {
//         console.error("Error fetching user by ID:", error);
//         return null;
//     }
// }
//
// // Mise à jour d'un utilisateur
// export async function updateUser(
//     userId: string,
//     data: Partial<User>
// ): Promise<boolean> {
//     try {
//         const record = await pb.collection('users').update(userId, {
//             username: data.username,
//             email: data.email,
//             bio: data.bio,
//             avatarUrl: data.avatarUrl
//         });
//
//         return !!record;
//     } catch (error) {
//         console.error("Error updating user:", error);
//         return false;
//     }
// }
//
// // Suppression d'un utilisateur
// export async function deleteUser(userId: string): Promise<boolean> {
//     try {
//         await pb.collection('users').delete(userId);
//         return true;
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return false;
//     }
// }
//
// // Récupération des histoires écrites par un utilisateur
// export async function getStoriesByUser(userId: string): Promise<any[]> {
//     try {
//         const records = await pb.collection('stories').getFullList({
//             filter: `author_id = "${userId}"`,
//             sort: '-created'
//         });
//
//         return records.map(record => ({
//             id: record.id,
//             title: record.title,
//             description: record.description,
//             createdAt: new Date(record.created),
//             views: record.views
//         }));
//     } catch (error) {
//         console.error("Error fetching stories by user:", error);
//         return [];
//     }
// }
//
// // Récupération des reviews laissées par un utilisateur
// export async function getReviewsByUser(userId: string): Promise<any[]> {
//     try {
//         const records = await pb.collection('reviews').getFullList({
//             filter: `user_id = "${userId}"`,
//             sort: '-created'
//         });
//
//         return records.map(record => ({
//             id: record.id,
//             storyId: record.story_id,
//             rating: record.rating,
//             comment: record.comment,
//             createdAt: new Date(record.created)
//         }));
//     } catch (error) {
//         console.error("Error fetching reviews by user:", error);
//         return [];
//     }
// }
//
// // Récupération de tous les utilisateurs
// export async function getAllUsers(): Promise<User[]> {
//     try {
//         const records = await pb.collection('users').getFullList({
//             sort: 'username'
//         });
//
//         return records.map(record => ({
//             id: record.id,
//             username: record.username,
//             clerk_id: record.clerk_id,
//             email: record.email,
//             onboarded: record.onboarded,
//             updatedAt: new Date(record.updated),
//             bio: record.bio,
//             avatarUrl: record.avatarUrl,
//             createdAt: new Date(record.created)
//         }));
//     } catch (error) {
//         console.error("Error fetching all users:", error);
//         return [];
//     }
// }
//
// // Récupération d'un utilisateur par email
// export async function getUserByEmail(email: string): Promise<User | null> {
//     try {
//         const records = await pb.collection('users').getFirstListItem(`email = "${email}"`);
//
//         return records ? {
//             id: records.id,
//             username: records.username,
//             email: records.email,
//             bio: records.bio,
//             avatarUrl: records.avatarUrl,
//             createdAt: new Date(records.created)
//         } : null;
//     } catch (error) {
//         console.error("Error fetching user by email:", error);
//         return null;
//     }
// }
