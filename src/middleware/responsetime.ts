import { Context, Middleware } from "oak";

const X_RESPONSE_TIME = "X-Response-Time";

export const responseTime: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  const start = performance.now();
  await next();
  const delta = performance.now() - start;
  ctx.response.headers.set(X_RESPONSE_TIME, `${delta}ms`);
};
