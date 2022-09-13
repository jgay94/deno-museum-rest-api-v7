import { Application, RouterContext } from "oak";

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
  handler: (ctx: RouterContext<string>) => Promise<void>;
};

export interface IRouter {
  registerRouterMiddleware(app: Application): void;
  registerRoutes(routeGroups: RouteGroup[]): void;
}

export interface IServer {
  run(): void;
  close(reason: DOMException): void;
}
