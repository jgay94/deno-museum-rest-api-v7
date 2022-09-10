import { IMuseumRepository, Museum } from "./mod.ts";

export class Repository implements IMuseumRepository {
  public async findAll(): Promise<Museum[]> {
    return await JSON.parse(
      sessionStorage.getItem("museums") || "[]",
    ) as Museum[];
  }

  public loadFixtures(museumList: Museum[]): void {
    sessionStorage.setItem("museums", JSON.stringify(museumList));
  }
}
