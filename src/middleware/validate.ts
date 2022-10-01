import { NewMuseumSchema } from "/src/museums/mod.ts";
import { Context, RouterMiddleware } from "oak";

export const newMuseum: RouterMiddleware<string> = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  const newMuseum = await ctx.request.body().value;
  const validator = NewMuseumSchema.destruct();
  const [err, museum] = validator(newMuseum);

  if (!museum) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Invalid museum payload.",
      data: err,
    };

    return;
  }

  await next();
};
