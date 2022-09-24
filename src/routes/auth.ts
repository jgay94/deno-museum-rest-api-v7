import { RouteGroup } from "/src/framework/mod.ts";
import { authController } from "/src/auth/mod.ts";

export const auth: RouteGroup = {
  group: {
    prefix: "",
    middleware: [],
  },
  routes: [
    {
      method: "post",
      path: "/register",
      middleware: [],
      handler: (c) => authController.register(c),
    },
    {
      method: "post",
      path: "/login",
      middleware: [],
      handler: (c) => authController.login(c),
    },
    {
      method: "get",
      path: "/logout",
      middleware: [],
      handler: (c) => authController.logout(c),
    },
  ],
};
