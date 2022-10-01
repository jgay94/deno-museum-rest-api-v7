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
    if (!ctx.request.hasBody) {
      ctx.throw(415);
    }

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

  public async login(ctx: RouterContext<string>): Promise<void> {
    if (!ctx.request.hasBody) {
      ctx.throw(415);
    }

    const { username, password } = await ctx.request.body().value;

    if (!username || !password) {
      ctx.throw(400, "Username and password are required");
    }

    const user = await this.authService.login({ username, password });

    if (!user) {
      ctx.throw(400, "Invalid username or password");
    }

    ctx.cookies.set("accessToken", user.tokens.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    ctx.response.status = 200;
    ctx.response.body = user;
  }

  public logout(ctx: RouterContext<string>): void {
    ctx.cookies.delete("accessToken");

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      message: "Successfully logged out",
    };
  }
}
