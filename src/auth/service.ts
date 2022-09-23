import * as log from "std/log/mod.ts";
import { convertToUserDTO } from "./helpers.ts";
import { IUserService } from "/src/users/mod.ts";
import { IPasswordService } from "../password/mod.ts";
import { ITokenService } from "../tokenizer/mod.ts";
import {
  AuthenticatedUser,
  IAuthService,
  UserDTO,
  UserPayload,
} from "./mod.ts";

interface IServiceDependencies {
  userService: IUserService;
  passwordService: IPasswordService;
  tokenService: ITokenService;
}

export class Service implements IAuthService {
  private userService: IUserService;
  private passwordService: IPasswordService;
  private tokenService: ITokenService;

  constructor({ userService, passwordService, tokenService }: IServiceDependencies) {
    this.userService = userService;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
  }

  public async register(payload: UserPayload): Promise<UserDTO | null> {
    const { username, password } = payload;

    if (await this.userService.exists(username)) {
      return null;
    }

    const user = await this.userService.create(
      await this.passwordService.hash(username, password),
    );

    log.info(`[${new Date().toISOString()}] User registered: ${username}`);

    return convertToUserDTO(user);
  }

  public async login(payload: UserPayload): Promise<AuthenticatedUser | null> {
    const { username, password } = payload;

    const user = await this.userService.getByUsername(username);

    if (!user) {
      return null;
    }

    const isValid = await this.passwordService.compare(password, user.hash);

    if (!isValid) {
      return null;
    }

    log.info(`[${new Date().toISOString()}] User logged in: ${username}`);

    return {
      user: convertToUserDTO(user),
      tokens: await this.tokenService.generateTokens(user.username),
    };
  }
}
