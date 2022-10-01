// deno-lint-ignore-file require-await
import { RouteGroup } from "/src/framework/mod.ts";
import { authenticate, testHeader } from "/src/middleware/mod.ts";

export const healthcheck: RouteGroup = {
  group: {
    prefix: "/healthcheck",
    middleware: [testHeader],
  },
  routes: [
    {
      method: "get",
      path: "/",
      middleware: [authenticate],
      handler: async (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = { success: true, message: "I'm alive!" };
      },
    },
  ],
};
