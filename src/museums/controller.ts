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

  public async getById(ctx: RouterContext<string>): Promise<void> {
    if (ctx.params?.id) {
      const museum = await this.museumService.getById(ctx.params.id);

      if (!museum) {
        ctx.throw(404);
      } else {
        ctx.response.status = 200;
        ctx.response.body = {
          success: true,
          message: `Museum found: ${museum.name}`,
          data: museum,
        };
      }
    }
  }

  public async update(ctx: RouterContext<string>): Promise<void> {
    if (ctx.params?.id) {
      const payload = await ctx.request.body().value;
      const updatedMuseum = await this.museumService.update(ctx.params.id, payload);

      if (!updatedMuseum) {
        ctx.throw(404);
      } else {
        ctx.response.status = 200;
        ctx.response.body = {
          success: true,
          message: `Museum updated: ${updatedMuseum.name}`,
          data: updatedMuseum,
        };
      }
    }
  }
}
