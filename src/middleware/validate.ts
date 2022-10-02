import { helpers, RouterContext } from "oak";
import { z } from "zod";

export const validate = (schema: z.AnyZodObject) =>
async (
  ctx: RouterContext<string>,
  next: () => Promise<unknown>,
): Promise<void> => {
  try {
    schema.parse({
      params: ctx.params,
      query: helpers.getQuery(ctx),
      body: await ctx.request.body().value,
    });

    await next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      ctx.response.status = 400;
      ctx.response.body = {
        status: "fail",
        error: err.errors,
      };
      return;
    }
    await next();
  }
};
