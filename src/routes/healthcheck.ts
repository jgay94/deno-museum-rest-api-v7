// deno-lint-ignore-file require-await
import { RouteGroup } from "/src/framework/mod.ts";
import { testHeader } from "/src/middleware/mod.ts";

export const healthcheck: RouteGroup = {
  group: {
    prefix: "/healthcheck",
    middleware: [],
  },
  routes: [
    {
      method: "get",
      path: "/",
      middleware: [testHeader],
      handler: async (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = { message: "I'm alive!" };
      },
    },
  ],
};
