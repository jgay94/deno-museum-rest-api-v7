import { IUserRepository, NewUser, User } from "./mod.ts";

export class Repository implements IUserRepository {
  public async findAll(): Promise<User[]> {
    return await JSON.parse(
      sessionStorage.getItem("users") ?? "[]",
    ) as User[];
  }

  public async exists(username: string): Promise<boolean> {
    const userList = await this.findAll();
    const user = userList.find((u) => u.username === username);

    return !!user;
  }

  public async create(user: NewUser): Promise<User> {
    const userList = await this.findAll();
    const { username, hash, salt } = user;
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newUser = { id, username, hash, salt, createdAt } as User;

    sessionStorage.setItem(
      "users",
      JSON.stringify([...userList, newUser]),
    );

    return newUser;
  }

  public async getByUsername(username: string): Promise<User | null> {
    const userList = await this.findAll();
    const user = userList.find((u) => u.username === username);

    return user ?? null;
  }
}
