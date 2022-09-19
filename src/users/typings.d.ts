import { RouterContext } from "oak";

export type User = {
  id: string;
  username: string;
  hash: string;
  salt: string;
  createdAt: string;
};

export type NewUserPayload = {
  username: string;
  password: string;
};

export type NewUser = Pick<User, "username" | "hash" | "salt">;

export type UserDto = Pick<User, "username" | "createdAt">;

interface IUserController {
  register(ctx: RouterContext<string>): Promise<void>;
}

export interface IUserService {
  register(payload: NewUserPayload): Promise<UserDto>;
}

export interface IUserRepository {
  findAll(): Promise<User[]>;
  exists(username: string): Promise<boolean>;
  create(user: NewUser): Promise<User>;
}
