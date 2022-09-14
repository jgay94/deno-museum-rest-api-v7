import { RouteGroup } from "/src/framework/mod.ts";
import { museumsController } from "/src/museums/mod.ts";
import { testHeader } from "/src/middleware/mod.ts";

export const museums: RouteGroup = {
  group: {
    prefix: "/museums",
    middleware: [testHeader],
  },
  routes: [
    {
      method: "get",
      path: "/",
      middleware: [],
      handler: (c) => museumsController.findAll(c),
    },
  ],
};
