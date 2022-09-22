import {
  AuthenticatedUser,
  IAuthService,
  UserDTO,
  UserPayload,
} from "./mod.ts";
import { convertToUserDTO } from "./helpers.ts";
import { IUserService, NewUser } from "/src/users/mod.ts";
import * as bcrypt from "bcrypt";
import * as log from "std/log/mod.ts";
import { ITokenService } from "../tokenizer/mod.ts";

interface IServiceDependencies {
  userService: IUserService;
  tokenService: ITokenService;
}

export class Service implements IAuthService {
  private userService: IUserService;
  private tokenService: ITokenService;

  constructor({ userService, tokenService }: IServiceDependencies) {
    this.userService = userService;
    this.tokenService = tokenService;
  }

  public async register(payload: UserPayload): Promise<UserDTO | null> {
    const { username, password } = payload;

    if (await this.userService.exists(username)) {
      return null;
    }

    const user = await this.userService.create(
      await this.hashPassword(username, password),
    );

    return convertToUserDTO(user);
  }

  public async login(payload: UserPayload): Promise<AuthenticatedUser | null> {
    const { username, password } = payload;

    const user = await this.userService.getByUsername(username);

    if (!user) {
      return null;
    }

    const isValid = await this.comparePasswords(password, user.hash);

    if (!isValid) {
      return null;
    }

    log.info(`[${new Date().toISOString()}] User logged in: ${username}`);
    return {
      user: convertToUserDTO(user),
      tokens: await this.tokenService.generateTokens(user.username),
    };
  }

  private async comparePasswords(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private async hashPassword(
    username: string,
    password: string,
  ): Promise<NewUser> {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    const user = { username, hash, salt };

    return user;
  }
}
