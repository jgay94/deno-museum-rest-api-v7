import { Museum } from "./typings.d.ts";

interface IMuseumRepository {
  findAll(): Promise<Museum[]>;
}

export class Repository implements IMuseumRepository {
  // deno-lint-ignore require-await
  public async findAll(): Promise<Museum[]> {
    return [];
  }
}
