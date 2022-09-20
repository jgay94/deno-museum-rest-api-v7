import { User } from "/src/users/mod.ts";
import { RouterContext } from "oak";

export type RegisterDTO = Pick<User, "username" | "createdAt">;

export type RegisterPayload = {
  username: string;
  password: string;
};

export interface IAuthController {
  register(ctx: RouterContext<string>): Promise<void>;
}

export interface IAuthService {
  register(payload: RegisterPayload): Promise<RegisterDTO | null>;
}
