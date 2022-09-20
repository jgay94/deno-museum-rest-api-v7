import { RegisterDTO } from "./mod.ts";
import { User } from "/src/users/mod.ts";

export const convertToRegisterDTO = (user: User): RegisterDTO => {
  const { username, createdAt } = user;
  return { username, createdAt };
};
