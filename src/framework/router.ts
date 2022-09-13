import { IRouter, RouteGroup } from "./mod.ts";
import { Application, Router as OakRouter } from "oak";

interface IRouterDependencies {
  apiPrefix: string;
}

export class Router implements IRouter {
  private router: OakRouter;

  constructor({ apiPrefix }: IRouterDependencies) {
    this.router = new OakRouter({ prefix: apiPrefix });
  }

  public registerRouterMiddleware(app: Application): void {
    app.use(
      this.router.routes(),
      this.router.allowedMethods(),
    );
  }

  public registerRoutes(routeGroups: RouteGroup[]): void {
    this.generateRoutes(routeGroups);
  }

  private generateRoutes(routeGroups: RouteGroup[]): void {
    routeGroups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware, handler }) => {
        (this.router[method] as OakRouter["all"])(
          group.prefix + path,
          ...group.middleware as [],
          ...middleware as [],
          handler,
        );
      });
    });
  }
}
