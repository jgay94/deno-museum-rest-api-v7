export type {
  IAuthController,
  IAuthService,
  LoginPayload,
  RegisterPayload,
  UserDTO,
} from "./typings.d.ts";

export { Controller, Service };

// imports for dep injection
import { Service } from "./service.ts";
import { Controller } from "./controller.ts";
import { Repository as UserRepository } from "/src/users/mod.ts";
import { Service as UserService } from "/src/users/mod.ts";

// manual dep injection
const userRepository = new UserRepository();
const userService = new UserService({ userRepository });
const authService = new Service({ userService });
export const authController = new Controller({ authService });
