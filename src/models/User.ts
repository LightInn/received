import { UserSchema } from "@/db/schema";

type UserBase = typeof UserSchema.$inferSelect;

export interface User extends UserBase {
  id: string;
  supertype?: boolean;
  username: string;
  email: string;
  clerk_id: string;
  bio?: string;
  avatarUrl?: string;
  onboarded: boolean;
  createdAt: string;
  updatedAt: string;
}
