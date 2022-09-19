import { userToUserDto } from "./adapter.ts";
import { IUserService, IUserRepository, User, NewUserPayload, UserDto, NewUser } from "./mod.ts";
import * as bcrypt from "bcrypt";

interface IServiceDependencies {
  userRepository: IUserRepository;
}

export class Service implements IUserService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: IServiceDependencies) {
    this.userRepository = userRepository;
  }

  public async register(payload: NewUserPayload): Promise<UserDto> {
    const { username, password } = payload;

    if (await this.userRepository.exists(username)) {
      throw new Error("User already exists");
    }

    const user = await this.userRepository.create(
      await this.getHashedUser(username, password),
    );

    return userToUserDto(user);
  }

  private async getHashedUser(username: string, password: string): Promise<NewUser> {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    const user = { username, hash, salt };

    return user;
  }
}