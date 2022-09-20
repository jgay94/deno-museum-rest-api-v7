import { UserDTO } from "./mod.ts";
import { User } from "/src/users/mod.ts";

export const convertToUserDTO = (user: User): UserDTO => {
  const { username, createdAt } = user;
  return { username, createdAt };
};
