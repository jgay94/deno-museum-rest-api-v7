import { Museum } from "./typings.d.ts";

interface IMuseumService {
  findAll(): Promise<Museum[]>;
}

export class Service implements IMuseumService {
  // deno-lint-ignore require-await
  public async findAll(): Promise<Museum[]> {
    return [];
  }
}
