import { User, UserDto } from "./mod.ts";

export const userToUserDto = (user: User): UserDto => {
  const { username, createdAt } = user;
  return { username, createdAt };
}