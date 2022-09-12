import {
  Application,
  Router as OakRouter,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

export type RouteGroup = {
  group: { prefix: string };
  routes: Route[];
};

type Route = {
  method:
    | "all"
    | "delete"
    | "get"
    | "head"
    | "options"
    | "patch"
    | "post"
    | "put";
  path: string;
  handler: (ctx: RouterContext) => Promise<void>;
};

interface IRouter {
  registerRouterMiddleware(app: Application): void;
  registerRoutes(routeGroups: RouteGroup[]): void;
}

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
      routes.forEach(({ method, path, handler }) => {
        (this.router[method] as OakRouter["all"])(group.prefix + path, handler);
      });
    });
  }
}
