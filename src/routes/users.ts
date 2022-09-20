import { RouteGroup } from "/src/framework/mod.ts";
import { userController } from "/src/users/mod.ts";

export const users: RouteGroup = {
  group: {
    prefix: "/users",
    middleware: [],
  },
  routes: [
    {
      method: "get",
      path: "/",
      middleware: [],
      handler: (c) => userController.findAll(c),
    },
  ],
};
