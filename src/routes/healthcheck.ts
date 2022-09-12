import { RouteGroup } from "../framework/router.ts";

export const healthcheck: RouteGroup = {
  group: { prefix: "/healthcheck" },
  routes: [
    {
      method: "get",
      path: "/",
      // deno-lint-ignore require-await
      handler: async (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = { message: "I'm alive!" };
      },
    },
  ],
};
