import { HashedUser } from "./mod.ts";
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(
  username: string,
  password: string,
): Promise<HashedUser> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return { username, hash, salt };
}

export async function comparePasswords(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
