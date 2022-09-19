import { RouteGroup } from "/src/framework/mod.ts";
import { userController } from "/src/users/mod.ts";

export const users: RouteGroup = {
  group: {
    prefix: "/users",
    middleware: [],
  },
  routes: [
    {
      method: "post",
      path: "/",
      middleware: [],
      handler: (c) => userController.register(c),
    },
  ],
};
