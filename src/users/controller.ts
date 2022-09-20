import { IUserController, IUserService } from "./mod.ts";
import { RouterContext } from "oak";

interface IControllerDependencies {
  userService: IUserService;
}

export class Controller implements IUserController {
  private userService: IUserService;

  constructor({ userService }: IControllerDependencies) {
    this.userService = userService;
  }

  public async findAll(ctx: RouterContext<string>): Promise<void> {
    const userList = await this.userService.findAll();

    ctx.response.status = 200;
    ctx.response.body = userList;
  }
}
