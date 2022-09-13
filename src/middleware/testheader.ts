import { Context, RouterMiddleware } from "oak";

const X_TEST = "X-Test";
const TRUE = "true";

export const testHeader: RouterMiddleware<string> = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  ctx.response.headers.set(X_TEST, TRUE);
  await next();
};
