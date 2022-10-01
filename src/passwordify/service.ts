import { HashedUser, IPasswordService } from "./mod.ts";
import { comparePasswords, hashPassword } from "./helpers.ts";

export class Service implements IPasswordService {
  public async hash(username: string, password: string): Promise<HashedUser> {
    return await hashPassword(username, password);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await comparePasswords(password, hash);
  }
}
