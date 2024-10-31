import {UserSchema} from "@/db/schema";

type UserBase = typeof UserSchema.$inferSelect;

export interface User extends UserBase {
    supertype?: boolean;
}