import { IAuthService, RegisterDTO, RegisterPayload } from "./mod.ts";
import { convertToRegisterDTO } from "./helpers.ts";
import { IUserService, NewUser } from "/src/users/mod.ts";
import * as bcrypt from "bcrypt";

interface IServiceDependencies {
  userService: IUserService;
}

export class Service implements IAuthService {
  private userService: IUserService;

  constructor({ userService }: IServiceDependencies) {
    this.userService = userService;
  }

  public async register(payload: RegisterPayload): Promise<RegisterDTO | null> {
    const { username, password } = payload;

    if (await this.userService.exists(username)) {
      return null;
    }

    const user = await this.userService.create(
      await this.hashPassword(username, password),
    );

    return convertToRegisterDTO(user);
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
