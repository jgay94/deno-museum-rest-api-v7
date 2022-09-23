import { verifyToken } from "/src/tokenizer/mod.ts";
import { Context, RouterMiddleware } from "oak";

const key = Deno.env.get("JWT_SECRET_KEY") ?? "";

export const auth: RouterMiddleware<string> = async (ctx: Context, next: () => Promise<unknown>): Promise<void> => {
  const headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  const cookie = await ctx.cookies.get("accessToken");
  let token;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  } else if (cookie) {
    token = cookie;
  } else {
    ctx.throw(401, "No authorization token found");
  }

  // externalize key
  const payload = await verifyToken(token, key);
  
  if (!payload) {
    ctx.throw(401, "Invalid access token");
  }

  const user = await ctx.state.userService.getByUsername({ username: payload.sub });

  if (!user) {
    ctx.throw(401, "Invalid access token");
  }

  ctx.state.user = payload.username;
  await next();
  delete ctx.state.userId;
};
