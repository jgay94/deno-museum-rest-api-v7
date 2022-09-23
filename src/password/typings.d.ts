import { User } from "/src/users/mod.ts";

export type HashedUser = Pick<User, "username" | "hash" | "salt">;

export interface IPasswordService {
  hash(username: string, password: string): Promise<HashedUser>;
  compare(password: string, hash: string): Promise<boolean>;
}
