import { HashedUser, IPasswordService } from "./mod.ts";
import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class Service implements IPasswordService {
  private readonly saltRounds: number = SALT_ROUNDS;

  public async hash(username: string, password: string): Promise<HashedUser> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return { username, hash, salt };
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }  
}
