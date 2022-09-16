import { IMuseumRepository, Museum, NewMuseum } from "./mod.ts";

export class Repository implements IMuseumRepository {
  public async findAll(): Promise<Museum[]> {
    return await JSON.parse(
      sessionStorage.getItem("museums") ?? "[]",
    ) as Museum[];
  }

  public async create(museum: NewMuseum): Promise<Museum> {
    const museumList = await this.findAll();
    const newMuseum = {
      ...museum,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    } as Museum;

    sessionStorage.setItem(
      "museums",
      JSON.stringify([...museumList, newMuseum]),
    );

    return newMuseum;
  }

  public async getById(id: string): Promise<Museum> {
    const museumList = await this.findAll();
    const museum = museumList.find((museum) => museum.id === id);

    if (!museum) {
      throw new Error("Museum not found");
    }

    return museum;
  }

  public loadFixtures(museumList: Museum[]): void {
    sessionStorage.setItem("museums", JSON.stringify(museumList));
  }
}
