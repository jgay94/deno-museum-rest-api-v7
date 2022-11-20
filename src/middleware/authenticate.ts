import { config } from "/src/utilities/mod.ts";
import { verifyToken } from "/src/tokenizer/mod.ts";
import { userService } from "/src/users/mod.ts";
import { Context, RouterMiddleware } from "oak";

const JWT_KEY = config.auth.key ?? "";

export const authenticate: RouterMiddleware<string> = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  const headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  const cookie = await ctx.cookies.get("accessToken");
  
  let token;

  if (authorization?.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  } else if (cookie) {
    token = cookie;
  } else {
    ctx.throw(401, "No authorization token found");
  }

  const payload = await verifyToken(token, JWT_KEY);

  if (!payload) {
    ctx.throw(401, "Invalid authorization token");
  }

  const userExists = await userService.exists(payload.sub as string);

  if (!userExists) {
    ctx.throw(401, "Invalid authorization token");
  }

  ctx.state["username"] = payload.sub;
  
  await next();
  delete ctx.state.username;
};
