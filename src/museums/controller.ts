import { IMuseumController, IMuseumService } from "./mod.ts";
import { RouterContext } from "oak";

interface IControllerDependencies {
  museumService: IMuseumService;
}

export class Controller implements IMuseumController {
  private museumService: IMuseumService;

  constructor({ museumService }: IControllerDependencies) {
    this.museumService = museumService;
  }

  public async findAll({ response }: RouterContext<string>): Promise<void> {
    const museumList = await this.museumService.findAll();

    response.status = 200;
    response.body = {
      success: true,
      message: `${museumList.length} museums found.`,
      data: museumList,
    };
  }

  public async create({ request, response }: RouterContext<string>): Promise<void> {
    const payload = await request.body().value;
    const newMuseum = await this.museumService.create(payload);

    response.status = 201;
    response.headers.set("Location", `/museums/${newMuseum.id}`);
    response.body = {
      success: true,
      message: `Museum created: ${newMuseum.name}`,
      data: newMuseum,
    };
  }
}
