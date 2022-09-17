import { RouteGroup } from "/src/framework/mod.ts";
import { museumsController } from "/src/museums/mod.ts";
import { validate } from "/src/middleware/mod.ts";

export const museums: RouteGroup = {
  group: {
    prefix: "/museums",
    middleware: [],
  },
  routes: [
    {
      method: "get",
      path: "/",
      middleware: [],
      handler: (c) => museumsController.findAll(c),
    },
    {
      method: "post",
      path: "/",
      middleware: [validate.newMuseum],
      handler: (c) => museumsController.create(c),
    },
    {
      method: "get",
      path: "/:id",
      middleware: [],
      handler: (c) => museumsController.getById(c),
    },
    {
      method: "put",
      path: "/:id",
      middleware: [],
      handler: (c) => museumsController.update(c),
    },
  ],
};
