import { IAuthController, IAuthService } from "./mod.ts";
import { RouterContext } from "oak";

interface IControllerDependencies {
  authService: IAuthService;
}

export class Controller implements IAuthController {
  private authService: IAuthService;

  constructor({ authService }: IControllerDependencies) {
    this.authService = authService;
  }

  public async register(ctx: RouterContext<string>): Promise<void> {
    const { username, password } = await ctx.request.body().value;

    if (!username || !password) {
      ctx.throw(400, "Username and password are required");
    }

    const user = await this.authService.register({ username, password });

    if (!user) {
      ctx.throw(400, "User already exists");
    }

    ctx.response.status = 201;
    ctx.response.body = user;
  }
}
