export type {
  IUserController,
  IUserRepository,
  IUserService,
  NewUser,
  NewUserPayload,
  User,
  UserDto,
} from "./typings.d.ts";

export { Controller, Repository, Service };

// imports for dep injection
import { Controller } from "./controller.ts";
import { Service } from "./service.ts";
import { Repository } from "./repository.ts";

// manual dep injection
const userRepository = new Repository();
const userService = new Service({ userRepository });
export const userController = new Controller({ userService });
