import { Application, Router as OakRouter } from "https://deno.land/x/oak/mod.ts";

interface IRouter {
  registerRouterMiddleware(app: Application): void;
  registerRoutes(): void;
}

interface IRouterDependencies {
  apiPrefix: string;
}

export class Router implements IRouter {
  private router: OakRouter

  constructor({ apiPrefix }: IRouterDependencies) {
    this.router = new OakRouter({ prefix: apiPrefix })
  }

  public registerRouterMiddleware(app: Application): void {
    app.use(
      this.router.routes(), 
      this.router.allowedMethods()
    )
  }

  public registerRoutes(): void {
    // deno-lint-ignore require-await
    this.router.get("/", async (ctx) => {
      ctx.response.status = 200
      ctx.response.body = { message: "Hello world!" }
    })
  }
}