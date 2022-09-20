import { RouterContext } from "oak";

export type User = {
  id: string;
  username: string;
  hash: string;
  salt: string;
  createdAt: string;
};

export type NewUser = Pick<User, "username" | "hash" | "salt">;

export interface IUserController {
  findAll(ctx: RouterContext<string>): Promise<void>;
}

export interface IUserService {
  findAll(): Promise<User[]>;
  exists(username: string): Promise<boolean>;
  create(user: NewUser): Promise<User>;
}

export interface IUserRepository {
  findAll(): Promise<User[]>;
  exists(username: string): Promise<boolean>;
  create(user: NewUser): Promise<User>;
}
