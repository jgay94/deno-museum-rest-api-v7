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
}
