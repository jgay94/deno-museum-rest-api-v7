import { RouteGroup } from "/src/framework/mod.ts";
import { museumsController } from "/src/museums/mod.ts";

export const museums: RouteGroup = {
  group: { prefix: "/museums" },
  routes: [
    {
      method: "get",
      path: "/",
      handler: (c) => museumsController.findAll(c),
    },
  ],
};
