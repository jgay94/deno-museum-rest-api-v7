import { IUserRepository, IUserService, NewUser, User } from "./mod.ts";
import * as log from "std/log/mod.ts";

interface IServiceDependencies {
  userRepository: IUserRepository;
}

export class Service implements IUserService {
  private userRepository: IUserRepository;

  constructor({ userRepository }: IServiceDependencies) {
    this.userRepository = userRepository;
  }

  public async findAll(): Promise<User[]> {
    const userList = await this.userRepository.findAll();
    log.info(`[${new Date().toISOString()}] Found ${userList.length} users...`);

    return userList;
  }

  public async exists(username: string): Promise<boolean> {
    const user = await this.userRepository.exists(username);

    if (user) {
      log.info(`[${new Date().toISOString()}] User exists: ${username}`);
      return true;
    }

    return false;
  }

  public async create(user: NewUser): Promise<User> {
    const newUser = await this.userRepository.create(user);
    log.info(`[${new Date().toISOString()}] User created: ${newUser.username}`);

    return newUser;
  }
}
