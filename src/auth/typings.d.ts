import { User } from "/src/users/mod.ts";
import { RouterContext } from "oak";

export type UserDTO = Pick<User, "username" | "createdAt">;

export type RegisterPayload = {
  username: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export interface IAuthController {
  register(ctx: RouterContext<string>): Promise<void>;
  login(ctx: RouterContext<string>): Promise<void>;
}

export interface IAuthService {
  register(payload: RegisterPayload): Promise<UserDTO | null>;
  login(payload: LoginPayload): Promise<UserDTO | null>;
}
