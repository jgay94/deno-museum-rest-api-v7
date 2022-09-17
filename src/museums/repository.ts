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

  public async getById(id: string): Promise<Museum | null> {
    const museumList = await this.findAll();
    const museum = museumList.find((m) => m.id === id);

    if (!museum) {
      return null;
    }

    return museum;
  }

  public async update(id: string, museum: Museum): Promise<Museum | null> {
    const museumList = await this.findAll();
    const museumIndex = museumList.findIndex((m) => m.id === id);
    const updatedMuseum = {
      ...museum,
      id,
      updatedAt: new Date().toISOString(),
    } as Museum;

    if (museumIndex === -1) {
      return null;
    }

    museumList[museumIndex] = updatedMuseum;

    sessionStorage.setItem("museums", JSON.stringify(museumList));

    return updatedMuseum;
  }

  public async delete(id: string): Promise<void | null> {
    const museumList = await this.findAll();
    const museumIndex = museumList.findIndex((m) => m.id === id);

    if (museumIndex === -1) {
      return null;
    }

    museumList.splice(museumIndex, 1);

    sessionStorage.setItem("museums", JSON.stringify(museumList));

    return;
  }

  public loadFixtures(museumList: Museum[]): void {
    sessionStorage.setItem("museums", JSON.stringify(museumList));
  }
}
