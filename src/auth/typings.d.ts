import { User } from "/src/users/mod.ts";
import { Tokens } from "/src/tokenizer/mod.ts";
import { RouterContext } from "oak";

export type UserDTO = Pick<User, "username" | "createdAt">;

export type UserPayload = {
  username: string;
  password: string;
};

export type AuthenticatedUser = {
  user: UserDTO;
  tokens: Tokens;
};

export interface IAuthController {
  register(ctx: RouterContext<string>): Promise<void>;
  login(ctx: RouterContext<string>): Promise<void>;
}

export interface IAuthService {
  register(payload: UserPayload): Promise<UserDTO | null>;
  login(payload: UserPayload): Promise<AuthenticatedUser | null>;
}
