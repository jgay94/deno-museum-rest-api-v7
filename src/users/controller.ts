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

  public async register(ctx: RouterContext<string>): Promise<void> {
    const { username, password } = await ctx.request.body().value;
    const user = await this.userService.register({ username, password });

    if (!username || !password) {
      ctx.throw(400, "Username and password are required");
    }

    ctx.response.status = 201;
    ctx.response.body = user;
  }
}
