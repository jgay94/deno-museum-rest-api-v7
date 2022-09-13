import * as log from "std/log/mod.ts";
import { format } from "std/datetime/mod.ts";
import { cyan, green, red, yellow } from "std/fmt/colors.ts";
import { Context, Middleware } from "oak";

const X_RESPONSE_TIME = "X-Response-Time";
const USER_AGENT = "User-Agent";
const DATETIME_FORMAT = "MM-dd-yyyy hh:mm:ss";

export const requestLogger: Middleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> => {
  await next();
  const rt = ctx.response.headers.get(X_RESPONSE_TIME);
  const ua = ctx.request.headers.get(USER_AGENT);
  const status = ctx.response.status;

  const log_string = `[${
    format(new Date(Date.now()), DATETIME_FORMAT)
  }]\ ${status} ${ctx.request.method} to ${ctx.request.url}\ from ${ua} took +${rt}`;

  const _color = status >= 500
    ? log.info(`${red(log_string)}`)
    : status >= 400
    ? log.info(`${yellow(log_string)}`)
    : status >= 300
    ? log.info(`${cyan(log_string)}`)
    : status >= 200
    ? log.info(`${green(log_string)}`)
    : log.info(`${red(log_string)}`);
};
